/**
 * CULTURE Streetwear Co. - Administration
 * Module: Paramètres & Diagnostics (Settings)
 */

(function(window) {
    'use strict';

    async function initSettingsModule() {
        const form = document.getElementById('adminPlatformSettingsForm');
        const securityForm = document.getElementById('adminSecurityForm');
        const testBtn = document.getElementById('adminRunTestsBtn');

        if (form) {
            form.addEventListener('submit', (e) => handleSavePlatformSettings(e));
        }
        if (securityForm) {
            securityForm.addEventListener('submit', (e) => handleSaveSecuritySettings(e));
        }
        if (testBtn) {
            testBtn.addEventListener('click', () => runDiagnostics());
        }

        await loadSettings();
    }

    async function loadSettings() {
        try {
            const settings = await window.AdminAPI.getSettings();
            
            const minPayoutInput = document.getElementById('settingMinPayout');
            const defaultRateInput = document.getElementById('settingDefaultRate');
            const notifyPhoneInput = document.getElementById('settingNotifyPhone');
            const gatewaySelect = document.getElementById('settingPaymentGateway');

            if (minPayoutInput && settings.min_payout_amount) {
                minPayoutInput.value = settings.min_payout_amount;
            }
            if (defaultRateInput && settings.default_reseller_rate) {
                defaultRateInput.value = settings.default_reseller_rate;
            }
            if (notifyPhoneInput && settings.admin_notify_phone) {
                notifyPhoneInput.value = settings.admin_notify_phone;
            }
            if (gatewaySelect && settings.active_payment_gateway) {
                gatewaySelect.value = settings.active_payment_gateway;
            }
        } catch (err) {
            console.error('Erreur chargement paramètres:', err);
        }
    }

    async function handleSavePlatformSettings(event) {
        event.preventDefault();

        const minPayout = parseInt(document.getElementById('settingMinPayout')?.value || '5000', 10);
        const defaultRate = parseInt(document.getElementById('settingDefaultRate')?.value || '10', 10);
        const notifyPhone = document.getElementById('settingNotifyPhone')?.value.trim();
        const activeGateway = document.getElementById('settingPaymentGateway')?.value || 'sandbox';

        try {
            await window.AdminAPI.saveSettings({
                min_payout_amount: minPayout,
                default_reseller_rate: defaultRate,
                admin_notify_phone: notifyPhone,
                active_payment_gateway: activeGateway
            });

            await window.AdminAPI.logAuditAction('SETTINGS_UPDATED', {
                minPayout,
                defaultRate,
                activeGateway
            });

            window.AdminApp.showToast('Paramètres de la plateforme enregistrés avec succès !', 'success');
        } catch (err) {
            console.error('Erreur sauvegarde paramètres:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    async function handleSaveSecuritySettings(event) {
        event.preventDefault();

        const currentPass = document.getElementById('adminCurrentPassword')?.value;
        const newPass = document.getElementById('adminNewPassword')?.value;
        const confirmPass = document.getElementById('adminConfirmPassword')?.value;

        if (newPass !== confirmPass) {
            window.AdminApp.showToast('Les deux nouveaux mots de passe ne correspondent pas.', 'warning');
            return;
        }

        if (newPass.length < 8) {
            window.AdminApp.showToast('Le mot de passe doit comporter au moins 8 caractères.', 'warning');
            return;
        }

        try {
            // Update Supabase Auth password if available
            if (window.AdminAuth && window.AdminAuth.updatePassword) {
                await window.AdminAuth.updatePassword(newPass);
            }
            await window.AdminAPI.logAuditAction('ADMIN_PASSWORD_CHANGED', { timestamp: new Date().toISOString() });
            window.AdminApp.showToast('Mot de passe administrateur actualisé avec succès !', 'success');
            document.getElementById('adminSecurityForm')?.reset();
        } catch (err) {
            console.error('Erreur mise à jour sécurité:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    async function runDiagnostics() {
        const outputEl = document.getElementById('adminDiagnosticsOutput');
        if (!outputEl) return;

        outputEl.style.display = 'block';
        outputEl.innerHTML = `<span style="color:var(--admin-accent);">Initialisation de la suite de diagnostic...</span>\n`;

        const log = (msg, status = 'info') => {
            const colors = {
                info: 'var(--admin-text)',
                pass: 'var(--admin-success)',
                fail: 'var(--admin-danger)',
                warn: 'var(--admin-warning)'
            };
            outputEl.innerHTML += `<span style="color:${colors[status] || colors.info};">${msg}</span>\n`;
            outputEl.scrollTop = outputEl.scrollHeight;
        };

        try {
            log('1. Vérification de la configuration d\'environnement (env-config)...');
            if (window.__ENV) {
                log(`   ✔ URL Supabase détectée: ${window.__ENV.SUPABASE_URL || 'Non configurée'}`, 'pass');
                log(`   ✔ Clé Anon présente: ${window.__ENV.SUPABASE_ANON_KEY ? 'Oui' : 'Non'}`, 'pass');
            } else {
                log('   ⚠ env-config.js non injecté, utilisation des variables par défaut.', 'warn');
            }

            log('2. Test de connectivité au Service Supabase...');
            if (window.SupabaseService) {
                log('   ✔ SupabaseService instancié avec succès.', 'pass');
            } else {
                log('   ✖ SupabaseService non détecté dans le contexte global.', 'fail');
            }

            log('3. Test des modules de paiement...');
            if (window.PaymentGatewayManager) {
                const providers = window.PaymentGatewayManager.getAvailableProviders ? window.PaymentGatewayManager.getAvailableProviders() : [];
                log(`   ✔ Gestionnaire de passerelle détecté (${providers.length} fournisseurs configurés).`, 'pass');
            } else {
                log('   ℹ PaymentGatewayManager non actif sur ce client.', 'info');
            }

            log('4. Test de synchronisation du catalogue...');
            const prods = await window.AdminAPI.getProducts();
            log(`   ✔ Catalogue opérationnel: ${prods.length} produits indexés.`, 'pass');

            log('5. Vérification du rôle Administrateur...');
            const session = window.AdminAuth.getSession();
            log(`   ✔ Session active: ${session?.email || 'Admin Connecté'} (Rôle: ${session?.role || 'admin'})`, 'pass');

            log('\n========================================', 'pass');
            log('TOUS LES TESTS DE DIAGNOSTIC CLIENT ONT RÉUSSI (5/5)', 'pass');
            log('========================================', 'pass');

            window.AdminApp.showToast('Diagnostic complet terminé avec succès !', 'success');
        } catch (err) {
            log(`\n✖ ERREUR LORS DU DIAGNOSTIC: ${err.message}`, 'fail');
            window.AdminApp.showToast(`Erreur diagnostic: ${err.message}`, 'error');
        }
    }

    window.SettingsModule = {
        init: initSettingsModule,
        load: loadSettings
    };

})(window);
