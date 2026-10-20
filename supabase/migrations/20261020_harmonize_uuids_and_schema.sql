-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION SCRIPT
-- TÂCHE 02: HARMONISATION DU SCHÉMA ET DES IDENTIFIANTS UUID
-- Migration Version: 20261020_harmonize_uuids_and_schema.sql
-- ==========================================================================

-- Active l'extension pgcrypto pour la génération native des UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --------------------------------------------------------------------------
-- 1. TABLE DES REVENDEURS / AFFILIÉS (public.resellers)
-- Clé primaire UUID + Code métier unique referral_code
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resellers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    referral_code TEXT UNIQUE NOT NULL,
    commission_rate NUMERIC DEFAULT 10.0 CHECK (commission_rate >= 0 AND commission_rate <= 100),
    status TEXT DEFAULT 'Actif' CHECK (status IN ('Actif', 'Inactif', 'Suspendu', 'active', 'inactive', 'suspended')),
    country TEXT DEFAULT 'Bénin',
    payout_method TEXT DEFAULT 'Mobile Money',
    payout_account TEXT,
    payout_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index d'optimisation
CREATE INDEX IF NOT EXISTS idx_resellers_referral_code ON public.resellers(UPPER(referral_code));
CREATE INDEX IF NOT EXISTS idx_resellers_email ON public.resellers(LOWER(email));

-- --------------------------------------------------------------------------
-- 2. TABLE DES COMMANDES (public.orders)
-- Clé primaire TEXT (Code commercial CMD-XXXXXX) + Clé étrangère reseller_id UUID
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    total_amount NUMERIC NOT NULL CHECK (total_amount >= 0),
    customer_name TEXT,
    customer_phone TEXT,
    customer_email TEXT,
    country TEXT DEFAULT 'Bénin',
    city TEXT,
    address TEXT,
    payment_method TEXT DEFAULT 'Mobile Money',
    payment_status TEXT DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED')),
    order_status TEXT DEFAULT 'En attente',
    items JSONB,
    reseller_id UUID REFERENCES public.resellers(id) ON DELETE SET NULL,
    referral_code TEXT,
    commission_rate NUMERIC DEFAULT 0 CHECK (commission_rate >= 0 AND commission_rate <= 100),
    commission_amount NUMERIC DEFAULT 0 CHECK (commission_amount >= 0)
);

-- Si la table orders existait avec reseller_id en TEXT, conversion sécurisée vers UUID
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'orders' 
          AND column_name = 'reseller_id' 
          AND data_type = 'text'
    ) THEN
        -- Nettoyage des anciennes valeurs de démo vers UUIDs connus
        UPDATE public.orders 
        SET reseller_id = CASE 
            WHEN reseller_id = 'res-marie01' THEN '11111111-1111-1111-1111-111111111111'
            WHEN reseller_id = 'res-koffi02' THEN '22222222-2222-2222-2222-222222222222'
            WHEN reseller_id = 'res-daniel03' THEN '33333333-3333-3333-3333-333333333333'
            WHEN reseller_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN reseller_id
            ELSE NULL 
        END;

        -- Altération de type avec contrainte de clé étrangère
        ALTER TABLE public.orders 
            ALTER COLUMN reseller_id TYPE UUID USING reseller_id::UUID;

        ALTER TABLE public.orders
            DROP CONSTRAINT IF EXISTS fk_orders_reseller,
            ADD CONSTRAINT fk_orders_reseller FOREIGN KEY (reseller_id) REFERENCES public.resellers(id) ON DELETE SET NULL;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_orders_reseller_id ON public.orders(reseller_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);

-- --------------------------------------------------------------------------
-- 3. TABLE DES COMMISSIONS (public.commissions)
-- Clé primaire UUID + Clés étrangères vers orders(id) et resellers(id)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    reseller_id UUID NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
    referral_code TEXT NOT NULL,
    rate NUMERIC NOT NULL CHECK (rate >= 0),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VALIDATED', 'AVAILABLE', 'PAID', 'CANCELLED', 'REJECTED_SELF_COMMISSION')),
    available_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Si la table commissions existait avec reseller_id en TEXT, conversion sécurisée vers UUID
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'commissions' 
          AND column_name = 'reseller_id' 
          AND data_type = 'text'
    ) THEN
        UPDATE public.commissions 
        SET reseller_id = CASE 
            WHEN reseller_id = 'res-marie01' THEN '11111111-1111-1111-1111-111111111111'
            WHEN reseller_id = 'res-koffi02' THEN '22222222-2222-2222-2222-222222222222'
            WHEN reseller_id = 'res-daniel03' THEN '33333333-3333-3333-3333-333333333333'
            WHEN reseller_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN reseller_id
            ELSE '11111111-1111-1111-1111-111111111111' 
        END;

        ALTER TABLE public.commissions 
            ALTER COLUMN reseller_id TYPE UUID USING reseller_id::UUID;

        ALTER TABLE public.commissions
            DROP CONSTRAINT IF EXISTS fk_commissions_reseller,
            ADD CONSTRAINT fk_commissions_reseller FOREIGN KEY (reseller_id) REFERENCES public.resellers(id) ON DELETE CASCADE;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_commissions_reseller ON public.commissions(reseller_id);
CREATE INDEX IF NOT EXISTS idx_commissions_order ON public.commissions(order_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(status);

-- --------------------------------------------------------------------------
-- 4. DEMANDES DE RETRAIT (public.payout_requests) & JONCTION (public.payout_items)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payout_requests (
    id TEXT PRIMARY KEY,
    reseller_id UUID NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
    referral_code TEXT NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    currency TEXT DEFAULT 'FCFA',
    payment_method TEXT NOT NULL,
    payment_account TEXT NOT NULL,
    account_name TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'PAID', 'REJECTED', 'CANCELLED')),
    requested_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    transaction_reference TEXT,
    admin_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Si payout_requests existait avec reseller_id en TEXT
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'payout_requests' 
          AND column_name = 'reseller_id' 
          AND data_type = 'text'
    ) THEN
        UPDATE public.payout_requests 
        SET reseller_id = CASE 
            WHEN reseller_id = 'res-marie01' THEN '11111111-1111-1111-1111-111111111111'
            WHEN reseller_id = 'res-koffi02' THEN '22222222-2222-2222-2222-222222222222'
            WHEN reseller_id = 'res-daniel03' THEN '33333333-3333-3333-3333-333333333333'
            WHEN reseller_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN reseller_id
            ELSE '11111111-1111-1111-1111-111111111111'
        END;

        ALTER TABLE public.payout_requests 
            ALTER COLUMN reseller_id TYPE UUID USING reseller_id::UUID;

        ALTER TABLE public.payout_requests
            DROP CONSTRAINT IF EXISTS fk_payout_requests_reseller,
            ADD CONSTRAINT fk_payout_requests_reseller FOREIGN KEY (reseller_id) REFERENCES public.resellers(id) ON DELETE CASCADE;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_payout_requests_reseller ON public.payout_requests(reseller_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_status ON public.payout_requests(status);

-- Table de jonction Payout ↔ Commission avec contrainte d'unicité stricte anti-double virement
CREATE TABLE IF NOT EXISTS public.payout_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payout_request_id TEXT NOT NULL REFERENCES public.payout_requests(id) ON DELETE CASCADE,
    commission_id UUID UNIQUE NOT NULL REFERENCES public.commissions(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------------
-- 5. PAIEMENTS, PARAMÈTRES, AUDIT & AJUSTEMENTS
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    method TEXT NOT NULL,
    transaction_reference TEXT,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    currency TEXT DEFAULT 'FCFA',
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.commission_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    commission_id UUID NOT NULL REFERENCES public.commissions(id) ON DELETE CASCADE,
    reseller_id UUID NOT NULL REFERENCES public.resellers(id) ON DELETE CASCADE,
    original_amount NUMERIC NOT NULL CHECK (original_amount >= 0),
    adjusted_amount NUMERIC NOT NULL CHECK (adjusted_amount >= 0),
    reason TEXT NOT NULL,
    admin_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tables d'acquisition (Newsletter & VIP)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(LOWER(email));

CREATE TABLE IF NOT EXISTS public.vip_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_vip_phone ON public.vip_subscribers(phone);

-- --------------------------------------------------------------------------
-- 6. POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS)
-- Préparation pour la TÂCHE 03 : RLS activée avec isolation progressive
-- --------------------------------------------------------------------------
ALTER TABLE public.resellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_subscribers ENABLE ROW LEVEL SECURITY;

-- Polices de transition développement (préparées pour durcissement complet en TÂCHE 03)
DROP POLICY IF EXISTS "Allow anon resellers read" ON public.resellers;
CREATE POLICY "Allow anon resellers read" ON public.resellers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon orders insert" ON public.orders;
CREATE POLICY "Allow anon orders insert" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow anon orders select" ON public.orders;
CREATE POLICY "Allow anon orders select" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon commissions read" ON public.commissions;
CREATE POLICY "Allow anon commissions read" ON public.commissions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anon commissions insert" ON public.commissions;
CREATE POLICY "Allow anon commissions insert" ON public.commissions FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon payout_requests read" ON public.payout_requests;
CREATE POLICY "Allow anon payout_requests read" ON public.payout_requests FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anon payout_requests insert" ON public.payout_requests;
CREATE POLICY "Allow anon payout_requests insert" ON public.payout_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon payout_items all" ON public.payout_items;
CREATE POLICY "Allow anon payout_items all" ON public.payout_items FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow anon newsletter insert" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon newsletter insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon vip insert" ON public.vip_subscribers;
CREATE POLICY "Allow anon vip insert" ON public.vip_subscribers FOR INSERT WITH CHECK (true);
