/**
 * CULTURE Streetwear Co. - Administration
 * Module: Demandes de Retrait & Paiements (Payouts)
 */

(function(window) {
    'use strict';

    let payoutsCache = [];

    function formatPrice(amount) {
        return Number(amount || 0).toLocaleString('fr-FR') + ' FCFA';
    }

    async function initPayoutsModule() {
        const filterSelect = document.getElementById('adminPayoutFilter');
        const refreshBtn = document.getElementById('adminRefreshPayoutsBtn');
        const payModal = document.getElementById('adminPayModal');
        const closePayBtn = document.getElementById('adminClosePayModal');
        const cancelPayBtn = document.getElementById('adminCancelPayBtn');
        const payForm = document.getElementById('adminPayForm');

        if (filterSelect) {
            filterSelect.addEventListener('change', () => filterAndRenderPayouts());
        }
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => loadPayouts());
        }
        if (closePayBtn) {
            closePayBtn.addEventListener('click', () => closePayModal());
        }
        if (cancelPayBtn) {
            cancelPayBtn.addEventListener('click', () => closePayModal());
        }
        if (payForm) {
            payForm.addEventListener('submit', (e) => handleConfirmPayout(e));
        }

        await loadPayouts();
    }

    async function loadPayouts() {
        const tbody = document.getElementById('adminPayoutsTableBody');
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: var(--admin-text-muted);">
                <div class="admin-loading-spinner" style="margin: 0 auto 0.5rem auto;"></div>
                Chargement des demandes de retrait...
            </td></tr>`;
        }

        try {
            payoutsCache = await window.AdminAPI.getPayouts();
            filterAndRenderPayouts();
        } catch (err) {
            console.error('Erreur chargement retraits:', err);
            if (tbody) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: var(--admin-danger); padding: 2rem;">
                    Erreur de chargement : ${err.message}
                </td></tr>`;
            }
        }
    }

    function filterAndRenderPayouts() {
        const tbody = document.getElementById('adminPayoutsTableBody');
        if (!tbody) return;

        const filterVal = document.getElementById('adminPayoutFilter')?.value || 'all';

        const filtered = payoutsCache.filter(p => {
            if (filterVal === 'all') return true;
            return p.status === filterVal;
        });

        const countBadge = document.getElementById('payoutsCountBadge');
        if (countBadge) {
            countBadge.textContent = `${filtered.length} demande(s)`;
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 3rem; color: var(--admin-text-muted);">
                Aucune demande de retrait dans cet état.
            </td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(p => {
            let statusBadge = '<span class="admin-badge admin-badge-warning">⏳ PENDING</span>';
            if (p.status === 'APPROVED') statusBadge = '<span class="admin-badge admin-badge-primary">🔵 APPROVED</span>';
            if (p.status === 'PAID') statusBadge = `<span class="admin-badge admin-badge-success">✅ PAID<br><small style="font-family:monospace; font-size:10px;">${escapeHtml(p.transaction_reference || '')}</small></span>`;
            if (p.status === 'REJECTED') statusBadge = '<span class="admin-badge admin-badge-danger">❌ REJECTED</span>';

            const isActionable = (p.status === 'PENDING' || p.status === 'APPROVED');
            const actions = isActionable ? `
                <div style="display:flex; gap:6px;">
                    <button class="admin-btn admin-btn-sm admin-btn-success" onclick="window.PayoutsModule.openPayModal('${escapeHtml(p.id)}')">
                        ✅ Payer
                    </button>
                    <button class="admin-btn admin-btn-sm admin-btn-outline-danger" onclick="window.PayoutsModule.handleRejectPayout('${escapeHtml(p.id)}')">
                        ❌ Rejeter
                    </button>
                </div>
            ` : `<span style="font-size:12px; color:var(--admin-text-muted);">Traitée</span>`;

            return `
                <tr>
                    <td>
                        <strong style="font-family:monospace; font-size:11px; color:var(--admin-accent);">${escapeHtml(p.id.substring(0, 8))}...</strong>
                    </td>
                    <td>
                        <span class="admin-badge admin-badge-accent" style="font-size:12px;">🏷️ ${escapeHtml(p.referral_code)}</span>
                    </td>
                    <td>
                        <strong style="font-size:14px; color:var(--admin-success);">${formatPrice(p.amount)}</strong>
                    </td>
                    <td>
                        <span style="font-weight:600; color:var(--admin-text);">${escapeHtml(p.payment_method || 'Mobile Money')}</span>
                    </td>
                    <td>
                        <div style="font-weight:600; color:var(--admin-text);">${escapeHtml(p.payment_account || '-')}</div>
                        <div style="font-size:11px; color:var(--admin-text-muted);">${escapeHtml(p.account_name || 'Nom non précisé')}</div>
                    </td>
                    <td>
                        <span style="font-size:12px; color:var(--admin-text-muted);">${escapeHtml(p.date_formatted || (p.requested_at ? p.requested_at.substring(0, 10) : '2026-09'))}</span>
                    </td>
                    <td>${statusBadge}</td>
                    <td>${actions}</td>
                </tr>
            `;
        }).join('');
    }

    function openPayModal(payoutId) {
        const modal = document.getElementById('adminPayModal');
        const payout = payoutsCache.find(p => p.id === payoutId);
        if (!payout || !modal) return;

        document.getElementById('payModalPayoutId').value = payout.id;
        document.getElementById('payModalResellerCode').textContent = payout.referral_code;
        document.getElementById('payModalAmount').textContent = formatPrice(payout.amount);
        document.getElementById('payModalAccount').textContent = `${payout.payment_method} - ${payout.payment_account} (${payout.account_name || ''})`;

        const txInput = document.getElementById('payTxRefInput');
        if (txInput) txInput.value = `MM-${Date.now().toString().slice(-6)}`;

        modal.classList.add('active');
    }

    function closePayModal() {
        const modal = document.getElementById('adminPayModal');
        if (modal) modal.classList.remove('active');
    }

    async function handleConfirmPayout(event) {
        event.preventDefault();
        const payoutId = document.getElementById('payModalPayoutId')?.value;
        const txRef = document.getElementById('payTxRefInput')?.value.trim();
        const note = document.getElementById('payAdminNoteInput')?.value.trim();

        if (!txRef) {
            window.AdminApp.showToast('Veuillez renseigner une référence de transaction.', 'warning');
            return;
        }

        try {
            await window.AdminAPI.updatePayoutStatus(payoutId, 'PAID', txRef, note);
            await window.AdminAPI.logAuditAction('PAYOUT_MARKED_PAID', { payoutId, txRef });
            window.AdminApp.showToast(`Paiement validé avec succès (Réf: ${txRef})`, 'success');
            closePayModal();
            await loadPayouts();
            if (window.DashboardModule) {
                window.DashboardModule.refreshStats();
            }
        } catch (err) {
            console.error('Erreur confirmation paiement:', err);
            window.AdminApp.showToast(`Erreur : ${err.message}`, 'error');
        }
    }

    async function handleRejectPayout(payoutId) {
        const confirmed = confirm("Voulez-vous vraiment rejeter cette demande de retrait ? Le montant sera recrédité sur le solde du revendeur.");
        if (!confirmed) return;

        try {
            await window.AdminAPI.updatePayoutStatus(payoutId, 'REJECTED');
            await window.AdminAPI.logAuditAction('PAYOUT_REJECTED', { payoutId });
            window.AdminApp.showToast('Demande rejetée. Solde recrédité au partenaire.', 'info');
            await loadPayouts();
            if (window.DashboardModule) {
                window.DashboardModule.refreshStats();
            }
        } catch (err) {
            console.error('Erreur rejet retrait:', err);
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

    window.PayoutsModule = {
        init: initPayoutsModule,
        load: loadPayouts,
        openPayModal,
        closePayModal,
        handleRejectPayout
    };

})(window);
