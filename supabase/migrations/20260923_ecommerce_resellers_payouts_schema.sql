-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION SCRIPT
-- ARCHITECTURE E-COMMERCE, REVENDEURS, COMMISSIONS, PAYOUTS & AUDIT
-- Sections A, B, C, D, E de l'Avenant d'Audit
-- ==========================================================================

-- --------------------------------------------------------------------------
-- SECTION A: TABLE DES REVENDEURS / AFFILIÉS (RESELLERS)
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

-- Index pour recherche rapide sur le code revendeur
CREATE INDEX IF NOT EXISTS idx_resellers_referral_code ON public.resellers(UPPER(referral_code));

-- --------------------------------------------------------------------------
-- SECTION B: EXTENSION DE LA TABLE DES COMMANDES (ORDERS)
-- Conservant les données existantes sans destruction
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    total_amount NUMERIC NOT NULL
);

-- Ajout des colonnes pour le Guest Checkout et l'attribution revendeur immuable
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Bénin';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'Mobile Money';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'PENDING';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_status TEXT DEFAULT 'En attente';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB;

-- Snapshot de commission revendeur (Immuable lors de la commande)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS reseller_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS referral_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS commission_rate NUMERIC DEFAULT 0;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS commission_amount NUMERIC DEFAULT 0;

-- --------------------------------------------------------------------------
-- SECTION C: TABLE DES COMMISSIONS (COMMISSIONS)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL,
    reseller_id TEXT NOT NULL,
    referral_code TEXT NOT NULL,
    rate NUMERIC NOT NULL CHECK (rate >= 0),
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VALIDATED', 'AVAILABLE', 'PAID', 'CANCELLED')),
    available_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_commissions_reseller ON public.commissions(reseller_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(status);

-- --------------------------------------------------------------------------
-- SECTION D: DEMANDES DE RETRAIT (PAYOUT_REQUESTS) & DÉTAILS (PAYOUT_ITEMS)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payout_requests (
    id TEXT PRIMARY KEY,
    reseller_id TEXT NOT NULL,
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

-- Table de jonction Payout ↔ Commission avec CONTRAINTE D'UNICITÉ STRICTE (Anti-double virement)
CREATE TABLE IF NOT EXISTS public.payout_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payout_request_id TEXT REFERENCES public.payout_requests(id) ON DELETE CASCADE,
    commission_id UUID UNIQUE NOT NULL, -- CONTRAINTE STRICTE: Une commission ne peut appartenir qu'à 1 seul payout
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------------
-- SECTION E: PAIEMENTS, PARAMÈTRES, AUDIT & AJUSTEMENTS
-- --------------------------------------------------------------------------

-- Table des Paiements Clients (PAYMENTS)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    method TEXT NOT NULL,
    transaction_reference TEXT,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'FCFA',
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des Paramètres Globaux (SETTINGS)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table du Journal d'Audit (AUDIT_LOG)
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

-- Table des Ajustements de Commissions (COMMISSION_ADJUSTMENTS)
CREATE TABLE IF NOT EXISTS public.commission_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    commission_id UUID REFERENCES public.commissions(id) ON DELETE CASCADE,
    reseller_id TEXT NOT NULL,
    original_amount NUMERIC NOT NULL,
    adjusted_amount NUMERIC NOT NULL,
    reason TEXT NOT NULL,
    admin_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------------
-- SÉCURITÉ ROW LEVEL SECURITY (RLS)
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

-- Polices d'accès permissives pour le client anonyme (développement/démo)
DROP POLICY IF EXISTS "Allow anon resellers read" ON public.resellers;
CREATE POLICY "Allow anon resellers read" ON public.resellers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow anon resellers insert" ON public.resellers;
CREATE POLICY "Allow anon resellers insert" ON public.resellers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon orders all" ON public.orders;
CREATE POLICY "Allow anon orders all" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow anon commissions all" ON public.commissions;
CREATE POLICY "Allow anon commissions all" ON public.commissions FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow anon payout_requests all" ON public.payout_requests;
CREATE POLICY "Allow anon payout_requests all" ON public.payout_requests FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow anon payout_items all" ON public.payout_items;
CREATE POLICY "Allow anon payout_items all" ON public.payout_items FOR ALL USING (true);

-- --------------------------------------------------------------------------
-- SECTION F: ABONNÉS NEWSLETTER & PASS DROPS VIP WHATSAPP
-- --------------------------------------------------------------------------
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

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon newsletter insert" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon newsletter insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow anon newsletter select" ON public.newsletter_subscribers;
CREATE POLICY "Allow anon newsletter select" ON public.newsletter_subscribers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow anon vip insert" ON public.vip_subscribers;
CREATE POLICY "Allow anon vip insert" ON public.vip_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow anon vip select" ON public.vip_subscribers;
CREATE POLICY "Allow anon vip select" ON public.vip_subscribers FOR SELECT USING (true);
