-- ==========================================================================
-- DEMO / TEST SEEDS ONLY - NE PAS EXÉCUTER EN PRODUCTION
-- Données de démonstration pour Revendeurs, Commandes, Commissions et Payouts
-- ==========================================================================

-- 1. SEEDS REVENDEURS DÉMO
INSERT INTO public.resellers (id, name, phone, email, referral_code, commission_rate, status, country, payout_method, payout_account, payout_name)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Marie Koffi', '+229 97 00 11 22', 'marie.test@culture.store', 'MARIE01', 10.0, 'Actif', 'Bénin', 'MTN Mobile Money', '+229 97 00 11 22', 'Marie Koffi'),
  ('22222222-2222-2222-2222-222222222222', 'Koffi Mensah', '+225 07 11 22 33', 'koffi.test@culture.store', 'KOFFI02', 12.0, 'Actif', 'Côte d''Ivoire', 'Wave', '+225 07 11 22 33', 'Koffi Mensah')
ON CONFLICT (email) DO NOTHING;

-- 2. SEEDS COMMANDES TEST AVEC SNAPSHOT REVENDEUR
INSERT INTO public.orders (id, customer_name, customer_phone, customer_email, country, city, address, payment_method, payment_status, order_status, total_amount, reseller_id, referral_code, commission_rate, commission_amount)
VALUES 
  ('CMD-SEED-01', 'Jean Dupont', '+229 96 11 22 33', 'jean@example.com', 'Bénin', 'Cotonou', 'Haie Vive', 'Mobile Money', 'SUCCESS', 'Livrée', 30000, '11111111-1111-1111-1111-111111111111', 'MARIE01', 10.0, 3000),
  ('CMD-SEED-02', 'Awa Traoré', '+225 05 44 55 66', 'awa@example.com', 'Côte d''Ivoire', 'Abidjan', 'Cocody', 'Wave', 'SUCCESS', 'Livrée', 50000, '22222222-2222-2222-2222-222222222222', 'KOFFI02', 12.0, 6000)
ON CONFLICT (id) DO NOTHING;

-- 3. SEEDS COMMISSIONS DÉMO
INSERT INTO public.commissions (id, order_id, reseller_id, referral_code, rate, amount, status)
VALUES 
  ('a1b2c3d4-0001-0000-0000-000000000001', 'CMD-SEED-01', '11111111-1111-1111-1111-111111111111', 'MARIE01', 10.0, 3000, 'AVAILABLE'),
  ('a1b2c3d4-0002-0000-0000-000000000002', 'CMD-SEED-02', '22222222-2222-2222-2222-222222222222', 'KOFFI02', 12.0, 6000, 'AVAILABLE')
ON CONFLICT (id) DO NOTHING;

-- 4. SEEDS PARAMÈTRES PLATEFORME
INSERT INTO public.settings (key, value)
VALUES 
  ('min_payout_amount', '10000'::jsonb),
  ('admin_pin', '"1234"'::jsonb),
  ('weekly_payout_day', '"VENDREDI"'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
