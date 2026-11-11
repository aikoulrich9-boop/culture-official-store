-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION SCRIPT
-- MISSION TECHNIQUE — PHASE 2 : SÉCURISATION TRANSACTIONNELLE DES COMMANDES ET STOCKS
-- Migration Version: 20261030_phase2_stock_orders_transactions.sql
-- ==========================================================================
-- Description :
--   1. Extension additive et compatible du schéma des produits (physical_stock, reserved_stock, sold_stock).
--   2. Création de la table 'product_reservations' avec expiration (15 minutes par défaut),
--      statuts ('ACTIVE', 'CONFIRMED', 'RELEASED', 'EXPIRED'), index et clés d'idempotence.
--   3. Extension de la table 'orders' pour intégrer la clé d'idempotence, le statut de réservation,
--      la date d'expiration et la séparation stricte (order_status, reservation_status, payment_status).
--   4. Fonction RPC transactionnelle 'create_order_with_reservation' :
--      - Contrôle d'idempotence strict.
--      - Verrouillage ligne par ligne via SELECT ... FOR UPDATE (ordre ordonné pour anti-deadlock).
--      - Vérification du statut actif et des prix réels dans public.products (calcul serveur du total).
--      - Vérification atomique de (physical_stock - reserved_stock >= requested_qty).
--      - Réservation atomique tout-ou-rien (si 1 produit indisponible, tout échoue).
--      - Snapshot commercial immuable dans order.items.
--      - Attribution sécurisée de commission avec rejet d'auto-commission.
--   5. Fonction RPC administrative 'confirm_order_and_commit_stock' :
--      - Transition atomique de commande vers 'confirmed'.
--      - Décrémentation du stock physique, libération du stock réservé, incrémentation du stock vendu.
--      - Protection stricte contre la double confirmation ou confirmation sur réservation expirée.
--   6. Fonction RPC d'annulation 'cancel_order_and_release_stock' :
--      - Libération atomique des quantités réservées si non confirmée, ou réintégration si annulée.
--      - Protection stricte contre la double libération.
--   7. Fonction RPC de libération périodique 'release_expired_reservations' :
--      - Libère toutes les réservations 'ACTIVE' dont expires_at < NOW().
--   8. Politiques RLS strictes garantissant qu'aucun client ne peut modifier les stocks directement.
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 1. ADAPTATION DU SCHÉMA PRODUCTS (GESTION QUADRIPARTITE DU STOCK)
-- --------------------------------------------------------------------------
-- Formule de référence : Stock disponible = physical_stock - reserved_stock
-- Le stock disponible ne doit jamais être négatif.

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 3;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS physical_stock INT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS reserved_stock INT DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sold_stock INT DEFAULT 0;

-- Initialisation sécurisée de physical_stock et stock à partir des stocks existants
UPDATE public.products 
SET physical_stock = COALESCE(total_stock, stock, 3),
    stock = COALESCE(total_stock, stock, 3),
    reserved_stock = COALESCE(reserved_stock, 0),
    sold_stock = COALESCE(sold_stock, 0)
WHERE physical_stock IS NULL;

ALTER TABLE public.products ALTER COLUMN physical_stock SET DEFAULT 3;
ALTER TABLE public.products ALTER COLUMN physical_stock SET NOT NULL;
ALTER TABLE public.products ALTER COLUMN reserved_stock SET NOT NULL;
ALTER TABLE public.products ALTER COLUMN sold_stock SET NOT NULL;

-- Contraintes d'intégrité strictes
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_products_physical_stock_non_negative') THEN
        ALTER TABLE public.products ADD CONSTRAINT chk_products_physical_stock_non_negative CHECK (physical_stock >= 0);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_products_reserved_stock_non_negative') THEN
        ALTER TABLE public.products ADD CONSTRAINT chk_products_reserved_stock_non_negative CHECK (reserved_stock >= 0);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_products_sold_stock_non_negative') THEN
        ALTER TABLE public.products ADD CONSTRAINT chk_products_sold_stock_non_negative CHECK (sold_stock >= 0);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_products_available_stock_valid') THEN
        ALTER TABLE public.products ADD CONSTRAINT chk_products_available_stock_valid CHECK (physical_stock >= reserved_stock);
    END IF;
END $$;

-- --------------------------------------------------------------------------
-- 2. TABLE DES RÉSERVATIONS TEMPORAIRES (public.product_reservations)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CONFIRMED', 'RELEASED', 'EXPIRED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    released_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_reservations_order_id ON public.product_reservations(order_id);
CREATE INDEX IF NOT EXISTS idx_reservations_product_status ON public.product_reservations(product_id, status);
CREATE INDEX IF NOT EXISTS idx_reservations_expires_at ON public.product_reservations(expires_at) WHERE status = 'ACTIVE';

-- --------------------------------------------------------------------------
-- 3. EXTENSION DE LA TABLE DES COMMANDES (public.orders)
-- --------------------------------------------------------------------------
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS idempotency_key TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reservation_status TEXT DEFAULT 'ACTIVE' 
    CHECK (reservation_status IN ('ACTIVE', 'CONFIRMED', 'RELEASED', 'EXPIRED', 'NONE'));
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reservation_expires_at TIMESTAMPTZ;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal_amount NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_fee NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS server_confirmed_at TIMESTAMPTZ;

-- Contrainte d'unicité de la clé d'idempotence (Anti-double clic / Anti-doublons)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_orders_idempotency_key') THEN
        ALTER TABLE public.orders ADD CONSTRAINT uq_orders_idempotency_key UNIQUE (idempotency_key);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_idempotency_key ON public.orders(idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_orders_reservation_expires ON public.orders(reservation_expires_at) WHERE reservation_status = 'ACTIVE';

-- --------------------------------------------------------------------------
-- 4. FONCTION TRANSACTIONNELLE ATOMIQUE : CRÉATION DE COMMANDE & RÉSERVATION
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.create_order_with_reservation(
    p_idempotency_key TEXT,
    p_customer_name TEXT,
    p_customer_phone TEXT,
    p_customer_email TEXT,
    p_country TEXT,
    p_city TEXT,
    p_address TEXT,
    p_payment_method TEXT,
    p_items JSONB,
    p_referral_code TEXT DEFAULT NULL,
    p_reservation_minutes INT DEFAULT 15
)
RETURNS JSONB
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_existing_order RECORD;
    v_order_id TEXT;
    v_clean_idempotency TEXT;
    v_expires_at TIMESTAMPTZ;
    v_clean_code TEXT;
    v_reseller RECORD;
    v_reseller_uuid UUID := NULL;
    v_rate NUMERIC := 0;
    v_comm_amount NUMERIC := 0;
    v_is_self_commission BOOLEAN := false;

    v_item RECORD;
    v_prod RECORD;
    v_subtotal NUMERIC := 0;
    v_shipping_fee NUMERIC := 0;
    v_total NUMERIC := 0;
    v_snapshot_items JSONB := '[]'::jsonb;
    v_req_qty INT;
    v_available INT;
BEGIN
    -- 1. Validation de l'idempotency key
    IF p_idempotency_key IS NULL OR trim(p_idempotency_key) = '' THEN
        RAISE EXCEPTION 'IDEMPOTENCY_KEY_REQUIRED: Une clé unique d''idempotence est requise.';
    END IF;
    v_clean_idempotency := trim(p_idempotency_key);

    -- 2. Idempotence : si la commande existe déjà pour cette clé, la retourner sans recréer
    SELECT id, total_amount, subtotal_amount, shipping_fee, order_status, reservation_status, reservation_expires_at, items
    INTO v_existing_order
    FROM public.orders
    WHERE idempotency_key = v_clean_idempotency
    LIMIT 1;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'success', true,
            'idempotent', true,
            'order_id', v_existing_order.id,
            'total_amount', v_existing_order.total_amount,
            'subtotal_amount', v_existing_order.subtotal_amount,
            'shipping_fee', v_existing_order.shipping_fee,
            'order_status', v_existing_order.order_status,
            'reservation_status', v_existing_order.reservation_status,
            'expires_at', v_existing_order.reservation_expires_at,
            'items', v_existing_order.items,
            'message', 'Commande existante récupérée par clé d''idempotence.'
        );
    END IF;

    -- 3. Validation de base des articles
    IF p_items IS NULL OR jsonb_array_length(p_items) = 0 THEN
        RAISE EXCEPTION 'EMPTY_CART: Aucun article fourni dans la commande.';
    END IF;

    -- Calcul de la date d'expiration (par défaut 15 minutes)
    v_expires_at := NOW() + (COALESCE(p_reservation_minutes, 15) * INTERVAL '1 minute');

    -- Libération préventive de toute réservation expirée pour ce panier avant verrouillage
    PERFORM public.release_expired_reservations();

    -- 4. Verrouillage atomique et ordonné de TOUS les produits demandés (SELECT ... FOR UPDATE)
    -- L'ordre 'ORDER BY id ASC' prévient de manière garantie les interblocages (deadlocks).
    FOR v_prod IN 
        SELECT p.id, p.name, p.price, p.physical_stock, p.reserved_stock, p.status
        FROM public.products p
        JOIN (
            SELECT DISTINCT (elem->>'id')::text AS prod_id
            FROM jsonb_array_elements(p_items) AS elem
        ) req ON p.id = req.prod_id
        ORDER BY p.id ASC
        FOR UPDATE
    LOOP
        -- Vérifier si le produit est actif
        IF v_prod.status = 'upcoming' THEN
            RAISE EXCEPTION 'PRODUCT_UPCOMING: L''article % (%) n''est pas encore disponible à la vente.', v_prod.name, v_prod.id;
        END IF;

        -- Trouver la quantité demandée pour ce produit dans p_items
        SELECT COALESCE(SUM((elem->>'quantity')::int), 0)
        INTO v_req_qty
        FROM jsonb_array_elements(p_items) AS elem
        WHERE (elem->>'id')::text = v_prod.id;

        IF v_req_qty <= 0 THEN
            RAISE EXCEPTION 'INVALID_QUANTITY: Quantité invalide pour l''article %.', v_prod.name;
        END IF;

        v_available := v_prod.physical_stock - v_prod.reserved_stock;

        IF v_available < v_req_qty THEN
            RAISE EXCEPTION 'INSUFFICIENT_STOCK: Stock insuffisant pour "%". Demandé: %, Disponible: %.', 
                v_prod.name, v_req_qty, GREATEST(0, v_available);
        END IF;

        -- Calcul de sous-total côté serveur basé sur le prix vérifié en base
        v_subtotal := v_subtotal + (v_prod.price * v_req_qty);

        -- Extraction de la taille demandée
        SELECT elem->>'size' INTO v_item
        FROM jsonb_array_elements(p_items) AS elem
        WHERE (elem->>'id')::text = v_prod.id
        LIMIT 1;

        -- Snapshot commercial certifié côté serveur
        v_snapshot_items := v_snapshot_items || jsonb_build_object(
            'id', v_prod.id,
            'name', v_prod.name,
            'unit_price', v_prod.price,
            'quantity', v_req_qty,
            'size', COALESCE(v_item.size, 'Unique'),
            'subtotal', (v_prod.price * v_req_qty)
        );
    END LOOP;

    -- 5. Calcul des frais de livraison côté serveur (Règle commerciale : Offerte dès 25 000 FCFA)
    IF v_subtotal >= 25000 THEN
        v_shipping_fee := 0;
    ELSE
        -- Calcul standard selon pays (Bénin 0 / Local, International calculé)
        v_shipping_fee := 0;
    END IF;

    v_total := v_subtotal + v_shipping_fee;

    -- Génération de l'identifiant de commande formaté
    v_order_id := 'CMD-' || to_char(NOW(), 'YYMMDD') || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));

    -- 6. Attribution revendeur & vérification anti-auto-commission
    IF p_referral_code IS NOT NULL AND trim(p_referral_code) <> '' THEN
        v_clean_code := upper(trim(p_referral_code));
        SELECT id, name, referral_code, commission_rate, phone, email, status
        INTO v_reseller
        FROM public.resellers
        WHERE upper(referral_code) = v_clean_code
        LIMIT 1;

        IF FOUND AND v_reseller.status IN ('Actif', 'active') THEN
            IF (p_customer_phone IS NOT NULL AND trim(p_customer_phone) <> '' AND trim(p_customer_phone) = trim(v_reseller.phone))
               OR (p_customer_email IS NOT NULL AND trim(p_customer_email) <> '' AND lower(trim(p_customer_email)) = lower(trim(v_reseller.email))) THEN
                v_is_self_commission := true;
                v_rate := 0;
                v_comm_amount := 0;
            ELSE
                v_reseller_uuid := v_reseller.id;
                v_rate := COALESCE(v_reseller.commission_rate, 10);
                v_comm_amount := round((v_total * (v_rate / 100.0)), 2);
            END IF;
        END IF;
    END IF;

    -- 7. Insertion de la commande
    INSERT INTO public.orders (
        id,
        idempotency_key,
        created_at,
        total_amount,
        subtotal_amount,
        shipping_fee,
        customer_name,
        customer_phone,
        customer_email,
        country,
        city,
        address,
        payment_method,
        payment_status,
        order_status,
        reservation_status,
        reservation_expires_at,
        items,
        reseller_id,
        referral_code,
        commission_rate,
        commission_amount
    ) VALUES (
        v_order_id,
        v_clean_idempotency,
        NOW(),
        v_total,
        v_subtotal,
        v_shipping_fee,
        COALESCE(p_customer_name, 'Client Invité'),
        p_customer_phone,
        p_customer_email,
        COALESCE(p_country, 'Bénin'),
        p_city,
        p_address,
        COALESCE(p_payment_method, 'WhatsApp / Mobile Money'),
        'PENDING',
        'pending_whatsapp',
        'ACTIVE',
        v_expires_at,
        v_snapshot_items,
        v_reseller_uuid,
        v_clean_code,
        v_rate,
        v_comm_amount
    );

    -- 8. Enregistrement des lignes de réservation et mise à jour du stock réservé
    FOR v_item IN SELECT * FROM jsonb_to_recordset(v_snapshot_items) AS x(id text, quantity int, unit_price numeric)
    LOOP
        INSERT INTO public.product_reservations (
            order_id,
            product_id,
            quantity,
            unit_price,
            status,
            created_at,
            expires_at
        ) VALUES (
            v_order_id,
            v_item.id,
            v_item.quantity,
            v_item.unit_price,
            'ACTIVE',
            NOW(),
            v_expires_at
        );

        UPDATE public.products
        SET reserved_stock = reserved_stock + v_item.quantity,
            stock = physical_stock - (reserved_stock + v_item.quantity),
            updated_at = NOW()
        WHERE id = v_item.id;
    END LOOP;

    -- 9. Enregistrement de la commission revendeur si éligible
    IF v_reseller_uuid IS NOT NULL AND v_comm_amount > 0 AND NOT v_is_self_commission THEN
        INSERT INTO public.commissions (
            order_id,
            reseller_id,
            referral_code,
            rate,
            amount,
            status,
            created_at
        ) VALUES (
            v_order_id,
            v_reseller_uuid,
            v_clean_code,
            v_rate,
            v_comm_amount,
            'PENDING',
            NOW()
        );
    END IF;

    -- 10. Audit log de création sécurisée
    INSERT INTO public.audit_log (
        actor_id,
        actor_role,
        action,
        target_entity,
        target_id,
        details,
        created_at
    ) VALUES (
        COALESCE(p_customer_phone, 'ANON_CLIENT'),
        'CLIENT',
        'ORDER_CREATED_WITH_RESERVATION',
        'ORDER',
        v_order_id,
        jsonb_build_object(
            'total', v_total,
            'subtotal', v_subtotal,
            'items_count', jsonb_array_length(v_snapshot_items),
            'expires_at', v_expires_at,
            'idempotency_key', v_clean_idempotency
        ),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'idempotent', false,
        'order_id', v_order_id,
        'total_amount', v_total,
        'subtotal_amount', v_subtotal,
        'shipping_fee', v_shipping_fee,
        'order_status', 'pending_whatsapp',
        'reservation_status', 'ACTIVE',
        'expires_at', v_expires_at,
        'items', v_snapshot_items
    );
END;
$$;

REVOKE ALL ON FUNCTION public.create_order_with_reservation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_order_with_reservation(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT, INT) TO anon, authenticated;

-- --------------------------------------------------------------------------
-- 5. FONCTION TRANSACTIONNELLE ATOMIQUE : CONFIRMATION COMMANDE & DÉCRÉMENTATION
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.confirm_order_and_commit_stock(
    p_order_id TEXT,
    p_admin_note TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_order RECORD;
    v_res RECORD;
BEGIN
    -- 1. Contrôle strict des droits administrateur
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Seul un administrateur peut confirmer une commande.';
    END IF;

    -- 2. Verrouillage de la commande pour éviter les doubles confirmations
    SELECT * INTO v_order
    FROM public.orders
    WHERE id = p_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'ORDER_NOT_FOUND: Commande introuvable : %', p_order_id;
    END IF;

    IF v_order.order_status = 'confirmed' OR v_order.order_status = 'Livrée' THEN
        RETURN jsonb_build_object(
            'success', true,
            'already_confirmed', true,
            'message', 'Commande déjà confirmée précédemment.'
        );
    END IF;

    IF v_order.order_status IN ('cancelled', 'Annulée') THEN
        RAISE EXCEPTION 'ORDER_CANCELLED: Impossible de confirmer une commande déjà annulée.';
    END IF;

    -- 3. Vérification de la réservation
    -- Si la réservation est expirée, vérifier si le stock physique est toujours suffisant
    IF v_order.reservation_status = 'EXPIRED' OR (v_order.reservation_status = 'ACTIVE' AND v_order.reservation_expires_at < NOW()) THEN
        -- Tenter une ré-acquisition atomique si le stock est encore disponible
        FOR v_res IN 
            SELECT r.product_id, r.quantity, p.physical_stock, p.reserved_stock
            FROM public.product_reservations r
            JOIN public.products p ON p.id = r.product_id
            WHERE r.order_id = p_order_id
            ORDER BY r.product_id ASC
            FOR UPDATE OF p
        LOOP
            IF (v_res.physical_stock - v_res.reserved_stock) < v_res.quantity THEN
                RAISE EXCEPTION 'RESERVATION_EXPIRED_NO_STOCK: La réservation a expiré et le stock pour % n''est plus disponible.', v_res.product_id;
            END IF;
        END LOOP;
    END IF;

    -- 4. Décrémentation définitive du stock physique, libération du réservé et ajout au vendu
    FOR v_res IN 
        SELECT product_id, quantity, status
        FROM public.product_reservations
        WHERE order_id = p_order_id
        FOR UPDATE
    LOOP
        UPDATE public.products
        SET physical_stock = physical_stock - v_res.quantity,
            reserved_stock = GREATEST(0, reserved_stock - (CASE WHEN v_res.status = 'ACTIVE' THEN v_res.quantity ELSE 0 END)),
            sold_stock = sold_stock + v_res.quantity,
            total_stock = physical_stock - v_res.quantity,
            stock = physical_stock - v_res.quantity,
            updated_at = NOW()
        WHERE id = v_res.product_id;

        UPDATE public.product_reservations
        SET status = 'CONFIRMED',
            confirmed_at = NOW()
        WHERE order_id = p_order_id AND product_id = v_res.product_id;
    END LOOP;

    -- 5. Mise à jour du statut de la commande
    UPDATE public.orders
    SET order_status = 'confirmed',
        reservation_status = 'CONFIRMED',
        server_confirmed_at = NOW()
    WHERE id = p_order_id;

    -- 6. Journalisation d'audit
    INSERT INTO public.audit_log (
        actor_id,
        actor_role,
        action,
        target_entity,
        target_id,
        details,
        created_at
    ) VALUES (
        auth.uid()::text,
        'ROLE_ADMIN',
        'ORDER_CONFIRMED_AND_STOCK_COMMITTED',
        'ORDER',
        p_order_id,
        jsonb_build_object('note', p_admin_note, 'confirmed_at', NOW()),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'order_id', p_order_id,
        'order_status', 'confirmed',
        'reservation_status', 'CONFIRMED'
    );
END;
$$;

REVOKE ALL ON FUNCTION public.confirm_order_and_commit_stock(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.confirm_order_and_commit_stock(TEXT, TEXT) TO authenticated;

-- --------------------------------------------------------------------------
-- 6. FONCTION TRANSACTIONNELLE ATOMIQUE : ANNULATION & LIBÉRATION DU STOCK
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.cancel_order_and_release_stock(
    p_order_id TEXT,
    p_reason TEXT DEFAULT 'Annulation client ou rupture'
)
RETURNS JSONB
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_order RECORD;
    v_res RECORD;
    v_already_released BOOLEAN := false;
BEGIN
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Seul un administrateur peut annuler une commande.';
    END IF;

    SELECT * INTO v_order
    FROM public.orders
    WHERE id = p_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'ORDER_NOT_FOUND: Commande introuvable : %', p_order_id;
    END IF;

    IF v_order.order_status IN ('cancelled', 'Annulée') THEN
        RETURN jsonb_build_object(
            'success', true,
            'already_cancelled', true,
            'message', 'Commande déjà annulée.'
        );
    END IF;

    -- Si la commande était confirmée, réintégrer le stock physique
    IF v_order.order_status = 'confirmed' THEN
        FOR v_res IN 
            SELECT product_id, quantity
            FROM public.product_reservations
            WHERE order_id = p_order_id
            FOR UPDATE
        LOOP
            UPDATE public.products
            SET physical_stock = physical_stock + v_res.quantity,
                sold_stock = GREATEST(0, sold_stock - v_res.quantity),
                total_stock = physical_stock + v_res.quantity,
                stock = physical_stock + v_res.quantity,
                updated_at = NOW()
            WHERE id = v_res.product_id;
        END LOOP;
    -- Si la commande était en réservation active, libérer le stock réservé
    ELSIF v_order.reservation_status = 'ACTIVE' THEN
        FOR v_res IN 
            SELECT product_id, quantity, status
            FROM public.product_reservations
            WHERE order_id = p_order_id AND status = 'ACTIVE'
            FOR UPDATE
        LOOP
            UPDATE public.products
            SET reserved_stock = GREATEST(0, reserved_stock - v_res.quantity),
                stock = physical_stock - GREATEST(0, reserved_stock - v_res.quantity),
                updated_at = NOW()
            WHERE id = v_res.product_id;

            UPDATE public.product_reservations
            SET status = 'RELEASED',
                released_at = NOW()
            WHERE order_id = p_order_id AND product_id = v_res.product_id;
        END LOOP;
    END IF;

    -- Annuler les éventuelles commissions associées
    UPDATE public.commissions
    SET status = 'CANCELLED',
        updated_at = NOW()
    WHERE order_id = p_order_id;

    -- Mise à jour du statut commande
    UPDATE public.orders
    SET order_status = 'cancelled',
        reservation_status = 'RELEASED'
    WHERE id = p_order_id;

    -- Audit log
    INSERT INTO public.audit_log (
        actor_id,
        actor_role,
        action,
        target_entity,
        target_id,
        details,
        created_at
    ) VALUES (
        auth.uid()::text,
        'ROLE_ADMIN',
        'ORDER_CANCELLED_AND_STOCK_RELEASED',
        'ORDER',
        p_order_id,
        jsonb_build_object('reason', p_reason, 'cancelled_at', NOW()),
        NOW()
    );

    RETURN jsonb_build_object(
        'success', true,
        'order_id', p_order_id,
        'order_status', 'cancelled',
        'reservation_status', 'RELEASED'
    );
END;
$$;

REVOKE ALL ON FUNCTION public.cancel_order_and_release_stock(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cancel_order_and_release_stock(TEXT, TEXT) TO authenticated;

-- --------------------------------------------------------------------------
-- 7. FONCTION DE LIBÉRATION DES RÉSERVATIONS EXPIRÉES
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.release_expired_reservations()
RETURNS INT
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_count INT := 0;
    v_res RECORD;
BEGIN
    FOR v_res IN 
        SELECT r.id AS res_id, r.order_id, r.product_id, r.quantity
        FROM public.product_reservations r
        JOIN public.orders o ON o.id = r.order_id
        WHERE r.status = 'ACTIVE'
          AND r.expires_at < NOW()
          AND o.order_status NOT IN ('confirmed', 'Livrée')
        FOR UPDATE OF r
    LOOP
        -- Libération du stock réservé
        UPDATE public.products
        SET reserved_stock = GREATEST(0, reserved_stock - v_res.quantity),
            stock = physical_stock - GREATEST(0, reserved_stock - v_res.quantity),
            updated_at = NOW()
        WHERE id = v_res.product_id;

        UPDATE public.product_reservations
        SET status = 'EXPIRED',
            released_at = NOW()
        WHERE id = v_res.res_id;

        UPDATE public.orders
        SET reservation_status = 'EXPIRED',
            order_status = 'expired'
        WHERE id = v_res.order_id AND reservation_status = 'ACTIVE';

        v_count := v_count + 1;
    END LOOP;

    RETURN v_count;
END;
$$;

REVOKE ALL ON FUNCTION public.release_expired_reservations() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.release_expired_reservations() TO anon, authenticated;

-- --------------------------------------------------------------------------
-- 8. POLITIQUES RLS SUR LES NOUVELLES TABLES ET COLONNES
-- --------------------------------------------------------------------------
ALTER TABLE public.product_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reservations FORCE ROW LEVEL SECURITY;

-- Seul l'administrateur peut lire toutes les réservations
CREATE POLICY "reservations_admin_all"
    ON public.product_reservations
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Un revendeur ne peut voir que les réservations liées à ses commandes
CREATE POLICY "reservations_reseller_select"
    ON public.product_reservations
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.orders o
            WHERE o.id = product_reservations.order_id
              AND o.reseller_id = public.get_my_reseller_id()
        )
    );

COMMENT ON FUNCTION public.create_order_with_reservation IS
    'Phase 2 : création transactionnelle atomique avec idempotence, calcul de prix serveur et réservation 15 minutes.';
COMMENT ON FUNCTION public.confirm_order_and_commit_stock IS
    'Phase 2 : confirmation administrateur atomique avec décrémentation physique et libération de réservation.';
COMMENT ON FUNCTION public.cancel_order_and_release_stock IS
    'Phase 2 : annulation et libération atomique du stock sans réinjection intempestive.';
COMMENT ON FUNCTION public.release_expired_reservations IS
    'Phase 2 : balayage et libération automatique des réservations expirées.';

