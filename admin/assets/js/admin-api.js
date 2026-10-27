/* ==========================================================================
   CULTURE STREETWEAR CO. — STANDALONE ADMIN DATA ACCESS LAYER (API)
   Encapsulated Data Interface for Supabase & Local Fallbacks
   ========================================================================== */

window.AdminAPI = {
    /**
     * Vérifie si le client Supabase est connecté
     */
    isOnline() {
        return typeof window.SupabaseService !== 'undefined' && window.SupabaseService.isConfigured();
    },

    getClient() {
        if (typeof window.SupabaseService !== 'undefined') {
            return window.SupabaseService.getClient();
        }
        return null;
    },

    /* ==========================================================================
       1. CATALOGUE & PRODUITS
       ========================================================================== */
    async getProducts() {
        // En priorité : localStorage 'culture_products' (avec fallback sur le catalogue de démo)
        const stored = localStorage.getItem('culture_products');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {}
        }
        
        // Catalogue d'origine par défaut
        return [
            { id: "p1", name: "Terra Icon Crossbody", price: 8000, category: "bags", image: "../IMAGE/Sac 1.png", description: "Sac crossbody compact haute résistance avec logo brodé en relief.", sizes: ["Unique"], status: "available" },
            { id: "p2", name: "CULTURE Core Shoulder Bag", price: 8000, category: "bags", image: "../IMAGE/Sac 2.png", description: "Sac bandoulière urbain avec multiples rangements zippés sécurisés.", sizes: ["Unique"], status: "available" },
            { id: "p3", name: "Phantom Utility Sacoche", price: 8000, category: "bags", image: "../IMAGE/Sac 3.png", description: "Sacoche technique imperméable pour vos essentiels du quotidien.", sizes: ["Unique"], status: "available" },
            { id: "p4", name: "Heavyweight Boxy Hoodie", price: 20000, category: "hoodies", image: "../IMAGE/logo P.png", description: "Molleton lourd 450 GSM avec coupe boxy oversize premium.", sizes: ["S", "M", "L", "XL"], status: "available" },
            { id: "p5", name: "Raw Edge Studio Tee", price: 12000, category: "tees", image: "../IMAGE/logo P.png", description: "Coton peigné 240 GSM, col épais résistant au lavage.", sizes: ["S", "M", "L", "XL"], status: "available" }
        ];
    },

    async saveProduct(productPayload) {
        const products = await this.getProducts();
        if (productPayload.id) {
            const index = products.findIndex(p => p.id === productPayload.id);
            if (index !== -1) {
                products[index] = { ...products[index], ...productPayload };
            }
        } else {
            const newProd = {
                ...productPayload,
                id: (window.SupabaseService && window.SupabaseService.generateUUID)
                    ? window.SupabaseService.generateUUID()
                    : "p_" + Date.now()
            };
            products.unshift(newProd);
        }
        localStorage.setItem('culture_products', JSON.stringify(products));
        return productPayload;
    },

    async deleteProduct(productId) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('culture_products', JSON.stringify(products));
        return true;
    },

    async resetCatalog() {
        localStorage.removeItem('culture_products');
        return await this.getProducts();
    },

    /* ==========================================================================
       2. COMMANDES CLIENTS (ORDERS)
       ========================================================================== */
    async getOrders() {
        if (this.isOnline()) {
            try {
                const { data, error } = await this.getClient()
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (!error && data && data.length > 0) {
                    return data;
                }
            } catch (e) {
                console.warn("Lecture orders Supabase échouée, repli local:", e);
            }
        }
        return JSON.parse(localStorage.getItem('culture_orders') || '[]');
    },

    async updateOrderStatus(orderId, newStatus) {
        if (typeof window.SupabaseService !== 'undefined') {
            await window.SupabaseService.updateOrderStatus(orderId, newStatus);
        } else {
            const orders = JSON.parse(localStorage.getItem('culture_orders') || '[]');
            const idx = orders.findIndex(o => o.id === orderId);
            if (idx !== -1) {
                orders[idx].order_status = newStatus;
                localStorage.setItem('culture_orders', JSON.stringify(orders));
            }
        }
        return true;
    },

    /* ==========================================================================
       3. REVENDEURS & AFFILIÉS (RESELLERS)
       ========================================================================== */
    async getResellers() {
        if (typeof window.SupabaseService !== 'undefined') {
            return await window.SupabaseService.getAllResellersRaw();
        }
        return JSON.parse(localStorage.getItem('culture_resellers') || '[]');
    },

    async createReseller(dataPayload) {
        if (typeof window.SupabaseService !== 'undefined') {
            return await window.SupabaseService.createReseller(dataPayload);
        }
        const resellers = await this.getResellers();
        const newReseller = {
            id: (window.SupabaseService && window.SupabaseService.generateUUID)
                ? window.SupabaseService.generateUUID()
                : "RES-" + Date.now(),
            ...dataPayload,
            status: "Actif",
            created_at: new Date().toISOString()
        };
        resellers.unshift(newReseller);
        localStorage.setItem('culture_resellers', JSON.stringify(resellers));
        return newReseller;
    },

    async updateResellerRate(resellerId, newRate) {
        if (typeof window.SupabaseService !== 'undefined') {
            await window.SupabaseService.updateReseller(resellerId, { commission_rate: Number(newRate), rate: Number(newRate) });
        }
        return true;
    },

    async toggleResellerStatus(resellerId, currentStatus) {
        const newStatus = (currentStatus === 'Actif' || currentStatus === 'active') ? 'Suspendu' : 'Actif';
        if (typeof window.SupabaseService !== 'undefined') {
            await window.SupabaseService.updateReseller(resellerId, { status: newStatus });
        }
        return newStatus;
    },

    /* ==========================================================================
       4. DEMANDES DE RETRAIT (PAYOUTS) & HISTORIQUE
       ========================================================================== */
    async getPayoutRequests() {
        if (typeof window.SupabaseService !== 'undefined') {
            try {
                return await window.SupabaseService.getAllPayoutRequests();
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('culture_payouts') || '[]');
    },

    async getPayouts() {
        return await this.getPayoutRequests();
    },

    async confirmPayoutPaid(payoutId, transactionRef, adminNote) {
        if (typeof window.SupabaseService !== 'undefined') {
            await window.SupabaseService.updatePayoutStatus(payoutId, 'PAID', transactionRef, adminNote);
        }
        return true;
    },

    async rejectPayout(payoutId) {
        if (typeof window.SupabaseService !== 'undefined') {
            await window.SupabaseService.updatePayoutStatus(payoutId, 'REJECTED');
        }
        return true;
    },

    /* ==========================================================================
       5. COMMISSIONS GLOBALES & AJUSTEMENTS
       ========================================================================== */
    async getCommissions() {
        if (this.isOnline()) {
            try {
                const { data } = await this.getClient()
                    .from('commissions')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (data && data.length > 0) return data;
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('culture_commissions') || '[]');
    },

    /* ==========================================================================
       6. JOURNAL D'AUDIT (AUDIT LOG)
       ========================================================================== */
    async getAuditLogs() {
        if (typeof window.SupabaseService !== 'undefined') {
            try {
                return await window.SupabaseService.getAuditLogs();
            } catch (e) {}
        }
        return JSON.parse(localStorage.getItem('culture_audit_logs') || '[]');
    },

    async getAuditLog() {
        return await this.getAuditLogs();
    },

    async logAuditAction(action, details = {}) {
        const entry = {
            id: (window.SupabaseService && window.SupabaseService.generateUUID)
                ? window.SupabaseService.generateUUID()
                : "LOG-" + Date.now(),
            action,
            details,
            admin_user: (window.AdminAuth && window.AdminAuth.currentUser?.email) || 'admin@culture.store',
            created_at: new Date().toISOString()
        };
        if (typeof window.SupabaseService !== 'undefined' && window.SupabaseService.logAudit) {
            try {
                await window.SupabaseService.logAudit(action, details);
            } catch (e) {}
        }
        const logs = JSON.parse(localStorage.getItem('culture_audit_logs') || '[]');
        logs.unshift(entry);
        localStorage.setItem('culture_audit_logs', JSON.stringify(logs.slice(0, 100)));
        return entry;
    },

    /* ==========================================================================
       7. PARAMÈTRES & CONFIGURATION PLATEFORME
       ========================================================================== */
    getSettings() {
        const minPayout = Number(localStorage.getItem('culture_min_payout') || (window.ENV_CONFIG?.DEFAULT_MIN_PAYOUT || 10000));
        const defaultRate = Number(localStorage.getItem('culture_default_rate') || 10);
        const notifyPhone = localStorage.getItem('culture_notify_phone') || '+229 90 00 00 00';
        const activeGateway = (typeof window.PaymentService !== 'undefined') 
            ? window.PaymentService.getActiveProvider().code 
            : (localStorage.getItem('culture_payment_gateway') || "WHATSAPP_BRIDGE");
        const adminPin = localStorage.getItem('culture_admin_pin') || (window.ENV_CONFIG?.DEFAULT_ADMIN_PIN || "1234");

        return {
            adminPin,
            minPayout,
            min_payout_amount: minPayout,
            defaultRate,
            default_reseller_rate: defaultRate,
            notifyPhone,
            admin_notify_phone: notifyPhone,
            activeGateway,
            active_payment_gateway: activeGateway
        };
    },

    saveSettings(settings) {
        if (settings.adminPin) {
            localStorage.setItem('culture_admin_pin', settings.adminPin);
        }
        const minPayout = settings.min_payout_amount !== undefined ? settings.min_payout_amount : settings.minPayout;
        if (minPayout !== undefined) {
            localStorage.setItem('culture_min_payout', minPayout);
        }
        const defaultRate = settings.default_reseller_rate !== undefined ? settings.default_reseller_rate : settings.defaultRate;
        if (defaultRate !== undefined) {
            localStorage.setItem('culture_default_rate', defaultRate);
        }
        const notifyPhone = settings.admin_notify_phone !== undefined ? settings.admin_notify_phone : settings.notifyPhone;
        if (notifyPhone !== undefined) {
            localStorage.setItem('culture_notify_phone', notifyPhone);
        }
        const gateway = settings.active_payment_gateway || settings.activeGateway;
        if (gateway) {
            localStorage.setItem('culture_payment_gateway', gateway);
            if (typeof window.PaymentService !== 'undefined') {
                window.PaymentService.setActiveProvider(gateway);
            }
        }
        return true;
    }
};
