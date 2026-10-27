/* ==========================================================================
   MODULE: DASHBOARD & KPIS (ADMIN)
   ========================================================================== */

window.AdminDashboard = {
    async init() {
        const refreshBtn = document.getElementById('dashboardRefreshBtn');
        if (refreshBtn && !refreshBtn.dataset.bound) {
            refreshBtn.dataset.bound = 'true';
            refreshBtn.addEventListener('click', async () => {
                const origHtml = refreshBtn.innerHTML;
                refreshBtn.disabled = true;
                refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualisation...';
                try {
                    await Promise.all([this.renderKPIs(), this.renderRecentActivity()]);
                    if (window.AdminApp?.showToast) {
                        window.AdminApp.showToast('Indicateurs et commandes actualisés.', 'info');
                    }
                } finally {
                    refreshBtn.disabled = false;
                    refreshBtn.innerHTML = origHtml;
                }
            });
        }
        await this.renderKPIs();
        await this.renderRecentActivity();
    },

    async renderKPIs() {
        // The HTML has individual KPI value elements rather than a replaceable grid container
        const [products, orders, resellers, payouts] = await Promise.all([
            window.AdminAPI.getProducts(),
            window.AdminAPI.getOrders(),
            window.AdminAPI.getResellers(),
            window.AdminAPI.getPayoutRequests()
        ]);

        const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount || o.total) || 0), 0);
        const pendingPayoutsAmt = payouts.filter(p => p.status === 'PENDING').reduce((s, p) => s + (Number(p.amount) || 0), 0);
        const activeResellers = resellers.filter(r => r.status === 'Actif' || r.status === 'active').length;

        const el = id => document.getElementById(id);
        if (el('kpiTotalRevenue')) el('kpiTotalRevenue').textContent = totalRevenue.toLocaleString('fr-FR') + ' FCFA';
        if (el('kpiTotalOrders')) el('kpiTotalOrders').textContent = orders.length;
        if (el('kpiPendingPayouts')) el('kpiPendingPayouts').textContent = pendingPayoutsAmt.toLocaleString('fr-FR') + ' FCFA';
        if (el('kpiActiveResellers')) el('kpiActiveResellers').textContent = activeResellers;
    },

    async renderRecentActivity() {
        // ID in HTML is dashboardRecentOrdersBody
        const tableBody = document.getElementById('dashboardRecentOrdersBody');
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
