/* ==========================================================================
   PRODUCTS DATA
   ========================================================================== */
const PRODUCTS = [
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

/* ==========================================================================
   APP STATE
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem("culture_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("culture_wishlist")) || [];
let activeCategoryFilter = "all";
let activeSearchQuery = "";

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Navigation / Header
    const header = document.querySelector(".site-header");
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    
    // Drawers & Overlays
    const cartBtn = document.getElementById("cartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    
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
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       MOBILE MENU TRIGGERS
       ========================================================================== */
    menuToggle.addEventListener("click", () => {
        mobileMenuOverlay.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenuOverlay.classList.remove("active");
    });

    // Close mobile menu on clicking link
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("active");
        });
    });

    /* ==========================================================================
       CART DRAWER CONTROLS
       ========================================================================== */
    cartBtn.addEventListener("click", () => {
        cartDrawerOverlay.classList.add("active");
        renderCart();
    });

    closeCartBtn.addEventListener("click", () => {
        cartDrawerOverlay.classList.remove("active");
    });

    cartDrawerOverlay.addEventListener("click", (e) => {
        if (e.target === cartDrawerOverlay) {
            cartDrawerOverlay.classList.remove("active");
        }
    });

    /* ==========================================================================
       WISHLIST CONTROLS
       ========================================================================== */
    wishlistBtn.addEventListener("click", () => {
        wishlistOverlay.classList.add("active");
        renderWishlist();
    });

    closeWishlistBtn.addEventListener("click", () => {
        wishlistOverlay.classList.remove("active");
    });

    wishlistOverlay.addEventListener("click", (e) => {
        if (e.target === wishlistOverlay) {
            wishlistOverlay.classList.remove("active");
        }
    });

    /* ==========================================================================
       GLOBAL SEARCH PANEL
       ========================================================================== */
    searchBtn.addEventListener("click", () => {
        searchOverlay.classList.add("active");
        setTimeout(() => globalSearchInput.focus(), 300);
    });

    closeSearchBtn.addEventListener("click", () => {
        searchOverlay.classList.remove("active");
        globalSearchInput.value = "";
        triggerSearchText("");
    });

    globalSearchInput.addEventListener("input", (e) => {
        triggerSearchText(e.target.value);
    });

    /* ==========================================================================
       QUICK VIEW MODAL CLOSES
       ========================================================================== */
    closeModalBtn.addEventListener("click", () => {
        quickViewOverlay.classList.remove("active");
    });

    quickViewOverlay.addEventListener("click", (e) => {
        if (e.target === quickViewOverlay) {
            quickViewOverlay.classList.remove("active");
        }
    });

    /* ==========================================================================
       FEATURED PRODUCTS RENDER & FILTER
       ========================================================================== */
    // Filter click handler
    filterTags.forEach(tag => {
        tag.addEventListener("click", () => {
            filterTags.forEach(t => t.classList.remove("active"));
            tag.classList.add("active");
            activeCategoryFilter = tag.dataset.filter;
            filterAndRenderFeaturedProducts();
        });
    });

    // Filter text input handler
    filterSearchInput.addEventListener("input", (e) => {
        activeSearchQuery = e.target.value.toLowerCase();
        filterAndRenderFeaturedProducts();
    });

    function filterAndRenderFeaturedProducts() {
        const filtered = PRODUCTS.filter(p => {
            const matchesCategory = activeCategoryFilter === "all" || p.category === activeCategoryFilter;
            const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery) || 
                                 p.description.toLowerCase().includes(activeSearchQuery);
            return matchesCategory && matchesSearch;
        });

        renderFeaturedProducts(filtered);
    }

    function renderFeaturedProducts(productsList) {
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
                                aria-label="Toggle Wishlist">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                        <div class="product-image-container" onclick="openQuickView('${product.id}')">
                            <img src="${product.image}" alt="${product.name}" class="product-img-primary">
                        </div>
                        <div class="product-card-actions">
                            <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Aperçu Rapide</button>
                            <button class="quick-add-btn" onclick="addToCartDirect('${product.id}')">Ajout Rapide</button>
                        </div>
                    </div>
                    <div class="product-card-meta">
                        <div class="product-title-row">
                            <h3 class="product-name" onclick="openQuickView('${product.id}')" style="cursor:pointer;">${product.name}</h3>
                            <span class="product-price">${product.price} XOF</span>
                        </div>
                        <p class="product-short-desc">${product.description.split('.')[0]}.</p>
                    </div>
                </div>
            `;
        }).join("");
    }

    /* ==========================================================================
       NEW ARRIVALS CAROUSEL HORIZONTAL DRAG & SCROLL
       ========================================================================== */
    if (carouselTrack) {
        // Scroll navigation buttons
        carouselPrev.addEventListener("click", () => {
            carouselTrack.scrollBy({ left: -380, behavior: "smooth" });
        });

        carouselNext.addEventListener("click", () => {
            carouselTrack.scrollBy({ left: 380, behavior: "smooth" });
        });

        // Sync scroll bar thumb indicator
        carouselTrack.addEventListener("scroll", () => {
            const scrollTotal = carouselTrack.scrollWidth - carouselTrack.clientWidth;
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

            // Animation spinner
            btnText.textContent = "";
            spinner.style.display = "inline-block";
            submitBtn.style.pointerEvents = "none";

            setTimeout(() => {
                // Success trigger
                spinner.style.display = "none";
                btnText.textContent = "Subscribed";
                submitBtn.style.backgroundColor = "var(--accent-orange)";
                submitBtn.style.borderColor = "var(--accent-orange)";
                submitBtn.style.color = "white";
                
                showToast("Subscribed! Welcome to the Syndicate.");
                input.value = "";

                setTimeout(() => {
                    btnText.textContent = "Subscribe";
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
   GLOBAL SEARCH PANEL REAL-TIME FILTER
   ========================================================================== */
function triggerSearchText(text) {
    const globalSearchInput = document.getElementById("globalSearchInput");
    const searchResultsGrid = document.getElementById("searchResultsGrid");
    const resultsHeader = document.getElementById("resultsHeader");
    
    globalSearchInput.value = text;
    const query = text.toLowerCase().trim();

    if (!query) {
        searchResultsGrid.innerHTML = `<p class="search-empty-state">Commencez à taper pour voir les collections correspondantes.</p>`;
        resultsHeader.textContent = "Résultats de Recherche";
        return;
    }

    const matched = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    resultsHeader.textContent = `Résultats de Recherche (${matched.length})`;

    if (matched.length === 0) {
        searchResultsGrid.innerHTML = `<p class="search-empty-state">Aucun produit trouvé pour "${text}".</p>`;
        return;
    }

    searchResultsGrid.innerHTML = matched.map(product => `
        <div class="search-result-card" onclick="openQuickView('${product.id}')">
            <div class="search-result-img-box">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h5 class="search-result-name">${product.name}</h5>
            <span class="search-result-price">${product.price} XOF</span>
        </div>
    `).join("");
}

/* ==========================================================================
   CART UTILITIES (ADD, REMOVE, QUANTITY, RENDER)
   ========================================================================== */
function addToCartDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // If product has size selectors (hoodies, tees) but no size selected, open quick view
    if (product.sizes.length > 0) {
        openQuickView(productId);
        showToast("Please select a size first.");
        return;
    }

    // Add to cart with blank size
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
        showToast("Item removed from bag.");
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
    showToast("Item removed from bag.");
}

function saveCart() {
    localStorage.setItem("culture_cart", JSON.stringify(cart));
}

function openCartDrawer() {
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    cartDrawerOverlay.classList.add("active");
    renderCart();
}

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalText = document.getElementById("cartSubtotal");
    const footer = document.getElementById("cartDrawerFooter");
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <p>Votre sac est vide.</p>
                <button class="btn btn-dark" style="margin-top: 15px;" onclick="closeCartDrawer()">Commencer les Achats</button>
            </div>
        `;
        subtotalText.textContent = "0 XOF";
        footer.style.opacity = "0.5";
        footer.style.pointerEvents = "none";
        return;
    }

    footer.style.opacity = "1";
    footer.style.pointerEvents = "auto";

    let total = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item">
                <div class="cart-item-img-box">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-title-row">
                        <span class="cart-item-name">${item.product.name}</span>
                        <span class="cart-item-price">${itemTotal} XOF</span>
                    </div>
                    <div class="cart-item-variant">${item.size ? 'Taille : ' + item.size : 'Taille Unique'}</div>
                    <div class="cart-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateCartQty('${item.product.id}', '${item.size}', -1)" aria-label="Decrease quantity">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQty('${item.product.id}', '${item.size}', 1)" aria-label="Increase quantity">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeCartItem('${item.product.id}', '${item.size}')">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    subtotalText.textContent = `${total} XOF`;
}

function closeCartDrawer() {
    document.getElementById("cartDrawerOverlay").classList.remove("active");
}

/* ==========================================================================
   WISHLIST UTILITIES (TOGGLE, REMOVE, RENDER)
   ========================================================================== */
function toggleWishlistItem(productId) {
    const index = wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast("Removed from wishlist.");
    } else {
        wishlist.push(productId);
        showToast("Added to wishlist.");
    }

    saveWishlist();
    updateBadgesCount();
    
    // Sync heart state on all cards with this product id
    document.querySelectorAll(`.product-card[data-id="${productId}"] .wishlist-toggle-btn`).forEach(btn => {
        btn.classList.toggle("active");
        const svg = btn.querySelector("svg");
        if (btn.classList.contains("active")) {
            svg.setAttribute("fill", "currentColor");
        } else {
            svg.setAttribute("fill", "none");
        }
    });

    renderWishlist();
}

function saveWishlist() {
    localStorage.setItem("culture_wishlist", JSON.stringify(wishlist));
}

function renderWishlist() {
    const container = document.getElementById("wishlistItemsContainer");
    
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
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title-row">
                    <span class="cart-item-name" onclick="openQuickView('${product.id}'); closeWishlistDrawer()" style="cursor:pointer;">${product.name}</span>
                    <span class="cart-item-price">${product.price} XOF</span>
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
    addToCartDirect(productId);
    document.getElementById("wishlistOverlay").classList.remove("active");
}

function closeWishlistDrawer() {
    document.getElementById("wishlistOverlay").classList.remove("active");
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

    // Cart counts sync
    cartCount.textContent = cartTotalQty;
    if (cartTotalQty > 0) {
        cartCount.classList.add("active");
    } else {
        cartCount.classList.remove("active");
    }
    if (cartHeaderCount) cartHeaderCount.textContent = cartTotalQty;

    // Wishlist counts sync
    wishlistCount.textContent = wishlistTotalQty;
    if (wishlistTotalQty > 0) {
        wishlistCount.classList.add("active");
    } else {
        wishlistCount.classList.remove("active");
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
    const isWishlisted = wishlist.includes(product.id);

    body.innerHTML = `
        <div class="quick-view-grid">
            <div class="qv-img-side">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="qv-text-side">
                <div class="qv-badge">${product.category}</div>
                <h3 class="qv-title">${product.name}</h3>
                <div class="qv-price">${product.price} XOF</div>
                <p class="qv-description">${product.description}</p>
                
                ${product.sizes.length > 0 ? `
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
                    <button class="qv-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem('${product.id}'); syncModalWishlistBtn(this)" aria-label="Add to Wishlist">
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
    parent.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function syncModalWishlistBtn(btn) {
    btn.classList.toggle("active");
    const svg = btn.querySelector("svg");
    if (btn.classList.contains("active")) {
        svg.setAttribute("fill", "currentColor");
    } else {
        svg.setAttribute("fill", "none");
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
    showToast(`Added ${product.name} ${selectedSize ? '(' + selectedSize + ')' : ''} to bag.`);
    
    // Close modal
    document.getElementById("quickViewOverlay").classList.remove("active");
    
    // Open cart drawer
    openCartDrawer();
}

/* ==========================================================================
   TOAST POPUPS
   ========================================================================== */
function showToast(message) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <svg class="toast-success-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Fade in
    setTimeout(() => toast.classList.add("show"), 100);

    // Fade out and remove
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
    
    // Update active filter tags UI
    const filterTags = document.querySelectorAll(".filter-tag");
    filterTags.forEach(tag => {
        if (tag.dataset.filter === category) {
            tag.classList.add("active");
        } else {
            tag.classList.remove("active");
        }
    });

    // Smooth scroll to featured drop filter bar
    const section = document.getElementById("featured");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

    // Trigger filter
    const filterSearchInput = document.getElementById("filterSearchInput");
    if (filterSearchInput) filterSearchInput.value = "";
    activeSearchQuery = "";
    
    // Call the dynamic filter and render
    // Search elements are loaded inside DOMContentLoaded, so wrap in event loop to guarantee DOM references exist
    setTimeout(() => {
        const productsList = PRODUCTS.filter(p => category === "all" || p.category === category);
        const productsGrid = document.getElementById("productsGrid");
        if (productsGrid) {
            // Render
            const wishlist = JSON.parse(localStorage.getItem("culture_wishlist")) || [];
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
                                    aria-label="Toggle Wishlist">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                            <div class="product-image-container" onclick="openQuickView('${product.id}')">
                                <img src="${product.image}" alt="${product.name}" class="product-img-primary">
                            </div>
                            <div class="product-card-actions">
                                <button class="quick-view-btn" onclick="openQuickView('${product.id}')">Quick View</button>
                                <button class="quick-add-btn" onclick="addToCartDirect('${product.id}')">Quick Add</button>
                            </div>
                        </div>
                        <div class="product-card-meta">
                            <div class="product-title-row">
                                <h3 class="product-name" onclick="openQuickView('${product.id}')" style="cursor:pointer;">${product.name}</h3>
                                <span class="product-price">$${product.price}</span>
                            </div>
                            <p class="product-short-desc">${product.description.split('.')[0]}.</p>
                        </div>
                    </div>
                `;
            }).join("");
        }
    }, 100);
}
