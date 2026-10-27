/* ==========================================================================
   MODULE: PRODUCTS & CATALOGUE MANAGEMENT (ADMIN)
   CULTURE Streetwear Co. — Ultra-Premium Glassmorphic Admin
   ========================================================================== */

(function(window) {
    'use strict';

    function resolveProductImage(imgPath) {
        if (!imgPath) return '../IMAGE/logo P.png';
        const trimmed = String(imgPath).trim();
        if (!trimmed) return '../IMAGE/logo P.png';
        if (trimmed.startsWith('data:') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            return trimmed;
        }
        if (trimmed.startsWith('../')) {
            return trimmed;
        }
        if (trimmed.startsWith('/IMAGE/')) {
            return '..' + trimmed;
        }
        if (trimmed.startsWith('IMAGE/')) {
            return '../' + trimmed;
        }
        if (trimmed.startsWith('/')) {
            return '..' + trimmed;
        }
        return '../' + trimmed;
    }

    const AdminProducts = {
        currentImageData: "",

        async init() {
            // Toolbar buttons
            const createBtn = document.getElementById('adminOpenCreateProductBtn');
            if (createBtn) createBtn.onclick = () => this.openModal();

            const resetBtn = document.getElementById('adminResetCatalogBtn');
            if (resetBtn) resetBtn.onclick = () => this.resetPrompt();

            const searchInput = document.getElementById('adminSearchProduct');
            if (searchInput) searchInput.oninput = () => this.render();

            const catFilter = document.getElementById('adminCategoryFilter');
            if (catFilter) catFilter.onchange = () => this.render();

            // Form submit
            const form = document.getElementById('adminProductForm');
            if (form) form.onsubmit = (e) => this.handleSubmit(e);

            // File input
            const fileInput = document.getElementById('prodFile');
            if (fileInput) fileInput.onchange = (e) => this.handleImageSelect(e);

            // Image URL live input
            const urlInput = document.getElementById('prodImageUrl');
            if (urlInput) {
                urlInput.oninput = (e) => {
                    const val = e.target.value.trim();
                    if (val) {
                        this.currentImageData = val;
                        this.updatePreview(val);
                    }
                };
            }

            // Close & Cancel buttons
            const closeBtn = document.getElementById('adminCloseProductModal');
            if (closeBtn) closeBtn.onclick = () => this.closeModal();

            const cancelBtn = document.getElementById('adminCancelProductBtn');
            if (cancelBtn) cancelBtn.onclick = () => this.closeModal();

            // Remove photo button
            const removeBtn = document.getElementById('removePhotoBtn');
            if (removeBtn) {
                removeBtn.onclick = () => {
                    this.currentImageData = "";
                    const preview = document.getElementById('imagePreviewImg');
                    const placeholder = document.getElementById('imagePreviewPlaceholder');
                    const urlInp = document.getElementById('prodImageUrl');
                    const fileInp = document.getElementById('prodFile');
                    if (preview) { preview.src = ""; preview.style.display = "none"; }
                    if (placeholder) placeholder.style.display = "block";
                    if (urlInp) urlInp.value = "";
                    if (fileInp) fileInp.value = "";
                    removeBtn.style.display = "none";
                };
            }

            // Preorder checkbox toggle
            const preCheck = document.getElementById('prodIsPreorder');
            if (preCheck) {
                preCheck.onchange = (e) => this.togglePreorderFields(e.target.checked);
            }

            await this.render();
        },

        async render() {
            const tbody = document.getElementById("adminProductsTableBody");
            if (!tbody) return;

            const countBadge = document.getElementById("adminProductsCountBadge") || document.querySelector("#pane-products .admin-badge");
            const products = await window.AdminAPI.getProducts();
            const search = document.getElementById("adminSearchProduct")?.value.toLowerCase().trim() || "";
            const cat = document.getElementById("adminCategoryFilter")?.value || "all";

            const filtered = products.filter(p => {
                const matchCat = cat === "all" || p.category === cat;
                const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.description && p.description.toLowerCase().includes(search));
                return matchCat && matchSearch;
            });

            if (countBadge) {
                countBadge.textContent = `${filtered.length} PRODUIT(S)`;
            }

            if (filtered.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color:var(--admin-text-muted);">
                    <div style="font-size:24px; margin-bottom:8px;">🔍</div>
                    Aucun article ne correspond aux filtres appliqués.
                </td></tr>`;
                return;
            }

            tbody.innerHTML = filtered.map(p => {
                const imgSrc = resolveProductImage(p.image);
                const isPre = p.status === 'preorder' || p.status === 'upcoming';
                const statusBadge = isPre
                    ? `<span class="admin-badge admin-badge-warning" style="font-size:10px; font-weight:700;">⚡ ${p.preorderBadge || 'DROP / PRÉVENTE'}</span>`
                    : `<span class="admin-badge admin-badge-success" style="font-size:10px; font-weight:700;">✅ DISPONIBLE</span>`;

                const sizesText = (p.sizes && p.sizes.length > 0)
                    ? p.sizes.map(s => `<span class="admin-size-pill">${s}</span>`).join(" ")
                    : `<span style="color:var(--admin-text-muted); font-size:12px;">Unique</span>`;

                return `
                <tr class="admin-table-row">
                    <td style="width: 76px;">
                        <div class="admin-product-thumb-box">
                            <img src="${imgSrc}" alt="${p.name}" class="admin-product-thumb" loading="lazy" onerror="this.src='../IMAGE/logo P.png'">
                        </div>
                    </td>
                    <td>
                        <div style="font-weight: 700; font-size: 14.5px; color: #fff; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span>${p.name}</span>
                            ${statusBadge}
                        </div>
                        <div style="font-size: 12px; color: var(--admin-text-muted); margin-top: 4px; max-width: 360px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            ${p.description || 'Collection Streetwear officielle.'}
                        </div>
                    </td>
                    <td>
                        <span class="admin-badge admin-badge-neutral" style="font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">
                            ${p.category}
                        </span>
                    </td>
                    <td>
                        <strong style="font-size: 15px; color: #fff; font-family: var(--font-heading); letter-spacing: -0.2px;">
                            ${Number(p.price).toLocaleString('fr-FR')} FCFA
                        </strong>
                    </td>
                    <td>
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">${sizesText}</div>
                    </td>
                    <td>
                        <div style="font-size: 11.5px; color: var(--admin-text-secondary);">
                            ${p.releaseDate ? '🗓️ ' + p.releaseDate : '⚡ Disponible'}
                        </div>
                    </td>
                    <td style="text-align: right;">
                        <div style="display: inline-flex; gap: 8px;">
                            <button type="button" class="admin-btn admin-btn-sm admin-btn-outline" onclick="window.AdminProducts.openModal('${p.id}')">
                                ✏️ Modifier
                            </button>
                            <button type="button" class="admin-btn admin-btn-sm admin-btn-danger" onclick="window.AdminProducts.delete('${p.id}')" title="Supprimer cet article">
                                🗑️
                            </button>
                        </div>
                    </td>
                </tr>
                `;
            }).join("");
        },

        async openModal(productId = null) {
            const modal = document.getElementById("adminProductModal");
            const form = document.getElementById("adminProductForm");
            const title = document.getElementById("adminProductModalTitle");
            const preview = document.getElementById("imagePreviewImg");
            const placeholder = document.getElementById("imagePreviewPlaceholder");
            const removeBtn = document.getElementById("removePhotoBtn");

            if (!modal || !form) return;
            form.reset();
            this.currentImageData = "";

            if (productId) {
                const products = await window.AdminAPI.getProducts();
                const prod = products.find(p => p.id === productId);
                if (prod) {
                    if (title) title.textContent = "✏️ Modifier l'Article";
                    
                    const setVal = (id, val) => {
                        const el = document.getElementById(id);
                        if (el) el.value = val !== undefined ? val : "";
                    };

                    setVal("editProductId", prod.id);
                    setVal("prodName", prod.name);
                    setVal("prodPrice", prod.price);
                    setVal("prodCategory", prod.category);
                    setVal("prodSizes", prod.sizes ? prod.sizes.join(", ") : "");
                    setVal("prodDescription", prod.description || "");

                    const isPre = prod.status === 'preorder' || prod.status === 'upcoming';
                    const preCheck = document.getElementById("prodIsPreorder");
                    if (preCheck) preCheck.checked = isPre;
                    this.togglePreorderFields(isPre);

                    setVal("prodPreorderBadge", prod.preorderBadge || "⚡ PRÉ-VENTE");
                    setVal("prodReleaseDate", prod.releaseDate || "");
                    setVal("prodReservedPercent", prod.reservedPercentage || 85);
                    setVal("prodDropStatus", prod.status || "preorder");

                    if (prod.image) {
                        this.currentImageData = prod.image;
                        const urlInput = document.getElementById("prodImageUrl");
                        if (urlInput && (prod.image.startsWith('http://') || prod.image.startsWith('https://'))) {
                            urlInput.value = prod.image;
                        }
                        this.updatePreview(resolveProductImage(prod.image));
                    } else {
                        if (preview) preview.style.display = "none";
                        if (placeholder) placeholder.style.display = "block";
                        if (removeBtn) removeBtn.style.display = "none";
                    }
                }
            } else {
                if (title) title.textContent = "➕ Ajouter un Nouvel Article";
                const idInput = document.getElementById("editProductId");
                if (idInput) idInput.value = "";
                this.togglePreorderFields(false);
                if (preview) preview.style.display = "none";
                if (placeholder) placeholder.style.display = "block";
                if (removeBtn) removeBtn.style.display = "none";
            }

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        },

        closeModal() {
            const modal = document.getElementById("adminProductModal");
            if (modal) modal.classList.remove("active");
            document.body.style.overflow = "";
        },

        closeEditor() {
            this.closeModal();
        },

        togglePreorderFields(show) {
            const box = document.getElementById("preorderSubfields");
            if (box) box.style.display = show ? "block" : "none";
        },

        updatePreview(src) {
            const preview = document.getElementById("imagePreviewImg");
            const placeholder = document.getElementById("imagePreviewPlaceholder");
            const removeBtn = document.getElementById("removePhotoBtn");
            if (preview && src) {
                preview.src = src;
                preview.style.display = "block";
            }
            if (placeholder) placeholder.style.display = "none";
            if (removeBtn) removeBtn.style.display = "inline-flex";
        },

        handleImageSelect(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.currentImageData = e.target.result;
                this.updatePreview(this.currentImageData);
            };
            reader.readAsDataURL(file);
        },

        async handleSubmit(event) {
            event.preventDefault();
            const id = document.getElementById("editProductId")?.value;
            const name = document.getElementById("prodName")?.value.trim();
            const price = Number(document.getElementById("prodPrice")?.value || 0);
            const category = document.getElementById("prodCategory")?.value || "bags";
            const sizes = document.getElementById("prodSizes")?.value.split(",").map(s => s.trim()).filter(Boolean);
            const description = document.getElementById("prodDescription")?.value.trim();
            const isPreorder = document.getElementById("prodIsPreorder")?.checked;

            const preorderBadge = document.getElementById("prodPreorderBadge")?.value.trim();
            const releaseDate = document.getElementById("prodReleaseDate")?.value.trim();
            const reservedPercentage = Number(document.getElementById("prodReservedPercent")?.value) || 85;
            const dropStatus = document.getElementById("prodDropStatus")?.value || (isPreorder ? "preorder" : "available");

            const urlInputVal = document.getElementById("prodImageUrl")?.value.trim();
            const finalImage = this.currentImageData || urlInputVal || "../IMAGE/logo P.png";

            const payload = {
                id: id || undefined,
                name,
                price,
                category,
                sizes,
                description,
                image: finalImage,
                status: isPreorder ? dropStatus : "available",
                preorderBadge: isPreorder ? preorderBadge : undefined,
                releaseDate: isPreorder ? releaseDate : undefined,
                reservedPercentage: isPreorder ? reservedPercentage : undefined
            };

            await window.AdminAPI.saveProduct(payload);
            if (window.AdminApp?.showToast) {
                window.AdminApp.showToast(`Article "${name}" enregistré avec succès !`, 'success');
            }
            
            // Fermeture immédiate de la fenêtre modale
            this.closeModal();

            await this.render();
            if (window.AdminDashboard?.renderKPIs) {
                await window.AdminDashboard.renderKPIs();
            }
        },

        async delete(productId) {
            if (confirm("Voulez-vous vraiment retirer cet article du catalogue Streetwear ?")) {
                await window.AdminAPI.deleteProduct(productId);
                if (window.AdminApp?.showToast) {
                    window.AdminApp.showToast("Article supprimé du catalogue.", 'info');
                }
                await this.render();
                if (window.AdminDashboard?.renderKPIs) {
                    await window.AdminDashboard.renderKPIs();
                }
            }
        },

        async resetPrompt() {
            if (confirm("Réinitialiser le catalogue avec les pièces officielles de la marque ?")) {
                await window.AdminAPI.resetCatalog();
                if (window.AdminApp?.showToast) {
                    window.AdminApp.showToast("Catalogue officiel réinitialisé avec succès !", 'success');
                }
                await this.render();
                if (window.AdminDashboard?.renderKPIs) {
                    await window.AdminDashboard.renderKPIs();
                }
            }
        }
    };

    window.AdminProducts = AdminProducts;
    window.ProductsModule = AdminProducts;

})(window);
