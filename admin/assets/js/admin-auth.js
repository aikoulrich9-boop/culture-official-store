/**
 * CULTURE Streetwear Co. - Administration
 * Module: Authentification & Contrôle d'Accès Administrateur (RBAC Strict)
 * PHASE 1 Security Hardening:
 * - Authentification exclusivement via Supabase Auth (aucun fallback local)
 * - Vérification stricte du privilège via app_metadata.role ('admin' | 'ROLE_ADMIN')
 * - Aucune confiance accordée à l'adresse email seule ni à user_metadata
 * - Protection brute-force (rate limiting sur les tentatives de connexion)
 * - Journalisation sécurisée des événements sensibles sans fuite de secrets
 */

(function(window) {
    'use strict';

    const SESSION_KEY = 'culture_admin_session';
    const RATE_LIMIT_KEY = 'culture_admin_login_attempts_v1';
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
    const FORBIDDEN_WEAK_PASSWORDS = new Set(['admin123', 'password', '123456', '12345678', 'admin']);

    // Mémoire interne en complément de sessionStorage pour résister au nettoyage partiel
    const memoryRateLimitMap = new Map();

    /**
     * Vérifie si un objet utilisateur Supabase possède un rôle administrateur légitime
     * défini côté serveur dans app_metadata.role.
     * IMPORTANT: Ne jamais faire confiance à user_metadata ni à l'adresse email.
     */
    function hasServerAdminRole(supabaseUser) {
        if (!supabaseUser || typeof supabaseUser !== 'object') return false;
        const appMeta = supabaseUser.app_metadata;
        if (!appMeta || typeof appMeta !== 'object') return false;
        const appRole = String(appMeta.role || '').trim();
        return appRole === 'admin' || appRole === 'ROLE_ADMIN';
    }

    /**
     * Masque et nettoie tout secret potentiel avant journalisation
     */
    function sanitizeAuditMetadata(details = {}) {
        if (!details || typeof details !== 'object') return {};
        const clean = {};
        const forbiddenKeyPattern = /password|pwd|secret|token|jwt|apikey|api_key|service_role|authorization|pin/i;
        for (const [k, v] of Object.entries(details)) {
            if (forbiddenKeyPattern.test(k)) {
                clean[k] = '[REDACTED]';
            } else if (typeof v === 'string' && (v.startsWith('eyJ') || v.startsWith('sbp_') || v.startsWith('sb_secret_'))) {
                clean[k] = '[REDACTED_TOKEN]';
            } else {
                clean[k] = v;
            }
        }
        return clean;
    }

    const AdminAuth = {
        SESSION_KEY,
        MAX_LOGIN_ATTEMPTS,
        LOCKOUT_DURATION_MS,

        /**
         * Récupère la session en cache uniquement si elle provient de Supabase Auth,
         * que le rôle app_metadata a été vérifié et qu'elle n'est pas expirée.
         * NOTE: Cette lecture synchrone sert à l'affichage UI ; toute opération
         * sensible ou initialisation passe par refreshSession() / Supabase Auth.
         */
        getCurrentSession() {
            try {
                if (typeof localStorage === 'undefined') return null;
                const raw = localStorage.getItem(SESSION_KEY);
                if (!raw) return null;
                const session = JSON.parse(raw);

                if (!session || typeof session !== 'object') {
                    localStorage.removeItem(SESSION_KEY);
                    return null;
                }

                // Rejeter toute session locale ou dépourvue de preuve Supabase Auth
                if (session.provider !== 'supabase_auth' || session.appRoleVerified !== true) {
                    localStorage.removeItem(SESSION_KEY);
                    return null;
                }

                if (session.role !== 'ROLE_ADMIN' && session.role !== 'admin') {
                    localStorage.removeItem(SESSION_KEY);
                    return null;
                }

                if (!session.expiresAt || Date.now() > Number(session.expiresAt)) {
                    localStorage.removeItem(SESSION_KEY);
                    return null;
                }

                return session;
            } catch (err) {
                try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
                return null;
            }
        },

        /**
         * Alias de compatibilité
         */
        getSession() {
            return this.getCurrentSession();
        },

        /**
         * Vérifie de manière synchrone si une session Supabase Auth valide est présente
         */
        isAuthenticated() {
            const session = this.getCurrentSession();
            return Boolean(
                session &&
                session.provider === 'supabase_auth' &&
                session.appRoleVerified === true &&
                (session.role === 'ROLE_ADMIN' || session.role === 'admin')
            );
        },

        /**
         * Vérifie de manière asynchrone auprès de Supabase Auth que la session
         * et le rôle app_metadata.role sont toujours valides côté serveur.
         */
        async isAuthenticatedAsync() {
            const refreshed = await this.refreshSession();
            return Boolean(refreshed);
        },

        /**
         * Vérifie le rate-limiting de connexion pour prévenir le brute-force
         */
        checkLoginRateLimit(email) {
            const key = String(email || 'global').trim().toLowerCase() || 'global';
            const now = Date.now();
            let record = memoryRateLimitMap.get(key);

            try {
                if (!record && typeof sessionStorage !== 'undefined') {
                    const stored = JSON.parse(sessionStorage.getItem(RATE_LIMIT_KEY) || '{}');
                    if (stored[key]) record = stored[key];
                }
            } catch (e) {}

            if (!record) {
                return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS, retryAfterSeconds: 0 };
            }

            if (now - record.firstAttemptAt > LOCKOUT_DURATION_MS) {
                memoryRateLimitMap.delete(key);
                this._persistRateLimitRecord(key, null);
                return { allowed: true, remainingAttempts: MAX_LOGIN_ATTEMPTS, retryAfterSeconds: 0 };
            }

            if (record.count >= MAX_LOGIN_ATTEMPTS) {
                const retryAfterMs = Math.max(0, (record.firstAttemptAt + LOCKOUT_DURATION_MS) - now);
                return {
                    allowed: false,
                    remainingAttempts: 0,
                    retryAfterSeconds: Math.ceil(retryAfterMs / 1000)
                };
            }

            return {
                allowed: true,
                remainingAttempts: Math.max(0, MAX_LOGIN_ATTEMPTS - record.count),
                retryAfterSeconds: 0
            };
        },

        recordFailedLoginAttempt(email) {
            const key = String(email || 'global').trim().toLowerCase() || 'global';
            const now = Date.now();
            let record = memoryRateLimitMap.get(key);

            if (!record || (now - record.firstAttemptAt > LOCKOUT_DURATION_MS)) {
                record = { count: 1, firstAttemptAt: now, lastAttemptAt: now };
            } else {
                record.count += 1;
                record.lastAttemptAt = now;
            }

            memoryRateLimitMap.set(key, record);
            this._persistRateLimitRecord(key, record);
            return record;
        },

        clearLoginAttempts(email) {
            const key = String(email || 'global').trim().toLowerCase() || 'global';
            memoryRateLimitMap.delete(key);
            this._persistRateLimitRecord(key, null);
        },

        resetRateLimitForTesting() {
            memoryRateLimitMap.clear();
            try {
                if (typeof sessionStorage !== 'undefined') {
                    sessionStorage.removeItem(RATE_LIMIT_KEY);
                }
            } catch (e) {}
        },

        _persistRateLimitRecord(key, record) {
            try {
                if (typeof sessionStorage === 'undefined') return;
                const stored = JSON.parse(sessionStorage.getItem(RATE_LIMIT_KEY) || '{}');
                if (record === null) {
                    delete stored[key];
                } else {
                    stored[key] = record;
                }
                sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(stored));
            } catch (e) {}
        },

        /**
         * Journalise un événement de sécurité sans exposer de données secrètes
         */
        async _logSecurityEvent(action, details = {}, actorEmail = 'anonymous') {
            const safeDetails = sanitizeAuditMetadata(details);
            try {
                if (window.SupabaseService && typeof window.SupabaseService.logAuditEvent === 'function') {
                    await window.SupabaseService.logAuditEvent(
                        action,
                        'ADMIN_AUTH',
                        String(actorEmail || 'anonymous'),
                        safeDetails
                    );
                }
            } catch (e) {
                // Ne pas bloquer le flux d'authentification si la journalisation échoue
            }
        },

        /**
         * Connexion Administrateur — Exclusivement via Supabase Auth.
         * Aucun fallback local, aucun mot de passe par défaut, vérification stricte de app_metadata.role.
         */
        async login(email, password) {
            const cleanEmail = String(email || '').trim().toLowerCase();
            const rawPassword = String(password || '');

            if (!cleanEmail || !rawPassword) {
                throw new Error('Veuillez saisir votre adresse email et votre mot de passe.');
            }

            // 1. Vérification Brute-Force / Rate Limiting
            const rateCheck = this.checkLoginRateLimit(cleanEmail);
            if (!rateCheck.allowed) {
                await this._logSecurityEvent('ADMIN_LOGIN_RATE_LIMITED', {
                    email: cleanEmail,
                    retryAfterSeconds: rateCheck.retryAfterSeconds
                }, cleanEmail);
                throw new Error(`Trop de tentatives échouées. Réessayez dans ${Math.ceil(rateCheck.retryAfterSeconds / 60)} minute(s).`);
            }

            // 2. Rejet immédiat des mots de passe faibles ou par défaut historiques (ex: admin123)
            if (FORBIDDEN_WEAK_PASSWORDS.has(rawPassword.trim().toLowerCase())) {
                this.recordFailedLoginAttempt(cleanEmail);
                await this._logSecurityEvent('ADMIN_LOGIN_FAILED', {
                    email: cleanEmail,
                    reason: 'FORBIDDEN_DEFAULT_OR_WEAK_PASSWORD'
                }, cleanEmail);
                throw new Error('Identifiants administrateur invalides.');
            }

            // 3. Vérifier la disponibilité réelle de Supabase Auth (aucun contournement local autorisé)
            if (!window.SupabaseService || !window.SupabaseService.isConfigured()) {
                await this._logSecurityEvent('ADMIN_LOGIN_UNAVAILABLE', {
                    email: cleanEmail,
                    reason: 'SUPABASE_NOT_CONFIGURED'
                }, cleanEmail);
                throw new Error('Service d\'authentification Supabase indisponible. Connexion refusée.');
            }

            const client = window.SupabaseService.getClient();
            if (!client || !client.auth || typeof client.auth.signInWithPassword !== 'function') {
                await this._logSecurityEvent('ADMIN_LOGIN_UNAVAILABLE', {
                    email: cleanEmail,
                    reason: 'SUPABASE_AUTH_CLIENT_MISSING'
                }, cleanEmail);
                throw new Error('Client Supabase Auth indisponible. Connexion refusée.');
            }

            // 4. Authentification auprès de Supabase Auth
            let authData = null;
            let authError = null;
            try {
                const response = await client.auth.signInWithPassword({
                    email: cleanEmail,
                    password: rawPassword
                });
                authData = response?.data || null;
                authError = response?.error || null;
            } catch (networkErr) {
                this.recordFailedLoginAttempt(cleanEmail);
                await this._logSecurityEvent('ADMIN_LOGIN_UNAVAILABLE', {
                    email: cleanEmail,
                    reason: 'SUPABASE_NETWORK_FAILURE'
                }, cleanEmail);
                throw new Error('Impossible de joindre le serveur d\'authentification Supabase. Connexion refusée.');
            }

            if (authError || !authData || !authData.user || !authData.session) {
                this.recordFailedLoginAttempt(cleanEmail);
                await this._logSecurityEvent('ADMIN_LOGIN_FAILED', {
                    email: cleanEmail,
                    reason: authError?.message || 'INVALID_CREDENTIALS'
                }, cleanEmail);
                throw new Error('Identifiants administrateur invalides.');
            }

            // 5. Vérification stricte du rôle administrateur à partir de app_metadata.role uniquement
            if (!hasServerAdminRole(authData.user)) {
                this.recordFailedLoginAttempt(cleanEmail);
                try { await client.auth.signOut(); } catch (e) {}
                await this._logSecurityEvent('ADMIN_ACCESS_DENIED_ROLE', {
                    userId: authData.user.id,
                    email: authData.user.email,
                    reason: 'MISSING_APP_METADATA_ADMIN_ROLE'
                }, authData.user.email || cleanEmail);
                throw new Error('Accès refusé (403) : ce compte ne dispose pas des privilèges administrateur requis.');
            }

            // 6. Réinitialiser le compteur d'échecs et construire l'état de session vérifié
            this.clearLoginAttempts(cleanEmail);

            const expiresAtMs = authData.session.expires_at
                ? authData.session.expires_at * 1000
                : (Date.now() + 3600 * 1000);

            const sessionPayload = {
                userId: authData.user.id,
                email: authData.user.email,
                name: authData.user.user_metadata?.name || 'Administrateur',
                role: 'ROLE_ADMIN',
                appRoleVerified: true,
                loginAt: new Date().toISOString(),
                expiresAt: expiresAtMs,
                provider: 'supabase_auth'
            };

            this._saveSession(sessionPayload, authData.user);

            // Mise à jour optionnelle de last_login dans admin_profiles
            try {
                await client.from('admin_profiles').upsert({
                    user_id: authData.user.id,
                    name: sessionPayload.name,
                    email: authData.user.email,
                    last_login: new Date().toISOString()
                }, { onConflict: 'user_id' });
            } catch (e) {
                // Non bloquant
            }

            await this._logSecurityEvent('ADMIN_LOGIN_SUCCESS', {
                userId: authData.user.id,
                email: authData.user.email,
                provider: 'supabase_auth'
            }, authData.user.email);

            return {
                success: true,
                session: sessionPayload
            };
        },

        /**
         * Vérifie et rafraîchit la session active auprès de Supabase Auth.
         * Si Supabase est indisponible, si la session est expirée ou si app_metadata.role
         * n'est pas admin, l'utilisateur est immédiatement déconnecté.
         */
        async refreshSession() {
            if (!window.SupabaseService || !window.SupabaseService.isConfigured()) {
                await this.logout('SUPABASE_UNAVAILABLE');
                return null;
            }

            const client = window.SupabaseService.getClient();
            if (!client || !client.auth) {
                await this.logout('SUPABASE_CLIENT_MISSING');
                return null;
            }

            try {
                const { data: sessionData, error: sessionError } = await client.auth.getSession();
                if (sessionError || !sessionData || !sessionData.session) {
                    await this.logout('NO_ACTIVE_SUPABASE_SESSION');
                    return null;
                }

                const activeSession = sessionData.session;
                const expiresAtMs = activeSession.expires_at ? activeSession.expires_at * 1000 : 0;
                if (expiresAtMs && Date.now() > expiresAtMs) {
                    await this._logSecurityEvent('ADMIN_SESSION_EXPIRED', {
                        userId: activeSession.user?.id
                    }, activeSession.user?.email || 'unknown');
                    await this.logout('SESSION_EXPIRED');
                    return null;
                }

                // Vérifier l'utilisateur directement auprès de Supabase Auth si getUser est disponible
                let verifiedUser = activeSession.user;
                if (typeof client.auth.getUser === 'function') {
                    const { data: userData, error: userError } = await client.auth.getUser();
                    if (userError || !userData || !userData.user) {
                        await this.logout('USER_VERIFICATION_FAILED');
                        return null;
                    }
                    verifiedUser = userData.user;
                }

                if (!hasServerAdminRole(verifiedUser)) {
                    await this._logSecurityEvent('ADMIN_ACCESS_DENIED_ROLE', {
                        userId: verifiedUser?.id,
                        email: verifiedUser?.email,
                        reason: 'SESSION_REFRESH_ROLE_CHECK_FAILED'
                    }, verifiedUser?.email || 'unknown');
                    await this.logout('INVALID_ADMIN_ROLE');
                    return null;
                }

                const refreshedPayload = {
                    userId: verifiedUser.id,
                    email: verifiedUser.email,
                    name: verifiedUser.user_metadata?.name || 'Administrateur',
                    role: 'ROLE_ADMIN',
                    appRoleVerified: true,
                    loginAt: new Date().toISOString(),
                    expiresAt: expiresAtMs || (Date.now() + 3600 * 1000),
                    provider: 'supabase_auth'
                };

                this._saveSession(refreshedPayload, verifiedUser);
                return refreshedPayload;
            } catch (err) {
                await this.logout('SESSION_REFRESH_ERROR');
                return null;
            }
        },

        /**
         * Vérifie l'autorisation serveur avant une opération administrative sensible
         */
        async verifyServerAuthorization() {
            const session = await this.refreshSession();
            if (!session) {
                await this._logSecurityEvent('ADMIN_UNAUTHORIZED_ACTION_BLOCKED', {
                    reason: 'INVALID_OR_EXPIRED_SESSION'
                });
                throw new Error('401 UNAUTHORIZED: Session administrateur expirée ou invalide.');
            }
            return session;
        },

        /**
         * Initialise l'écouteur d'état Supabase Auth et vérifie la session courante
         */
        async init() {
            const verifiedSession = await this.refreshSession();

            if (window.SupabaseService && window.SupabaseService.isConfigured()) {
                const client = window.SupabaseService.getClient();
                if (client && client.auth && typeof client.auth.onAuthStateChange === 'function') {
                    client.auth.onAuthStateChange((event, session) => {
                        if (event === 'SIGNED_OUT' || !session) {
                            try {
                                localStorage.removeItem(SESSION_KEY);
                                if (window.AuthService) {
                                    localStorage.removeItem(window.AuthService.SESSION_KEY);
                                }
                            } catch (e) {}
                        } else if (event === 'TOKEN_REFRESHED' && session.user) {
                            if (hasServerAdminRole(session.user)) {
                                const updated = {
                                    userId: session.user.id,
                                    email: session.user.email,
                                    name: session.user.user_metadata?.name || 'Administrateur',
                                    role: 'ROLE_ADMIN',
                                    appRoleVerified: true,
                                    loginAt: new Date().toISOString(),
                                    expiresAt: session.expires_at ? session.expires_at * 1000 : (Date.now() + 3600 * 1000),
                                    provider: 'supabase_auth'
                                };
                                this._saveSession(updated, session.user);
                            } else {
                                this.logout('ROLE_REVOKED');
                            }
                        }
                    });
                }
            }

            return verifiedSession;
        },

        /**
         * Déconnexion complète (Supabase Auth + nettoyage des caches de session)
         */
        async logout(reason = 'USER_LOGOUT') {
            const current = this.getCurrentSession();
            if (current && reason === 'USER_LOGOUT') {
                await this._logSecurityEvent('ADMIN_LOGOUT', {
                    userId: current.userId,
                    email: current.email,
                    reason
                }, current.email);
            }

            try {
                if (window.SupabaseService && window.SupabaseService.isConfigured()) {
                    const client = window.SupabaseService.getClient();
                    if (client && client.auth && typeof client.auth.signOut === 'function') {
                        await client.auth.signOut();
                    }
                }
            } catch (e) {}

            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem(SESSION_KEY);
                    if (window.AuthService) {
                        localStorage.removeItem(window.AuthService.SESSION_KEY);
                    }
                }
            } catch (e) {}
        },

        /**
         * Mise à jour du mot de passe administrateur via Supabase Auth uniquement
         */
        async updatePassword(newPassword) {
            const cleanPwd = String(newPassword || '');
            if (cleanPwd.length < 8) {
                throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères.');
            }
            if (FORBIDDEN_WEAK_PASSWORDS.has(cleanPwd.trim().toLowerCase())) {
                throw new Error('Ce mot de passe est interdit pour des raisons de sécurité.');
            }

            const session = await this.verifyServerAuthorization();

            const client = window.SupabaseService.getClient();
            const { error } = await client.auth.updateUser({ password: cleanPwd });
            if (error) {
                throw new Error(error.message || 'Échec de la mise à jour du mot de passe sur Supabase.');
            }

            await this._logSecurityEvent('ADMIN_PASSWORD_UPDATED', {
                userId: session.userId,
                email: session.email
            }, session.email);

            return true;
        },

        /**
         * Enregistre les métadonnées non sensibles de la session vérifiée
         * (Note: Aucun jeton d'accès brut n'est dupliqué dans culture_admin_session)
         */
        _saveSession(sessionPayload, supabaseUser = null) {
            try {
                if (typeof localStorage === 'undefined') return;
                localStorage.setItem(SESSION_KEY, JSON.stringify(sessionPayload));

                if (window.AuthService) {
                    localStorage.setItem(window.AuthService.SESSION_KEY, JSON.stringify({
                        role: 'ROLE_ADMIN',
                        provider: 'supabase_auth',
                        appRoleVerified: true,
                        user: {
                            id: sessionPayload.userId,
                            email: sessionPayload.email,
                            name: sessionPayload.name,
                            app_metadata: supabaseUser?.app_metadata || { role: 'admin' }
                        },
                        expiresAt: sessionPayload.expiresAt
                    }));
                }
            } catch (e) {}
        },

        getAuthHeader() {
            const s = this.getCurrentSession();
            return s ? { 'X-Admin-User': s.email, 'X-Admin-Provider': 'supabase_auth' } : {};
        }
    };

    window.AdminAuth = AdminAuth;

})(window);
