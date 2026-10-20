/* ==========================================================================
   PRODUCTS DATA
   ========================================================================== */
const INITIAL_PRODUCTS = [
    {
        id: "dj1",
        name: "Veste Hoodie Raw Indigo Denim 480gsm",
        price: 12000,
        category: "hoodies",
        image: "IMAGE/denim_jacket.jpg",
        description: "Veste à capuche zippée en denim brut indigo lourd 480gsm. Coupe boxy streetwear avec capuche anatomique double épaisseur, fermeture éclair métallique renforcée, poignets et ourlet plissés élastiques. Conçue pour résister au temps et offrir une silhouette urbaine sculptée.",
        sizes: ["S", "M", "L", "XL"],
        status: "preorder",
        preorderBadge: "⚡ EXCLUSIVITÉ DROP 02",
        releaseDate: "15 Oct. 2026",
        reservedPercentage: 85,
        totalStock: 50,
        reservedStock: 42
    },
    {
        id: "c1",
        name: "Terra Icon Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 1.png",
        description: "Sac streetwear noir avec illustration colorée d'un personnage sur la Terre. Sangle imprimée ajustable et boucle mate à dégagement rapide. Conçu pour un usage quotidien intensif.",
        sizes: [],
        status: "preorder",
        preorderBadge: "⚡ PRÉ-VENTE DROPS 02",
        releaseDate: "15 Oct. 2026",
        reservedPercentage: 85,
        totalStock: 50,
        reservedStock: 42
    },
    {
        id: "c2",
        name: "Aero Character Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 2.png",
        description: "Sac bandoulière technique résistant aux intempéries avec imprimé emblématique du personnage à capuche rouge. Équipé d'une double fermeture éclair, de poches intérieures et d'un porte-clés.",
        sizes: [],
        status: "preorder",
        preorderBadge: "⚡ PRÉ-VENTE DROPS 02",
        releaseDate: "15 Oct. 2026",
        reservedPercentage: 90,
        totalStock: 50,
        reservedStock: 45
    },
    {
        id: "c3",
        name: "Portrait Editorial Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 3.png",
        description: "Sac portrait artistique premium. Conçu avec des compartiments à double accès rapide, des organiseurs internes en filet et une sangle tactile épaisse. Démarquez-vous dans la foule urbaine.",
        sizes: [],
        status: "upcoming",
        preorderBadge: "⏳ DROP IMMINENT",
        releaseDate: "28 Oct. 2026",
        reservedPercentage: 60,
        totalStock: 50,
        reservedStock: 30
    },
    {
        id: "c4",
        name: "Minimalist Utility Crossbody",
        price: 8000,
        category: "bags",
        image: "IMAGE/c 4.png",
        description: "Structure ultra-épurée avec de subtils motifs de lignes techniques. Fabriqué en tissage balistique ultra-durable 1680D avec des poches de rangement dissimulées à l'arrière.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 50,
        reservedStock: 50
    },
    {
        id: "sac1",
        name: "ILLEGAL Blackout Pack Vol.1",
        price: 12000,
        category: "bags",
        image: "IMAGE/sac_illegal_black.png",
        description: "Sac à dos en toile technique noire intense avec logo ILLEGAL brodé sur patch woven et sigle Priority en rouge sang. Détails Diesel co-brandés, tirette corde tressée, compartiment principal large + poche frontale organisée. Le daily bag du mouvement.",
        sizes: [],
        status: "preorder",
        preorderBadge: "⚡ COLLAB EXCLUSIVE",
        releaseDate: "15 Oct. 2026",
        reservedPercentage: 88,
        totalStock: 40,
        reservedStock: 35
    },
    {
        id: "sac2",
        name: "ILLEGAL Star Pack Vol.2",
        price: 12000,
        category: "bags",
        image: "IMAGE/sac_illegal_star.png",
        description: "Version signature de la collection ILLEGAL × Priority. Sac à dos all-black avec macro-graphic de l'étoile blanche imprimée pleine face. Badge Priority bleu en pendant. Silhouette épurée, bretelles ergonomiques rembourrées, dos aéré maillé. L'icône de la rue.",
        sizes: [],
        status: "preorder",
        preorderBadge: "⚡ COLLAB EXCLUSIVE",
        releaseDate: "15 Oct. 2026",
        reservedPercentage: 92,
        totalStock: 40,
        reservedStock: 37
    },
    {
        id: "sac3",
        name: "ILLEGAL Ocean Camo Pack",
        price: 14000,
        category: "bags",
        image: "IMAGE/sac_illegal_blue.png",
        description: "Edition premium en tissu camo aquatique bleu céruléen avec motif all-over imprimé sublimation. Logo ILLEGAL en patch woven ton-sur-ton blanc. Format mini-pack compact — grand style, haute portabilité. Pièce rare, drop limité 30 unités.",
        sizes: [],
        status: "upcoming",
        preorderBadge: "⏳ DROP LIMITÉ — 30 pcs",
        releaseDate: "28 Oct. 2026",
        reservedPercentage: 65,
        totalStock: 30,
        reservedStock: 20
    },
    {
        id: "h1",
        name: "Heavyweight Boxy Hoodie",
        price: 8000,
        category: "hoodies",
        image: "IMAGE/hoodie.jpg",
        description: "Hoodie en coton bio haute densité 450gsm avec coupe ample et épaules tombantes. Capuche premium double épaisseur et poches invisibles sur les coutures latérales.",
        sizes: ["S", "M", "L", "XL"],
        status: "preorder",
        preorderBadge: "⚡ PRÉ-VENTE ED. LIMITÉE",
        releaseDate: "20 Oct. 2026",
        reservedPercentage: 75,
        totalStock: 40,
        reservedStock: 30
    },
    {
        id: "t1",
        name: "Creator Studio Tee",
        price: 8000,
        category: "tees",
        image: "IMAGE/tee.jpg",
        description: "T-shirt en jersey de coton peigné imprimé d'illustrations graphiques de sous-culture avec des encres haute fidélité. Offre une silhouette moderne structurée qui conserve sa forme.",
        sizes: ["S", "M", "L", "XL"],
        status: "upcoming",
        preorderBadge: "⏳ NOUVEAU DROP",
        releaseDate: "28 Oct. 2026",
        reservedPercentage: 40,
        totalStock: 60,
        reservedStock: 24
    },
    {
        id: "cap1",
        name: "Urban Explorer Cap",
        price: 8000,
        category: "caps",
        image: "IMAGE/cap.jpg",
        description: "Casquette classique utilitaire à 6 panneaux. Finitions avec détails typographiques brodés épurés, visière pré-incurvée et sangle arrière réglable à boucle métallique.",
        sizes: ["Taille Unique"],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 30,
        reservedStock: 30
    }
];

let PRODUCTS = JSON.parse(localStorage.getItem("culture_products")) || [...INITIAL_PRODUCTS];

// Ensure initial products always merge up-to-date properties while keeping custom images
PRODUCTS = PRODUCTS.map(prod => {
    const initMatch = INITIAL_PRODUCTS.find(i => i.id === prod.id);
    if (initMatch) {
        return {
            ...initMatch,
            ...prod,
            image: (prod.image && prod.image.trim()) ? prod.image : initMatch.image,
            status: prod.status || initMatch.status,
            preorderBadge: prod.preorderBadge || initMatch.preorderBadge,
            releaseDate: prod.releaseDate || initMatch.releaseDate,
            reservedPercentage: prod.reservedPercentage || initMatch.reservedPercentage
        };
    }
    return prod;
});

// Inject any new INITIAL_PRODUCTS entries missing from localStorage cache
INITIAL_PRODUCTS.forEach(initProd => {
    if (!PRODUCTS.find(p => p.id === initProd.id)) {
        PRODUCTS.push(initProd);
    }
});

saveProductsToStorage();

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
            openAdminAuth();
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
        newsletterForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = newsletterForm.querySelector("button[type='submit']");
            const btnText = submitBtn.childNodes[0];
            const spinner = submitBtn.querySelector(".btn-spinner");
            const input = newsletterForm.querySelector("input");
            const email = input ? input.value.trim() : "";

            btnText.textContent = "";
            if (spinner) spinner.style.display = "inline-block";
            submitBtn.style.pointerEvents = "none";

            if (email && window.SupabaseService) {
                await window.SupabaseService.subscribeNewsletter(email);
            }

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
    startDropCountdown();
    renderDropCarousel('all');
    filterAndRenderFeaturedProducts();
    updateBadgesCount();
});

/* ==========================================================================
   NEW DROP COUNTDOWN & PRÉ-VENTES ENGINE
   ========================================================================== */
function startDropCountdown() {
    let targetTime = localStorage.getItem("culture_drop_target");
    if (!targetTime) {
        targetTime = Date.now() + (4 * 86400 + 18 * 3600 + 42 * 60 + 15) * 1000;
        localStorage.setItem("culture_drop_target", targetTime);
    }

    function update() {
        const now = Date.now();
        const diff = Math.max(0, targetTime - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const cdDays = document.getElementById("cdDays");
        const cdHours = document.getElementById("cdHours");
        const cdMins = document.getElementById("cdMins");
        const cdSecs = document.getElementById("cdSecs");

        if (cdDays) cdDays.textContent = String(days).padStart(2, "0");
        if (cdHours) cdHours.textContent = String(hours).padStart(2, "0");
        if (cdMins) cdMins.textContent = String(mins).padStart(2, "0");
        if (cdSecs) cdSecs.textContent = String(secs).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
}

let selectedFlagshipSize = "M";

function selectFlagshipSize(btn, size) {
    selectedFlagshipSize = size;
    const row = document.getElementById("flagshipSizesRow");
    if (row) {
        row.querySelectorAll(".flagship-size-btn").forEach(b => b.classList.remove("active"));
    }
    btn.classList.add("active");
}

function preorderFlagshipDenimJacket() {
    const product = PRODUCTS.find(p => p.id === "dj1") || INITIAL_PRODUCTS[0];
    if (!product) return;

    addItemToCartArray(product, selectedFlagshipSize, true);
    showToast(`⚡ PRÉ-COMMANDE VALIDÉE : ${product.name} (Taille ${selectedFlagshipSize}) ! Expédition le 15 Octobre.`);
    openCartDrawer();
}

let activeDropFilter = "all";

function filterDropItems(filterType) {
    activeDropFilter = filterType;
    document.querySelectorAll(".drop-filter-btn").forEach(btn => {
        if (btn.dataset.dropFilter === filterType) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    renderDropCarousel(filterType);
}

function renderDropCarousel(filterType = "all") {
    const track = document.getElementById("carouselTrack");
    if (!track) return;

    let items = PRODUCTS.filter(p => {
        if (filterType === "preorder") return p.status === "preorder";
        if (filterType === "upcoming") return p.status === "upcoming";
        return true;
    });

    if (items.length === 0) {
        track.innerHTML = `
            <div style="padding: 40px; text-align: center; width: 100%; color: var(--text-secondary);">
                Aucun article ne correspond à ce filtre de drop.
            </div>
        `;
        return;
    }

    track.innerHTML = items.map(product => {
        const isPreorder = product.status === "preorder";
        const isUpcoming = product.status === "upcoming";

        let badgeClass = "preorder-accent";
        let badgeText = product.preorderBadge || "⚡ PRÉ-VENTE";
        if (isUpcoming) {
            badgeClass = "upcoming-accent";
            badgeText = product.preorderBadge || "⏳ DROP IMMINENT";
        } else if (!isPreorder && !isUpcoming) {
            badgeClass = "";
            badgeText = "DISPONIBLE";
        }

        const isFitCover = product.category === "hoodies" || product.category === "tees" || product.category === "caps";

        return `
            <div class="carousel-item" data-id="${product.id}">
                <div class="carousel-item-img-wrapper" onclick="openQuickView('${product.id}')">
                    <span class="carousel-item-drop-badge ${badgeClass}">${badgeText}</span>
                    <img src="${product.image}" alt="${product.name}" class="carousel-item-img ${isFitCover ? 'fit-cover' : ''}" loading="lazy">
                </div>
                
                <div class="carousel-item-meta">
                    <div class="carousel-item-title-box">
                        <h4 class="carousel-item-name" onclick="openQuickView('${product.id}')">${product.name}</h4>
                        <span class="carousel-item-price">${formatPrice(product.price)}</span>
                    </div>
                    <div class="carousel-item-shipping-tag">
                        📦 Expédition : <strong>${product.releaseDate || '15 Oct. 2026'}</strong>
                    </div>
                </div>

                <div class="carousel-item-actions-row">
                    ${isPreorder ? `
                        <button class="btn-preorder-action" onclick="addToPreorderDirect('${product.id}')">
                            ⚡ PRÉ-COMMANDER
                        </button>
                        <button class="btn-alert-action" onclick="triggerDropAlert('${product.id}')" title="Recevoir une alerte">
                            🔔
                        </button>
                    ` : isUpcoming ? `
                        <button class="btn-preorder-action" style="background-color: var(--text-primary);" onclick="triggerDropAlert('${product.id}')">
                            🔔 M'ALERTER AU DROPS
                        </button>
                    ` : `
                        <button class="btn-preorder-action" style="background-color: var(--text-primary);" onclick="addToCartDirect('${product.id}')">
                            AJOUTER AU PANIER
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join("");
}

function addToPreorderDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (product.sizes && product.sizes.length > 0) {
        openQuickView(productId);
        showToast("⚡ Pré-commande : Veuillez choisir votre taille !");
        return;
    }

    addItemToCartArray(product, "", true);
    showToast(`⚡ PRÉ-COMMANDE : ${product.name} ajouté ! Expédition le ${product.releaseDate || '15 Oct.'}`);
    openCartDrawer();
}

function triggerDropAlert(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const name = product ? product.name : "ce produit";
    showToast(`🔔 Alerte enregistrée pour ${name} ! Notification WhatsApp activée.`);
}

function handleVipPassSignup(event) {
    event.preventDefault();
    const phoneInput = document.getElementById("vipPhoneInput");
    const phone = phoneInput ? phoneInput.value.trim() : "";
    if (phone) {
        if (window.SupabaseService && typeof window.SupabaseService.subscribeVip === 'function') {
            window.SupabaseService.subscribeVip(phone);
        }
        showToast("⚡ INSCRIPTION VIP VALIDÉE ! Accès anticipé WhatsApp 1H avant le drop.");
        phoneInput.value = "";
    }
}

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
                        <img src="${product.image}" alt="${product.name}" class="product-img-primary${product.id.startsWith('sac') ? ' backpack-img' : ''}" loading="lazy" decoding="async">
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

function addItemToCartArray(product, size, isPreorder = false) {
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
        if (isPreorder || product.status === "preorder") cart[existingIndex].isPreorder = true;
    } else {
        cart.push({
            product: product,
            quantity: 1,
            size: size,
            isPreorder: isPreorder || product.status === "preorder"
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

    // Auto-détection et pré-remplissage du code revendeur depuis l'URL ou session
    if (!currentAppliedReseller && window.SupabaseService) {
        const storedCode = window.SupabaseService.getStoredReferralCode();
        const codeInput = document.getElementById("checkoutResellerCode");
        if (storedCode && codeInput && !codeInput.value) {
            codeInput.value = storedCode;
            applyCheckoutResellerCode();
        }
    }
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
        const isPreorder = item.isPreorder || item.product.status === "preorder";
        const preorderBadgeHtml = isPreorder ? `<div class="cart-preorder-badge">⚡ PRÉ-VENTE (Expédition le ${item.product.releaseDate || '15 Oct.'})</div>` : '';

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
                    ${preorderBadgeHtml}
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
   GUEST CHECKOUT & WHATSAPP / PAYMENTS PROCESSOR
   ========================================================================== */

let currentAppliedReseller = null;

function applyCheckoutResellerCode() {
    const codeInput = document.getElementById("checkoutResellerCode");
    const feedback = document.getElementById("resellerCodeFeedback");
    const code = codeInput ? codeInput.value.trim().toUpperCase() : "";

    if (!code) {
        if (feedback) {
            feedback.textContent = "Veuillez entrer un code.";
            feedback.className = "reseller-feedback error";
        }
        currentAppliedReseller = null;
        return Promise.resolve({ valid: false });
    }

    if (window.SupabaseService) {
        return window.SupabaseService.verifyResellerCode(code).then(res => {
            if (res.valid) {
                currentAppliedReseller = res.reseller;
                if (feedback) {
                    feedback.textContent = `✓ Code revendeur appliqué (${res.reseller.name}).`;
                    feedback.className = "reseller-feedback success";
                }
                showToast(`Code revendeur ${res.reseller.code} validé !`);
            } else {
                currentAppliedReseller = null;
                if (feedback) {
                    feedback.textContent = res.message || "Ce code revendeur n'est pas valide.";
                    feedback.className = "reseller-feedback error";
                }
            }
            return res;
        });
    }
    return Promise.resolve({ valid: false });
}

function updatePaymentMethodsByCountry() {
    const countrySelect = document.getElementById("checkoutCountry");
    const paymentSelect = document.getElementById("checkoutPaymentMethod");
    if (!countrySelect || !paymentSelect) return;

    const country = countrySelect.value;
    paymentSelect.innerHTML = "";

    if (country === "Bénin") {
        paymentSelect.innerHTML = `
            <option value="Mobile Money (MTN / Moov)">📱 Mobile Money (MTN / Moov Bénin)</option>
            <option value="Espèces à la livraison">💵 Paiement à la Livraison (Cotonou / Calavi)</option>
            <option value="WhatsApp Direct (Validation Rapide)">💬 Validation Directe via WhatsApp</option>
        `;
    } else if (country === "Côte d'Ivoire") {
        paymentSelect.innerHTML = `
            <option value="Wave / Orange Money">🌊 Wave / Orange Money (Côte d'Ivoire)</option>
            <option value="MTN Mobile Money CI">📱 MTN Mobile Money (CI)</option>
            <option value="Moov Money CI">📱 Moov Money (CI)</option>
            <option value="WhatsApp Direct (Validation Rapide)">💬 Validation Directe via WhatsApp</option>
        `;
    } else {
        paymentSelect.innerHTML = `
            <option value="Carte Bancaire / Virement">💳 Carte Bancaire / Virement International</option>
            <option value="WhatsApp Direct (Validation Rapide)">💬 Validation Directe via WhatsApp</option>
        `;
    }
}

async function processCheckout() {
    if (cart.length === 0) {
        showToast("Votre panier est vide !");
        return;
    }

    const nameInput = document.getElementById("checkoutName");
    const phoneInput = document.getElementById("checkoutPhone");
    const emailInput = document.getElementById("checkoutEmail");
    const countryInput = document.getElementById("checkoutCountry");
    const cityInput = document.getElementById("checkoutCity");
    const locationInput = document.getElementById("checkoutLocation");
    const paymentMethodInput = document.getElementById("checkoutPaymentMethod");

    const customerName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Client Invité";
    const customerPhone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : "";
    const customerEmail = emailInput && emailInput.value.trim() ? emailInput.value.trim() : "";
    const country = countryInput ? countryInput.value : "Bénin";
    const city = cityInput && cityInput.value.trim() ? cityInput.value.trim() : "";
    const customerLocation = locationInput && locationInput.value.trim() ? locationInput.value.trim() : "";
    const paymentMethod = paymentMethodInput ? paymentMethodInput.value : "Mobile Money";

    // Vérifier et attendre de manière asynchrone sécurisée le code revendeur capturé via l'URL (?ref=MARIE01)
    let resellerToUse = currentAppliedReseller;
    if (!resellerToUse && window.SupabaseService) {
        const storedCode = window.SupabaseService.getStoredReferralCode();
        if (storedCode) {
            try {
                const res = await window.SupabaseService.verifyResellerCode(storedCode);
                if (res.valid) {
                    resellerToUse = res.reseller;
                    currentAppliedReseller = res.reseller;
                }
            } catch (err) {
                console.warn("Erreur vérification code revendeur:", err);
            }
        }
    }

    let total = 0;
    let itemsListText = "";
    let hasPreorder = false;

    cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        const sizeText = item.size ? ` (Taille: ${item.size})` : "";
        const isPreorder = item.isPreorder || item.product.status === "preorder";
        if (isPreorder) hasPreorder = true;
        const preorderTag = isPreorder ? ` [⚡ PRÉ-VENTE - Sortie estimée: ${item.product.releaseDate || '15 Oct.'}]` : "";

        itemsListText += `${index + 1}. *${item.product.name}*${preorderTag}${sizeText}\n   Quantité: ${item.quantity} x ${formatPrice(item.product.price)} = *${formatPrice(itemTotal)}*\n`;
    });

    const isFreeShipping = total >= 25000;
    const shippingText = isFreeShipping ? "Gracieuse (Offerte 🎉)" : `Calculée selon destination (${country} / ${city || 'Locale'})`;

    let customerInfoBlock = `*INFORMATIONS CLIENT (CHECKOUT INVITÉ)*\n` +
        `👤 Nom: ${customerName}\n` +
        (customerPhone ? `📞 Tél/WhatsApp: ${customerPhone}\n` : "") +
        (customerEmail ? `📧 Email: ${customerEmail}\n` : "") +
        `🌍 Pays: ${country} ${city ? '(' + city + ')' : ''}\n` +
        (customerLocation ? `📍 Adresse/Quartier: ${customerLocation}\n` : "") +
        `💳 Mode de Paiement: ${paymentMethod}\n` +
        (resellerToUse ? `🏷️ Code Revendeur Associé: ${resellerToUse.code}\n` : "") +
        `\n`;

    const headerTitle = hasPreorder ? "*NOUVELLE COMMANDE EN PRÉ-VENTE - CULTURE STREETWEAR*" : "*NOUVELLE COMMANDE - CULTURE STREETWEAR*";

    const message = `${headerTitle}\n\n` +
        customerInfoBlock +
        `Bonjour, je souhaite valider ma commande :\n\n` +
        `${itemsListText}\n` +
        `*TOTAL COMMANDE : ${formatPrice(total)}*\n` +
        `*Frais de livraison* : ${shippingText}\n\n` +
        `Merci de me confirmer la réservation de mes articles et l'accès au paiement.`;

    const orderPayload = {
        customerName,
        customerPhone,
        customerEmail,
        country,
        city,
        address: customerLocation,
        paymentMethod,
        total,
        hasPreorder,
        items: cart.map(i => ({
            name: i.product.name + ((i.isPreorder || i.product.status === 'preorder') ? " [PRÉ-VENTE]" : ""),
            size: i.size || "Standard",
            quantity: i.quantity,
            price: i.product.price,
            image: i.product.image
        })),
        resellerInfo: resellerToUse
    };

    if (window.SupabaseService) {
        try {
            const createdOrder = await window.SupabaseService.createOrder(orderPayload);
            orders.unshift(createdOrder);
        } catch (err) {
            console.error("Erreur enregistrement commande:", err);
            showToast(err.message || "Erreur lors de la validation de la commande.");
            return;
        }
    }

    const defaultWhatsApp = (window.ENV_CONFIG && window.ENV_CONFIG.WHATSAPP_NUMBER)
        ? window.ENV_CONFIG.WHATSAPP_NUMBER
        : "2290167411124";

    if (window.PaymentService) {
        try {
            const res = await window.PaymentService.processOrderPayment(orderPayload);
            if (res && res.message) showToast(res.message);
        } catch (err) {
            console.warn("Passerelle de paiement en échec, bascule WhatsApp:", err);
            const whatsappUrl = `https://wa.me/${defaultWhatsApp}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        }
    } else {
        const whatsappUrl = `https://wa.me/${defaultWhatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
        showToast("Redirection vers la passerelle de confirmation...");
    }

    // Vider le panier et synchroniser l'affichage
    cart = [];
    saveCart();
    renderCart();
    updateBadgesCount();
    closeCartDrawer();
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

    const section = document.getElementById("boutique") || document.getElementById("featured");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }

    const filterSearchInput = document.getElementById("filterSearchInput");
    if (filterSearchInput) filterSearchInput.value = "";
    activeSearchQuery = "";
    
    filterAndRenderFeaturedProducts();
}

/* ==========================================================================
   UNIFIED DASHBOARD CONTROLLER & RBAC SYSTEM (ADMIN & RESELLER)
   ========================================================================== */

let currentUserRole = "ROLE_ADMIN"; // "ROLE_ADMIN" ou "ROLE_RESELLER"
let currentResellerSession = null;  // Stocke le profil du revendeur connecté

function openAdminAuth() {
    const modal = document.getElementById("adminLoginModal");
    if (!modal) return;
    selectAuthRole('admin');
    modal.classList.add("active");
}

function closeAdminAuth() {
    const modal = document.getElementById("adminLoginModal");
    if (modal) modal.classList.remove("active");
}

function selectAuthRole(role) {
    const roleInput = document.getElementById("authRoleInput");
    const adminBtn = document.getElementById("authRoleAdminBtn");
    const resellerBtn = document.getElementById("authRoleResellerBtn");
    const pinGroup = document.getElementById("adminPinGroup");
    const resellerGroup = document.getElementById("resellerCodeGroup");
    const hintText = document.getElementById("loginHintText");

    if (roleInput) roleInput.value = role;

    if (role === 'admin') {
        if (adminBtn) adminBtn.classList.add('active');
        if (resellerBtn) resellerBtn.classList.remove('active');
        if (pinGroup) pinGroup.style.display = 'block';
        if (resellerGroup) resellerGroup.style.display = 'none';
        if (hintText) hintText.innerHTML = "Code PIN Admin par défaut : <strong>1234</strong>";
    } else {
        if (adminBtn) adminBtn.classList.remove('active');
        if (resellerBtn) resellerBtn.classList.add('active');
        if (pinGroup) pinGroup.style.display = 'none';
        if (resellerGroup) resellerGroup.style.display = 'block';
        if (hintText) hintText.innerHTML = "Démo codes revendeurs : <strong>MARIE01</strong>, <strong>KOFFI02</strong>";
    }
}

async function handleUnifiedLogin(event) {
    event.preventDefault();
    const roleInput = document.getElementById("authRoleInput");
    const role = roleInput ? roleInput.value : "admin";

    if (role === "admin") {
        const pinInput = document.getElementById("adminPinInput");
        const enteredPin = pinInput ? pinInput.value.trim() : "";
        if (enteredPin === adminPin) {
            currentUserRole = "ROLE_ADMIN";
            currentResellerSession = null;
            if (window.AuthService) {
                await window.AuthService.login("admin@culture.store", "admin123");
            }
            closeAdminAuth();
            openAdminDashboard();
            showToast("Bienvenue dans l'Espace Administration 🔑");
        } else {
            showToast("❌ Code PIN Administrateur incorrect !");
        }
    } else {
        const codeInput = document.getElementById("resellerCodeLoginInput");
        const enteredCode = codeInput ? codeInput.value.trim().toUpperCase() : "";
        
        if (!enteredCode) {
            showToast("Veuillez entrer votre code revendeur.");
            return;
        }

        if (window.SupabaseService) {
            const res = await window.SupabaseService.verifyResellerCode(enteredCode);
            if (res.valid) {
                currentUserRole = "ROLE_RESELLER";
                currentResellerSession = res.reseller;
                if (window.AuthService) {
                    await window.AuthService.login(res.reseller.email || res.reseller.code, res.reseller.code || "reseller123");
                }
                closeAdminAuth();
                openAdminDashboard();
                showToast(`Bienvenue ${res.reseller.name} dans votre Espace Revendeur 👥`);
            } else {
                showToast(`❌ ${res.message || "Code revendeur invalide."}`);
            }
        }
    }
}

function openAdminDashboard() {
    const overlay = document.getElementById("adminDashboardOverlay");
    if (!overlay) return;

    overlay.classList.add("active");

    // Adapter le titre et les badges du header selon le rôle
    const titleEl = document.getElementById("dashboardHeaderTitle");
    const badgeEl = document.getElementById("dashboardRoleBadge");
    
    const adminButtons = document.querySelectorAll(".admin-only");
    const resellerButtons = document.querySelectorAll(".reseller-only");

    if (currentUserRole === "ROLE_ADMIN") {
        if (titleEl) titleEl.textContent = "Espace Administrateur — Dashboard Global";
        if (badgeEl) {
            badgeEl.textContent = "● Mode Administrateur Actif";
            badgeEl.className = "admin-badge-live";
        }
        adminButtons.forEach(b => b.style.display = "inline-block");
        resellerButtons.forEach(b => b.style.display = "none");
    } else {
        const resName = currentResellerSession ? currentResellerSession.name : "Revendeur";
        const resCode = currentResellerSession ? currentResellerSession.code : "";
        if (titleEl) titleEl.textContent = `Espace Revendeur — ${resName} (${resCode})`;
        if (badgeEl) {
            badgeEl.textContent = `● Revendeur Actif (${resCode})`;
            badgeEl.className = "admin-badge-live stat-value-orange";
        }
        adminButtons.forEach(b => b.style.display = "none");
        resellerButtons.forEach(b => b.style.display = "inline-block");
    }

    renderRoleStats();
    renderRoleTabs();
}

function closeAdminDashboard() {
    const overlay = document.getElementById("adminDashboardOverlay");
    if (overlay) overlay.classList.remove("active");
}

function logoutAdminDashboard() {
    currentUserRole = null;
    currentResellerSession = null;
    if (window.AuthService) {
        window.AuthService.logout();
    }
    closeAdminDashboard();
    showToast("Déconnexion réussie. À bientôt !");
}

/* ==========================================================================
   RENDER DYNAMIC STATS & TABS PER ROLE (RBAC)
   ========================================================================== */
async function renderRoleStats() {
    const statsRow = document.getElementById("dashboardStatsRow");
    if (!statsRow) return;

    if (currentUserRole === "ROLE_ADMIN") {
        const resellers = await window.SupabaseService.getAllResellers();
        const payouts = await window.SupabaseService.getAllPayoutRequests();
        const pendingPayouts = payouts.filter(p => p.status === 'PENDING').length;

        statsRow.innerHTML = `
            <div class="admin-stat-card">
                <span class="stat-label">Total Produits</span>
                <span class="stat-value">${PRODUCTS.length}</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-label">Commandes Reçues</span>
                <span class="stat-value">${orders.length}</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-label">Revendeurs Actifs</span>
                <span class="stat-value stat-value-blue">${resellers.length}</span>
            </div>
            <div class="admin-stat-card stat-card-highlight">
                <span class="stat-label">Retraits en Attente</span>
                <span class="stat-value stat-value-orange">${pendingPayouts}</span>
            </div>
        `;
    } else if (currentResellerSession) {
        const metrics = await window.SupabaseService.getResellerMetrics(currentResellerSession.id, currentResellerSession.code);

        statsRow.innerHTML = `
            <div class="admin-stat-card">
                <span class="stat-label">Total Généré</span>
                <span class="stat-value">${metrics.totalGenerated.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-label">En Attente Validation</span>
                <span class="stat-value stat-value-orange">${metrics.pendingBalance.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div class="admin-stat-card stat-card-highlight">
                <span class="stat-label">Disponible au Retrait</span>
                <span class="stat-value stat-value-green">${metrics.availableBalance.toLocaleString('fr-FR')} FCFA</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-label">Déjà Payé</span>
                <span class="stat-value stat-value-blue">${metrics.paidBalance.toLocaleString('fr-FR')} FCFA</span>
            </div>
        `;

        // Mettre à jour la bannière du modal de retrait
        const withdrawAvailable = document.getElementById("withdrawAvailableBalance");
        const withdrawMin = document.getElementById("withdrawMinAmount");
        const minPayout = Number(localStorage.getItem('culture_min_payout') || 10000);
        if (withdrawAvailable) withdrawAvailable.textContent = `${metrics.availableBalance.toLocaleString('fr-FR')} FCFA`;
        if (withdrawMin) withdrawMin.textContent = `${minPayout.toLocaleString('fr-FR')} FCFA`;
    }
}

function renderRoleTabs() {
    const tabsBar = document.getElementById("dashboardTabsBar");
    if (!tabsBar) return;

    if (currentUserRole === "ROLE_ADMIN") {
        tabsBar.innerHTML = `
            <button class="admin-tab active" onclick="switchDashboardPane('paneProducts')">📦 Catalogue</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneOrders')">📋 Commandes Clients</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneResellers')">👥 Revendeurs & Affiliés</button>
            <button class="admin-tab" onclick="switchDashboardPane('panePayouts')">💸 Demandes de Retrait</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneCommissions')">💰 Suivi Commissions</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneSettings')">⚙️ Sécurité & Config</button>
        `;
        switchDashboardPane('paneProducts');
    } else {
        tabsBar.innerHTML = `
            <button class="admin-tab active" onclick="switchDashboardPane('paneResellerSales')">🛒 Mes Ventes</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneResellerCode')">🔑 Mon Code & Lien</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneResellerWithdrawals')">🏦 Mes Retraits</button>
            <button class="admin-tab" onclick="switchDashboardPane('paneResellerProfile')">👤 Profil de Réception</button>
        `;
        switchDashboardPane('paneResellerSales');
    }
}

function switchDashboardPane(paneId) {
    document.querySelectorAll(".admin-tab").forEach(tab => {
        if (tab.getAttribute('onclick')?.includes(paneId)) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    });

    document.querySelectorAll(".admin-tab-pane").forEach(pane => {
        if (pane.id === paneId) {
            pane.classList.add("active");
        } else {
            pane.classList.remove("active");
        }
    });

    // Rendu spécifique au volet ouvert
    if (paneId === "paneProducts") renderAdminProductsList();
    else if (paneId === "paneOrders") renderAdminOrdersList();
    else if (paneId === "paneResellers") renderAdminResellersList();
    else if (paneId === "panePayouts") renderAdminPayoutsList();
    else if (paneId === "paneCommissions") renderAdminCommissionsList();
    else if (paneId === "paneResellerSales") renderResellerSalesList();
    else if (paneId === "paneResellerCode") renderResellerCodeTab();
    else if (paneId === "paneResellerWithdrawals") renderResellerWithdrawalsList();
    else if (paneId === "paneResellerProfile") renderResellerProfileTab();
}

/* ==========================================================================
   RENDERERS FOR ADMIN PANES
   ========================================================================== */
function renderAdminProductsList() {
    const tbody = document.getElementById("adminProductsTableBody");
    if (!tbody) return;

    const searchVal = document.getElementById("adminProductSearch")?.value.toLowerCase().trim() || "";
    const catVal = document.getElementById("adminCategoryFilter")?.value || "all";

    const filtered = PRODUCTS.filter(p => {
        const matchCat = catVal === "all" || p.category === catVal;
        const matchSearch = !searchVal || p.name.toLowerCase().includes(searchVal);
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">Aucun produit trouvé.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => `
        <tr>
            <td><img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" onerror="this.src='IMAGE/logo P.png'"></td>
            <td><strong>${p.name}</strong></td>
            <td><span class="admin-cat-badge">${p.category}</span></td>
            <td><strong>${formatPrice(p.price)}</strong></td>
            <td>${p.sizes?.join(", ") || "Unique"}</td>
            <td>
                <div class="admin-actions-cell">
                    <button class="btn btn-sm btn-outline" onclick="openProductEditor('${p.id}')">✏️ Éditer</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAdminProduct('${p.id}')">🗑️</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function renderAdminOrdersList() {
    const tbody = document.getElementById("adminOrdersTableBody");
    if (!tbody) return;

    const searchVal = document.getElementById("adminOrderSearch")?.value.toLowerCase().trim() || "";
    const statusVal = document.getElementById("adminOrderStatusFilter")?.value || "all";

    const filtered = orders.filter(o => {
        const matchStatus = statusVal === "all" || o.order_status === statusVal || o.status === statusVal;
        const matchSearch = !searchVal || 
            (o.id && o.id.toLowerCase().includes(searchVal)) || 
            (o.customer_name && o.customer_name.toLowerCase().includes(searchVal)) ||
            (o.referral_code && o.referral_code.toLowerCase().includes(searchVal));
        return matchStatus && matchSearch;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">Aucune commande trouvée.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(o => {
        const itemsText = o.items ? o.items.map(i => `${i.name} (x${i.quantity})`).join("<br>") : "Articles variés";
        const resellerBadge = o.referral_code 
            ? `<span class="badge-status badge-validated">🏷️ ${o.referral_code} (${o.commission_rate || 10}%)<br>Comm: ${formatPrice(o.commission_amount || 0)}</span>`
            : `<span class="badge-status" style="opacity:0.5;">Direct (Sans code)</span>`;

        const currentStatus = o.order_status || o.status || "En attente";

        return `
            <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.date_formatted || o.date || 'Récents'}</td>
                <td>
                    <strong>${o.customer_name || 'Client Invité'}</strong><br>
                    <small style="color:var(--text-muted);">${o.customer_phone || ''} — ${o.country || 'Bénin'}</small>
                </td>
                <td><small>${itemsText}</small></td>
                <td><strong>${formatPrice(o.total_amount || o.total || 0)}</strong></td>
                <td>
                    <select class="checkout-input" style="padding: 4px 8px; font-size: 12px;" onchange="handleAdminChangeOrderStatus('${o.id}', this.value)">
                        <option value="En attente" ${currentStatus === 'En attente' ? 'selected' : ''}>En attente</option>
                        <option value="Pré-commande" ${currentStatus === 'Pré-commande' ? 'selected' : ''}>Pré-commande</option>
                        <option value="Livrée" ${currentStatus === 'Livrée' || currentStatus === 'completed' ? 'selected' : ''}>Livrée (Valide Commission)</option>
                        <option value="Annulée" ${currentStatus === 'Annulée' || currentStatus === 'cancelled' ? 'selected' : ''}>Annulée (Annule Commission)</option>
                    </select>
                </td>
                <td>${resellerBadge}</td>
            </tr>
        `;
    }).join("");
}

async function handleAdminChangeOrderStatus(orderId, newStatus) {
    if (window.SupabaseService) {
        await window.SupabaseService.updateOrderStatus(orderId, newStatus);
        showToast(`Statut de la commande ${orderId} mis à jour : ${newStatus}`);
        renderAdminOrdersList();
        renderRoleStats();
    }
}

async function renderAdminResellersList() {
    const tbody = document.getElementById("adminResellersTableBody");
    if (!tbody) return;

    const resellers = await window.SupabaseService.getAllResellers();
    const searchVal = document.getElementById("adminResellerSearch")?.value.toLowerCase().trim() || "";

    const filtered = resellers.filter(r => {
        return !searchVal || r.name.toLowerCase().includes(searchVal) || r.code.toLowerCase().includes(searchVal) || r.email.toLowerCase().includes(searchVal);
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem;">Aucun revendeur enregistré.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(r => `
        <tr>
            <td><strong class="highlight-code" style="font-size:14px; padding:4px 8px;">${r.code || r.referral_code}</strong></td>
            <td><strong>${r.name}</strong><br><small style="color:var(--text-muted);">${r.phone} | ${r.email}</small></td>
            <td>${r.country || 'Bénin'}</td>
            <td>
                <input type="number" value="${r.rate || r.commission_rate || 10}" min="1" max="50" style="width:60px; padding:4px; border-radius:4px;" onchange="handleAdminUpdateRate('${r.id}', this.value)"> %
            </td>
            <td><strong>${r.payout_method || 'Mobile Money'}</strong></td>
            <td><span class="badge-status badge-available">Actif</span></td>
            <td><span class="badge-status ${r.status === 'Actif' || r.status === 'active' ? 'badge-validated' : 'badge-cancelled'}">${r.status}</span></td>
            <td>
                <button class="btn btn-sm btn-outline" onclick="handleAdminToggleResellerStatus('${r.id}', '${r.status}')">
                    ${r.status === 'Actif' || r.status === 'active' ? 'Suspendre' : 'Réactiver'}
                </button>
            </td>
        </tr>
    `).join("");
}

async function handleAdminUpdateRate(resellerId, newRate) {
    if (window.SupabaseService) {
        await window.SupabaseService.updateReseller(resellerId, { commission_rate: Number(newRate), rate: Number(newRate) });
        showToast("Taux de commission mis à jour pour les nouvelles commandes !");
    }
}

async function handleAdminToggleResellerStatus(resellerId, currentStatus) {
    const newStatus = (currentStatus === 'Actif' || currentStatus === 'active') ? 'Suspendu' : 'Actif';
    if (window.SupabaseService) {
        await window.SupabaseService.updateReseller(resellerId, { status: newStatus });
        showToast(`Statut du revendeur modifié en : ${newStatus}`);
        renderAdminResellersList();
    }
}

async function renderAdminPayoutsList() {
    const tbody = document.getElementById("adminPayoutsTableBody");
    if (!tbody) return;

    const payouts = await window.SupabaseService.getAllPayoutRequests();
    const filter = document.getElementById("adminPayoutFilter")?.value || "all";

    const filtered = payouts.filter(p => filter === "all" || p.status === filter);

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem;">Aucune demande de retrait trouvée.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(p => {
        let statusBadge = `<span class="badge-status badge-pending">PENDING</span>`;
        if (p.status === 'APPROVED') statusBadge = `<span class="badge-status badge-available">APPROVED</span>`;
        if (p.status === 'PAID') statusBadge = `<span class="badge-status badge-paid">PAID (Réf: ${p.transaction_reference || 'N/A'})</span>`;
        if (p.status === 'REJECTED') statusBadge = `<span class="badge-status badge-rejected">REJECTED</span>`;

        const actions = p.status === 'PENDING' || p.status === 'APPROVED' ? `
            <button class="btn btn-sm btn-success" onclick="openAdminPayModal('${p.id}')">✅ Payer</button>
            <button class="btn btn-sm btn-danger" onclick="handleAdminRejectPayout('${p.id}')">❌ Rejeter</button>
        ` : `<small style="color:var(--text-muted);">Traitée</small>`;

        return `
            <tr>
                <td><strong>${p.id}</strong></td>
                <td><strong>${p.referral_code}</strong></td>
                <td><strong class="stat-value-green">${Number(p.amount).toLocaleString('fr-FR')} FCFA</strong></td>
                <td>${p.payment_method || 'Mobile Money'}</td>
                <td>${p.payment_account} (${p.account_name})</td>
                <td>${p.date_formatted || p.requested_at?.substring(0, 10)}</td>
                <td>${statusBadge}</td>
                <td>${actions}</td>
            </tr>
        `;
    }).join("");
}

async function handleAdminRejectPayout(payoutId) {
    if (confirm("Voulez-vous vraiment rejeter cette demande de retrait ? Les fonds seront recrédités au revendeur.")) {
        await window.SupabaseService.updatePayoutStatus(payoutId, 'REJECTED');
        showToast("Demande de retrait rejetée. Solde recrédité au revendeur.");
        renderAdminPayoutsList();
        renderRoleStats();
    }
}

async function renderAdminCommissionsList() {
    const tbody = document.getElementById("adminCommissionsTableBody");
    if (!tbody) return;

    const commissions = JSON.parse(localStorage.getItem('culture_commissions') || '[]');

    if (commissions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">Aucune commission enregistrée.</td></tr>`;
        return;
    }

    tbody.innerHTML = commissions.map(c => `
        <tr>
            <td><strong>${c.order_id}</strong></td>
            <td><strong class="highlight-code" style="font-size:12px; padding:2px 6px;">${c.referral_code}</strong></td>
            <td>${formatPrice(c.order_total || 0)}</td>
            <td>${c.rate}%</td>
            <td><strong class="stat-value-green">${formatPrice(c.amount)}</strong></td>
            <td><span class="badge-status badge-${c.status.toLowerCase()}">${c.status}</span></td>
            <td>${c.created_at?.substring(0, 10)}</td>
        </tr>
    `).join("");
}

/* ==========================================================================
   RENDERERS FOR RESELLER PANES
   ========================================================================== */
async function renderResellerSalesList() {
    const tbody = document.getElementById("resellerSalesTableBody");
    if (!tbody || !currentResellerSession) return;

    const metrics = await window.SupabaseService.getResellerMetrics(currentResellerSession.id, currentResellerSession.code);

    if (metrics.orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">Vous n'avez pas encore généré de ventes avec votre code <strong>${currentResellerSession.code}</strong>.</td></tr>`;
        return;
    }

    tbody.innerHTML = metrics.orders.map(o => `
        <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.date_formatted || o.date || 'Récente'}</td>
            <td><strong>${formatPrice(o.total_amount || o.total || 0)}</strong></td>
            <td>${o.commission_rate || currentResellerSession.rate}%</td>
            <td><strong class="stat-value-green">${formatPrice(o.commission_amount || 0)}</strong></td>
            <td><span class="badge-status badge-validated">${o.order_status || o.status || 'Validée'}</span></td>
            <td><span class="badge-status badge-${(o.commission_status || 'PENDING').toLowerCase()}">${o.commission_status || 'PENDING'}</span></td>
        </tr>
    `).join("");
}

function renderResellerCodeTab() {
    if (!currentResellerSession) return;
    const codeEl = document.getElementById("displayResellerCode");
    const linkEl = document.getElementById("displayResellerLink");

    if (codeEl) codeEl.textContent = currentResellerSession.code;
    if (linkEl) linkEl.value = `${window.location.origin}${window.location.pathname}?ref=${currentResellerSession.code}`;
}

async function renderResellerWithdrawalsList() {
    const tbody = document.getElementById("resellerWithdrawalsTableBody");
    if (!tbody || !currentResellerSession) return;

    const metrics = await window.SupabaseService.getResellerMetrics(currentResellerSession.id, currentResellerSession.code);

    if (metrics.payouts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">Aucune demande de retrait effectuée pour le moment.</td></tr>`;
        return;
    }

    tbody.innerHTML = metrics.payouts.map(p => `
        <tr>
            <td><strong>${p.id}</strong></td>
            <td>${p.date_formatted || p.requested_at?.substring(0, 10)}</td>
            <td><strong class="stat-value-green">${Number(p.amount).toLocaleString('fr-FR')} FCFA</strong></td>
            <td>${p.payment_method} (${p.payment_account})</td>
            <td><span class="badge-status badge-${p.status.toLowerCase()}">${p.status}</span></td>
            <td>${p.transaction_reference || 'En cours'}</td>
            <td>${p.paid_at ? p.paid_at.substring(0, 10) : '-'}</td>
        </tr>
    `).join("");
}

function renderResellerProfileTab() {
    if (!currentResellerSession) return;
    const country = document.getElementById("profileCountry");
    const method = document.getElementById("profilePayoutMethod");
    const account = document.getElementById("profilePayoutAccount");
    const name = document.getElementById("profilePayoutName");

    if (country) country.value = currentResellerSession.country || "Bénin";
    if (method) method.value = currentResellerSession.payout_method || "Wave";
    if (account) account.value = currentResellerSession.payout_account || currentResellerSession.phone;
    if (name) name.value = currentResellerSession.payout_name || currentResellerSession.name;
}

/* ==========================================================================
   MODALS AND SUBMISSION HANDLERS
   ========================================================================== */
function openCreateResellerModal() {
    const modal = document.getElementById("adminCreateResellerModal");
    if (modal) modal.classList.add("active");
}

function closeCreateResellerModal() {
    const modal = document.getElementById("adminCreateResellerModal");
    if (modal) modal.classList.remove("active");
}

async function handleCreateResellerSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("newResellerName").value;
    const phone = document.getElementById("newResellerPhone").value;
    const email = document.getElementById("newResellerEmail").value;
    const code = document.getElementById("newResellerCode").value;
    const rate = document.getElementById("newResellerRate").value;
    const country = document.getElementById("newResellerCountry").value;

    const created = await window.SupabaseService.createReseller({ name, phone, email, code, rate, country });
    showToast(`Revendeur ${created.code} créé avec succès !`);
    closeCreateResellerModal();
    renderAdminResellersList();
}

function openResellerWithdrawalModal() {
    const modal = document.getElementById("resellerWithdrawalModal");
    if (modal) modal.classList.add("active");
    if (currentResellerSession) {
        renderRoleStats();
        const account = document.getElementById("withdrawAccountInput");
        const name = document.getElementById("withdrawNameInput");
        if (account) account.value = currentResellerSession.payout_account || currentResellerSession.phone;
        if (name) name.value = currentResellerSession.payout_name || currentResellerSession.name;
    }
}

function closeResellerWithdrawalModal() {
    const modal = document.getElementById("resellerWithdrawalModal");
    if (modal) modal.classList.remove("active");
}

async function handleWithdrawalSubmit(event) {
    event.preventDefault();
    if (!currentResellerSession) return;

    const amount = Number(document.getElementById("withdrawAmountInput").value);
    const method = document.getElementById("withdrawMethodSelect").value;
    const account = document.getElementById("withdrawAccountInput").value;
    const name = document.getElementById("withdrawNameInput").value;

    const result = await window.SupabaseService.createWithdrawalRequest(
        currentResellerSession.id,
        currentResellerSession.code,
        amount,
        method,
        account,
        name
    );

    if (result.success) {
        showToast("Demande de retrait enregistrée et transmise à l'administration !");
        closeResellerWithdrawalModal();
        renderRoleStats();
        renderResellerWithdrawalsList();
    } else {
        showToast(`❌ ${result.message}`);
    }
}

function openAdminPayModal(payoutId) {
    const modal = document.getElementById("adminPayModal");
    const input = document.getElementById("payModalPayoutId");
    if (input) input.value = payoutId;
    if (modal) modal.classList.add("active");
}

function closeAdminPayModal() {
    const modal = document.getElementById("adminPayModal");
    if (modal) modal.classList.remove("active");
}

async function handleConfirmPayoutSubmit(event) {
    event.preventDefault();
    const payoutId = document.getElementById("payModalPayoutId").value;
    const txRef = document.getElementById("payTxRefInput").value;
    const note = document.getElementById("payAdminNoteInput").value;

    await window.SupabaseService.updatePayoutStatus(payoutId, 'PAID', txRef, note);
    showToast("Statut du virement mis à jour sur PAYÉ !");
    closeAdminPayModal();
    renderAdminPayoutsList();
    renderRoleStats();
}

function savePlatformSettings(event) {
    event.preventDefault();
    const newPin = document.getElementById("newAdminPinInput")?.value.trim();
    const minPayout = document.getElementById("minPayoutInput")?.value;

    if (newPin && newPin.length >= 4) {
        adminPin = newPin;
        localStorage.setItem("culture_admin_pin", adminPin);
    }
    if (minPayout) {
        localStorage.setItem("culture_min_payout", minPayout);
    }
    showToast("Paramètres généraux enregistrés !");
}

async function saveResellerProfile(event) {
    event.preventDefault();
    if (!currentResellerSession) return;

    const country = document.getElementById("profileCountry").value;
    const method = document.getElementById("profilePayoutMethod").value;
    const account = document.getElementById("profilePayoutAccount").value;
    const name = document.getElementById("profilePayoutName").value;

    currentResellerSession.country = country;
    currentResellerSession.payout_method = method;
    currentResellerSession.payout_account = account;
    currentResellerSession.payout_name = name;

    await window.SupabaseService.updateReseller(currentResellerSession.id, {
        country, payout_method: method, payout_account: account, payout_name: name
    });

    showToast("Profil de réception mis à jour !");
}

function copyResellerCodeToClipboard() {
    if (!currentResellerSession) return;
    navigator.clipboard.writeText(currentResellerSession.code);
    showToast(`Code ${currentResellerSession.code} copié dans le presse-papier !`);
}

function copyResellerLinkToClipboard() {
    if (!currentResellerSession) return;
    const link = `${window.location.origin}${window.location.pathname}?ref=${currentResellerSession.code}`;
    navigator.clipboard.writeText(link);
    showToast(`Lien ${link} copié !`);
}

/* --- PRODUCT EDITOR & PHOTO UPLOAD --- */

function toggleAdminPreorderFields() {
    const isChecked = document.getElementById("prodIsPreorder")?.checked;
    const subfields = document.getElementById("preorderSubfields");
    if (subfields) {
        subfields.style.display = isChecked ? "block" : "none";
    }
}

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

    const isPreorderCheckbox = document.getElementById("prodIsPreorder");
    const preorderBadgeInput = document.getElementById("prodPreorderBadge");
    const releaseDateInput = document.getElementById("prodReleaseDate");
    const reservedPercentInput = document.getElementById("prodReservedPercent");
    const dropStatusSelect = document.getElementById("prodDropStatus");
    const subfields = document.getElementById("preorderSubfields");

    if (productId) {
        const prod = PRODUCTS.find(p => p.id === productId);
        if (prod) {
            document.getElementById("editProductId").value = prod.id;
            document.getElementById("prodName").value = prod.name;
            document.getElementById("prodPrice").value = prod.price;
            document.getElementById("prodCategory").value = prod.category;
            document.getElementById("prodSizes").value = prod.sizes ? prod.sizes.join(", ") : "";
            document.getElementById("prodDescription").value = prod.description || "";
            
            const isPreorder = prod.status === "preorder" || prod.status === "upcoming";
            if (isPreorderCheckbox) isPreorderCheckbox.checked = isPreorder;
            if (preorderBadgeInput) preorderBadgeInput.value = prod.preorderBadge || "";
            if (releaseDateInput) releaseDateInput.value = prod.releaseDate || "";
            if (reservedPercentInput) reservedPercentInput.value = prod.reservedPercentage || 85;
            if (dropStatusSelect) dropStatusSelect.value = prod.status || "preorder";
            if (subfields) subfields.style.display = isPreorder ? "block" : "none";

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
        if (isPreorderCheckbox) isPreorderCheckbox.checked = false;
        if (subfields) subfields.style.display = "none";
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

    const isPreorder = document.getElementById("prodIsPreorder")?.checked;
    const preorderBadge = document.getElementById("prodPreorderBadge")?.value.trim() || "⚡ PRÉ-VENTE";
    const releaseDate = document.getElementById("prodReleaseDate")?.value.trim() || "15 Oct. 2026";
    const reservedPercentage = Number(document.getElementById("prodReservedPercent")?.value) || 85;
    const dropStatus = document.getElementById("prodDropStatus")?.value || "preorder";

    if (!name || isNaN(price) || price < 0) {
        showToast("Veuillez remplir correctement les champs obligatoires.");
        return;
    }

    const sizes = sizesRaw ? sizesRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
    const image = currentProductImageData || "IMAGE/logo P.png";
    const status = isPreorder ? dropStatus : "available";

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
                image,
                status,
                preorderBadge,
                releaseDate,
                reservedPercentage
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
            image,
            status,
            preorderBadge,
            releaseDate,
            reservedPercentage
        };
        PRODUCTS.unshift(newProduct);
        showToast(`Produit "${name}" ajouté au catalogue ! 🎉`);
    }

    saveProductsToStorage();
    closeProductEditor();

    // Refresh Public Shop & Admin
    filterAndRenderFeaturedProducts();
    renderDropCarousel(activeDropFilter);
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
        renderDropCarousel(activeDropFilter);
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
        renderDropCarousel(activeDropFilter);
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
