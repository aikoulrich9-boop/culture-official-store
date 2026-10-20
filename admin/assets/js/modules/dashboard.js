/* ==========================================================================
   MODULE: DASHBOARD & KPIS (ADMIN)
   ========================================================================== */

window.AdminDashboard = {
    async init() {
        await this.renderKPIs();
        await this.renderRecentActivity();
    },

    async renderKPIs() {
        const kpiContainer = document.getElementById("adminKpiGrid");
        if (!kpiContainer) return;

        const [products, orders, resellers, payouts] = await Promise.all([
            window.AdminAPI.getProducts(),
            window.AdminAPI.getOrders(),
            window.AdminAPI.getResellers(),
            window.AdminAPI.getPayoutRequests()
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount || o.total) || 0), 0);
        const pendingPayouts = payouts.filter(p => p.status === 'PENDING').length;
        const activeResellers = resellers.filter(r => r.status === 'Actif' || r.status === 'active').length;

        kpiContainer.innerHTML = `
            <div class="kpi-card kpi-highlight-orange">
                <span class="kpi-label">Chiffre d'Affaires</span>
                <span class="kpi-value">${totalRevenue.toLocaleString('fr-FR')} FCFA</span>
                <span class="kpi-sub">${orders.length} commandes enregistrées</span>
            </div>
            <div class="kpi-card kpi-highlight-blue">
                <span class="kpi-label">Catalogue Actif</span>
                <span class="kpi-value">${products.length}</span>
                <span class="kpi-sub">Articles & drops en vente</span>
            </div>
            <div class="kpi-card kpi-highlight-green">
                <span class="kpi-label">Réseau d'Affiliation</span>
                <span class="kpi-value">${activeResellers}</span>
                <span class="kpi-sub">Revendeurs partenaires actifs</span>
            </div>
            <div class="kpi-card ${pendingPayouts > 0 ? 'kpi-highlight-orange' : ''}">
                <span class="kpi-label">Retraits en Attente</span>
                <span class="kpi-value" style="${pendingPayouts > 0 ? 'color:var(--accent-orange);' : ''}">${pendingPayouts}</span>
                <span class="kpi-sub">Demandes à valider</span>
            </div>
        `;
    },

    async renderRecentActivity() {
        const tableBody = document.getElementById("recentOrdersTableBody");
        if (!tableBody) return;

        const orders = await window.AdminAPI.getOrders();
        const recent = orders.slice(0, 5);

        if (recent.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color:var(--text-muted);">Aucune commande récente.</td></tr>`;
            return;
        }

        tableBody.innerHTML = recent.map(o => {
            const statusClass = (o.order_status === 'Livrée' || o.order_status === 'completed') ? 'status-success' : 'status-pending';
            return `
                <tr>
                    <td><strong>${o.id}</strong></td>
                    <td>${o.customer_name || 'Client Invité'}</td>
                    <td><strong>${Number(o.total_amount || 0).toLocaleString('fr-FR')} FCFA</strong></td>
                    <td><span class="status-pill ${statusClass}">${o.order_status || 'En attente'}</span></td>
                    <td>${o.date_formatted || o.created_at?.substring(0, 10) || 'Récemment'}</td>
                </tr>
            `;
        }).join("");
    }
};
