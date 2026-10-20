-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION
-- TÂCHE 03 — AUTHENTIFICATION RÉELLE & ROW LEVEL SECURITY STRICTES
-- Migration Version: 20261020_rls_auth_strict.sql
-- ==========================================================================
-- OBJECTIF :
--   1. Supprimer les politiques RLS permissives (USING true) de la Tâche 02
--   2. Implémenter des politiques RLS strictes basées sur auth.uid()
--   3. Créer les fonctions helper is_admin() et get_reseller_id()
--   4. Préparer les rôles Supabase (admin / reseller) via user_metadata
--   5. Conserver l'accès anon minimal nécessaire pour la boutique publique
-- ==========================================================================

-- --------------------------------------------------------------------------
-- 0. FONCTIONS UTILITAIRES D'ISOLATION DE RÔLE
-- --------------------------------------------------------------------------

-- Vérifie si l'utilisateur connecté est administrateur
-- L'admin doit avoir app_metadata.role = 'admin' (positionné côté Supabase)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'role') = 'service_role'
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- Retourne le reseller_id (UUID) correspondant à l'utilisateur Supabase connecté
-- Lie auth.users.id à public.resellers.user_id
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

-- Vérifie si l'utilisateur connecté est un revendeur actif
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
-- 1. SUPPRESSION DES ANCIENNES POLITIQUES PERMISSIVES (TÂCHE 02)
-- --------------------------------------------------------------------------

DROP POLICY IF EXISTS "Allow anon resellers read"       ON public.resellers;
DROP POLICY IF EXISTS "Allow anon orders insert"        ON public.orders;
DROP POLICY IF EXISTS "Allow anon orders select"        ON public.orders;
DROP POLICY IF EXISTS "Allow anon commissions read"     ON public.commissions;
DROP POLICY IF EXISTS "Allow anon commissions insert"   ON public.commissions;
DROP POLICY IF EXISTS "Allow anon payout_requests read" ON public.payout_requests;
DROP POLICY IF EXISTS "Allow anon payout_requests insert" ON public.payout_requests;
DROP POLICY IF EXISTS "Allow anon payout_items all"     ON public.payout_items;
DROP POLICY IF EXISTS "Allow anon newsletter insert"    ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Allow anon vip insert"           ON public.vip_subscribers;

-- Suppression des éventuelles anciennes politiques de la Tâche 03
DROP POLICY IF EXISTS "admin_full_access_resellers"       ON public.resellers;
DROP POLICY IF EXISTS "reseller_read_own_profile"         ON public.resellers;
DROP POLICY IF EXISTS "admin_full_access_orders"          ON public.orders;
DROP POLICY IF EXISTS "anon_insert_orders"                ON public.orders;
DROP POLICY IF EXISTS "reseller_read_own_orders"          ON public.orders;
DROP POLICY IF EXISTS "admin_full_access_commissions"     ON public.commissions;
DROP POLICY IF EXISTS "reseller_read_own_commissions"     ON public.commissions;
DROP POLICY IF EXISTS "system_insert_commissions"         ON public.commissions;
DROP POLICY IF EXISTS "admin_full_access_payout_requests" ON public.payout_requests;
DROP POLICY IF EXISTS "reseller_manage_own_payouts"       ON public.payout_requests;
DROP POLICY IF EXISTS "admin_full_access_payout_items"    ON public.payout_items;
DROP POLICY IF EXISTS "reseller_read_own_payout_items"    ON public.payout_items;
DROP POLICY IF EXISTS "admin_full_access_payments"        ON public.payments;
DROP POLICY IF EXISTS "admin_full_access_settings"        ON public.settings;
DROP POLICY IF EXISTS "admin_full_access_audit_log"       ON public.audit_log;
DROP POLICY IF EXISTS "system_insert_audit_log"           ON public.audit_log;
DROP POLICY IF EXISTS "admin_full_access_adjustments"     ON public.commission_adjustments;
DROP POLICY IF EXISTS "anon_insert_newsletter"            ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "admin_read_newsletter"             ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "anon_insert_vip"                   ON public.vip_subscribers;
DROP POLICY IF EXISTS "admin_read_vip"                    ON public.vip_subscribers;

-- --------------------------------------------------------------------------
-- 2. TABLE : public.resellers
-- --------------------------------------------------------------------------

-- Lecture publique limitée (boutique a besoin du nom/code pour afficher le partenaire)
CREATE POLICY "public_read_resellers_basic"
  ON public.resellers
  FOR SELECT
  TO anon, authenticated
  USING (status IN ('Actif', 'active'));

-- Un revendeur peut lire et mettre à jour son propre profil complet
CREATE POLICY "reseller_read_own_profile"
  ON public.resellers
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "reseller_update_own_profile"
  ON public.resellers
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- L'admin peut tout faire
CREATE POLICY "admin_full_access_resellers"
  ON public.resellers
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 3. TABLE : public.orders
-- --------------------------------------------------------------------------

-- Insertion anonyme : les clients passent commande sans compte
CREATE POLICY "anon_insert_orders"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Un revendeur voit uniquement ses propres commandes
CREATE POLICY "reseller_read_own_orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (reseller_id = public.get_my_reseller_id());

-- L'admin voit et gère toutes les commandes
CREATE POLICY "admin_full_access_orders"
  ON public.orders
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 4. TABLE : public.commissions
-- --------------------------------------------------------------------------

-- Insertion système (service_role) ou admin uniquement
CREATE POLICY "system_insert_commissions"
  ON public.commissions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin() OR auth.role() = 'service_role');

-- Lecture : chaque revendeur voit ses propres commissions
CREATE POLICY "reseller_read_own_commissions"
  ON public.commissions
  FOR SELECT
  TO authenticated
  USING (reseller_id = public.get_my_reseller_id());

-- Admin accès total
CREATE POLICY "admin_full_access_commissions"
  ON public.commissions
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 5. TABLE : public.payout_requests
-- --------------------------------------------------------------------------

-- Un revendeur peut créer une demande de retrait pour son propre compte
CREATE POLICY "reseller_insert_own_payout"
  ON public.payout_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (reseller_id = public.get_my_reseller_id());

-- Un revendeur voit ses propres demandes
CREATE POLICY "reseller_read_own_payouts"
  ON public.payout_requests
  FOR SELECT
  TO authenticated
  USING (reseller_id = public.get_my_reseller_id());

-- Admin : accès total
CREATE POLICY "admin_full_access_payout_requests"
  ON public.payout_requests
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 6. TABLE : public.payout_items
-- --------------------------------------------------------------------------

-- Lecture : revendeur voit ses propres payout_items
CREATE POLICY "reseller_read_own_payout_items"
  ON public.payout_items
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.payout_requests pr
      WHERE pr.id = payout_request_id
        AND pr.reseller_id = public.get_my_reseller_id()
    )
  );

-- Admin : accès total
CREATE POLICY "admin_full_access_payout_items"
  ON public.payout_items
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 7. TABLE : public.payments
-- --------------------------------------------------------------------------

-- Lecture admin uniquement (données financières sensibles)
CREATE POLICY "admin_full_access_payments"
  ON public.payments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 8. TABLE : public.settings
-- --------------------------------------------------------------------------

-- Accès admin uniquement
CREATE POLICY "admin_full_access_settings"
  ON public.settings
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 9. TABLE : public.audit_log
-- --------------------------------------------------------------------------

-- Le système peut toujours écrire des logs (via service_role)
CREATE POLICY "system_insert_audit_log"
  ON public.audit_log
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Seul l'admin peut lire les logs d'audit
CREATE POLICY "admin_read_audit_log"
  ON public.audit_log
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- --------------------------------------------------------------------------
-- 10. TABLE : public.commission_adjustments
-- --------------------------------------------------------------------------

-- Admin uniquement
CREATE POLICY "admin_full_access_adjustments"
  ON public.commission_adjustments
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- --------------------------------------------------------------------------
-- 11. TABLES D'ACQUISITION : newsletter & vip
-- --------------------------------------------------------------------------

-- Inscription publique sans compte
CREATE POLICY "anon_insert_newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin voit tous les abonnés
CREATE POLICY "admin_read_newsletter"
  ON public.newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "anon_insert_vip"
  ON public.vip_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "admin_read_vip"
  ON public.vip_subscribers
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- --------------------------------------------------------------------------
-- 12. COLONNE user_id SUR resellers (si absente, ajout sécurisé)
-- --------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'resellers'
      AND column_name = 'user_id'
  ) THEN
    ALTER TABLE public.resellers
      ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_resellers_user_id ON public.resellers(user_id);

-- --------------------------------------------------------------------------
-- 13. TABLE ADMIN_PROFILES — Gestion des comptes administrateur
-- Liés à auth.users, isolés des revendeurs
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Seuls les admins voient et gèrent les profils admin
CREATE POLICY "admin_manage_admin_profiles"
  ON public.admin_profiles
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Un admin peut lire son propre profil
CREATE POLICY "admin_read_own_profile"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- --------------------------------------------------------------------------
-- 14. TRIGGER : mise à jour automatique de updated_at
-- --------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_resellers_updated_at ON public.resellers;
CREATE TRIGGER trg_resellers_updated_at
  BEFORE UPDATE ON public.resellers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_commissions_updated_at ON public.commissions;
CREATE TRIGGER trg_commissions_updated_at
  BEFORE UPDATE ON public.commissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- --------------------------------------------------------------------------
-- 15. COMMENTAIRES DE DOCUMENTATION
-- --------------------------------------------------------------------------
COMMENT ON FUNCTION public.is_admin() IS
  'Retourne true si le JWT courant appartient au rôle service_role ou si app_metadata.role = admin';

COMMENT ON FUNCTION public.get_my_reseller_id() IS
  'Retourne le UUID du revendeur lié à l''utilisateur Supabase authentifié (via resellers.user_id)';

COMMENT ON FUNCTION public.is_active_reseller() IS
  'Retourne true si l''utilisateur connecté est un revendeur avec statut Actif ou active';

COMMENT ON TABLE public.admin_profiles IS
  'Profils des administrateurs Culture Streetwear Co. Liés à auth.users via user_id';

-- ==========================================================================
-- FIN DE LA MIGRATION TÂCHE 03
-- ==========================================================================
