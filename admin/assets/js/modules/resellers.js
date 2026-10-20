/**
 * CULTURE Streetwear Co. - Administration
 * Module: Revendeurs & Affiliation (Resellers)
 */

(function(window) {
    'use strict';

    let resellersCache = [];

    async function initResellersModule() {
        const searchInput = document.getElementById('adminResellerSearch');
        const refreshBtn = document.getElementById('adminRefreshResellersBtn');
        const createBtn = document.getElementById('adminOpenCreateResellerBtn');
        const modal = document.getElementById('adminCreateResellerModal');
        const closeBtn = document.getElementById('adminCloseCreateResellerModal');
        const cancelBtn = document.getElementById('adminCancelCreateResellerBtn');
        const form = document.getElementById('adminCreateResellerForm');

        if (searchInput) {
            searchInput.addEventListener('input', () => filterAndRenderResellers());
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadResellers());
        }
        if (createBtn) {
            createBtn.addEventListener('click', () => openCreateModal());
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeCreateModal());
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => closeCreateModal());
        }
        if (form) {
            form.addEventListener('submit', (e) => handleCreateReseller(e));
        }

        await loadResellers();
    }

    async function loadResellers() {
        const tbody = document.getElementById('adminResellersTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
                <div class="admin-loading-spinner" style="margin: 0 auto 0.5rem auto;"></div>
                Chargement des revendeurs partenaires...
            </td></tr>`;
        }

        try {
            resellersCache = await window.AdminAPI.getResellers();
            filterAndRenderResellers();
        } catch (err) {
            console.error('Erreur chargement revendeurs:', err);
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: var(--admin-danger); padding: 2rem;">
                    Erreur de chargement : ${err.message}
                </td></tr>`;
            }
        }
    }

    function filterAndRenderResellers() {
        const tbody = document.getElementById('adminResellersTableBody');
        if (!tbody) return;

        const searchVal = (document.getElementById('adminResellerSearch')?.value || '').toLowerCase().trim();

        const filtered = resellersCache.filter(r => {
            const name = (r.name || '').toLowerCase();
            const code = (r.code || r.referral_code || '').toLowerCase();
            const email = (r.email || '').toLowerCase();
            const phone = (r.phone || '').toLowerCase();
            return !searchVal || name.includes(searchVal) || code.includes(searchVal) || email.includes(searchVal) || phone.includes(searchVal);
        });

        const countBadge = document.getElementById('resellersCountBadge');
        if (countBadge) {
            countBadge.textContent = `${filtered.length} partenaire(s)`;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 3rem; color: var(--admin-text-muted);">
                Aucun revendeur trouvé. Cliquez sur "Nouveau Partenaire" pour en enregistrer un.
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(r => {
            const code = r.code || r.referral_code || 'N/A';
            const rate = r.commission_rate || r.rate || 10;
            const status = r.status || 'Actif';
            const isActive = status === 'Actif' || status === 'active';

            return `
                <tr>
                    <td>
                        <span class="admin-badge admin-badge-accent" style="font-size:12px; font-weight:700; letter-spacing:0.05em;">
                            🏷️ ${escapeHtml(code)}
                        </span>
                    </td>
                    <td>
                        <div style="font-weight:600; color:var(--admin-text);">${escapeHtml(r.name)}</div>
                        <div style="font-size:11px; color:var(--admin-text-muted); margin-top:2px;">
                            📞 ${escapeHtml(r.phone || '-')} | ✉️ ${escapeHtml(r.email || '-')}
                        </div>
                    </td>
                    <td>
                        <span style="font-size:12px; color:var(--admin-text);">${escapeHtml(r.country || 'Bénin')}</span>
                    </td>
                    <td>
                        <div style="display:flex; align-items:center; gap:6px;">
                            <input type="number" 
                                class="admin-input" 
                                value="${rate}" 
                                min="1" 
                                max="50" 
                                style="width:65px; padding:4px 6px; font-size:12px; text-align:center;" 
                                onchange="window.ResellersModule.handleUpdateRate('${escapeHtml(r.id)}', this.value)">
                            <span style="font-size:12px; font-weight:600; color:var(--admin-text-muted);">%</span>
                        </div>
                    </td>
                    <td>
                        <div style="font-size:12px; font-weight:600; color:var(--admin-text);">
                            ${escapeHtml(r.payout_method || 'Mobile Money')}
                        </div>
                        <div style="font-size:11px; color:var(--admin-text-muted);">
                            ${escapeHtml(r.payout_account || r.phone || '-')}
                        </div>
                    </td>
                    <td>
                        <span class="admin-badge ${isActive ? 'admin-badge-success' : 'admin-badge-danger'}">
                            ${isActive ? '● Actif' : '○ Suspendu'}
                        </span>
                    </td>
                    <td>
                        <span style="font-size:11px; color:var(--admin-text-muted);">
                            ${escapeHtml(r.created_at ? r.created_at.substring(0, 10) : '2026-09')}
                        </span>
                    </td>
                    <td>
                        <div style="display:flex; gap:6px;">
                            <button class="admin-btn admin-btn-sm ${isActive ? 'admin-btn-outline-danger' : 'admin-btn-outline-success'}" 
                                onclick="window.ResellersModule.handleToggleStatus('${escapeHtml(r.id)}', '${escapeHtml(status)}')">
                                ${isActive ? 'Suspendre' : 'Réactiver'}
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    async function handleUpdateRate(resellerId, newRate) {
        const rateVal = parseInt(newRate, 10);
        if (isNaN(rateVal) || rateVal < 1 || rateVal > 50) {
            window.AdminApp.showToast('Le taux doit être compris entre 1% et 50%', 'warning');
            return;
        }

        try {
            await window.AdminAPI.updateReseller(resellerId, {
                commission_rate: rateVal,
                rate: rateVal
            });
            await window.AdminAPI.logAuditAction('RESELLER_RATE_UPDATED', { resellerId, newRate: rateVal });
            window.AdminApp.showToast('Taux de commission actualisé avec succès', 'success');
        } catch (err) {
            console.error('Erreur mise à jour taux:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    async function handleToggleStatus(resellerId, currentStatus) {
        const isActive = currentStatus === 'Actif' || currentStatus === 'active';
        const newStatus = isActive ? 'Suspendu' : 'Actif';

        try {
            await window.AdminAPI.updateReseller(resellerId, { status: newStatus });
            await window.AdminAPI.logAuditAction('RESELLER_STATUS_CHANGED', { resellerId, newStatus });
            window.AdminApp.showToast(`Partenaire ${newStatus === 'Actif' ? 'réactivé' : 'suspendu'} avec succès`, 'success');
            await loadResellers();
        } catch (err) {
            console.error('Erreur changement statut revendeur:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    function openCreateModal() {
        const modal = document.getElementById('adminCreateResellerModal');
        const form = document.getElementById('adminCreateResellerForm');
        if (form) form.reset();
        if (modal) modal.classList.add('active');
    }

    function closeCreateModal() {
        const modal = document.getElementById('adminCreateResellerModal');
        if (modal) modal.classList.remove('active');
    }

    async function handleCreateReseller(event) {
        event.preventDefault();

        const name = document.getElementById('newResellerName')?.value.trim();
        const phone = document.getElementById('newResellerPhone')?.value.trim();
        const email = document.getElementById('newResellerEmail')?.value.trim();
        const code = document.getElementById('newResellerCode')?.value.trim().toUpperCase();
        const rate = parseInt(document.getElementById('newResellerRate')?.value || '10', 10);
        const country = document.getElementById('newResellerCountry')?.value || 'Bénin';

        if (!name || !phone || !code) {
            window.AdminApp.showToast('Veuillez remplir au moins le nom, téléphone et code revendeur.', 'warning');
            return;
        }

        try {
            const created = await window.AdminAPI.createReseller({
                name,
                phone,
                email,
                code,
                rate,
                country
            });

            await window.AdminAPI.logAuditAction('RESELLER_CREATED', { code, name });
            window.AdminApp.showToast(`Revendeur "${created.name}" (${created.code}) créé avec succès !`, 'success');
            closeCreateModal();
            await loadResellers();
            if (window.DashboardModule) {
                window.DashboardModule.refreshStats();
            }
        } catch (err) {
            console.error('Erreur création revendeur:', err);
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

    window.ResellersModule = {
        init: initResellersModule,
        load: loadResellers,
        handleUpdateRate,
        handleToggleStatus,
        openCreateModal,
        closeCreateModal
    };

})(window);
