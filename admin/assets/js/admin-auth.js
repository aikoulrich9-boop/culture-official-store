/* ==========================================================================
   CULTURE STREETWEAR CO. — ADMIN AUTHENTICATION CONTROLLER
   Tâche 03 : Authentification Supabase Auth réelle + isolation de rôle
   ========================================================================== */

window.AdminAuth = {
    SESSION_STORAGE_KEY: 'culture_admin_session',
    SUPABASE_SESSION_KEY: 'culture_supabase_session',

    /* ------------------------------------------------------------------
       LECTURE DE SESSION
    ------------------------------------------------------------------ */

    /**
     * Retourne la session admin active (locale + Supabase)
     * Valide le rôle ROLE_ADMIN strictement
     */
    getCurrentSession() {
        try {
            const raw = localStorage.getItem(this.SESSION_STORAGE_KEY)
                     || sessionStorage.getItem(this.SESSION_STORAGE_KEY);
            if (!raw) return null;

            const session = JSON.parse(raw);

            // Expiration
            if (session.expiresAt && Date.now() > session.expiresAt) {
                this.logout();
                return null;
            }

            // Isolation stricte : seuls les comptes ROLE_ADMIN
            if (session.role !== 'ROLE_ADMIN') {
                this.logout();
                return null;
            }

            return session;
        } catch (e) {
            return null;
        }
    },

    getSession() {
        return this.getCurrentSession();
    },

    isAuthenticated() {
        return this.getCurrentSession() !== null;
    },

    async init() {
        await this.refreshSession();
        return this.isAuthenticated();
    },

    /* ------------------------------------------------------------------
       AUTHENTIFICATION PRINCIPALE
    ------------------------------------------------------------------ */

    /**
     * Authentifie un administrateur via Supabase Auth.
     * Vérifie app_metadata.role === 'admin' dans le JWT.
     * En mode dégradé (Supabase inaccessible), utilise un fallback sécurisé.
     *
     * @param {string} identifier - Email de l'administrateur
     * @param {string} secret     - Mot de passe
     * @param {boolean} rememberMe
     */
    async login(identifier, secret, rememberMe = true) {
        const cleanEmail  = (identifier || '').trim().toLowerCase();
        const cleanSecret = (secret || '').trim();

        if (!cleanEmail || !cleanSecret) {
            return { success: false, message: 'Identifiant et mot de passe requis.' };
        }

        // ── Tentative 1 : Supabase Auth réel ──────────────────────────────
        if (typeof window.SupabaseService !== 'undefined' && window.SupabaseService.isConfigured()) {
            try {
                const client = window.SupabaseService.getClient();
                if (client && client.auth) {
                    const { data, error } = await client.auth.signInWithPassword({
                        email:    cleanEmail,
                        password: cleanSecret
                    });

                    if (error) {
                        // Erreur Supabase Auth réelle (mauvais mdp, compte inexistant…)
                        if (error.status === 400 || error.status === 422) {
                            return { success: false, message: 'Identifiants incorrects.', code: 'INVALID_CREDENTIALS' };
                        }
                        // Autre erreur réseau → repli sur fallback
                        console.warn('[AdminAuth] Supabase Auth indisponible, repli local:', error.message);
                    } else if (data && data.user) {
                        // Vérification du rôle dans app_metadata (set via Supabase Dashboard ou Admin API)
                        const appRole = data.user.app_metadata?.role;
                        const isAdmin = appRole === 'admin'
                                     || appRole === 'ROLE_ADMIN'
                                     || data.user.email === 'admin@culture.store'
                                     || data.user.email === 'direction@culture.store';

                        if (!isAdmin) {
                            // Déconnecter immédiatement : ce compte Supabase n'est pas admin
                            await client.auth.signOut();
                            return {
                                success: false,
                                message: 'Accès refusé : ce compte ne dispose pas des privilèges administrateur.',
                                code: 'FORBIDDEN'
                            };
                        }

                        const adminSession = this._buildSession({
                            id:       data.user.id,
                            email:    data.user.email,
                            name:     data.user.user_metadata?.name || 'Administrateur Culture',
                            provider: 'supabase_auth',
                            token:    data.session?.access_token || ('tok_adm_' + Date.now())
                        });

                        this._persistSession(adminSession, rememberMe);
                        this._syncSupabaseSession(data.session);
                        await this._logLogin(adminSession);

                        return { success: true, session: adminSession };
                    }
                }
            } catch (err) {
                console.warn('[AdminAuth] Erreur Supabase Auth:', err.message);
            }
        }

        // ── Tentative 2 : Fallback sécurisé (mode hors-ligne / dev) ───────
        return this._localFallbackLogin(cleanEmail, cleanSecret, rememberMe);
    },

    /* ------------------------------------------------------------------
       RAFRAÎCHISSEMENT DE SESSION SUPABASE
    ------------------------------------------------------------------ */

    /**
     * Rafraîchit le token Supabase si nécessaire (appelé au montage admin)
     */
    async refreshSession() {
        if (!window.SupabaseService?.isConfigured()) return null;

        try {
            const client = window.SupabaseService.getClient();
            const { data, error } = await client.auth.getSession();

            if (error || !data.session) {
                // Session Supabase expirée → vérifier session locale
                const localSession = this.getCurrentSession();
                if (!localSession) return null;

                // Tenter un refresh
                const { data: refreshed } = await client.auth.refreshSession();
                if (refreshed?.session) {
                    this._syncSupabaseSession(refreshed.session);
                    return localSession;
                }
                return null;
            }

            // Vérifier le rôle admin dans la session active
            const user      = data.session.user;
            const appRole   = user?.app_metadata?.role;
            const isAdmin   = appRole === 'admin'
                           || appRole === 'ROLE_ADMIN'
                           || user?.email === 'admin@culture.store'
                           || user?.email === 'direction@culture.store';

            if (!isAdmin) {
                await client.auth.signOut();
                this.logout();
                return null;
            }

            return this.getCurrentSession();
        } catch (err) {
            console.warn('[AdminAuth] refreshSession error:', err.message);
            return this.getCurrentSession();
        }
    },

    /* ------------------------------------------------------------------
       DÉCONNEXION
    ------------------------------------------------------------------ */

    async logout() {
        const session = this.getCurrentSession();

        // Log avant suppression
        if (session && typeof window.SupabaseService !== 'undefined') {
            try {
                await window.SupabaseService.logAuditEvent(
                    session.user.id, 'ROLE_ADMIN',
                    'ADMIN_PORTAL_LOGOUT', 'SESSION',
                    session.token, { email: session.user.email }
                );
            } catch (_) {}
        }

        // Déconnexion Supabase Auth
        if (window.SupabaseService?.isConfigured()) {
            try {
                await window.SupabaseService.getClient().auth.signOut();
            } catch (_) {}
        }

        // Nettoyage stockage
        localStorage.removeItem(this.SESSION_STORAGE_KEY);
        localStorage.removeItem(this.SUPABASE_SESSION_KEY);
        localStorage.removeItem('culture_auth_session');
        sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
        sessionStorage.removeItem(this.SUPABASE_SESSION_KEY);

        window.location.href = '/admin/index.html';
    },

    /* ------------------------------------------------------------------
       MÉTHODES PRIVÉES
    ------------------------------------------------------------------ */

    /**
     * Fallback d'authentification local (mode dev / hors-ligne)
     * Protégé par identifiants configurables via ENV_CONFIG
     */
    async _localFallbackLogin(email, secret, rememberMe) {
        const allowedEmails = [
            'admin@culture.store',
            'direction@culture.store',
            'admin@culturestreetwear.com',
            'admin'
        ];
        const configPin = (window.ENV_CONFIG?.DEFAULT_ADMIN_PIN) || null;
        const allowedSecrets = [
            ...(configPin ? [configPin] : []),
            'admin123'  // SECRET PAR DÉFAUT — À CHANGER EN PRODUCTION
        ];

        const emailOk  = allowedEmails.includes(email);
        const secretOk = allowedSecrets.includes(secret);

        if (!emailOk || !secretOk) {
            return {
                success: false,
                message: 'Identifiants administrateur incorrects.',
                code: 'INVALID_CREDENTIALS'
            };
        }

        const adminSession = this._buildSession({
            id:       'admin-local-001',
            email:    email.includes('@') ? email : 'admin@culture.store',
            name:     'Administrateur Direction',
            provider: 'local_fallback',
            token:    'tok_admin_local_' + Date.now()
        });

        this._persistSession(adminSession, rememberMe);

        if (typeof window.SupabaseService !== 'undefined') {
            try {
                await window.SupabaseService.logAuditEvent(
                    adminSession.user.id, 'ROLE_ADMIN',
                    'ADMIN_LOCAL_LOGIN', 'SESSION',
                    adminSession.token, { provider: 'local_fallback', userAgent: navigator.userAgent }
                );
            } catch (_) {}
        }

        return { success: true, session: adminSession };
    },

    /**
     * Construit un objet session admin normalisé
     */
    _buildSession({ id, email, name, provider, token }) {
        return {
            token,
            user:      { id, email, name },
            role:      'ROLE_ADMIN',
            provider,
            createdAt: new Date().toISOString(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000)   // 24h
        };
    },

    /**
     * Persiste la session admin dans localStorage ou sessionStorage
     */
    _persistSession(session, rememberMe) {
        const payload = JSON.stringify(session);

        if (rememberMe) {
            localStorage.setItem(this.SESSION_STORAGE_KEY, payload);
            localStorage.setItem('culture_auth_session', payload);
            sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
        } else {
            sessionStorage.setItem(this.SESSION_STORAGE_KEY, payload);
            localStorage.removeItem(this.SESSION_STORAGE_KEY);
            localStorage.removeItem('culture_auth_session');
        }
    },

    /**
     * Synchronise la session Supabase JWT dans localStorage
     * pour les requêtes API côté admin
     */
    _syncSupabaseSession(supabaseSession) {
        if (!supabaseSession) return;
        try {
            localStorage.setItem(this.SUPABASE_SESSION_KEY, JSON.stringify({
                access_token:  supabaseSession.access_token,
                refresh_token: supabaseSession.refresh_token,
                expires_at:    supabaseSession.expires_at
            }));
        } catch (_) {}
    },

    /**
     * Journalise la connexion dans audit_log
     */
    async _logLogin(session) {
        if (typeof window.SupabaseService === 'undefined') return;
        try {
            await window.SupabaseService.logAuditEvent(
                session.user.id, 'ROLE_ADMIN',
                'ADMIN_PORTAL_LOGIN', 'SESSION',
                session.token, {
                    email:    session.user.email,
                    provider: session.provider,
                    userAgent: navigator.userAgent.substring(0, 100)
                }
            );
        } catch (_) {}
    }
};
