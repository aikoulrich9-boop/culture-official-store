/**
 * CULTURE Streetwear Co. - Administration
 * Module: Commandes (Orders)
 */

(function(window) {
    'use strict';

    let ordersCache = [];

    function formatPrice(amount) {
        return Number(amount || 0).toLocaleString('fr-FR') + ' FCFA';
    }

    async function initOrdersModule() {
        const searchInput = document.getElementById('adminOrderSearch');
        const statusFilter = document.getElementById('adminOrderStatusFilter');
        const refreshBtn = document.getElementById('adminRefreshOrdersBtn');

        if (searchInput) {
            searchInput.addEventListener('input', () => filterAndRenderOrders());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => filterAndRenderOrders());
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadOrders());
        }

        await loadOrders();
    }

    async function loadOrders() {
        const tbody = document.getElementById('adminOrdersTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
                <div class="admin-loading-spinner" style="margin: 0 auto 0.5rem auto;"></div>
                Chargement des commandes...
            </td></tr>`;
        }

        try {
            ordersCache = await window.AdminAPI.getOrders();
            filterAndRenderOrders();
        } catch (err) {
            console.error('Erreur chargement commandes:', err);
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--admin-danger); padding: 2rem;">
                    Impossible de charger les commandes : ${err.message}
                </td></tr>`;
            }
        }
    }

    function filterAndRenderOrders() {
        const tbody = document.getElementById('adminOrdersTableBody');
        if (!tbody) return;

        const searchVal = (document.getElementById('adminOrderSearch')?.value || '').toLowerCase().trim();
        const statusVal = document.getElementById('adminOrderStatusFilter')?.value || 'all';

        const filtered = ordersCache.filter(o => {
            const currentStatus = o.order_status || o.status || 'En attente';
            const matchStatus = (statusVal === 'all') || (currentStatus === statusVal);
            const matchSearch = !searchVal ||
                (o.id && o.id.toLowerCase().includes(searchVal)) ||
                (o.customer_name && o.customer_name.toLowerCase().includes(searchVal)) ||
                (o.customer_phone && o.customer_phone.toLowerCase().includes(searchVal)) ||
                (o.referral_code && o.referral_code.toLowerCase().includes(searchVal));
            return matchStatus && matchSearch;
        });

        const countBadge = document.getElementById('ordersCountBadge');
        if (countBadge) {
            countBadge.textContent = `${filtered.length} commande(s)`;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 3rem; color: var(--admin-text-muted);">
                Aucune commande ne correspond aux critères de recherche.
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(o => {
            const itemsText = Array.isArray(o.items) && o.items.length > 0
                ? o.items.map(i => `<span style="display:inline-block; margin-bottom:2px;">• <strong>${escapeHtml(i.name || 'Article')}</strong> (x${i.quantity || 1}${i.size ? ', T.' + i.size : ''})</span>`).join('<br>')
                : '<span style="color:var(--admin-text-muted);">Articles variés</span>';

            const resellerBadge = o.referral_code 
                ? `<span class="admin-badge admin-badge-success" style="font-size:11px;">
                    🏷️ ${escapeHtml(o.referral_code)} (${o.commission_rate || 10}%)<br>
                    Comm: ${formatPrice(o.commission_amount || 0)}
                   </span>`
                : `<span class="admin-badge admin-badge-neutral" style="font-size:11px; opacity:0.65;">Vente Directe</span>`;

            const currentStatus = o.order_status || o.status || 'En attente';
            const resStatus = o.reservation_status || (currentStatus === 'confirmed' || currentStatus === 'Livrée' ? 'CONFIRMED' : (currentStatus === 'cancelled' || currentStatus === 'Annulée' ? 'RELEASED' : 'ACTIVE'));
            const isExpired = resStatus === 'EXPIRED' || (resStatus === 'ACTIVE' && o.reservation_expires_at && new Date(o.reservation_expires_at) < new Date());

            let resBadge = '<span class="admin-badge admin-badge-warning" style="font-size:10px;">⏳ Réservation Active</span>';
            if (resStatus === 'CONFIRMED') {
                resBadge = '<span class="admin-badge admin-badge-success" style="font-size:10px;">🔒 Stock Décrémenté</span>';
            } else if (resStatus === 'RELEASED') {
                resBadge = '<span class="admin-badge admin-badge-neutral" style="font-size:10px;">🔓 Stock Libéré</span>';
            } else if (isExpired) {
                resBadge = '<span class="admin-badge admin-badge-danger" style="font-size:10px;">⚠️ Réservation Expirée</span>';
            }

            return `
                <tr>
                    <td>
                        <strong style="font-family:monospace; font-size:12px; color:var(--admin-accent);">${escapeHtml(o.id)}</strong>
                        <div style="margin-top:3px;">${resBadge}</div>
                    </td>
                    <td>
                        <span style="font-size:12px; color:var(--admin-text-muted);">${escapeHtml(o.date_formatted || (o.created_at ? o.created_at.substring(0, 16).replace('T', ' ') : 'Récente'))}</span>
                        ${o.reservation_expires_at ? `<div style="font-size:10px; color:var(--admin-text-muted);">Exp: ${escapeHtml(o.reservation_expires_at.substring(11, 19))}</div>` : ''}
                    </td>
                    <td>
                        <div style="font-weight:600; color:var(--admin-text);">${escapeHtml(o.customer_name || 'Client Invité')}</div>
                        <div style="font-size:11px; color:var(--admin-text-muted); margin-top:2px;">
                            📞 ${escapeHtml(o.customer_phone || 'Non renseigné')} | 📍 ${escapeHtml(o.delivery_city || o.country || 'Bénin')}
                        </div>
                    </td>
                    <td>
                        <div style="font-size:12px; line-height:1.4; max-width:240px;">${itemsText}</div>
                    </td>
                    <td>
                        <strong style="font-size:14px; color:var(--admin-text);">${formatPrice(o.total_amount || o.total || 0)}</strong>
                        ${o.subtotal_amount && o.subtotal_amount !== o.total_amount ? `<div style="font-size:10px; color:var(--admin-text-muted);">Sous-total: ${formatPrice(o.subtotal_amount)}</div>` : ''}
                    </td>
                    <td>
                        <select class="admin-select admin-select-sm" 
                            style="min-width: 150px; font-weight:600;" 
                            data-order-id="${escapeHtml(o.id)}"
                            onchange="window.OrdersModule.handleChangeStatus('${escapeHtml(o.id)}', this.value)">
                            <option value="pending_whatsapp" ${currentStatus === 'pending_whatsapp' || currentStatus === 'En attente' ? 'selected' : ''}>⏳ En attente WhatsApp</option>
                            <option value="confirmed" ${currentStatus === 'confirmed' || currentStatus === 'Livrée' ? 'selected' : ''}>✅ Confirmée (Décrémente Stock)</option>
                            <option value="Pré-commande" ${currentStatus === 'Pré-commande' ? 'selected' : ''}>⚡ Pré-commande</option>
                            <option value="cancelled" ${currentStatus === 'cancelled' || currentStatus === 'Annulée' ? 'selected' : ''}>❌ Annulée (Libère Stock)</option>
                            <option value="expired" ${currentStatus === 'expired' ? 'selected' : ''}>⏱️ Expirée</option>
                        </select>
                    </td>
                    <td>${resellerBadge}</td>
                </tr>
            `;
        }).join('');
    }

    async function handleChangeStatus(orderId, newStatus) {
        try {
            await window.AdminAPI.updateOrderStatus(orderId, newStatus);
            await window.AdminAPI.logAuditAction('ORDER_STATUS_CHANGED', { orderId, newStatus });
            window.AdminApp.showToast(`Statut de la commande #${orderId.substring(0, 8)} mis à jour : ${newStatus}`, 'success');
            await loadOrders();
            if (window.AdminDashboard?.renderKPIs) {
                window.AdminDashboard.renderKPIs();
            } else if (window.DashboardModule?.refreshStats) {
                window.DashboardModule.refreshStats();
            }
        } catch (err) {
            console.error('Erreur changement statut:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.OrdersModule = {
        init: initOrdersModule,
        load: loadOrders,
        handleChangeStatus
    };

})(window);
