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
       1. CATALOGUE & PRODUITS (SUPABASE CLOUD SYNC + LOCAL FALLBACK)
       ========================================================================== */
    async getProducts() {
        // Catalogue officiel Streetwear PRIORITY synchronisé avec la base Supabase
        const defaultCatalog = [
            { id: "c1", name: "Terra Icon Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 1.png", description: "Sac streetwear noir avec illustration colorée d'un personnage sur la Terre.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c2", name: "Aero Character Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 2.png", description: "Sac bandoulière technique résistant aux intempéries avec personnage à capuche rouge.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c3", name: "Portrait Editorial Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 3.png", description: "Sac portrait artistique premium avec compartiments à double accès rapide.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c4", name: "Camo Beanie Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 4.png", description: "Illustration signature du personnage au bonnet camouflage urbain et bandage streetwear.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c5", name: "All-Star Shooter Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 4_shooter.png", description: "Illustration dynamique du joueur All-Star #12 au tir signature et regard étoilé.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c6", name: "Manga Rebel Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 5.png", description: "Graphisme d'auteur façon croquis manga brut aux hachures expressives et cheveux blonds.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c7", name: "Boxy Silhouette Crossbody", price: 10000, stock: 3, category: "crossbody", image: "IMAGE/c 6.png", description: "Silhouette streetwear underground en veste worker vintage oversize et pantalon cargo large.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "c8", name: "Stealth Blackout Crossbody", price: 8000, stock: 3, category: "crossbody", image: "IMAGE/c 7.png", description: "Édition purement minimaliste All-Black en toile balistique 1680D sans marquage.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "dj1", name: "Veste Hoodie Raw Indigo Denim 480gsm", price: 15000, stock: 10, category: "hoodies", image: "IMAGE/denim_jacket.jpg.png", description: "Veste à capuche zippée en denim brut indigo lourd 480gsm.", sizes: ["S", "M", "L", "XL"], status: "upcoming", preorderBadge: "⏳ BIENTÔT DISPONIBLE", releaseDate: "Bientôt disponible" },
            { id: "sac1", name: "ILLEGAL Blackout Pack Vol.1", price: 12000, stock: 3, category: "backpacks", image: "IMAGE/Sac 1.png", description: "Sac à dos en toile technique noire intense avec logo ILLEGAL brodé.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "sac2", name: "ILLEGAL Star Pack Vol.2", price: 12000, stock: 3, category: "backpacks", image: "IMAGE/Sac 2.png", description: "Version signature de la collection ILLEGAL × Priority.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" },
            { id: "sac4", name: "ILLEGAL Cobalt Icon Pack", price: 12000, stock: 3, category: "backpacks", image: "IMAGE/sac_illegal_cobalt.png", description: "Édition emblématique ILLEGAL × Priority en toile technique bleu cobalt avec macro-étoile blanche et emblème Diesel.", sizes: ["Unique"], status: "available", preorderBadge: "DISPONIBLE", releaseDate: "Immédiat" }
        ];

        // 1. Lecture directe depuis Supabase (Source de vérité Cloud unique)
        if (this.isOnline()) {
            try {
                const { data, error } = await this.getClient().from('products').select('*').order('created_at', { ascending: false });
                if (!error && Array.isArray(data) && data.length > 0) {
                    const filteredData = data.filter(d => d && !['h1', 'cap1'].includes(String(d.id).toLowerCase()));
                    const mapped = filteredData.map(d => {
                        const idLower = String(d.id).toLowerCase();
                        const defMatch = defaultCatalog.find(dp => String(dp.id).toLowerCase() === idLower);
                        // Priorité absolue à total_stock de Supabase
                        const stk = (d.total_stock !== undefined && d.total_stock !== null)
                            ? Number(d.total_stock)
                            : ((d.stock !== undefined && d.stock !== null)
                                ? Number(d.stock)
                                : (defMatch?.stock ?? 3));

                        const cat = d.category || defMatch?.category || 'crossbody';
                        const resolvedCat = (cat && cat !== 'bags')
                            ? cat
                            : (idLower.startsWith('sac') ? 'backpacks' : 'crossbody');

                        const rawStatus = d.status || defMatch?.status || 'available';
                        const resolvedStatus = (rawStatus === 'upcoming') ? 'upcoming' : 'available';
                        const resolvedBadge = (resolvedStatus === 'upcoming')
                            ? (d.preorder_badge || '⏳ BIENTÔT DISPONIBLE')
                            : 'DISPONIBLE';
                        const resolvedRelease = (resolvedStatus === 'upcoming')
                            ? (d.release_date || 'Bientôt disponible')
                            : 'Immédiat';

                        return {
                            id: d.id,
                            name: d.name || defMatch?.name || 'Article PRIORITY',
                            price: (d.price !== undefined && d.price !== null) ? Number(d.price) : (defMatch?.price || 10000),
                            category: resolvedCat,
                            image: d.image || defMatch?.image || 'IMAGE/logo P.png',
                            description: d.description || defMatch?.description || '',
                            sizes: Array.isArray(d.sizes) && d.sizes.length > 0 ? d.sizes : (defMatch?.sizes || ["Unique"]),
                            status: resolvedStatus,
                            preorderBadge: resolvedBadge,
                            releaseDate: resolvedRelease,
                            reservedPercentage: Number(d.reserved_percentage ?? 100),
                            totalStock: stk,
                            reservedStock: Number(d.reserved_stock ?? 0),
                            stock: stk
                        };
                    });

                    localStorage.setItem('culture_products', JSON.stringify(mapped));
                    return mapped;
                }
            } catch (err) {
                console.warn("Lecture Supabase products, repli local:", err);
            }
        }

        const stored = localStorage.getItem('culture_products');
        let products = null;
        if (stored) {
            try {
                products = JSON.parse(stored);
            } catch (e) {}
        }

        if (!Array.isArray(products) || products.length === 0) {
            localStorage.setItem('culture_products', JSON.stringify(defaultCatalog));
            return defaultCatalog;
        }

        products = products.map(p => {
            if (p.stock === undefined || p.stock === null) {
                p.stock = (p.totalStock !== undefined && p.totalStock !== null) ? Number(p.totalStock) : 3;
            }
            return p;
        });

        return products;
    },

    async saveProduct(productPayload) {
        let products = await this.getProducts();
        let targetId = productPayload.id;

        if (targetId) {
            const index = products.findIndex(p => String(p.id).trim().toLowerCase() === String(targetId).trim().toLowerCase());
            if (index !== -1) {
                products[index] = { ...products[index], ...productPayload };
            } else {
                products.unshift(productPayload);
            }
        } else {
            targetId = (window.SupabaseService && window.SupabaseService.generateUUID)
                ? window.SupabaseService.generateUUID()
                : "p_" + Date.now();
            const newProd = {
                ...productPayload,
                id: targetId
            };
            products.unshift(newProd);
            productPayload.id = targetId;
        }

        localStorage.setItem('culture_products', JSON.stringify(products));
        try {
            const rawPurchased = localStorage.getItem('culture_purchased_qty');
            if (rawPurchased && targetId) {
                const map = JSON.parse(rawPurchased);
                delete map[String(targetId).toLowerCase()];
                localStorage.setItem('culture_purchased_qty', JSON.stringify(map));
            }
        } catch (e) {}
        window.dispatchEvent(new CustomEvent('culture_products_updated', { detail: products }));

        // Sync Supabase cloud si connecté
        if (this.isOnline()) {
            try {
                if (window.AdminAuth && typeof window.AdminAuth.refreshSession === 'function') {
                    await window.AdminAuth.refreshSession();
                }
                const targetStock = (productPayload.stock !== undefined && productPayload.stock !== null) ? Number(productPayload.stock) : (Number(productPayload.totalStock) || 3);
                const record = {
                    id: targetId,
                    name: productPayload.name,
                    price: productPayload.price,
                    category: productPayload.category || 'crossbody',
                    image: productPayload.image,
                    description: productPayload.description,
                    sizes: productPayload.sizes || ["Unique"],
                    status: productPayload.status || 'available',
                    preorder_badge: productPayload.preorderBadge || 'DISPONIBLE',
                    release_date: productPayload.releaseDate || 'Immédiat',
                    reserved_percentage: productPayload.reservedPercentage || 100,
                    total_stock: targetStock,
                    reserved_stock: 0,
                    updated_at: new Date().toISOString()
                };
                const { data: savedRows, error } = await this.getClient().from('products').upsert(record).select();
                if (error || !savedRows || savedRows.length === 0) {
                    console.error("❌ Erreur Supabase saveProduct:", error || "0 rows affected (RLS session expirée)");
                    if (window.AdminApp?.showToast) {
                        window.AdminApp.showToast("⚠️ Session Cloud expirée : veuillez vous reconnecter pour enregistrer sur Supabase.", 'warning');
                    }
                } else {
                    console.log("✅ Produit synchronisé sur Supabase Cloud:", targetId, "stock:", savedRows[0]?.total_stock);
                }
            } catch (err) {
                console.warn("Sync Supabase saveProduct repli local:", err);
            }
        }

        return productPayload;
    },

    async deleteProduct(productId) {
        let products = await this.getProducts();
        products = products.filter(p => String(p.id).trim().toLowerCase() !== String(productId).trim().toLowerCase());
        localStorage.setItem('culture_products', JSON.stringify(products));
        try {
            const rawPurchased = localStorage.getItem('culture_purchased_qty');
            if (rawPurchased && productId) {
                const map = JSON.parse(rawPurchased);
                delete map[String(productId).toLowerCase()];
                localStorage.setItem('culture_purchased_qty', JSON.stringify(map));
            }
        } catch (e) {}
        window.dispatchEvent(new CustomEvent('culture_products_updated', { detail: products }));

        if (this.isOnline()) {
            try {
                if (window.AdminAuth && typeof window.AdminAuth.refreshSession === 'function') {
                    await window.AdminAuth.refreshSession();
                }
                const { data: deletedRows, error } = await this.getClient().from('products').delete().eq('id', productId).select();
                if (error || !deletedRows || deletedRows.length === 0) {
                    console.error("❌ Erreur Supabase deleteProduct:", error || "0 rows affected (RLS session expirée)");
                    if (window.AdminApp?.showToast) {
                        window.AdminApp.showToast("⚠️ Session Cloud expirée : veuillez vous reconnecter pour supprimer sur Supabase.", 'warning');
                    }
                } else {
                    console.log("✅ Produit supprimé de Supabase Cloud:", productId);
                }
            } catch (err) {
                console.warn("Sync Supabase deleteProduct repli local:", err);
            }
        }

        return true;
    },

    async resetCatalog() {
        localStorage.removeItem('culture_products');
        const defaultList = await this.getProducts();
        window.dispatchEvent(new CustomEvent('culture_products_updated', { detail: defaultList }));
        return defaultList;
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
