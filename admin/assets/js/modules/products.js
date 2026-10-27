/* ==========================================================================
   MODULE: PRODUCTS & CATALOGUE MANAGEMENT (ADMIN)
   ========================================================================== */

window.AdminProducts = {
    currentImageData: "",

    async init() {
        // Bind toolbar buttons
        const createBtn = document.getElementById('adminOpenCreateProductBtn');
        if (createBtn) createBtn.addEventListener('click', () => this.openModal());

        const resetBtn = document.getElementById('adminResetCatalogBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => this.resetPrompt());

        const searchInput = document.getElementById('adminSearchProduct');
        if (searchInput) searchInput.addEventListener('input', () => this.render());

        const catFilter = document.getElementById('adminCategoryFilter');
        if (catFilter) catFilter.addEventListener('change', () => this.render());

        // Bind form submit
        const form = document.getElementById('adminProductForm');
        if (form) form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Bind file input
        const fileInput = document.getElementById('prodFile');
        if (fileInput) fileInput.addEventListener('change', (e) => this.handleImageSelect(e));

        await this.render();
    },

    async render() {
        const tbody = document.getElementById("adminProductsTableBody");
        if (!tbody) return;

        const products = await window.AdminAPI.getProducts();
        const search = document.getElementById("adminSearchProduct")?.value.toLowerCase().trim() || "";
        const cat = document.getElementById("adminCategoryFilter")?.value || "all";

        const filtered = products.filter(p => {
            const matchCat = cat === "all" || p.category === cat;
            const matchSearch = !search || p.name.toLowerCase().includes(search);
            return matchCat && matchSearch;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 32px; color:var(--text-muted);">Aucun article trouvé.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td style="width: 60px;">
                    <img src="${p.image}" alt="${p.name}" style="width:44px; height:44px; border-radius:6px; object-fit:cover; border:1px solid var(--border-color);" onerror="this.src='../IMAGE/logo P.png'">
                </td>
                <td>
                    <strong>${p.name}</strong>
                    ${p.status === 'preorder' ? '<span class="status-pill status-pending" style="margin-left:6px; font-size:10px;">⚡ Drop / Prévente</span>' : ''}
                </td>
                <td><span style="font-size:12px; color:var(--text-secondary); text-transform:uppercase;">${p.category}</span></td>
                <td><strong>${Number(p.price).toLocaleString('fr-FR')} FCFA</strong></td>
                <td><small style="color:var(--text-muted);">${p.sizes?.join(", ") || "Unique"}</small></td>
                <td>
                    <div style="display:flex; gap:8px;">
                        <button class="admin-btn admin-btn-sm admin-btn-outline" onclick="window.AdminProducts.openModal('${p.id}')">✏️ Modifier</button>
                        <button class="admin-btn admin-btn-sm admin-btn-danger" onclick="window.AdminProducts.delete('${p.id}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `).join("");
    },

    async openModal(productId = null) {
        const modal = document.getElementById("adminProductModal");
        const form = document.getElementById("adminProductForm");
        const title = document.getElementById("adminProductModalTitle");
        const preview = document.getElementById("imagePreviewImg");
        const previewPlaceholder = document.getElementById("imagePreviewPlaceholder");
        const removeBtn = document.getElementById("removePhotoBtn");

        if (!modal || !form) return;
        form.reset();
        this.currentImageData = "";

        if (productId) {
            const products = await window.AdminAPI.getProducts();
            const prod = products.find(p => p.id === productId);
            if (prod) {
                if (title) title.textContent = "✏️ Modifier l'Article";
                const idInput = document.getElementById("editProductId");
                if (idInput) idInput.value = prod.id;
                const nameInput = document.getElementById("prodName");
                if (nameInput) nameInput.value = prod.name;
                const priceInput = document.getElementById("prodPrice");
                if (priceInput) priceInput.value = prod.price;
                const catInput = document.getElementById("prodCategory");
                if (catInput) catInput.value = prod.category;
                const sizesInput = document.getElementById("prodSizes");
                if (sizesInput) sizesInput.value = prod.sizes ? prod.sizes.join(", ") : "";
                const descInput = document.getElementById("prodDescription");
                if (descInput) descInput.value = prod.description || "";
                
                const isPre = prod.status === 'preorder' || prod.status === 'upcoming';
                const preCheck = document.getElementById("prodIsPreorder");
                if (preCheck) preCheck.checked = isPre;
                this.togglePreorderFields(isPre);

                if (prod.image) {
                    this.currentImageData = prod.image;
                    if (preview) {
                        preview.src = prod.image;
                        preview.style.display = "block";
                    }
                    if (previewPlaceholder) previewPlaceholder.style.display = "none";
                    if (removeBtn) removeBtn.style.display = "inline-flex";
                }
            }
        } else {
            if (title) title.textContent = "➕ Ajouter un Nouvel Article";
            const idInput = document.getElementById("editProductId");
            if (idInput) idInput.value = "";
            this.togglePreorderFields(false);
            if (preview) preview.style.display = "none";
            if (previewPlaceholder) previewPlaceholder.style.display = "block";
            if (removeBtn) removeBtn.style.display = "none";
        }

        modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("adminProductModal");
        if (modal) modal.classList.remove("active");
    },

    togglePreorderFields(show) {
        const box = document.getElementById("preorderSubfields");
        if (box) box.style.display = show ? "block" : "none";
    },

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageData = e.target.result;
            const preview = document.getElementById("imagePreviewImg");
            const placeholder = document.getElementById("imagePreviewPlaceholder");
            const removeBtn = document.getElementById("removePhotoBtn");
            if (preview) {
                preview.src = this.currentImageData;
                preview.style.display = "block";
            }
            if (placeholder) placeholder.style.display = "none";
            if (removeBtn) removeBtn.style.display = "inline-flex";
        };
        reader.readAsDataURL(file);
    },

    async handleSubmit(event) {
        event.preventDefault();
        const id = document.getElementById("editProductId")?.value;
        const name = document.getElementById("prodName")?.value.trim();
        const price = Number(document.getElementById("prodPrice").value);
        const category = document.getElementById("prodCategory").value;
        const sizes = document.getElementById("prodSizes").value.split(",").map(s => s.trim()).filter(Boolean);
        const description = document.getElementById("prodDescription").value.trim();
        const isPreorder = document.getElementById("prodIsPreorder")?.checked;

        const payload = {
            id: id || undefined,
            name,
            price,
            category,
            sizes,
            description,
            image: this.currentImageData || "../IMAGE/logo P.png",
            status: isPreorder ? "preorder" : "available"
        };

        await window.AdminAPI.saveProduct(payload);
        window.AdminApp.showToast(`Article "${name}" enregistré avec succès !`);
        this.closeModal();
        await this.render();
        await window.AdminDashboard.renderKPIs();
    },

    async delete(productId) {
        if (confirm("Voulez-vous vraiment retirer cet article du catalogue ?")) {
            await window.AdminAPI.deleteProduct(productId);
            window.AdminApp.showToast("Article supprimé.");
            await this.render();
            await window.AdminDashboard.renderKPIs();
        }
    },

    async resetPrompt() {
        if (confirm("Réinitialiser le catalogue avec les produits d'origine de la marque ?")) {
            await window.AdminAPI.resetCatalog();
            window.AdminApp.showToast("Catalogue réinitialisé !");
            await this.render();
            await window.AdminDashboard.renderKPIs();
        }
    }
};
