/* ==========================================================================
   PRODUCTS DATA
   ========================================================================== */
const INITIAL_PRODUCTS = [
    {
        id: "c1",
        name: "Terra Icon Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 1.png",
        description: "Sac streetwear noir avec illustration colorée d'un personnage sur la Terre. Sangle imprimée ajustable et boucle mate à dégagement rapide. Conçu pour un usage quotidien intensif.",
        sizes: []
    },
    {
        id: "c2",
        name: "Aero Character Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 2.png",
        description: "Sac bandoulière technique résistant aux intempéries avec imprimé emblématique du personnage à capuche rouge. Équipé d'une double fermeture éclair, de poches intérieures et d'un porte-clés.",
        sizes: []
    },
    {
        id: "c3",
        name: "Portrait Editorial Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 3.png",
        description: "Sac portrait artistique premium. Conçu avec des compartiments à double accès rapide, des organiseurs internes en filet et une sangle tactile épaisse. Démarquez-vous dans la foule urbaine.",
        sizes: []
    },
    {
        id: "c4",
        name: "Minimalist Utility Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 4.png",
        description: "Structure ultra-épurée avec de subtils motifs de lignes techniques. Fabriqué en tissage balistique ultra-durable 1680D avec des poches de rangement dissimulées à l'arrière.",
        sizes: []
    },
    {
        id: "h1",
        name: "Heavyweight Boxy Hoodie",
        price: 8000,
        category: "hoodies",
        image: "IMAGE/WhatsApp Image 2026-06-16 at 08.37.09.jpeg",
        description: "Hoodie en coton bio haute densité 450gsm avec coupe ample et épaules tombantes. Capuche premium double épaisseur et poches invisibles sur les coutures latérales.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "t1",
        name: "Creator Studio Tee",
        price: 8000,
        category: "tees",
        image: "IMAGE/WhatsApp Image 2026-06-16 at 08.37.09 (1).jpeg",
        description: "T-shirt en jersey de coton peigné imprimé d'illustrations graphiques de sous-culture avec des encres haute fidélité. Offre une silhouette moderne structurée qui conserve sa forme.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "cap1",
        name: "Urban Explorer Cap",
        price: 8000,
        category: "caps",
        image: "IMAGE/WhatsApp Image 2026-06-16 at 08.37.09 (3).jpeg",
        description: "Casquette classique utilitaire à 6 panneaux. Finitions avec détails typographiques brodés épurés, visière pré-incurvée et sangle arrière réglable à boucle métallique.",
        sizes: ["Taille Unique"]
    }
];

let PRODUCTS = JSON.parse(localStorage.getItem("culture_products")) || [...INITIAL_PRODUCTS];

function saveProductsToStorage() {
    localStorage.setItem("culture_products", JSON.stringify(PRODUCTS));
}

/* ==========================================================================
   APP STATE & UTILITIES
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem("culture_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("culture_wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("culture_orders")) || [];
let adminPin = localStorage.getItem("culture_admin_pin") || "1234";
let currentProductImageData = "";

let activeCategoryFilter = "all";
let activeSearchQuery = "";
let currentTheme = localStorage.getItem("culture_theme") || "light";

function formatPrice(price) {
    if (typeof price !== "number") price = Number(price);
    return price.toLocaleString("fr-FR") + " XOF";
}

/* ==========================================================================
   THEME SWITCHER MANAGER
   ========================================================================== */
function initTheme() {
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
    updateThemeIcons();
}

function toggleTheme() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("culture_theme", currentTheme);
    initTheme();
    showToast(currentTheme === "dark" ? "Mode Minuit activé 🌙" : "Mode Clair activé ☀️");
}

function updateThemeIcons() {
    const sunIcon = document.querySelector(".sun-icon");
    const moonIcon = document.querySelector(".moon-icon");
    if (!sunIcon || !moonIcon) return;

    if (currentTheme === "dark") {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
}

/* ==========================================================================
   DOM INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Theme
    initTheme();
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Navigation / Header
    const header = document.querySelector(".site-header");
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const accountBtn = document.getElementById("accountBtn");
    
    // Drawers & Overlays
    const cartBtn = document.getElementById("cartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    const wishlistBtn = document.getElementById("wishlistBtn");
    const closeWishlistBtn = document.getElementById("closeWishlistBtn");
    const wishlistOverlay = document.getElementById("wishlistOverlay");
    
    const searchBtn = document.getElementById("searchBtn");
    const closeSearchBtn = document.getElementById("closeSearchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const globalSearchInput = document.getElementById("globalSearchInput");
    
    const quickViewOverlay = document.getElementById("quickViewOverlay");
    const closeModalBtn = document.getElementById("closeModalBtn");
    
    // Grids & Carousels
    const productsGrid = document.getElementById("productsGrid");
    const filterSearchInput = document.getElementById("filterSearchInput");
    const filterTags = document.querySelectorAll(".filter-tag");
    const carouselTrack = document.getElementById("carouselTrack");
    const carouselPrev = document.getElementById("carouselPrev");
    const carouselNext = document.getElementById("carouselNext");
    const carouselThumb = document.getElementById("carouselThumb");
    
    // Forms
    const newsletterForm = document.getElementById("newsletterForm");

    /* ==========================================================================
       SCROLL INTERACTIONS & HEADERS
       ========================================================================== */
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Reveal On Scroll Observer
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       3D PARALLAX TILT ON HERO PRODUCT
       ========================================================================== */
    const heroProductWrapper = document.getElementById("heroProductWrapper");
    const heroSection = document.querySelector(".hero-section");
    if (heroProductWrapper && heroSection) {
        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 12;
            const rotateY = (x / rect.width) * 12;
            heroProductWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        heroSection.addEventListener("mouseleave", () => {
            heroProductWrapper.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
        });
    }

    /* ==========================================================================
       ACCOUNT BUTTON TRIGGER
       ========================================================================== */
    if (accountBtn) {
        accountBtn.addEventListener("click", () => {
            showToast("Espace membre CULTURE bientôt disponible !");
        });
    }

    /* ==========================================================================
       MOBILE MENU TRIGGERS
       ========================================================================== */
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            mobileMenuOverlay.classList.add("active");
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("active");
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener("click", (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove("active");
            }
        });
    }

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("active");
        });
    });

    /* ==========================================================================
       CART DRAWER & CHECKOUT CONTROLS
       ========================================================================== */
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            cartDrawerOverlay.classList.add("active");
            renderCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener("click", () => {
            cartDrawerOverlay.classList.remove("active");
        });
    }

    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener("click", (e) => {
            if (e.target === cartDrawerOverlay) {
                cartDrawerOverlay.classList.remove("active");
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            processCheckout();
        });
    }

    /* ==========================================================================
       WISHLIST CONTROLS
       ========================================================================== */
    if (wishlistBtn) {
        wishlistBtn.addEventListener("click", () => {
            wishlistOverlay.classList.add("active");
            renderWishlist();
        });
    }

    if (closeWishlistBtn) {
        closeWishlistBtn.addEventListener("click", () => {
            wishlistOverlay.classList.remove("active");
        });
    }

    if (wishlistOverlay) {
        wishlistOverlay.addEventListener("click", (e) => {
            if (e.target === wishlistOverlay) {
                wishlistOverlay.classList.remove("active");
            }
        });
    }

    /* ==========================================================================
       GLOBAL SEARCH PANEL
       ========================================================================== */
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            searchOverlay.classList.add("active");
            setTimeout(() => globalSearchInput.focus(), 300);
        });
    }

    if (closeSearchBtn) {
        closeSearchBtn.addEventListener("click", () => {
            searchOverlay.classList.remove("active");
            globalSearchInput.value = "";
            triggerSearchText("");
        });
    }

    if (globalSearchInput) {
        globalSearchInput.addEventListener("input", (e) => {
            triggerSearchText(e.target.value);
        });
    }

    /* ==========================================================================
       QUICK VIEW MODAL CLOSES
       ========================================================================== */
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            quickViewOverlay.classList.remove("active");
        });
    }

    if (quickViewOverlay) {
        quickViewOverlay.addEventListener("click", (e) => {
            if (e.target === quickViewOverlay) {
                quickViewOverlay.classList.remove("active");
            }
        });
    }

    /* ==========================================================================
       FEATURED PRODUCTS RENDER & FILTER
       ========================================================================== */
    filterTags.forEach(tag => {
        tag.addEventListener("click", () => {
            filterTags.forEach(t => t.classList.remove("active"));
            tag.classList.add("active");
            activeCategoryFilter = tag.dataset.filter;
            filterAndRenderFeaturedProducts();
        });
    });

    if (filterSearchInput) {
        filterSearchInput.addEventListener("input", (e) => {
            activeSearchQuery = e.target.value.toLowerCase();
            filterAndRenderFeaturedProducts();
        });
    }

    /* ==========================================================================
       NEW ARRIVALS CAROUSEL SCROLL
       ========================================================================== */
    if (carouselTrack) {
        if (carouselPrev) {
            carouselPrev.addEventListener("click", () => {
                carouselTrack.scrollBy({ left: -380, behavior: "smooth" });
            });
        }

        if (carouselNext) {
            carouselNext.addEventListener("click", () => {
                carouselTrack.scrollBy({ left: 380, behavior: "smooth" });
            });
        }

        carouselTrack.addEventListener("scroll", () => {
            const scrollTotal = carouselTrack.scrollWidth - carouselTrack.clientWidth;
            if (scrollTotal <= 0) return;
            const scrollProgress = carouselTrack.scrollLeft / scrollTotal;
            const thumbWidth = carouselThumb.clientWidth;
            const trackWidth = carouselThumb.parentElement.clientWidth;
            
            const maxLeft = trackWidth - thumbWidth;
            carouselThumb.style.left = `${scrollProgress * maxLeft}px`;
        });
    }

    /* ==========================================================================
       NEWSLETTER FORM SUBMISSION
       ========================================================================== */
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = newsletterForm.querySelector("button[type='submit']");
            const btnText = submitBtn.childNodes[0];
            const spinner = submitBtn.querySelector(".btn-spinner");
            const input = newsletterForm.querySelector("input");

            btnText.textContent = "";
            if (spinner) spinner.style.display = "inline-block";
            submitBtn.style.pointerEvents = "none";

            setTimeout(() => {
                if (spinner) spinner.style.display = "none";
                btnText.textContent = "Inscrit !";
                submitBtn.style.backgroundColor = "var(--accent-orange)";
                submitBtn.style.borderColor = "var(--accent-orange)";
                submitBtn.style.color = "white";
                
                showToast("Bienvenue dans le Syndicate CULTURE !");
                input.value = "";

                setTimeout(() => {
                    btnText.textContent = "S'inscrire";
                    submitBtn.style.backgroundColor = "var(--text-primary)";
                    submitBtn.style.borderColor = "var(--text-primary)";
                    submitBtn.style.color = "var(--bg-primary)";
                    submitBtn.style.pointerEvents = "auto";
                }, 3000);

            }, 1200);
        });
    }

    // Initial render call
    filterAndRenderFeaturedProducts();
    updateBadgesCount();
});

/* ==========================================================================
   FEATURED PRODUCTS FILTER ENGINE
   ========================================================================== */
function filterAndRenderFeaturedProducts() {
    const productsGrid = document.getElementById("productsGrid");
    if (!productsGrid) return;

    const filtered = PRODUCTS.filter(p => {
        const matchesCategory = activeCategoryFilter === "all" || p.category === activeCategoryFilter;
        const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery) || 
                             p.description.toLowerCase().includes(activeSearchQuery);
        return matchesCategory && matchesSearch;
    });

    renderFeaturedProducts(filtered);
}

function renderFeaturedProducts(productsList) {
    const productsGrid = document.getElementById("productsGrid");
    if (!productsGrid) return;

    if (productsList.length === 0) {
        productsGrid.innerHTML = `
            <div class="search-empty-state" style="text-align: center; grid-column: 1/-1; padding: 40px 0;">
                <p style="color: var(--text-secondary); font-size: 16px;">Aucun produit ne correspond à vos filtres.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsList.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        return `
            <div class="product-card reveal-on-scroll active" data-id="${product.id}" data-category="${product.category}">
                <div class="product-card-img-wrapper">
                    <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleWishlistItem('${product.id}')" 
                            aria-label="Ajouter aux favoris">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <div class="product-image-container" onclick="openQuickView('${product.id}')">
                        <img src="${product.image}" alt="${product.name}" class="product-img-primary" loading="lazy" decoding="async">
                    </div>
                    <div class="product-card-actions">
                        <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Aperçu Rapide</button>
                        <button class="quick-add-btn" onclick="addToCartDirect('${product.id}')">Ajout Rapide</button>
                    </div>
                </div>
                <div class="product-card-meta">
                    <div class="product-title-row">
                        <h3 class="product-name" onclick="openQuickView('${product.id}')" style="cursor:pointer;">${product.name}</h3>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <p class="product-short-desc">${product.description.split('.')[0]}.</p>
                </div>
            </div>
        `;
    }).join("");
}

/* ==========================================================================
   GLOBAL SEARCH PANEL REAL-TIME FILTER
   ========================================================================== */
function triggerSearchText(text) {
    const globalSearchInput = document.getElementById("globalSearchInput");
    const searchResultsGrid = document.getElementById("searchResultsGrid");
    const resultsHeader = document.getElementById("resultsHeader");
    
    if (globalSearchInput) globalSearchInput.value = text;
    const query = text.toLowerCase().trim();

    if (!searchResultsGrid) return;

    if (!query) {
        searchResultsGrid.innerHTML = `<p class="search-empty-state">Commencez à taper pour voir les collections correspondantes.</p>`;
        if (resultsHeader) resultsHeader.textContent = "Résultats de Recherche";
        return;
    }

    const matched = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    if (resultsHeader) resultsHeader.textContent = `Résultats de Recherche (${matched.length})`;

    if (matched.length === 0) {
        searchResultsGrid.innerHTML = `<p class="search-empty-state">Aucun produit trouvé pour "${text}".</p>`;
        return;
    }

    searchResultsGrid.innerHTML = matched.map(product => `
        <div class="search-result-card" onclick="openQuickView('${product.id}')">
            <div class="search-result-img-box">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <h5 class="search-result-name">${product.name}</h5>
            <span class="search-result-price">${formatPrice(product.price)}</span>
        </div>
    `).join("");
}

/* ==========================================================================
   CART UTILITIES (ADD, REMOVE, QUANTITY, RENDER, CHECKOUT)
   ========================================================================== */
function addToCartDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (product.sizes && product.sizes.length > 0) {
        openQuickView(productId);
        showToast("Veuillez sélectionner une taille.");
        return;
    }

    addItemToCartArray(product, "");
    showToast(`${product.name} ajouté au panier.`);
    openCartDrawer();
}

function addItemToCartArray(product, size) {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            product: product,
            quantity: 1,
            size: size
        });
    }

    saveCart();
    renderCart();
    updateBadgesCount();
}

function updateCartQty(productId, size, change) {
    const index = cart.findIndex(item => item.product.id === productId && item.size === size);
    if (index === -1) return;

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showToast("Article retiré du panier.");
    }

    saveCart();
    renderCart();
    updateBadgesCount();
}

function removeCartItem(productId, size) {
    cart = cart.filter(item => !(item.product.id === productId && item.size === size));
    saveCart();
    renderCart();
    updateBadgesCount();
    showToast("Article retiré du panier.");
}

function saveCart() {
    localStorage.setItem("culture_cart", JSON.stringify(cart));
}

function openCartDrawer() {
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add("active");
    renderCart();
}

function closeCartDrawer() {
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove("active");
}

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalText = document.getElementById("cartSubtotal");
    const footer = document.getElementById("cartDrawerFooter");
    const shippingBarText = document.getElementById("shippingBarText");
    const shippingProgressFill = document.getElementById("shippingProgressFill");
    
    if (!container) return;

    let total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const freeShippingThreshold = 25000;

    // Shipping Progress Bar Calculation
    if (shippingBarText && shippingProgressFill) {
        if (total === 0) {
            shippingBarText.innerHTML = "Livraison OFFERTE dès 25 000 XOF !";
            shippingProgressFill.style.width = "0%";
        } else if (total >= freeShippingThreshold) {
            shippingBarText.innerHTML = "🎉 Félicitations ! Vous bénéficiez de la <strong>LIVRAISON OFFERTE</strong> !";
            shippingProgressFill.style.width = "100%";
        } else {
            const remaining = freeShippingThreshold - total;
            const progress = (total / freeShippingThreshold) * 100;
            shippingBarText.innerHTML = `Plus que <strong>${formatPrice(remaining)}</strong> pour la <strong>LIVRAISON OFFERTE</strong> !`;
            shippingProgressFill.style.width = `${progress}%`;
        }
    }

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <p>Votre sac est vide.</p>
                <button class="btn btn-dark" style="margin-top: 15px;" onclick="closeCartDrawer()">Commencer les Achats</button>
            </div>
        `;
        if (subtotalText) subtotalText.textContent = "0 XOF";
        if (footer) {
            footer.style.opacity = "0.5";
            footer.style.pointerEvents = "none";
        }
        return;
    }

    if (footer) {
        footer.style.opacity = "1";
        footer.style.pointerEvents = "auto";
    }

    container.innerHTML = cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-img-box">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title-row">
                        <span class="cart-item-name">${item.product.name}</span>
                        <span class="cart-item-price">${formatPrice(itemTotal)}</span>
                    </div>
                    <div class="cart-item-variant">${item.size ? 'Taille : ' + item.size : 'Taille Unique'}</div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateCartQty('${item.product.id}', '${item.size}', -1)" aria-label="Diminuer la quantité">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQty('${item.product.id}', '${item.size}', 1)" aria-label="Augmenter la quantité">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeCartItem('${item.product.id}', '${item.size}')">Supprimer</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    if (subtotalText) subtotalText.textContent = formatPrice(total);
}

/* ==========================================================================
   WHATSAPP ORDER CHECKOUT PROCESSOR
   ========================================================================== */
function processCheckout() {
    if (cart.length === 0) {
        showToast("Votre panier est vide !");
        return;
    }

    const nameInput = document.getElementById("checkoutName");
    const locationInput = document.getElementById("checkoutLocation");

    const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "";
    const customerLocation = locationInput && locationInput.value.trim() ? locationInput.value.trim() : "";

    let total = 0;
    let itemsListText = "";
    cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        const sizeText = item.size ? ` (Taille: ${item.size})` : "";
        itemsListText += `${index + 1}. *${item.product.name}*${sizeText}\n   Quantité: ${item.quantity} x ${formatPrice(item.product.price)} = *${formatPrice(itemTotal)}*\n`;
    });

    const isFreeShipping = total >= 25000;
    const shippingText = isFreeShipping ? "Gracieuse (Offerte 🎉)" : "Calculée à la livraison (Cotonou & environs)";

    let customerInfoBlock = "";
    if (customerName || customerLocation) {
        customerInfoBlock = `*INFORMATIONS CLIENT*\n` +
            (customerName ? `👤 Nom: ${customerName}\n` : "") +
            (customerLocation ? `📍 Lieu de livraison: ${customerLocation}\n` : "") +
            `\n`;
    }

    const message = `*NOUVELLE COMMANDE - CULTURE STREETWEAR*\n\n` +
        customerInfoBlock +
        `Bonjour, je souhaite valider ma commande :\n\n` +
        `${itemsListText}\n` +
        `*TOTAL COMMANDE : ${formatPrice(total)}*\n` +
        `*Frais de livraison* : ${shippingText}\n\n` +
        `Merci de me confirmer la disponibilité des articles et l'heure de livraison.`;

    // Record order in Admin Panel log
    const newOrder = {
        id: "CMD-" + Date.now().toString().slice(-6),
        date: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }),
        customerName: customerName || "Client Anonyme",
        customerLocation: customerLocation || "Cotonou / Environs",
        items: cart.map(i => ({
            name: i.product.name,
            size: i.size || "Standard",
            quantity: i.quantity,
            price: i.product.price,
            image: i.product.image
        })),
        total: total,
        status: "En attente"
    };
    orders.unshift(newOrder);
    localStorage.setItem("culture_orders", JSON.stringify(orders));

    const whatsappUrl = `https://wa.me/2290167411124?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    showToast("Redirection vers WhatsApp pour valider votre commande...");
}

/* ==========================================================================
   WISHLIST UTILITIES (TOGGLE, REMOVE, RENDER)
   ========================================================================== */
function toggleWishlistItem(productId) {
    const index = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Retiré de la liste de souhaits.");
    } else {
        wishlist.push(productId);
        showToast("Ajouté à la liste de souhaits.");
    }

    saveWishlist();
    updateBadgesCount();
    
    document.querySelectorAll(`.product-card[data-id="${productId}"] .wishlist-toggle-btn`).forEach(btn => {
        btn.classList.toggle("active");
        const svg = btn.querySelector("svg");
        if (svg) {
            if (btn.classList.contains("active")) {
                svg.setAttribute("fill", "currentColor");
            } else {
                svg.setAttribute("fill", "none");
            }
        }
    });

    renderWishlist();
}

function saveWishlist() {
    localStorage.setItem("culture_wishlist", JSON.stringify(wishlist));
}

function renderWishlist() {
    const container = document.getElementById("wishlistItemsContainer");
    if (!container) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <p>Votre liste de souhaits est vide.</p>
            </div>
        `;
        return;
    }

    const items = PRODUCTS.filter(p => wishlist.includes(p.id));
    container.innerHTML = items.map(product => `
        <div class="cart-item">
            <div class="cart-item-img-box" onclick="openQuickView('${product.id}'); closeWishlistDrawer()" style="cursor:pointer;">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title-row">
                    <span class="cart-item-name" onclick="openQuickView('${product.id}'); closeWishlistDrawer()" style="cursor:pointer;">${product.name}</span>
                    <span class="cart-item-price">${formatPrice(product.price)}</span>
                </div>
                <div class="cart-item-variant">${product.category}</div>
                <div class="cart-item-actions" style="margin-top: 10px;">
                    <button class="btn btn-outline" style="padding: 6px 12px; font-size: 10px; border-radius: var(--radius-sm);" onclick="addFromWishlistToCart('${product.id}')">Ajouter au panier</button>
                    <button class="remove-item-btn" onclick="toggleWishlistItem('${product.id}')">Retirer</button>
                </div>
            </div>
        </div>
    `).join("");
}

function addFromWishlistToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (product.sizes && product.sizes.length > 0) {
        closeWishlistDrawer();
        openQuickView(productId);
        showToast("Veuillez sélectionner une taille.");
        return;
    }

    addToCartDirect(productId);
    closeWishlistDrawer();
}

function closeWishlistDrawer() {
    const wishlistOverlay = document.getElementById("wishlistOverlay");
    if (wishlistOverlay) wishlistOverlay.classList.remove("active");
}

/* ==========================================================================
   BADGES & COUNTS MANAGER
   ========================================================================== */
function updateBadgesCount() {
    const cartCount = document.getElementById("cartCount");
    const cartHeaderCount = document.getElementById("cartHeaderCount");
    const wishlistCount = document.getElementById("wishlistCount");
    const wishlistHeaderCount = document.getElementById("wishlistHeaderCount");
    
    const cartTotalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistTotalQty = wishlist.length;

    if (cartCount) {
        cartCount.textContent = cartTotalQty;
        if (cartTotalQty > 0) {
            cartCount.classList.add("active");
        } else {
            cartCount.classList.remove("active");
        }
    }
    if (cartHeaderCount) cartHeaderCount.textContent = cartTotalQty;

    if (wishlistCount) {
        wishlistCount.textContent = wishlistTotalQty;
        if (wishlistTotalQty > 0) {
            wishlistCount.classList.add("active");
        } else {
            wishlistCount.classList.remove("active");
        }
    }
    if (wishlistHeaderCount) wishlistHeaderCount.textContent = wishlistTotalQty;
}

/* ==========================================================================
   QUICK VIEW PANEL LOADER
   ========================================================================== */
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.getElementById("quickViewOverlay");
    const body = document.getElementById("quickViewModalBody");
    if (!overlay || !body) return;

    const isWishlisted = wishlist.includes(product.id);

    body.innerHTML = `
        <div class="quick-view-grid">
            <div class="qv-img-side">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="qv-text-side">
                <div class="qv-badge">${product.category}</div>
                <h3 class="qv-title">${product.name}</h3>
                <div class="qv-price">${formatPrice(product.price)}</div>
                <p class="qv-description">${product.description}</p>
                
                ${product.sizes && product.sizes.length > 0 ? `
                    <div class="qv-variants">
                        <h5>Sélectionner la Taille</h5>
                        <div class="qv-sizes-row">
                            ${product.sizes.map((s, idx) => `
                                <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectModalSize(this)">${s}</button>
                            `).join("")}
                        </div>
                    </div>
                ` : ''}

                <div class="qv-actions-row">
                    <button class="qv-add-to-cart" onclick="addFromModalToCart('${product.id}')">Ajouter au panier</button>
                    <button class="qv-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem('${product.id}'); syncModalWishlistBtn(this)" aria-label="Ajouter aux favoris">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    overlay.classList.add("active");
}

function selectModalSize(btn) {
    const parent = btn.parentElement;
    if (parent) {
        parent.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    }
    btn.classList.add("active");
}

function syncModalWishlistBtn(btn) {
    btn.classList.toggle("active");
    const svg = btn.querySelector("svg");
    if (svg) {
        if (btn.classList.contains("active")) {
            svg.setAttribute("fill", "currentColor");
        } else {
            svg.setAttribute("fill", "none");
        }
    }
}

function addFromModalToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let selectedSize = "";
    const sizeBtn = document.querySelector(".qv-sizes-row .size-btn.active");
    if (sizeBtn) {
        selectedSize = sizeBtn.textContent;
    }

    addItemToCartArray(product, selectedSize);
    showToast(`${product.name} ${selectedSize ? '(' + selectedSize + ')' : ''} ajouté au panier.`);
    
    const quickViewOverlay = document.getElementById("quickViewOverlay");
    if (quickViewOverlay) quickViewOverlay.classList.remove("active");
    
    openCartDrawer();
}

/* ==========================================================================
   TOAST POPUPS
   ========================================================================== */
function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <svg class="toast-success-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

/* ==========================================================================
   CATEGORY QUICK LINK FILTERS
   ========================================================================== */
function filterProducts(category) {
    activeCategoryFilter = category;
    
    const filterTags = document.querySelectorAll(".filter-tag");
    filterTags.forEach(tag => {
        if (tag.dataset.filter === category) {
            tag.classList.add("active");
        } else {
            tag.classList.remove("active");
        }
    });

    const section = document.getElementById("featured");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

    const filterSearchInput = document.getElementById("filterSearchInput");
    if (filterSearchInput) filterSearchInput.value = "";
    activeSearchQuery = "";
    
    filterAndRenderFeaturedProducts();
}

/* ==========================================================================
   ESPACE GÉRANT (ADMIN DASHBOARD MANAGEMENT)
   ========================================================================== */

function openAdminAuth() {
    const modal = document.getElementById("adminLoginModal");
    if (!modal) return;
    const pinInput = document.getElementById("adminPinInput");
    if (pinInput) pinInput.value = "";
    modal.classList.add("active");
}

function closeAdminAuth() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) modal.classList.remove("active");
}

function handleAdminLogin(event) {
    event.preventDefault();
    const pinInput = document.getElementById("adminPinInput");
    const enteredPin = pinInput ? pinInput.value.trim() : "";

    if (enteredPin === adminPin) {
        closeAdminAuth();
        openAdminDashboard();
        showToast("Bienvenue dans l'Espace Gérant 🔑");
    } else {
        showToast("❌ Code PIN incorrect !");
    }
}

function openAdminDashboard() {
    const overlay = document.getElementById("adminDashboardOverlay");
    if (!overlay) return;
    overlay.classList.add("active");
    updateAdminStats();
    renderAdminProductsList();
    renderAdminOrdersList();
}

function closeAdminDashboard() {
    const overlay = document.getElementById("adminDashboardOverlay");
    if (overlay) overlay.classList.remove("active");
}

function switchAdminTab(tabName) {
    document.querySelectorAll(".admin-tab").forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    document.querySelectorAll(".admin-tab-pane").forEach(pane => {
        pane.classList.remove("active");
    });

    if (tabName === "products") {
        document.getElementById("adminTabProducts")?.classList.add("active");
        renderAdminProductsList();
    } else if (tabName === "orders") {
        document.getElementById("adminTabOrders")?.classList.add("active");
        renderAdminOrdersList();
    } else if (tabName === "settings") {
        document.getElementById("adminTabSettings")?.classList.add("active");
    }
}

function updateAdminStats() {
    const statProd = document.getElementById("adminStatProducts");
    const statOrd = document.getElementById("adminStatOrders");
    const statVal = document.getElementById("adminStatCatalogValue");
    const badgeOrd = document.getElementById("adminOrdersCountBadge");

    if (statProd) statProd.textContent = PRODUCTS.length;
    if (statOrd) statOrd.textContent = orders.length;
    if (badgeOrd) badgeOrd.textContent = orders.length;

    let totalCatalogVal = PRODUCTS.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    if (statVal) statVal.textContent = formatPrice(totalCatalogVal);
}

function renderAdminProductsList() {
    const tbody = document.getElementById("adminProductsTableBody");
    if (!tbody) return;

    const searchVal = document.getElementById("adminProductSearch")?.value.toLowerCase().trim() || "";
    const catVal = document.getElementById("adminCategoryFilter")?.value || "all";

    const filtered = PRODUCTS.filter(p => {
        const matchCat = catVal === "all" || p.category === catVal;
        const matchSearch = !searchVal || p.name.toLowerCase().includes(searchVal) || (p.description && p.description.toLowerCase().includes(searchVal));
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">Aucun produit trouvé dans le catalogue.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        const sizesBadges = (p.sizes && p.sizes.length > 0)
            ? p.sizes.map(s => `<span class="admin-size-chip">${s}</span>`).join(" ")
            : `<span class="admin-size-chip muted">Taille unique</span>`;

        const categoryLabels = {
            bags: "Sacs Crossbody",
            hoodies: "Hoodies",
            tees: "T-Shirts",
            caps: "Casquettes"
        };
        const catName = categoryLabels[p.category] || p.category;

        return `
            <tr>
                <td>
                    <img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" onerror="this.src='IMAGE/logo P.png'">
                </td>
                <td>
                    <strong class="admin-prod-title">${p.name}</strong>
                    <div class="admin-prod-sub">${p.description ? p.description.substring(0, 45) + "..." : ""}</div>
                </td>
                <td><span class="admin-cat-badge">${catName}</span></td>
                <td><strong class="admin-price-tag">${formatPrice(p.price)}</strong></td>
                <td>${sizesBadges}</td>
                <td>
                    <div class="admin-actions-cell">
                        <button class="btn btn-sm btn-outline" onclick="openProductEditor('${p.id}')">✏️ Éditer</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAdminProduct('${p.id}')">🗑️ Supprimer</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function renderAdminOrdersList() {
    const tbody = document.getElementById("adminOrdersTableBody");
    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">Aucune commande enregistrée pour le moment.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(ord => {
        const itemsSummary = ord.items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join("<br>");
        
        const statusColors = {
            "En attente": "status-pending",
            "Validée": "status-valid",
            "Livrée": "status-shipped",
            "Annulée": "status-cancelled"
        };

        return `
            <tr>
                <td><strong>${ord.id}</strong></td>
                <td style="font-size:12px; color:var(--text-muted);">${ord.date}</td>
                <td>
                    <strong>${ord.customerName}</strong>
                    <div style="font-size:12px; color:var(--text-secondary);">${ord.customerLocation}</div>
                </td>
                <td style="font-size:12px; line-height:1.4;">${itemsSummary}</td>
                <td><strong>${formatPrice(ord.total)}</strong></td>
                <td>
                    <select class="admin-status-select ${statusColors[ord.status] || ''}" onchange="updateOrderStatus('${ord.id}', this.value)">
                        <option value="En attente" ${ord.status === "En attente" ? "selected" : ""}>⏳ En attente</option>
                        <option value="Validée" ${ord.status === "Validée" ? "selected" : ""}>✅ Validée</option>
                        <option value="Livrée" ${ord.status === "Livrée" ? "selected" : ""}>🚚 Livrée</option>
                        <option value="Annulée" ${ord.status === "Annulée" ? "selected" : ""}>❌ Annulée</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="deleteAdminOrder('${ord.id}')">🗑️</button>
                </td>
            </tr>
        `;
    }).join("");
}

function updateOrderStatus(orderId, newStatus) {
    const ord = orders.find(o => o.id === orderId);
    if (ord) {
        ord.status = newStatus;
        localStorage.setItem("culture_orders", JSON.stringify(orders));
        showToast(`Statut de la commande ${orderId} : ${newStatus}`);
        renderAdminOrdersList();
    }
}

function deleteAdminOrder(orderId) {
    if (confirm(`Supprimer la commande ${orderId} de l'historique ?`)) {
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem("culture_orders", JSON.stringify(orders));
        updateAdminStats();
        renderAdminOrdersList();
        showToast("Commande supprimée.");
    }
}

/* --- PRODUCT EDITOR & PHOTO UPLOAD --- */

function openProductEditor(productId = null) {
    const modal = document.getElementById("adminProductModal");
    const form = document.getElementById("adminProductForm");
    const modalTitle = document.getElementById("adminProductModalTitle");
    const previewImg = document.getElementById("imagePreviewImg");
    const previewPlaceholder = document.getElementById("imagePreviewPlaceholder");
    const removeBtn = document.getElementById("removePhotoBtn");

    if (!modal || !form) return;

    form.reset();
    currentProductImageData = "";

    if (productId) {
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
            document.getElementById("editProductId").value = prod.id;
            document.getElementById("prodName").value = prod.name;
            document.getElementById("prodPrice").value = prod.price;
            document.getElementById("prodCategory").value = prod.category;
            document.getElementById("prodSizes").value = prod.sizes ? prod.sizes.join(", ") : "";
            document.getElementById("prodDescription").value = prod.description || "";
            
            if (prod.image && prod.image.startsWith("http")) {
                document.getElementById("prodImageUrl").value = prod.image;
            }
            currentProductImageData = prod.image || "";

            if (prod.image && previewImg && previewPlaceholder) {
                previewImg.src = prod.image;
                previewImg.style.display = "block";
                previewPlaceholder.style.display = "none";
                if (removeBtn) removeBtn.style.display = "inline-flex";
            } else if (previewImg && previewPlaceholder) {
                previewImg.src = "";
                previewImg.style.display = "none";
                previewPlaceholder.style.display = "block";
                if (removeBtn) removeBtn.style.display = "none";
            }

            modalTitle.textContent = "✏️ Modifier le Produit";
        }
    } else {
        document.getElementById("editProductId").value = "";
        if (previewImg && previewPlaceholder) {
            previewImg.src = "";
            previewImg.style.display = "none";
            previewPlaceholder.style.display = "block";
        }
        if (removeBtn) removeBtn.style.display = "none";
        modalTitle.textContent = "➕ Ajouter un Nouveau Produit";
    }

    modal.classList.add("active");
}

function closeProductEditor() {
    const modal = document.getElementById("adminProductModal");
    if (modal) modal.classList.remove("active");
}

function handleImageFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Veuillez sélectionner un fichier image valide.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentProductImageData = e.target.result;
        const previewImg = document.getElementById("imagePreviewImg");
        const previewPlaceholder = document.getElementById("imagePreviewPlaceholder");
        const removeBtn = document.getElementById("removePhotoBtn");

        if (previewImg && previewPlaceholder) {
            previewImg.src = currentProductImageData;
            previewImg.style.display = "block";
            previewPlaceholder.style.display = "none";
        }
        if (removeBtn) removeBtn.style.display = "inline-flex";

        document.getElementById("prodImageUrl").value = "";
        showToast("Photo chargée avec succès 📷");
    };
    reader.readAsDataURL(file);
}

function handleImageUrlInput() {
    const url = document.getElementById("prodImageUrl")?.value.trim();
    const previewImg = document.getElementById("imagePreviewImg");
    const previewPlaceholder = document.getElementById("imagePreviewPlaceholder");
    const removeBtn = document.getElementById("removePhotoBtn");

    if (url) {
        currentProductImageData = url;
        if (previewImg && previewPlaceholder) {
            previewImg.src = url;
            previewImg.style.display = "block";
            previewPlaceholder.style.display = "none";
        }
        if (removeBtn) removeBtn.style.display = "inline-flex";
    } else if (!currentProductImageData) {
        if (previewImg && previewPlaceholder) {
            previewImg.src = "";
            previewImg.style.display = "none";
            previewPlaceholder.style.display = "block";
        }
        if (removeBtn) removeBtn.style.display = "none";
    }
}

function removeCurrentProductPhoto() {
    currentProductImageData = "";
    const previewImg = document.getElementById("imagePreviewImg");
    const previewPlaceholder = document.getElementById("imagePreviewPlaceholder");
    const removeBtn = document.getElementById("removePhotoBtn");
    const urlInput = document.getElementById("prodImageUrl");
    const fileInput = document.getElementById("prodFile");

    if (previewImg) {
        previewImg.src = "";
        previewImg.style.display = "none";
    }
    if (previewPlaceholder) {
        previewPlaceholder.textContent = "Photo supprimée - Choisissez une nouvelle photo";
        previewPlaceholder.style.display = "block";
    }
    if (removeBtn) removeBtn.style.display = "none";
    if (urlInput) urlInput.value = "";
    if (fileInput) fileInput.value = "";
    
    showToast("Photo supprimée du produit 🗑️");
}

function handleProductFormSubmit(event) {
    event.preventDefault();

    const editId = document.getElementById("editProductId").value;
    const name = document.getElementById("prodName").value.trim();
    const price = Number(document.getElementById("prodPrice").value);
    const category = document.getElementById("prodCategory").value;
    const sizesRaw = document.getElementById("prodSizes").value.trim();
    const description = document.getElementById("prodDescription").value.trim();

    if (!name || isNaN(price) || price < 0) {
        showToast("Veuillez remplir correctement les champs obligatoires.");
        return;
    }

    const sizes = sizesRaw ? sizesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
    const image = currentProductImageData || "IMAGE/logo P.png";

    if (editId) {
        const index = PRODUCTS.findIndex(p => p.id === editId);
        if (index !== -1) {
            PRODUCTS[index] = {
                ...PRODUCTS[index],
                name,
                price,
                category,
                sizes,
                description,
                image
            };
            showToast(`Produit "${name}" mis à jour avec succès ! ✨`);
        }
    } else {
        const newId = "p_" + Date.now();
        const newProduct = {
            id: newId,
            name,
            price,
            category,
            sizes,
            description,
            image
        };
        PRODUCTS.unshift(newProduct);
        showToast(`Produit "${name}" ajouté au catalogue ! 🎉`);
    }

    saveProductsToStorage();
    closeProductEditor();

    // Refresh Public Shop & Admin
    filterAndRenderFeaturedProducts();
    if (typeof renderNewArrivals === "function") renderNewArrivals();
    updateAdminStats();
    renderAdminProductsList();
}

function deleteAdminProduct(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer "${prod.name}" du catalogue ?`)) {
        PRODUCTS = PRODUCTS.filter(p => p.id !== productId);
        saveProductsToStorage();

        filterAndRenderFeaturedProducts();
        if (typeof renderNewArrivals === "function") renderNewArrivals();
        updateAdminStats();
        renderAdminProductsList();

        showToast(`Produit "${prod.name}" supprimé.`);
    }
}

function resetDefaultCatalogPrompt() {
    if (confirm("Attention : Cette action va réinitialiser le catalogue avec les produits d'origine. Continuer ?")) {
        PRODUCTS = [...INITIAL_PRODUCTS];
        localStorage.removeItem("culture_products");
        
        filterAndRenderFeaturedProducts();
        if (typeof renderNewArrivals === "function") renderNewArrivals();
        updateAdminStats();
        renderAdminProductsList();

        showToast("Catalogue réinitialisé aux produits d'origine.");
    }
}

function changeAdminPin(event) {
    event.preventDefault();
    const newPinInput = document.getElementById("newAdminPinInput");
    const newPin = newPinInput ? newPinInput.value.trim() : "";

    if (!newPin || newPin.length < 4) {
        showToast("Le code PIN doit contenir au moins 4 caractères.");
        return;
    }

    adminPin = newPin;
    localStorage.setItem("culture_admin_pin", adminPin);
    if (newPinInput) newPinInput.value = "";
    showToast("Nouveau code PIN enregistré avec succès 🔐");
}
