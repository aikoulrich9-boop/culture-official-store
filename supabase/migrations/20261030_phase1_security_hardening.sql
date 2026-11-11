-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION SCRIPT
-- MISSION TECHNIQUE — PHASE 1 : SÉCURISATION COMPLÈTE RLS ET AUTORISATIONS
-- Migration Version: 20261030_phase1_security_hardening.sql
-- ==========================================================================
-- Description :
--   1. Purge dynamique de TOUTES les anciennes politiques permissives via pg_policies.
--   2. Activation et renforcement STRICT de Row Level Security (FORCE RLS) sur les 13 tables.
--   3. Durcissement de public.is_admin() : vérification exclusive dans app_metadata.role
--      (aucune confiance dans user_metadata ni dans l'adresse e-mail).
--   4. Durcissement des fonctions SECURITY DEFINER avec SET search_path = public.
--   5. Création de fonctions RPC sécurisées sans fuite de données personnelles :
--      - public.verify_reseller_code(p_code TEXT)
--      - public.create_store_order(...)
--   6. Définition des politiques minimales strictes par table (SELECT, INSERT, UPDATE, DELETE).
-- ==========================================================================

-- Active l'extension pgcrypto
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------------
-- 1. FONCTIONS DE SÉCURITÉ DE BASE (SECURITY DEFINER / SEARCH_PATH FIXE)
-- --------------------------------------------------------------------------

-- Fonction vérifiant si le demandeur dispose du rôle administrateur authentifié
-- Règle absolue : seul le serveur Supabase ou un JWT avec app_metadata.role in ('admin', 'ROLE_ADMIN') est admin.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'role') = 'service_role'
    OR (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'ROLE_ADMIN'),
    false
  );
$$;

-- Retourne le UUID du revendeur lié à l'utilisateur authentifié courant
CREATE OR REPLACE FUNCTION public.get_my_reseller_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.resellers
  WHERE user_id = auth.uid()
  LIMIT 1;
$$;

-- Vérifie si l'utilisateur courant est un revendeur actif
CREATE OR REPLACE FUNCTION public.is_active_reseller()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.resellers
    WHERE user_id = auth.uid()
      AND status IN ('Actif', 'active')
  );
$$;

-- --------------------------------------------------------------------------
-- 2. PURGE DYNAMIQUE EXHAUSTIVE DE TOUTES LES ANCIENNES POLITIQUES SUR LES 13 TABLES
-- --------------------------------------------------------------------------
DO $$
DECLARE
    r RECORD;
    v_tables TEXT[] := ARRAY[
        'products',
        'orders',
        'resellers',
        'commissions',
        'payout_requests',
        'payout_items',
        'payments',
        'settings',
        'audit_log',
        'commission_adjustments',
        'newsletter_subscribers',
        'vip_subscribers',
        'admin_profiles'
    ];
BEGIN
    FOR r IN (
        SELECT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = ANY(v_tables)
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- --------------------------------------------------------------------------
-- 3. FORÇAGE STRICT DU ROW LEVEL SECURITY (FORCE RLS)
-- --------------------------------------------------------------------------
ALTER TABLE IF EXISTS public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.products FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.resellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.resellers FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.commissions FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payout_requests FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.payout_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payout_items FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.payments FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.settings FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.audit_log FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.commission_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.commission_adjustments FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.newsletter_subscribers FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.vip_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vip_subscribers FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admin_profiles FORCE ROW LEVEL SECURITY;

-- --------------------------------------------------------------------------
-- 4. FONCTIONS RPC SÉCURISÉES POUR LA BOUTIQUE PUBLIQUE
-- --------------------------------------------------------------------------

-- RPC de vérification de code revendeur : ne renvoie AUCUNE donnée personnelle (pas d'email, pas de tél, pas de compte)
CREATE OR REPLACE FUNCTION public.verify_reseller_code(p_code TEXT)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_reseller RECORD;
    v_clean_code TEXT;
BEGIN
    IF p_code IS NULL OR trim(p_code) = '' THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Code revendeur vide');
    END IF;

    v_clean_code := upper(trim(p_code));

    SELECT id, name, referral_code, commission_rate, status
    INTO v_reseller
    FROM public.resellers
    WHERE upper(referral_code) = v_clean_code
    LIMIT 1;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Code revendeur introuvable');
    END IF;

    IF v_reseller.status NOT IN ('Actif', 'active') THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Ce code revendeur est inactif ou suspendu');
    END IF;

    RETURN jsonb_build_object(
        'valid', true,
        'id', v_reseller.id,
        'name', v_reseller.name,
        'referral_code', v_reseller.referral_code,
        'commission_rate', v_reseller.commission_rate
    );
END;
$$;

REVOKE ALL ON FUNCTION public.verify_reseller_code(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_reseller_code(TEXT) TO anon, authenticated;

-- RPC de création de commande contrôlée (Validation serveur + anti-auto-commission)
CREATE OR REPLACE FUNCTION public.create_store_order(
    p_order_id TEXT,
    p_total_amount NUMERIC,
    p_customer_name TEXT,
    p_customer_phone TEXT,
    p_customer_email TEXT,
    p_country TEXT,
    p_city TEXT,
    p_address TEXT,
    p_payment_method TEXT,
    p_items JSONB,
    p_referral_code TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_code TEXT;
    v_reseller RECORD;
    v_rate NUMERIC := 0;
    v_comm_amount NUMERIC := 0;
    v_reseller_uuid UUID := NULL;
    v_is_self_commission BOOLEAN := false;
BEGIN
    IF p_order_id IS NULL OR trim(p_order_id) = '' THEN
        RAISE EXCEPTION 'ID de commande requis';
    END IF;
    IF p_total_amount IS NULL OR p_total_amount < 0 THEN
        RAISE EXCEPTION 'Montant total invalide';
    END IF;

    IF p_referral_code IS NOT NULL AND trim(p_referral_code) <> '' THEN
        v_clean_code := upper(trim(p_referral_code));
        SELECT id, name, referral_code, commission_rate, phone, email, status
        INTO v_reseller
        FROM public.resellers
        WHERE upper(referral_code) = v_clean_code
        LIMIT 1;

        IF FOUND AND v_reseller.status IN ('Actif', 'active') THEN
            -- Contrôle d'auto-commission (numéro de téléphone ou email identique)
            IF (p_customer_phone IS NOT NULL AND trim(p_customer_phone) <> '' AND trim(p_customer_phone) = trim(v_reseller.phone))
               OR (p_customer_email IS NOT NULL AND trim(p_customer_email) <> '' AND lower(trim(p_customer_email)) = lower(trim(v_reseller.email))) THEN
                v_is_self_commission := true;
                v_rate := 0;
                v_comm_amount := 0;
            ELSE
                v_reseller_uuid := v_reseller.id;
                v_rate := COALESCE(v_reseller.commission_rate, 10);
                v_comm_amount := round((p_total_amount * (v_rate / 100.0)), 2);
            END IF;
        END IF;
    END IF;

    INSERT INTO public.orders (
        id,
        created_at,
        total_amount,
        customer_name,
        customer_phone,
        customer_email,
        country,
        city,
        address,
        payment_method,
        payment_status,
        order_status,
        items,
        reseller_id,
        referral_code,
        commission_rate,
        commission_amount
    ) VALUES (
        p_order_id,
        NOW(),
        p_total_amount,
        p_customer_name,
        p_customer_phone,
        p_customer_email,
        COALESCE(p_country, 'Bénin'),
        p_city,
        p_address,
        COALESCE(p_payment_method, 'Mobile Money'),
        'PENDING',
        'En attente',
        p_items,
        v_reseller_uuid,
        v_clean_code,
        v_rate,
        v_comm_amount
    );

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
            p_order_id,
            v_reseller_uuid,
            v_clean_code,
            v_rate,
            v_comm_amount,
            'PENDING',
            NOW()
        );
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'order_id', p_order_id,
        'commission_recorded', (v_reseller_uuid IS NOT NULL AND v_comm_amount > 0),
        'self_commission_detected', v_is_self_commission
    );
END;
$$;

REVOKE ALL ON FUNCTION public.create_store_order(TEXT, NUMERIC, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_store_order(TEXT, NUMERIC, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) TO anon, authenticated;

-- --------------------------------------------------------------------------
-- 5. POLITIQUES DE SÉCURITÉ MINIMALES PAR TABLE
-- --------------------------------------------------------------------------

-- Table: products
-- Lecture publique requise pour le catalogue ; écriture STRICTEMENT réservée aux admins
CREATE POLICY "products_public_select"
    ON public.products
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "products_admin_all"
    ON public.products
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: resellers
-- Aucune lecture publique des données personnelles.
-- Seul un revendeur authentifié voit son profil ou l'admin voit tout.
CREATE POLICY "resellers_own_select"
    ON public.resellers
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "resellers_own_update"
    ON public.resellers
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid() OR public.is_admin())
    WITH CHECK (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "resellers_admin_insert"
    ON public.resellers
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "resellers_admin_delete"
    ON public.resellers
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- Table: orders
-- Aucune lecture publique de toutes les commandes.
-- Revendeur voit uniquement ses commandes affiliées.
-- Admin gère tout.
-- Insertion anonyme autorisée pour le guest checkout (lecture interdite).
CREATE POLICY "orders_admin_all"
    ON public.orders
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "orders_reseller_select"
    ON public.orders
    FOR SELECT
    TO authenticated
    USING (reseller_id = public.get_my_reseller_id());

CREATE POLICY "orders_guest_insert"
    ON public.orders
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        total_amount >= 0
        AND id IS NOT NULL
        AND length(id) >= 3
    );

-- Table: commissions
-- Accès totalement interdit à anon. Revendeur ne voit que ses commissions.
CREATE POLICY "commissions_admin_all"
    ON public.commissions
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "commissions_reseller_select"
    ON public.commissions
    FOR SELECT
    TO authenticated
    USING (reseller_id = public.get_my_reseller_id());

-- Table: payout_requests
-- Revendeur consulte et insère uniquement ses propres demandes
CREATE POLICY "payout_requests_admin_all"
    ON public.payout_requests
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "payout_requests_reseller_select"
    ON public.payout_requests
    FOR SELECT
    TO authenticated
    USING (reseller_id = public.get_my_reseller_id());

CREATE POLICY "payout_requests_reseller_insert"
    ON public.payout_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (
        reseller_id = public.get_my_reseller_id()
        AND amount > 0
        AND status = 'PENDING'
    );

-- Table: payout_items
CREATE POLICY "payout_items_admin_all"
    ON public.payout_items
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "payout_items_reseller_select"
    ON public.payout_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.payout_requests pr
            WHERE pr.id = payout_items.payout_request_id
              AND pr.reseller_id = public.get_my_reseller_id()
        )
    );

-- Table: payments
-- Aucune lecture publique
CREATE POLICY "payments_admin_all"
    ON public.payments
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: settings
-- Lecture publique restreinte aux clés publiques nécessaires
-- Modification réservée aux admins
CREATE POLICY "settings_public_select"
    ON public.settings
    FOR SELECT
    TO anon, authenticated
    USING (
        key IN ('min_payout_amount', 'default_reseller_rate', 'active_payment_gateway', 'store_name')
        OR public.is_admin()
    );

CREATE POLICY "settings_admin_all"
    ON public.settings
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: audit_log
-- Lecture réservée aux administrateurs
-- Insertion autorisée par le client pour journaliser des actions d'audit
CREATE POLICY "audit_log_admin_select"
    ON public.audit_log
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "audit_log_insert"
    ON public.audit_log
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        action IS NOT NULL
        AND length(action) <= 128
        AND target_entity IS NOT NULL
    );

-- Table: commission_adjustments
CREATE POLICY "commission_adjustments_admin_all"
    ON public.commission_adjustments
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: newsletter_subscribers
-- Inscription publique possible (INSERT sans lecture)
-- Lecture strictement réservée aux administrateurs
CREATE POLICY "newsletter_insert"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (email IS NOT NULL AND position('@' in email) > 1);

CREATE POLICY "newsletter_admin_select"
    ON public.newsletter_subscribers
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "newsletter_admin_all"
    ON public.newsletter_subscribers
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: vip_subscribers
CREATE POLICY "vip_insert"
    ON public.vip_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (phone IS NOT NULL AND length(trim(phone)) >= 6);

CREATE POLICY "vip_admin_select"
    ON public.vip_subscribers
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "vip_admin_all"
    ON public.vip_subscribers
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Table: admin_profiles
CREATE POLICY "admin_profiles_all"
    ON public.admin_profiles
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "admin_profiles_own_select"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- --------------------------------------------------------------------------
-- 6. COMMENTAIRES D'AUDIT
-- --------------------------------------------------------------------------
COMMENT ON FUNCTION public.is_admin() IS
    'Sécurité Phase 1 : validation stricte du rôle administrateur via app_metadata.role ou service_role.';
COMMENT ON FUNCTION public.verify_reseller_code(TEXT) IS
    'Sécurité Phase 1 : vérification publique sécurisée sans fuite de données personnelles.';
COMMENT ON FUNCTION public.create_store_order(TEXT, NUMERIC, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, JSONB, TEXT) IS
    'Sécurité Phase 1 : enregistrement transactionnel sécurisé de commande et commission avec contrôle anti-auto-commission.';

