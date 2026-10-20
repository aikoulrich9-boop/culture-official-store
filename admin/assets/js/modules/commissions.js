/**
 * CULTURE Streetwear Co. - Administration
 * Module: Commissions & Rémunérations Partenaires
 */

(function(window) {
    'use strict';

    let commissionsCache = [];

    function formatPrice(amount) {
        return Number(amount || 0).toLocaleString('fr-FR') + ' FCFA';
    }

    async function initCommissionsModule() {
        const searchInput = document.getElementById('adminCommissionSearch');
        const statusFilter = document.getElementById('adminCommissionStatusFilter');
        const refreshBtn = document.getElementById('adminRefreshCommissionsBtn');

        if (searchInput) {
            searchInput.addEventListener('input', () => filterAndRenderCommissions());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => filterAndRenderCommissions());
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadCommissions());
        }

        await loadCommissions();
    }

    async function loadCommissions() {
        const tbody = document.getElementById('adminCommissionsTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
                <div class="admin-loading-spinner" style="margin: 0 auto 0.5rem auto;"></div>
                Chargement de l'historique des commissions...
            </td></tr>`;
        }

        try {
            commissionsCache = await window.AdminAPI.getCommissions();
            filterAndRenderCommissions();
        } catch (err) {
            console.error('Erreur chargement commissions:', err);
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--admin-danger); padding: 2rem;">
                    Erreur : ${err.message}
                </td></tr>`;
            }
        }
    }

    function filterAndRenderCommissions() {
        const tbody = document.getElementById('adminCommissionsTableBody');
        if (!tbody) return;

        const searchVal = (document.getElementById('adminCommissionSearch')?.value || '').toLowerCase().trim();
        const statusVal = document.getElementById('adminCommissionStatusFilter')?.value || 'all';

        const filtered = commissionsCache.filter(c => {
            const status = (c.status || 'PENDING').toUpperCase();
            const matchStatus = (statusVal === 'all') || (status === statusVal);
            const matchSearch = !searchVal ||
                (c.order_id && c.order_id.toLowerCase().includes(searchVal)) ||
                (c.referral_code && c.referral_code.toLowerCase().includes(searchVal));
            return matchStatus && matchSearch;
        });

        const countBadge = document.getElementById('commissionsCountBadge');
        if (countBadge) {
            countBadge.textContent = `${filtered.length} ligne(s)`;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 3rem; color: var(--admin-text-muted);">
                Aucune commission trouvée.
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(c => {
            const status = (c.status || 'PENDING').toUpperCase();
            let badgeClass = 'admin-badge-warning';
            if (status === 'VALIDATED') badgeClass = 'admin-badge-success';
            if (status === 'PAID') badgeClass = 'admin-badge-primary';
            if (status === 'CANCELLED') badgeClass = 'admin-badge-danger';

            return `
                <tr>
                    <td>
                        <strong style="font-family:monospace; font-size:12px; color:var(--admin-accent);">#${escapeHtml(c.order_id || 'N/A')}</strong>
                    </td>
                    <td>
                        <span class="admin-badge admin-badge-accent" style="font-size:12px;">🏷️ ${escapeHtml(c.referral_code || '-')}</span>
                    </td>
                    <td>
                        <span style="font-size:13px; color:var(--admin-text);">${formatPrice(c.order_total || 0)}</span>
                    </td>
                    <td>
                        <strong style="font-size:13px; color:var(--admin-text);">${c.rate || 10}%</strong>
                    </td>
                    <td>
                        <strong style="font-size:14px; color:var(--admin-success);">${formatPrice(c.amount || 0)}</strong>
                    </td>
                    <td>
                        <span class="admin-badge ${badgeClass}">${status}</span>
                    </td>
                    <td>
                        <span style="font-size:12px; color:var(--admin-text-muted);">${escapeHtml(c.created_at ? c.created_at.substring(0, 16).replace('T', ' ') : '-')}</span>
                    </td>
                </tr>
            `;
        }).join('');
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

    window.CommissionsModule = {
        init: initCommissionsModule,
        load: loadCommissions
    };

})(window);
