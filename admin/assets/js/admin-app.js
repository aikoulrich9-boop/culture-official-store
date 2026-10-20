/**
 * CULTURE Streetwear Co. - Administration
 * Main Application Controller & Router
 */

(function(window) {
    'use strict';

    let currentTab = 'dashboard';

    const AdminApp = {
        async init() {
            console.log('⚡ Initialisation du Centre d\'Administration CULTURE Streetwear...');
            
            this.bindAuthEvents();
            this.bindNavigationEvents();
            this.bindGlobalEvents();

            // Check session
            const isAuthenticated = await window.AdminAuth.init();
            if (isAuthenticated) {
                this.showApp();
            } else {
                this.showAuth();
            }
        },

        bindAuthEvents() {
            const loginForm = document.getElementById('adminLoginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const email = document.getElementById('loginEmail')?.value.trim();
                    const password = document.getElementById('loginPassword')?.value;
                    const errorMsg = document.getElementById('loginErrorMsg');
                    const submitBtn = document.getElementById('loginSubmitBtn');

                    if (errorMsg) errorMsg.style.display = 'none';
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Connexion sécurisée en cours...';
                    }

                    try {
                        const result = await window.AdminAuth.login(email, password);
                        if (result.success) {
                            this.showToast('Authentification réussie ! Bienvenue.', 'success');
                            this.showApp();
                        } else {
                            if (errorMsg) {
                                errorMsg.textContent = result.message || 'Identifiants invalides.';
                                errorMsg.style.display = 'block';
                            }
                        }
                    } catch (err) {
                        console.error('Erreur login:', err);
                        if (errorMsg) {
                            errorMsg.textContent = err.message || 'Erreur lors de la connexion.';
                            errorMsg.style.display = 'block';
                        }
                    } finally {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Se Connecter à l\'Espace Admin';
                        }
                    }
                });
            }

            const logoutBtn = document.getElementById('adminLogoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (confirm('Voulez-vous vraiment vous déconnecter du centre d\'administration ?')) {
                        await window.AdminAuth.logout();
                        this.showToast('Déconnexion effectuée avec succès.', 'info');
                        this.showAuth();
                    }
                });
            }
        },

        bindNavigationEvents() {
            const navItems = document.querySelectorAll('.admin-nav-item[data-tab]');
            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetTab = item.getAttribute('data-tab');
                    if (targetTab) {
                        this.switchTab(targetTab);
                    }
                });
            });

            // Mobile menu toggle
            const menuToggle = document.getElementById('adminMobileMenuToggle');
            const sidebar = document.querySelector('.admin-sidebar');
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('active');
                });
            }

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('active')) {
                    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                        sidebar.classList.remove('active');
                    }
                }
            });
        },

        bindGlobalEvents() {
            // Close modals when clicking backdrop
            document.querySelectorAll('.admin-modal').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            });

            // Close modals on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    document.querySelectorAll('.admin-modal.active').forEach(m => m.classList.remove('active'));
                }
            });
        },

        showAuth() {
            const authScreen = document.getElementById('adminAuthScreen');
            const layout = document.getElementById('adminLayout');

            if (authScreen) authScreen.style.display = 'flex';
            if (layout) layout.style.display = 'none';

            const emailInput = document.getElementById('loginEmail');
            if (emailInput) emailInput.focus();
        },

        async showApp() {
            const authScreen = document.getElementById('adminAuthScreen');
            const layout = document.getElementById('adminLayout');

            if (authScreen) authScreen.style.display = 'none';
            if (layout) layout.style.display = 'flex';

            // Update user badge in topbar
            const session = window.AdminAuth.getSession();
            const userEmailEl = document.getElementById('adminUserEmail');
            if (userEmailEl && session) {
                userEmailEl.textContent = session.email || 'Admin';
            }

            // Initialize modules once authenticated
            await this.initAllModules();
            this.switchTab('dashboard');
        },

        async initAllModules() {
            try {
                if (window.DashboardModule?.init) await window.DashboardModule.init();
                if (window.ProductsModule?.init) await window.ProductsModule.init();
                if (window.OrdersModule?.init) await window.OrdersModule.init();
                if (window.ResellersModule?.init) await window.ResellersModule.init();
                if (window.PayoutsModule?.init) await window.PayoutsModule.init();
                if (window.CommissionsModule?.init) await window.CommissionsModule.init();
                if (window.AuditModule?.init) await window.AuditModule.init();
                if (window.SettingsModule?.init) await window.SettingsModule.init();
            } catch (err) {
                console.error('Erreur initialisation modules admin:', err);
            }
        },

        switchTab(tabId) {
            currentTab = tabId;

            // Update nav item active classes
            document.querySelectorAll('.admin-nav-item').forEach(item => {
                if (item.getAttribute('data-tab') === tabId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // Show selected pane, hide others
            document.querySelectorAll('.admin-pane').forEach(pane => {
                if (pane.id === `pane-${tabId}`) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });

            // Update topbar breadcrumb
            const titleEl = document.getElementById('adminCurrentViewTitle');
            if (titleEl) {
                const titles = {
                    dashboard: 'Vue d\'Ensemble & Indicateurs Clés',
                    products: 'Gestion du Catalogue & Drops Streetwear',
                    orders: 'Suivi des Commandes & Livraisons',
                    resellers: 'Programme Partenaires & Revendeurs',
                    payouts: 'Demandes de Retrait & Virements Mobile Money',
                    commissions: 'Historique des Commissions Affiliation',
                    audit: 'Journal d\'Audit & Sécurité Opérationnelle',
                    settings: 'Paramètres Généraux & Diagnostic'
                };
                titleEl.textContent = titles[tabId] || 'Administration';
            }

            // Trigger data refresh on tab activation
            switch (tabId) {
                case 'dashboard':
                    if (window.DashboardModule?.refreshStats) window.DashboardModule.refreshStats();
                    break;
                case 'products':
                    if (window.ProductsModule?.load) window.ProductsModule.load();
                    break;
                case 'orders':
                    if (window.OrdersModule?.load) window.OrdersModule.load();
                    break;
                case 'resellers':
                    if (window.ResellersModule?.load) window.ResellersModule.load();
                    break;
                case 'payouts':
                    if (window.PayoutsModule?.load) window.PayoutsModule.load();
                    break;
                case 'commissions':
                    if (window.CommissionsModule?.load) window.CommissionsModule.load();
                    break;
                case 'audit':
                    if (window.AuditModule?.load) window.AuditModule.load();
                    break;
                case 'settings':
                    if (window.SettingsModule?.load) window.SettingsModule.load();
                    break;
            }

            // Close sidebar on mobile
            if (window.innerWidth <= 992) {
                const sidebar = document.querySelector('.admin-sidebar');
                if (sidebar) sidebar.classList.remove('active');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        showToast(message, type = 'info') {
            const container = document.getElementById('adminToastContainer');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `admin-toast admin-toast-${type}`;

            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            toast.innerHTML = `
                <span class="admin-toast-icon">${icons[type] || 'ℹ️'}</span>
                <span class="admin-toast-message">${escapeHtml(message)}</span>
                <button class="admin-toast-close" onclick="this.parentElement.remove()">✕</button>
            `;

            container.appendChild(toast);

            // Auto dismiss after 4.5 seconds
            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 400);
            }, 4500);
        }
    };

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.AdminApp = AdminApp;

    // Bootstrap when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AdminApp.init());
    } else {
        AdminApp.init();
    }

})(window);
