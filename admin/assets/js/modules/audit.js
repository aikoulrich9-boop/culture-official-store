/**
 * CULTURE Streetwear Co. - Administration
 * Module: Journal d'Audit & Sécurité (Audit Log)
 */

(function(window) {
    'use strict';

    let auditCache = [];

    async function initAuditModule() {
        const searchInput = document.getElementById('adminAuditSearch');
        const refreshBtn = document.getElementById('adminRefreshAuditBtn');

        if (searchInput) {
            searchInput.addEventListener('input', () => filterAndRenderAudit());
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadAudit());
        }

        await loadAudit();
    }

    async function loadAudit() {
        const tbody = document.getElementById('adminAuditTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
                <div class="admin-loading-spinner" style="margin: 0 auto 0.5rem auto;"></div>
                Chargement des journaux de sécurité...
            </td></tr>`;
        }

        try {
            auditCache = await window.AdminAPI.getAuditLog();
            filterAndRenderAudit();
        } catch (err) {
            console.error('Erreur chargement audit log:', err);
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--admin-danger); padding: 2rem;">
                    Erreur : ${err.message}
                </td></tr>`;
            }
        }
    }

    function filterAndRenderAudit() {
        const tbody = document.getElementById('adminAuditTableBody');
        if (!tbody) return;

        const searchVal = (document.getElementById('adminAuditSearch')?.value || '').toLowerCase().trim();

        const filtered = auditCache.filter(item => {
            const action = (item.action || '').toLowerCase();
            const admin = (item.admin_user || item.admin_email || '').toLowerCase();
            const details = typeof item.details === 'object' ? JSON.stringify(item.details).toLowerCase() : String(item.details || '').toLowerCase();
            return !searchVal || action.includes(searchVal) || admin.includes(searchVal) || details.includes(searchVal);
        });

        const countBadge = document.getElementById('auditCountBadge');
        if (countBadge) {
            countBadge.textContent = `${filtered.length} évènement(s)`;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 3rem; color: var(--admin-text-muted);">
                Aucune entrée d'audit enregistrée.
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(item => {
            let actionBadge = 'admin-badge-neutral';
            const action = item.action || 'ACTION';
            if (action.includes('PAYOUT') || action.includes('PAID')) actionBadge = 'admin-badge-success';
            if (action.includes('DELETE') || action.includes('REJECT') || action.includes('SUSPEND')) actionBadge = 'admin-badge-danger';
            if (action.includes('LOGIN') || action.includes('AUTH')) actionBadge = 'admin-badge-primary';
            if (action.includes('UPDATE') || action.includes('SAVE')) actionBadge = 'admin-badge-warning';

            const detailsStr = typeof item.details === 'object' 
                ? JSON.stringify(item.details, null, 1) 
                : (item.details || '-');

            return `
                <tr>
                    <td>
                        <span style="font-family:monospace; font-size:12px; color:var(--admin-text-muted);">
                            ${escapeHtml(item.created_at ? item.created_at.substring(0, 19).replace('T', ' ') : 'N/A')}
                        </span>
                    </td>
                    <td>
                        <span class="admin-badge ${actionBadge}" style="font-family:monospace; font-size:11px;">
                            ${escapeHtml(action)}
                        </span>
                    </td>
                    <td>
                        <div style="font-size:12px; font-weight:600; color:var(--admin-text);">
                            👤 ${escapeHtml(item.admin_user || item.admin_email || 'admin@culture.com')}
                        </div>
                    </td>
                    <td>
                        <pre style="font-size:11px; margin:0; font-family:monospace; color:var(--admin-text-secondary); background:var(--admin-bg-hover); padding:4px 8px; border-radius:4px; max-width:320px; overflow-x:auto;">${escapeHtml(detailsStr)}</pre>
                    </td>
                    <td>
                        <span style="font-size:11px; color:var(--admin-text-muted); font-family:monospace;">
                            ${escapeHtml(item.ip_address || 'Local/Internal')}
                        </span>
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

    window.AuditModule = {
        init: initAuditModule,
        load: loadAudit
    };

})(window);
