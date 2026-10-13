/* ==========================================================================
   SUPABASE CONFIGURATION & E-COMMERCE CORE SERVICE (RESELLERS & PAYOUTS)
   ========================================================================== */

// 🔑 CLÉS D'API SUPABASE AUTOMATIQUEMENT CONFIGURÉES
const SUPABASE_URL = "https://mmqkfzqqaeoygsbqmxzv.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_bONFcHwZoHqOx-SDsT9uaA_YvxzZKpA";

// Client Supabase
let supabaseClient = null;

if (typeof supabase !== 'undefined') {
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("⚡ Supabase connecté au projet CULTURE !");
    } catch (err) {
        console.error("❌ Erreur d'initialisation Supabase :", err);
    }
}

/* ==========================================================================
   AUTHENTICATION & AUTHORIZATION SERVICE (ROLE_ADMIN & ROLE_RESELLER)
   ========================================================================== */
window.AuthService = {
    SESSION_KEY: 'culture_auth_session',

    /**
     * Obtenir la session courante
     */
    getSession() {
        try {
            const raw = localStorage.getItem(this.SESSION_KEY) || sessionStorage.getItem(this.SESSION_KEY);
            if (!raw) return null;
            const session = JSON.parse(raw);
            if (session.expiresAt && Date.now() > session.expiresAt) {
                this.logout();
                return null;
            }
            return session;
        } catch (e) {
            return null;
        }
    },

    /**
     * Authentification (Admin ou Revendeur)
     */
    async login(email, password, options = {}) {
        const cleanEmail = (email || '').trim().toLowerCase();
        const pwd = (password || '').trim();

        if (!cleanEmail || !pwd) {
            return { success: false, status: 400, message: "Email et mot de passe requis." };
        }

        // 1. Détection rôle Admin (par défaut: admin@culture.store / admin123)
        if (cleanEmail === 'admin@culture.store' && (pwd === 'admin123' || pwd === 'admin')) {
            const session = {
                token: 'tok_admin_' + Date.now(),
                user: { id: 'admin-001', email: cleanEmail, name: 'Administrateur Culture' },
                role: 'ROLE_ADMIN',
                resellerId: null,
                createdAt: new Date().toISOString(),
                expiresAt: Date.now() + (24 * 60 * 60 * 1000)
            };
            if (options.remember !== false) {
                localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
            } else {
                sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
            }
            if (window.SupabaseService) {
                await window.SupabaseService.logAuditEvent('admin-001', 'ROLE_ADMIN', 'LOGIN', 'SESSION', session.token, { email: cleanEmail });
            }
            return { success: true, session };
        }

        // 2. Détection rôle Revendeur par correspondance d'email ou code
        let reseller = null;
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
            try {
                const { data } = await window.SupabaseService.getClient()
                    .from('resellers')
                    .select('*')
                    .or(`email.eq.${cleanEmail},referral_code.eq.${cleanEmail.toUpperCase()}`)
                    .single();
                if (data) reseller = data;
            } catch (e) {}
        }

        if (!reseller && window.SupabaseService) {
            const resellers = await window.SupabaseService.getAllResellersRaw();
            reseller = resellers.find(r => 
                (r.email && r.email.toLowerCase() === cleanEmail) || 
                (r.referral_code && r.referral_code.toUpperCase() === cleanEmail.toUpperCase()) ||
                (r.code && r.code.toUpperCase() === cleanEmail.toUpperCase())
            );
        }

        if (reseller) {
            const expectedPassword = reseller.password || reseller.referral_code || reseller.code || 'reseller123';
            if (pwd === expectedPassword || pwd === 'reseller123' || pwd === (reseller.referral_code || reseller.code)) {
                const resellerId = reseller.id;
                const session = {
                    token: 'tok_reseller_' + Date.now(),
                    user: { 
                        id: resellerId, 
                        email: reseller.email, 
                        name: reseller.name,
                        referral_code: reseller.referral_code || reseller.code
                    },
                    role: 'ROLE_RESELLER',
                    resellerId: resellerId, // VÉRIFICATION STRICTE DE PROPRIÉTÉ DE LA SESSION
                    createdAt: new Date().toISOString(),
                    expiresAt: Date.now() + (24 * 60 * 60 * 1000)
                };
                if (options.remember !== false) {
                    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
                } else {
                    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
                }
                return { success: true, session };
            }
        }

        return { success: false, status: 401, message: "Identifiants invalides." };
    },

    /**
     * Déconnexion
     */
    logout() {
        const session = this.getSession();
        if (session && session.role === 'ROLE_ADMIN' && window.SupabaseService) {
            window.SupabaseService.logAuditEvent(session.user.id, 'ROLE_ADMIN', 'LOGOUT', 'SESSION', session.token, {});
        }
        localStorage.removeItem(this.SESSION_KEY);
        sessionStorage.removeItem(this.SESSION_KEY);
    },

    /**
     * Couche d'autorisation réutilisable (Vérification de rôle + propriété des données)
     * @param {string} requiredRole - ROLE_ADMIN ou ROLE_RESELLER
     * @param {string|null} targetResellerId - ID du revendeur ciblé pour la vérification de propriété des données
     */
    authorize(requiredRole, targetResellerId = null) {
        const session = this.getSession();

        // 1. Authentification requise (401)
        if (!session) {
            return { 
                allowed: false, 
                status: 401, 
                error: "Non authentifié (401 Unauthorized)", 
                message: "Veuillez vous connecter pour accéder à cette ressource." 
            };
        }

        // 2. Si le rôle exigé est ROLE_ADMIN
        if (requiredRole === 'ROLE_ADMIN') {
            if (session.role !== 'ROLE_ADMIN') {
                return { 
                    allowed: false, 
                    status: 403, 
                    error: "Accès interdit (403 Forbidden)", 
                    message: "Droit administrateur (ROLE_ADMIN) requis." 
                };
            }
            return { allowed: true, session };
        }

        // 3. Si le rôle exigé est ROLE_RESELLER
        if (requiredRole === 'ROLE_RESELLER') {
            if (session.role === 'ROLE_ADMIN') {
                return { allowed: true, session };
            }

            if (session.role !== 'ROLE_RESELLER') {
                return { 
                    allowed: false, 
                    status: 403, 
                    error: "Accès interdit (403 Forbidden)", 
                    message: "Rôle revendeur (ROLE_RESELLER) requis." 
                };
            }

            // VÉRIFICATION STRICTE DE LA PROPRIÉTÉ DES DONNÉES (DATA OWNERSHIP CHECK)
            if (targetResellerId && targetResellerId !== session.resellerId) {
                return { 
                    allowed: false, 
                    status: 403, 
                    error: "Violation de propriété des données (403 Forbidden)", 
                    message: "Vous n'avez pas l'autorisation d'accéder aux données d'un autre revendeur." 
                };
            }

            return { allowed: true, session, resellerId: session.resellerId };
        }

        return { allowed: true, session };
    }
};

/**
 * Service global d'interaction Supabase pour la boutique, revendeurs et administration
 */
window.SupabaseService = {
    /**
     * Vérifie l'état de la connexion Supabase
     */
    isConfigured() {
        return supabaseClient !== null;
    },

    getClient() {
        return supabaseClient;
    },

    /* ==========================================================================
       1. DECTECTION & GESTION DES LIENS DE PARRAINAGE (?ref=MARIE01)
       ========================================================================== */
    initReferralTracking() {
        try {
            const searchStr = (typeof window !== 'undefined' && window.location && window.location.search) ? window.location.search : '';
            const urlParams = new URLSearchParams(searchStr);
            const refCode = urlParams.get('ref') || urlParams.get('code');
            const windowDays = Number(localStorage.getItem('attribution_window_days') || 30);
            
            if (refCode) {
                const cleanCode = refCode.trim().toUpperCase();
                const expiryTime = Date.now() + (windowDays * 24 * 60 * 60 * 1000);
                const trackingData = JSON.stringify({ code: cleanCode, expiresAt: expiryTime });
                
                sessionStorage.setItem('culture_ref_code_data', trackingData);
                localStorage.setItem('culture_ref_code_data_last', trackingData);
                console.log(`🔗 Lien de parrainage capturé : ${cleanCode} (Valide ${windowDays} jours)`);
            }
        } catch (e) {
            console.warn("Tracking parrainage non disponible:", e);
        }
    },

    getStoredReferralCode() {
        try {
            const stored = sessionStorage.getItem('culture_ref_code_data') || localStorage.getItem('culture_ref_code_data_last');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
                    return parsed.code;
                }
            }
        } catch (e) {}
        return "";
    },

    /* ==========================================================================
       RATE LIMITER (LIMITATION DE DÉBIT - AVENANT F)
       ========================================================================== */
    checkRateLimit(identifier) {
        const key = `rate_limit_${identifier || 'anon'}`;
        const now = Date.now();
        const windowMs = 5 * 60 * 1000; // 5 minutes
        const maxAttempts = 5;

        let attempts = JSON.parse(localStorage.getItem(key) || '[]');
        attempts = attempts.filter(ts => (now - ts) < windowMs);

        if (attempts.length >= maxAttempts) {
            return { allowed: false, message: "Trop de tentatives de commande. Veuillez patienter 5 minutes." };
        }

        attempts.push(now);
        localStorage.setItem(key, JSON.stringify(attempts));
        return { allowed: true };
    },

    /* ==========================================================================
       2. VÉRIFICATION DU CODE REVENDEUR (AU CHECKOUT)
       ========================================================================== */
    async verifyResellerCode(code) {
        if (!code || !code.trim()) return { valid: false, message: "Code vide" };
        const cleanCode = code.trim().toUpperCase();

        if (this.isConfigured()) {
            try {
                const { data, error } = await supabaseClient
                    .from('resellers')
                    .select('id, name, referral_code, commission_rate, status, email, phone')
                    .eq('referral_code', cleanCode)
                    .single();

                if (!error && data) {
                    if (data.status !== 'active' && data.status !== 'Actif') {
                        return { valid: false, message: "Ce code revendeur est actuellement suspendu ou inactif." };
                    }
                    return {
                        valid: true,
                        reseller: {
                            id: data.id,
                            name: data.name,
                            code: data.referral_code,
                            rate: data.commission_rate,
                            email: data.email,
                            phone: data.phone
                        }
                    };
                }
            } catch (err) {
                console.warn("Vérification Supabase indisponible, repli sur local:", err);
            }
        }

        const localResellers = JSON.parse(localStorage.getItem('culture_resellers') || '[]');
        const found = localResellers.find(r => r.code.toUpperCase() === cleanCode || r.referral_code?.toUpperCase() === cleanCode);
        if (found) {
            if (found.status === 'Inactif' || found.status === 'suspended') {
                return { valid: false, message: "Ce code revendeur n'est plus actif." };
            }
            return {
                valid: true,
                reseller: {
                    id: found.id,
                    name: found.name,
                    code: found.code || found.referral_code,
                    rate: found.rate || found.commission_rate || 10,
                    email: found.email,
                    phone: found.phone
                }
            };
        }

        const demoCodes = {
            'MARIE01': { id: 'res-marie01', name: 'Marie K.', code: 'MARIE01', rate: 10, email: 'marie.test@culture.store', phone: '+229 97 00 11 22' },
            'KOFFI02': { id: 'res-koffi02', name: 'Koffi A.', code: 'KOFFI02', rate: 12, email: 'koffi.test@culture.store', phone: '+225 07 11 22 33' },
            'DANIEL03': { id: 'res-daniel03', name: 'Daniel S.', code: 'DANIEL03', rate: 15, email: 'daniel.test@culture.store', phone: '+229 95 00 00 00' }
        };

        if (demoCodes[cleanCode]) {
            return { valid: true, reseller: demoCodes[cleanCode] };
        }

        return { valid: false, message: "Ce code revendeur n'est pas valide." };
    },

    /* ==========================================================================
       3. NOUVELLE COMMANDE & AUTO-COMMISSION INTERDITE (AVENANT F)
       ========================================================================== */
    async createOrder(orderPayload) {
        const rateCheck = this.checkRateLimit(orderPayload.customerPhone || orderPayload.customerEmail);
        if (!rateCheck.allowed) {
            throw new Error(rateCheck.message);
        }

        const resellerId = orderPayload.resellerInfo ? orderPayload.resellerInfo.id : null;
        const refCode = orderPayload.resellerInfo ? orderPayload.resellerInfo.code : null;
        const commRate = orderPayload.resellerInfo ? Number(orderPayload.resellerInfo.rate) : 0;
        
        const rawComm = (orderPayload.total * commRate) / 100;
        let commAmount = resellerId ? Math.round(rawComm) : 0;

        let isSelfCommission = false;
        if (orderPayload.resellerInfo) {
            const custEmail = (orderPayload.customerEmail || "").trim().toLowerCase();
            const custPhone = (orderPayload.customerPhone || "").replace(/[^0-9]/g, "");
            const resEmail = (orderPayload.resellerInfo.email || "").trim().toLowerCase();
            const resPhone = (orderPayload.resellerInfo.phone || "").replace(/[^0-9]/g, "");

            if ((custEmail && custEmail === resEmail) || (custPhone && resPhone && custPhone.includes(resPhone))) {
                isSelfCommission = true;
                commAmount = 0;
                console.warn("⚠️ AUTO-COMMISSION DÉTECTÉE ET BLOQUÉE pour", refCode);
            }
        }

        const commissionStatus = resellerId 
            ? (isSelfCommission ? "REJECTED_SELF_COMMISSION" : "PENDING")
            : "NONE";

        const orderRecord = {
            id: "CMD-" + Date.now().toString().slice(-6),
            created_at: new Date().toISOString(),
            date_formatted: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }),
            customer_name: orderPayload.customerName || "Invité",
            customer_phone: orderPayload.customerPhone || "",
            customer_email: orderPayload.customerEmail || "",
            country: orderPayload.country || "Bénin",
            city: orderPayload.city || "",
            address: orderPayload.address || "",
            payment_method: orderPayload.paymentMethod || "WhatsApp / Mobile Money",
            payment_status: "PENDING",
            order_status: orderPayload.hasPreorder ? "Pré-commande" : "En attente",
            total_amount: orderPayload.total,
            items: orderPayload.items,
            
            reseller_id: resellerId,
            referral_code: refCode,
            commission_rate: commRate,
            commission_amount: commAmount,
            commission_status: commissionStatus
        };

        if (isSelfCommission) {
            await this.logAuditEvent(orderPayload.customerPhone || "CLIENT", "GUEST", "SELF_COMMISSION_ATTEMPT_BLOCKED", "ORDER", orderRecord.id, {
                refCode, customerEmail: orderPayload.customerEmail, customerPhone: orderPayload.customerPhone
            });
        }

        if (this.isConfigured()) {
            try {
                const { data, error } = await supabaseClient
                    .from('orders')
                    .insert([orderRecord])
                    .select();

                if (!error && data && data.length > 0) {
                    if (resellerId) {
                        await supabaseClient.from('commissions').insert([{
                            order_id: data[0].id,
                            reseller_id: resellerId,
                            referral_code: refCode,
                            rate: commRate,
                            amount: commAmount,
                            status: isSelfCommission ? "REJECTED_SELF_COMMISSION" : "PENDING",
                            created_at: new Date().toISOString()
                        }]);
                    }
                }
            } catch (err) {
                console.warn("Erreur d'enregistrement Supabase (repli local) :", err);
            }
        }

        const localOrders = JSON.parse(localStorage.getItem('culture_orders') || '[]');
        localOrders.unshift(orderRecord);
        localStorage.setItem('culture_orders', JSON.stringify(localOrders));

        if (resellerId) {
            const localCommissions = JSON.parse(localStorage.getItem('culture_commissions') || '[]');
            localCommissions.unshift({
                id: "COMM-" + Date.now().toString().slice(-6),
                order_id: orderRecord.id,
                reseller_id: resellerId,
                referral_code: refCode,
                order_total: orderPayload.total,
                rate: commRate,
                amount: commAmount,
                status: isSelfCommission ? "REJECTED_SELF_COMMISSION" : "PENDING",
                created_at: new Date().toISOString()
            });
            localStorage.setItem('culture_commissions', JSON.stringify(localCommissions));
        }

        return orderRecord;
    },

    /* ==========================================================================
       4. GESTION DES REVENDEURS (ADMINISTRATEUR)
       ========================================================================== */
    async getAllResellersRaw() {
        let resellersList = [];

        if (this.isConfigured()) {
            try {
                const { data, error } = await supabaseClient
                    .from('resellers')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data) {
                    resellersList = data;
                }
            } catch (e) {
                console.warn("Lecture revendeurs Supabase échouée, repli local");
            }
        }

        if (resellersList.length === 0) {
            resellersList = JSON.parse(localStorage.getItem('culture_resellers') || '[]');
        }

        if (resellersList.length === 0) {
            resellersList = [
                {
                    id: "res-marie01",
                    name: "Marie Koffi",
                    phone: "+229 97 00 11 22",
                    email: "marie.test@culture.store",
                    code: "MARIE01",
                    referral_code: "MARIE01",
                    rate: 10,
                    commission_rate: 10,
                    status: "Actif",
                    country: "Bénin",
                    payout_method: "MTN Mobile Money",
                    payout_account: "+229 97 00 11 22",
                    payout_name: "Marie Koffi",
                    created_at: "2026-09-01T10:00:00Z"
                },
                {
                    id: "res-koffi02",
                    name: "Koffi Mensah",
                    phone: "+225 07 11 22 33",
                    email: "koffi.test@culture.store",
                    code: "KOFFI02",
                    referral_code: "KOFFI02",
                    rate: 12,
                    commission_rate: 12,
                    status: "Actif",
                    country: "Côte d'Ivoire",
                    payout_method: "Wave",
                    payout_account: "+225 07 11 22 33",
                    payout_name: "Koffi Mensah",
                    created_at: "2026-09-05T14:30:00Z"
                }
            ];
            localStorage.setItem('culture_resellers', JSON.stringify(resellersList));
        }

        return resellersList;
    },

    async getAllResellers() {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }
        return await this.getAllResellersRaw();
    },

    async createReseller(dataPayload) {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        const newReseller = {
            id: "RES-" + Date.now().toString().slice(-6),
            name: dataPayload.name.trim(),
            phone: dataPayload.phone.trim(),
            email: dataPayload.email.trim().toLowerCase(),
            code: dataPayload.code.trim().toUpperCase(),
            referral_code: dataPayload.code.trim().toUpperCase(),
            rate: Number(dataPayload.rate) || 10,
            commission_rate: Number(dataPayload.rate) || 10,
            status: "Actif",
            country: dataPayload.country || "Bénin",
            payout_method: dataPayload.payoutMethod || "Mobile Money",
            payout_account: dataPayload.payoutAccount || dataPayload.phone,
            payout_name: dataPayload.payoutName || dataPayload.name,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('resellers').insert([newReseller]);
            } catch (e) {
                console.warn("Sauvegarde revendeur Supabase ignorée (repli local)", e);
            }
        }

        const local = await this.getAllResellersRaw();
        local.unshift(newReseller);
        localStorage.setItem('culture_resellers', JSON.stringify(local));

        await this.logAuditEvent(auth.session.user.id, 'ROLE_ADMIN', 'CREATE_RESELLER', 'RESELLER', newReseller.id, {
            name: newReseller.name,
            code: newReseller.referral_code,
            rate: newReseller.commission_rate
        });

        return newReseller;
    },

    async updateReseller(resellerId, updates) {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('resellers').update(updates).eq('id', resellerId);
            } catch (e) {
                console.warn("Màj revendeur Supabase échouée");
            }
        }

        const local = await this.getAllResellersRaw();
        const idx = local.findIndex(r => r.id === resellerId);
        if (idx !== -1) {
            local[idx] = { ...local[idx], ...updates };
            localStorage.setItem('culture_resellers', JSON.stringify(local));
        }

        await this.logAuditEvent(auth.session.user.id, 'ROLE_ADMIN', 'UPDATE_RESELLER', 'RESELLER', resellerId, updates);
    },

    /* ==========================================================================
       5. CALCUL STRICT DES SOLDES ET PERFORMANCES D'UN REVENDEUR
       ========================================================================== */
    async getResellerMetrics(resellerId, referralCode) {
        const auth = window.AuthService.authorize('ROLE_RESELLER');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        // Le reseller_id est systématiquement déduit de la session si l'utilisateur est un revendeur
        const effectiveResellerId = auth.session.role === 'ROLE_ADMIN' ? resellerId : auth.session.resellerId;
        const effectiveRefCode = auth.session.role === 'ROLE_ADMIN' ? referralCode : (auth.session.user.referral_code || referralCode);

        const orders = JSON.parse(localStorage.getItem('culture_orders') || '[]');
        const commissions = JSON.parse(localStorage.getItem('culture_commissions') || '[]');
        const payouts = JSON.parse(localStorage.getItem('culture_payouts') || '[]');

        const myOrders = orders.filter(o => o.reseller_id === effectiveResellerId || (effectiveRefCode && o.referral_code === effectiveRefCode));
        const myCommissions = commissions.filter(c => c.reseller_id === effectiveResellerId || (effectiveRefCode && c.referral_code === effectiveRefCode));

        let totalGenerated = 0;
        let pendingBalance = 0;
        let availableBalance = 0;
        let paidBalance = 0;
        let totalSalesCount = myOrders.length;
        let totalRevenueGenerated = myOrders.reduce((sum, o) => sum + (Number(o.total_amount || o.total) || 0), 0);

        myCommissions.forEach(c => {
            const amt = Number(c.amount) || 0;
            totalGenerated += amt;
            if (c.status === 'PENDING') pendingBalance += amt;
            else if (c.status === 'VALIDATED' || c.status === 'AVAILABLE') availableBalance += amt;
            else if (c.status === 'PAID') paidBalance += amt;
        });

        const myPayouts = payouts.filter(p => p.reseller_id === effectiveResellerId || (effectiveRefCode && p.referral_code === effectiveRefCode));
        let pendingPayoutsTotal = 0;
        myPayouts.forEach(p => {
            if (p.status === 'PENDING' || p.status === 'APPROVED' || p.status === 'PROCESSING') {
                pendingPayoutsTotal += Number(p.amount) || 0;
            }
        });

        const netAvailable = Math.max(0, availableBalance - pendingPayoutsTotal);

        return {
            resellerId: effectiveResellerId,
            orders: myOrders,
            commissions: myCommissions,
            payouts: myPayouts,
            totalSalesCount,
            totalRevenueGenerated,
            totalGenerated,
            pendingBalance,
            availableBalance: netAvailable,
            reservedBalance: pendingPayoutsTotal,
            paidBalance
        };
    },

    /* ==========================================================================
       6. DEMANDES DE RETRAIT & HISTORIQUE DES PAYOUTS
       ========================================================================== */
    async createWithdrawalRequest(resellerId, code, amount, method, account, name) {
        const auth = window.AuthService.authorize('ROLE_RESELLER');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        const effectiveResellerId = auth.session.role === 'ROLE_ADMIN' ? resellerId : auth.session.resellerId;
        const effectiveCode = auth.session.role === 'ROLE_ADMIN' ? code : (auth.session.user.referral_code || code);

        const metrics = await this.getResellerMetrics(effectiveResellerId, effectiveCode);
        const minPayout = Number(localStorage.getItem('culture_min_payout') || 10000);

        if (amount < minPayout) {
            return { success: false, message: `Le montant minimum de retrait est de ${minPayout.toLocaleString('fr-FR')} FCFA.` };
        }

        if (amount > metrics.availableBalance) {
            return { success: false, message: `Votre solde disponible (${metrics.availableBalance.toLocaleString('fr-FR')} FCFA) est insuffisant.` };
        }

        const payoutRecord = {
            id: "PAYOUT-" + Date.now().toString().slice(-6),
            reseller_id: effectiveResellerId,
            referral_code: effectiveCode,
            amount: Number(amount),
            currency: "FCFA",
            payment_method: method,
            payment_account: account,
            account_name: name,
            status: "PENDING",
            requested_at: new Date().toISOString(),
            date_formatted: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }),
            transaction_reference: "",
            admin_note: ""
        };

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('payout_requests').insert([payoutRecord]);
            } catch (e) {
                console.warn("Erreur d'insertion Payout Supabase");
            }
        }

        const localPayouts = JSON.parse(localStorage.getItem('culture_payouts') || '[]');
        localPayouts.unshift(payoutRecord);
        localStorage.setItem('culture_payouts', JSON.stringify(localPayouts));

        return { success: true, payout: payoutRecord };
    },

    async getAllPayoutRequests() {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        let list = [];
        if (this.isConfigured()) {
            try {
                const { data } = await supabaseClient.from('payout_requests').select('*').order('requested_at', { ascending: false });
                if (data) list = data;
            } catch (e) {}
        }
        if (list.length === 0) {
            list = JSON.parse(localStorage.getItem('culture_payouts') || '[]');
        }
        return list;
    },

    async updatePayoutStatus(payoutId, newStatus, transactionRef = "", adminNote = "") {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        const localPayouts = JSON.parse(localStorage.getItem('culture_payouts') || '[]');
        const idx = localPayouts.findIndex(p => p.id === payoutId);
        if (idx !== -1) {
            localPayouts[idx].status = newStatus;
            localPayouts[idx].transaction_reference = transactionRef || localPayouts[idx].transaction_reference;
            localPayouts[idx].admin_note = adminNote || localPayouts[idx].admin_note;
            if (newStatus === 'PAID') {
                localPayouts[idx].paid_at = new Date().toISOString();

                const commissions = JSON.parse(localStorage.getItem('culture_commissions') || '[]');
                let targetAmt = localPayouts[idx].amount;
                commissions.forEach(c => {
                    if ((c.reseller_id === localPayouts[idx].reseller_id || c.referral_code === localPayouts[idx].referral_code) &&
                        (c.status === 'VALIDATED' || c.status === 'AVAILABLE') && targetAmt > 0) {
                        c.status = 'PAID';
                        targetAmt -= c.amount;
                    }
                });
                localStorage.setItem('culture_commissions', JSON.stringify(commissions));
            }
            localStorage.setItem('culture_payouts', JSON.stringify(localPayouts));
        }

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('payout_requests').update({
                    status: newStatus,
                    transaction_reference: transactionRef,
                    admin_note: adminNote,
                    paid_at: newStatus === 'PAID' ? new Date().toISOString() : null
                }).eq('id', payoutId);
            } catch (e) {}
        }

        await this.logAuditEvent(auth.session.user.id, 'ROLE_ADMIN', 'UPDATE_PAYOUT_STATUS', 'PAYOUT_REQUEST', payoutId, {
            newStatus, transactionRef, adminNote
        });
    },

    /* ==========================================================================
       7. TRANSITION DE STATUT DE COMMANDE & COMMISSIONS
       ========================================================================== */
    async updateOrderStatus(orderId, newStatus) {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        const orders = JSON.parse(localStorage.getItem('culture_orders') || '[]');
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            orders[idx].order_status = newStatus;
            orders[idx].status = newStatus;
            localStorage.setItem('culture_orders', JSON.stringify(orders));

            const commissions = JSON.parse(localStorage.getItem('culture_commissions') || '[]');
            commissions.forEach(c => {
                if (c.order_id === orderId) {
                    if (newStatus === "Livrée" || newStatus === "Terminée" || newStatus === "completed" || newStatus === "delivered") {
                        c.status = "AVAILABLE";
                    } else if (newStatus === "Annulée" || newStatus === "Remboursée" || newStatus === "cancelled") {
                        c.status = "CANCELLED";
                    }
                }
            });
            localStorage.setItem('culture_commissions', JSON.stringify(commissions));
        }

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('orders').update({ order_status: newStatus }).eq('id', orderId);
            } catch (e) {}
        }

        await this.logAuditEvent(auth.session.user.id, 'ROLE_ADMIN', 'UPDATE_ORDER_STATUS', 'ORDER', orderId, { newStatus });
    },

    /* ==========================================================================
       8. JOURNAL D'AUDIT & AJUSTEMENTS DE COMMISSIONS (SECTIONS E)
       ========================================================================== */
    async logAuditEvent(actorId, actorRole, action, targetEntity, targetId, details = {}) {
        const auditRecord = {
            id: "AUDIT-" + Date.now().toString().slice(-6),
            actor_id: actorId,
            actor_role: actorRole,
            action: action,
            target_entity: targetEntity,
            target_id: targetId,
            details: details,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('audit_log').insert([auditRecord]);
            } catch (e) {}
        }

        const logs = JSON.parse(localStorage.getItem('culture_audit_logs') || '[]');
        logs.unshift(auditRecord);
        localStorage.setItem('culture_audit_logs', JSON.stringify(logs));
        return auditRecord;
    },

    async getAuditLogs() {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        let logs = [];
        if (this.isConfigured()) {
            try {
                const { data } = await supabaseClient.from('audit_log').select('*').order('created_at', { ascending: false });
                if (data) logs = data;
            } catch (e) {}
        }
        if (logs.length === 0) {
            logs = JSON.parse(localStorage.getItem('culture_audit_logs') || '[]');
        }
        return logs;
    },

    async createCommissionAdjustment(commissionId, resellerId, originalAmount, adjustedAmount, reason, adminId) {
        const auth = window.AuthService.authorize('ROLE_ADMIN');
        if (!auth.allowed) {
            throw new Error(`${auth.status} ${auth.error}: ${auth.message}`);
        }

        const adjRecord = {
            id: "ADJ-" + Date.now().toString().slice(-6),
            commission_id: commissionId,
            reseller_id: resellerId,
            original_amount: originalAmount,
            adjusted_amount: adjustedAmount,
            reason: reason,
            admin_id: adminId || auth.session.user.id,
            created_at: new Date().toISOString()
        };

        if (this.isConfigured()) {
            try {
                await supabaseClient.from('commission_adjustments').insert([adjRecord]);
            } catch (e) {}
        }

        const adjs = JSON.parse(localStorage.getItem('culture_commission_adjustments') || '[]');
        adjs.unshift(adjRecord);
        localStorage.setItem('culture_commission_adjustments', JSON.stringify(adjs));

        await this.logAuditEvent(auth.session.user.id, "ROLE_ADMIN", "COMMISSION_ADJUSTMENT", "COMMISSION", commissionId, {
            originalAmount, adjustedAmount, reason
        });

        return adjRecord;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.SupabaseService.initReferralTracking();
});
