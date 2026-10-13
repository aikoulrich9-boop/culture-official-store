-- ==========================================================================
-- SUITE DE TESTS SQL POUR LES CONTRAINTES D'UNICITÉ ET D'INTÉGRITÉ
-- ==========================================================================

DO $$
BEGIN
    RAISE NOTICE '🧪 DÉMARRAGE DES TESTS DE CONTRAINTES SQL...';

    -- ----------------------------------------------------------------------
    -- TEST 1: CONTRAINTE D'UNICITÉ DU CODE REVENDEUR (UNIQUE referral_code)
    -- ----------------------------------------------------------------------
    BEGIN
        INSERT INTO public.resellers (name, phone, email, referral_code)
        VALUES ('Test Duplicate Code', '+229 00 00 00 00', 'dup1@test.com', 'DUPLICATE_CODE_01');

        -- Deuxième insertion avec le MEME code revendeur
        INSERT INTO public.resellers (name, phone, email, referral_code)
        VALUES ('Test Duplicate Code 2', '+229 00 00 00 01', 'dup2@test.com', 'DUPLICATE_CODE_01');

        RAISE EXCEPTION '❌ ECHEC TEST 1: Le doublon de code revendeur aurait dû être rejeté par la contrainte UNIQUE !';
    EXCEPTION WHEN unique_violation THEN
        RAISE NOTICE '✅ TEST 1 RÉUSSI: Rejet conforme du doublon de code revendeur par la contrainte UNIQUE(referral_code).';
    END;

    -- ----------------------------------------------------------------------
    -- TEST 2: CONTRAINTE D'UNICITÉ DU RETRAIT (UNIQUE commission_id dans payout_items)
    -- ----------------------------------------------------------------------
    BEGIN
        -- Insérer une commission de test
        INSERT INTO public.commissions (id, order_id, reseller_id, referral_code, rate, amount, status)
        VALUES ('99999999-9999-9999-9999-999999999999', 'CMD-CONSTRAINT-01', 'res-test', 'TESTCODE', 10.0, 5000, 'AVAILABLE');

        -- Insérer une demande de payout de test
        INSERT INTO public.payout_requests (id, reseller_id, referral_code, amount, payment_method, payment_account, account_name)
        VALUES ('PAYOUT-CONSTRAINT-01', 'res-test', 'TESTCODE', 5000, 'Wave', '+22997000000', 'Test User');

        -- Premier rattachement de la commission au payout
        INSERT INTO public.payout_items (payout_request_id, commission_id, amount)
        VALUES ('PAYOUT-CONSTRAINT-01', '99999999-9999-9999-9999-999999999999', 5000);

        -- Deuxième rattachement DE LA MÊME COMMISSION (doit échouer !)
        INSERT INTO public.payout_items (payout_request_id, commission_id, amount)
        VALUES ('PAYOUT-CONSTRAINT-01', '99999999-9999-9999-9999-999999999999', 5000);

        RAISE EXCEPTION '❌ ECHEC TEST 2: La commission a pu être rattachée à deux payouts différents !';
    EXCEPTION WHEN unique_violation THEN
        RAISE NOTICE '✅ TEST 2 RÉUSSI: Rejet conforme du double-payout sur la même commission par la contrainte UNIQUE(commission_id).';
    END;

    RAISE NOTICE '🎉 TOUS LES TESTS DE CONTRAINTES SQL ONT ÉTÉ EXÉCUTÉS AVEC SUCCÈS !';
END $$;
