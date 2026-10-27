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
        const stored = localStorage.getItem('culture_products');
        let products = null;
        if (stored) {
            try {
                products = JSON.parse(stored);
            } catch (e) {}
        }
        
        // Catalogue officiel Streetwear CULTURE avec vraies images
        const defaultCatalog = [
            { id: "c1", name: "Terra Icon Crossbody", price: 8000, category: "bags", image: "IMAGE/c 1.png", description: "Sac streetwear noir avec illustration colorée d'un personnage sur la Terre.", sizes: ["Unique"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "15 Oct. 2026" },
            { id: "c2", name: "Aero Character Crossbody", price: 8000, category: "bags", image: "IMAGE/c 2.png", description: "Sac bandoulière technique résistant aux intempéries avec personnage à capuche rouge.", sizes: ["Unique"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "15 Oct. 2026" },
            { id: "c3", name: "Portrait Editorial Crossbody", price: 8000, category: "bags", image: "IMAGE/c 3.png", description: "Sac portrait artistique premium avec compartiments à double accès rapide.", sizes: ["Unique"], status: "upcoming", preorderBadge: "⏳ DROP IMMINENT", releaseDate: "28 Oct. 2026" },
            { id: "c4", name: "Minimalist Utility Crossbody", price: 8000, category: "bags", image: "IMAGE/c 4.png", description: "Structure ultra-épurée en tissage balistique ultra-durable 1680D.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "h1", name: "Heavyweight Boxy Hoodie", price: 8000, category: "hoodies", image: "IMAGE/hoodie.jpg", description: "Hoodie en coton bio haute densité 450gsm avec coupe ample.", sizes: ["S", "M", "L", "XL"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "20 Oct. 2026" },
            { id: "t1", name: "Creator Studio Tee", price: 8000, category: "tees", image: "IMAGE/tee.jpg", description: "T-shirt en jersey de coton peigné imprimé d'illustrations graphiques.", sizes: ["S", "M", "L", "XL"], status: "upcoming", preorderBadge: "⏳ DROP / PRÉVENTE", releaseDate: "28 Oct. 2026" },
            { id: "cap1", name: "Urban Explorer Cap", price: 8000, category: "caps", image: "IMAGE/cap.jpg", description: "Casquette classique utilitaire à 6 panneaux.", sizes: ["Taille Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "dj1", name: "Veste Hoodie Raw Indigo Denim 480gsm", price: 12000, category: "hoodies", image: "IMAGE/denim_jacket.jpg", description: "Veste à capuche zippée en denim brut indigo lourd 480gsm.", sizes: ["S", "M", "L", "XL"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "15 Oct. 2026" },
            { id: "sac1", name: "ILLEGAL Blackout Pack Vol.1", price: 12000, category: "bags", image: "IMAGE/sac_illegal_black.png", description: "Sac à dos en toile technique noire intense avec logo ILLEGAL brodé.", sizes: ["Unique"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "15 Oct. 2026" },
            { id: "sac2", name: "ILLEGAL Star Pack Vol.2", price: 12000, category: "bags", image: "IMAGE/sac_illegal_star.png", description: "Version signature de la collection ILLEGAL × Priority.", sizes: ["Unique"], status: "preorder", preorderBadge: "⚡ DROP / PRÉVENTE", releaseDate: "15 Oct. 2026" },
            { id: "sac3", name: "ILLEGAL Ocean Camo Pack", price: 14000, category: "bags", image: "IMAGE/sac_illegal_blue.png", description: "Edition premium en tissu camo aquatique bleu céruléen.", sizes: ["Unique"], status: "upcoming", preorderBadge: "⏳ DROP LIMITÉ", releaseDate: "28 Oct. 2026" }
        ];

        if (!Array.isArray(products) || products.length === 0) {
            localStorage.setItem('culture_products', JSON.stringify(defaultCatalog));
            return defaultCatalog;
        }

        // Auto-réparation des images manquantes ou obsolètes dans le cache utilisateur
        let updated = false;
        const imageRepairs = {
            'terra icon': 'IMAGE/c 1.png',
            'aero character': 'IMAGE/c 2.png',
            'portrait editorial': 'IMAGE/c 3.png',
            'minimalist utility': 'IMAGE/c 4.png',
            'heavyweight boxy': 'IMAGE/hoodie.jpg',
            'creator studio': 'IMAGE/tee.jpg',
            'raw edge studio': 'IMAGE/tee.jpg',
            'urban explorer': 'IMAGE/cap.jpg',
            'raw indigo denim': 'IMAGE/denim_jacket.jpg',
            'illegal blackout': 'IMAGE/sac_illegal_black.png',
            'illegal star': 'IMAGE/sac_illegal_star.png',
            'illegal ocean': 'IMAGE/sac_illegal_blue.png',
            'culture core': 'IMAGE/c 2.png',
            'phantom utility': 'IMAGE/c 3.png'
        };

        products = products.map(p => {
            const nameLower = (p.name || '').toLowerCase();
            const badImg = !p.image || p.image.includes('Sac ') || p.image.includes('logo P.png');
            if (badImg) {
                for (const [key, validImg] of Object.entries(imageRepairs)) {
                    if (nameLower.includes(key)) {
                        p.image = validImg;
                        updated = true;
                        break;
                    }
                }
            }
            return p;
        });

        if (updated) {
            localStorage.setItem('culture_products', JSON.stringify(products));
        }

        return products;
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
