/* ==========================================================================
   MODULE: PRODUCTS & CATALOGUE MANAGEMENT (ADMIN)
   ========================================================================== */

window.AdminProducts = {
    currentImageData: "",

    async init() {
        await this.render();
    },

    async render() {
        const tbody = document.getElementById("adminProductsTableBody");
        if (!tbody) return;

        const products = await window.AdminAPI.getProducts();
        const search = document.getElementById("productSearchInput")?.value.toLowerCase().trim() || "";
        const cat = document.getElementById("productCategoryFilter")?.value || "all";

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
                        <button class="btn btn-sm btn-outline" onclick="window.AdminProducts.openModal('${p.id}')">✏️ Modifier</button>
                        <button class="btn btn-sm btn-danger" onclick="window.AdminProducts.delete('${p.id}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `).join("");
    },

    async openModal(productId = null) {
        const modal = document.getElementById("productModal");
        const form = document.getElementById("productForm");
        const title = document.getElementById("productModalTitle");
        const preview = document.getElementById("prodImgPreview");

        if (!modal || !form) return;
        form.reset();
        this.currentImageData = "";

        if (productId) {
            const products = await window.AdminAPI.getProducts();
            const prod = products.find(p => p.id === productId);
            if (prod) {
                title.textContent = "✏️ Modifier l'Article";
                document.getElementById("prodId").value = prod.id;
                document.getElementById("prodName").value = prod.name;
                document.getElementById("prodPrice").value = prod.price;
                document.getElementById("prodCategory").value = prod.category;
                document.getElementById("prodSizes").value = prod.sizes ? prod.sizes.join(", ") : "";
                document.getElementById("prodDescription").value = prod.description || "";
                
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
                }
            }
        } else {
            title.textContent = "➕ Ajouter un Nouvel Article";
            document.getElementById("prodId").value = "";
            this.togglePreorderFields(false);
            if (preview) preview.style.display = "none";
        }

        modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("productModal");
        if (modal) modal.classList.remove("active");
    },

    togglePreorderFields(show) {
        const box = document.getElementById("preorderFieldsBox");
        if (box) box.style.display = show ? "block" : "none";
    },

    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageData = e.target.result;
            const preview = document.getElementById("prodImgPreview");
            if (preview) {
                preview.src = this.currentImageData;
                preview.style.display = "block";
            }
        };
        reader.readAsDataURL(file);
    },

    async handleSubmit(event) {
        event.preventDefault();
        const id = document.getElementById("prodId").value;
        const name = document.getElementById("prodName").value.trim();
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
