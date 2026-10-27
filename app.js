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
        reservedStock: 30,
        stock: 20
    },
    {
        id: "dj1",
        name: "Veste Hoodie Raw Indigo Denim 480gsm",
        price: 12000,
        category: "hoodies",
        image: "IMAGE/denim_jacket.jpg",
        description: "Veste à capuche zippée en denim brut indigo lourd 480gsm avec capuche anatomique structurée et finitions plissées élastiques.",
        sizes: ["S", "M", "L", "XL"],
        status: "upcoming",
        preorderBadge: "⏳ BIENTÔT DISPONIBLE",
        releaseDate: "Bientôt disponible",
        reservedPercentage: 0,
        totalStock: 50,
        reservedStock: 0,
        stock: 50
    }
];

let storedProducts = null;
try {
    const raw = localStorage.getItem("culture_products");
    if (raw) storedProducts = JSON.parse(raw);
} catch (e) {}

let PRODUCTS = [];
if (Array.isArray(storedProducts) && storedProducts.length > 0) {
    PRODUCTS = storedProducts.map(prod => {
        // Règle formelle : si dj1 était en preorder, le basculer automatiquement en upcoming (coming soon)
        if (String(prod.id).toLowerCase() === 'dj1' && (!prod.status || prod.status === 'preorder')) {
            prod.status = 'upcoming';
            prod.preorderBadge = '⏳ BIENTÔT DISPONIBLE';
            prod.releaseDate = 'Bientôt disponible';
        }
        const initMatch = INITIAL_PRODUCTS.find(i => String(i.id).toLowerCase() === String(prod.id).toLowerCase());
        if (initMatch) {
            return {
                ...initMatch,
                ...prod,
                image: (prod.image && prod.image.trim()) ? prod.image : initMatch.image,
                stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : (initMatch.stock || 10),
                status: prod.status || initMatch.status,
                preorderBadge: prod.status === 'available' ? 'DISPONIBLE' : (prod.preorderBadge || initMatch.preorderBadge),
                releaseDate: prod.status === 'available' ? 'Immédiat' : (prod.releaseDate || initMatch.releaseDate),
                reservedPercentage: prod.reservedPercentage !== undefined ? prod.reservedPercentage : (prod.status === 'available' ? 100 : initMatch.reservedPercentage)
            };
        }
        return {
            ...prod,
            stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : 10
        };
    });
} else {
    PRODUCTS = [...INITIAL_PRODUCTS];
    saveProductsToStorage();
}

function saveProductsToStorage() {
    localStorage.setItem("culture_products", JSON.stringify(PRODUCTS));
}

function reloadProductsFromStorage() {
    try {
        const raw = localStorage.getItem("culture_products");
        if (raw) {
            const list = JSON.parse(raw);
            if (Array.isArray(list) && list.length > 0) {
                PRODUCTS = list.map(prod => {
                    if (String(prod.id).toLowerCase() === 'dj1' && (!prod.status || prod.status === 'preorder')) {
                        prod.status = 'upcoming';
                        prod.preorderBadge = '⏳ BIENTÔT DISPONIBLE';
                        prod.releaseDate = 'Bientôt disponible';
                    }
                    const initMatch = INITIAL_PRODUCTS.find(i => String(i.id).toLowerCase() === String(prod.id).toLowerCase());
                    if (initMatch) {
                        return {
                            ...initMatch,
                            ...prod,
                            image: (prod.image && prod.image.trim()) ? prod.image : initMatch.image,
                            stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : (initMatch.stock || 10),
                            status: prod.status || initMatch.status,
                            preorderBadge: prod.status === 'available' ? 'DISPONIBLE' : (prod.preorderBadge || initMatch.preorderBadge),
                            releaseDate: prod.status === 'available' ? 'Immédiat' : (prod.releaseDate || initMatch.releaseDate),
                            reservedPercentage: prod.reservedPercentage !== undefined ? prod.reservedPercentage : (prod.status === 'available' ? 100 : initMatch.reservedPercentage)
                        };
                    }
                    return {
                        ...prod,
                        stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : 10
                    };
                });
                if (typeof filterAndRenderFeaturedProducts === 'function') filterAndRenderFeaturedProducts();
                if (typeof renderDropCarousel === 'function') renderDropCarousel(activeDropFilter || 'all');
                if (typeof syncFlagshipDropCard === 'function') syncFlagshipDropCard();
            }
        }
    } catch (e) {
        console.warn("Erreur synchronisation produits:", e);
    }
}

async function syncProductsFromSupabase() {
    if (typeof supabaseClient === 'undefined' || !supabaseClient) return;
    try {
        let localProducts = [];
        try {
            const rawStored = localStorage.getItem('culture_products');
            if (rawStored) localProducts = JSON.parse(rawStored);
        } catch(e) {}

        const { data, error } = await supabaseClient.from('products').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
            const mapped = data.map(d => {
                const stk = (d.stock !== undefined && d.stock !== null)
                    ? Number(d.stock)
                    : ((d.total_stock !== undefined && d.total_stock !== null)
                        ? Number(d.total_stock)
                        : ((d.id === 'dj1') ? 50 : 10));

                return {
                    id: d.id,
                    name: d.name,
                    price: Number(d.price),
                    category: d.category || 'bags',
                    image: d.image,
                    description: d.description || '',
                    sizes: Array.isArray(d.sizes) ? d.sizes : ["Unique"],
                    status: (d.id === 'dj1') ? 'upcoming' : (d.status || "available"),
                    preorderBadge: (d.id === 'dj1') ? '⏳ BIENTÔT DISPONIBLE' : (d.preorder_badge || "DISPONIBLE"),
                    releaseDate: (d.id === 'dj1') ? 'Bientôt disponible' : (d.release_date || "Immédiat"),
                    reservedPercentage: Number(d.reserved_percentage) || 100,
                    totalStock: stk,
                    reservedStock: Number(d.reserved_stock) || 0,
                    stock: stk
                };
            });
            PRODUCTS = mapped;
            saveProductsToStorage();
            if (typeof filterAndRenderFeaturedProducts === 'function') filterAndRenderFeaturedProducts();
            if (typeof renderDropCarousel === 'function') renderDropCarousel(activeDropFilter || 'all');
            if (typeof syncFlagshipDropCard === 'function') syncFlagshipDropCard();
        }
    } catch (e) {
        // Table non migrée ou hors-ligne, repli local transparent
    }
}

window.addEventListener("storage", (e) => {
    if (e.key === "culture_products") {
        reloadProductsFromStorage();
    }
});

window.addEventListener("culture_products_updated", () => {
    reloadProductsFromStorage();
});

/* ==========================================================================
   APP STATE & UTILITIES
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem("culture_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("culture_wishlist")) || [];
let orders = JSON.parse(localStorage.getItem("culture_orders")) || [];

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
            openResellerAuth();
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
    syncFlagshipDropCard();
    syncProductsFromSupabase();
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

function syncFlagshipDropCard() {
    const dj = PRODUCTS.find(p => p.id === "dj1");
    if (!dj) return;

    const titleEl = document.querySelector(".flagship-product-title");
    if (titleEl) titleEl.textContent = dj.name;

    const priceEl = document.querySelector(".flagship-current-price");
    if (priceEl) priceEl.textContent = formatPrice(dj.price);

    const descEl = document.querySelector(".flagship-product-desc");
    if (descEl && dj.description) descEl.textContent = dj.description;

    const imgEl = document.querySelector(".flagship-drop-img");
    if (imgEl && dj.image) imgEl.src = dj.image;

    const statusPill = document.querySelector(".flagship-status-pill");
    if (statusPill) {
        if (dj.status === 'upcoming') {
            statusPill.textContent = "BIENTÔT DISPONIBLE";
        } else if (dj.status === 'preorder') {
            statusPill.textContent = "PRÉ-VENTE OUVERTE";
        } else {
            statusPill.textContent = "DISPONIBLE EN STOCK";
        }
    }

    const floatingBadge = document.querySelector(".flagship-badge-floating span:last-child");
    if (floatingBadge) {
        floatingBadge.textContent = dj.preorderBadge || (dj.status === 'upcoming' ? "⏳ BIENTÔT DISPONIBLE" : "⚡ DISPONIBLE");
    }
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
        // Règle formelle : les articles non disponibles immédiatement ('upcoming' / Coming Soon)
        // ne doivent PAS figurer dans la boutique d'achat direct
        if (p.status === "upcoming") return false;

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
        const stockCount = (product.stock !== undefined && product.stock !== null) 
            ? Number(product.stock) 
            : 10;

        let stockPillHtml = '';
        if (stockCount > 5) {
            stockPillHtml = `
                <div class="product-stock-pill in-stock">
                    <span class="stock-dot in-stock"></span>
                    <span class="stock-qty-text"><strong>${stockCount}</strong> exemplaires disponibles</span>
                </div>
            `;
        } else if (stockCount > 0) {
            stockPillHtml = `
                <div class="product-stock-pill low-stock">
                    <span class="stock-dot low-stock pulse"></span>
                    <span class="stock-qty-text">🔥 Plus que <strong>${stockCount}</strong> pièces !</span>
                </div>
            `;
        } else {
            stockPillHtml = `
                <div class="product-stock-pill out-of-stock">
                    <span class="stock-dot out-of-stock"></span>
                    <span class="stock-qty-text">❌ Épuisé pour le moment</span>
                </div>
            `;
        }

        const isOutOfStock = stockCount === 0;

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
                        ${isOutOfStock ? `
                            <button class="quick-add-btn" disabled style="opacity:0.6; cursor:not-allowed;">Épuisé</button>
                        ` : `
                            <button class="quick-add-btn" onclick="addToCartDirect('${product.id}')">Ajout Rapide</button>
                        `}
                    </div>
                </div>
                <div class="product-card-meta">
                    <div class="product-title-row">
                        <h3 class="product-name" onclick="openQuickView('${product.id}')" style="cursor:pointer;">${product.name}</h3>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <div class="product-card-stock-row">
                        ${stockPillHtml}
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
    const isUpcoming = product.status === "upcoming";
    const stockCount = (product.stock !== undefined && product.stock !== null) 
        ? Number(product.stock) 
        : 10;
    const isOutOfStock = !isUpcoming && stockCount === 0;

    let stockBannerHtml = "";
    if (isUpcoming) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-pill upcoming-pill">
                    <span class="stock-dot low-stock"></span>
                    <span class="stock-qty-text">⏳ Bientôt disponible • ${stockCount} exemplaires prévus</span>
                </div>
            </div>
        `;
    } else if (stockCount > 5) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-pill in-stock">
                    <span class="stock-dot in-stock"></span>
                    <span class="stock-qty-text">📦 <strong>${stockCount} exemplaires</strong> disponibles</span>
                </div>
            </div>
        `;
    } else if (stockCount > 0) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-pill low-stock">
                    <span class="stock-dot low-stock pulse"></span>
                    <span class="stock-qty-text">🔥 Attention : plus que <strong>${stockCount} pièces</strong> restantes !</span>
                </div>
            </div>
        `;
    } else {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-pill out-of-stock">
                    <span class="stock-dot out-of-stock"></span>
                    <span class="stock-qty-text">❌ Rupture temporaire de stock</span>
                </div>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="quick-view-grid">
            <div class="qv-img-side">
                <img src="${product.image}" alt="${product.name}">
            </div>
            
            <div class="qv-text-side">
                <div class="qv-badge">${product.category}</div>
                <h3 class="qv-title">${product.name}</h3>
                <div class="qv-price">${formatPrice(product.price)}</div>

                ${stockBannerHtml}

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
                    ${isUpcoming ? `
                        <button class="qv-add-to-cart qv-alert-btn" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid var(--accent-orange); color:#fff;" onclick="triggerDropAlert('${product.id}')">🔔 M'alerter au Drops</button>
                    ` : isOutOfStock ? `
                        <button class="qv-add-to-cart" disabled style="opacity:0.6; cursor:not-allowed;">❌ Épuisé pour le moment</button>
                    ` : `
                        <button class="qv-add-to-cart" onclick="addFromModalToCart('${product.id}')">Ajouter au panier</button>
                    `}
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
   ESPACE PARTENAIRE REVENDEUR (DEDICATED AFFILIATE PORTAL)
   ========================================================================== */

let currentResellerSession = null;

// Vérifier et restaurer automatiquement la session revendeur au chargement
document.addEventListener("DOMContentLoaded", () => {
    if (window.AuthService) {
        const session = window.AuthService.getSession();
        if (session && session.role === "ROLE_RESELLER" && session.user) {
            currentResellerSession = session.user;
        }
    }
});

function openResellerAuth() {
    // Si déjà connecté en tant que revendeur, ouvrir directement le dashboard
    if (window.AuthService) {
        const session = window.AuthService.getSession();
        if (session && session.role === "ROLE_RESELLER" && session.user) {
            currentResellerSession = session.user;
            openResellerDashboard();
            return;
        }
    }
    const modal = document.getElementById("resellerLoginModal");
    if (modal) modal.classList.add("active");
}

function closeResellerAuth() {
    const modal = document.getElementById("resellerLoginModal");
    if (modal) modal.classList.remove("active");
}

async function handleResellerLogin(event) {
    event.preventDefault();
    const input = document.getElementById("resellerCodeLoginInput");
    const entered = input ? input.value.trim() : "";
    if (!entered) {
        showToast("Veuillez renseigner votre code ou email partenaire.");
        return;
    }

    try {
        if (!window.AuthService) {
            showToast("Service d'authentification non disponible.");
            return;
        }

        const res = await window.AuthService.login(entered, entered);
        if (res && res.success) {
            if (res.session.role === "ROLE_ADMIN") {
                showToast("Compte Administrateur détecté. Redirection vers le Centre d'Administration...");
                setTimeout(() => {
                    window.location.href = "admin/index.html";
                }, 800);
                return;
            }

            currentResellerSession = res.session.user;
            closeResellerAuth();
            openResellerDashboard();
            showToast(`Bienvenue ${currentResellerSession.name || "Partenaire"} dans votre Espace Revendeur 👥`);
        } else {
            showToast(`❌ ${res.error || "Code revendeur ou identifiant invalide."}`);
        }
    } catch (err) {
        console.error("Erreur connexion revendeur:", err);
        showToast(`❌ Erreur: ${err.message}`);
    }
}

async function openResellerDashboard() {
    const overlay = document.getElementById("resellerDashboardOverlay");
    if (!overlay) return;
    overlay.classList.add("active");
    await renderResellerDashboard();
}

function closeResellerDashboard() {
    const overlay = document.getElementById("resellerDashboardOverlay");
    if (overlay) overlay.classList.remove("active");
}

async function logoutResellerDashboard() {
    if (window.AuthService) {
        await window.AuthService.logout();
    }
    currentResellerSession = null;
    closeResellerDashboard();
    showToast("Déconnexion réussie. À bientôt !");
}

function switchResellerPane(paneId) {
    const tabsBar = document.getElementById("resellerTabsBar");
    if (tabsBar) {
        tabsBar.querySelectorAll(".admin-tab").forEach(tab => {
            const onclickAttr = tab.getAttribute("onclick") || "";
            if (onclickAttr.includes(paneId)) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    }

    const panes = document.querySelectorAll("#resellerDashboardOverlay .admin-tab-pane");
    panes.forEach(pane => {
        if (pane.id === paneId) {
            pane.classList.add("active");
        } else {
            pane.classList.remove("active");
        }
    });
}

async function renderResellerDashboard() {
    if (!currentResellerSession && window.AuthService) {
        const session = window.AuthService.getSession();
        if (session && session.user) currentResellerSession = session.user;
    }

    const resName = currentResellerSession ? (currentResellerSession.name || "Partenaire") : "Partenaire";
    const resCode = currentResellerSession ? (currentResellerSession.referral_code || currentResellerSession.code || "MONCODE") : "MONCODE";
    const resId = currentResellerSession ? (currentResellerSession.id || currentResellerSession.reseller_id) : null;

    const titleEl = document.getElementById("resellerDashboardHeaderTitle");
    if (titleEl) {
        titleEl.textContent = `Espace Partenaire — ${resName} (${resCode})`;
    }

    const badgeEl = document.getElementById("resellerDashboardRoleBadge");
    if (badgeEl) {
        badgeEl.textContent = `● Revendeur Actif (${resCode})`;
    }

    let metrics = {
        totalGenerated: 0,
        availableBalance: 0,
        paidBalance: 0,
        totalSalesCount: 0,
        orders: [],
        commissions: [],
        payouts: []
    };

    if (window.SupabaseService && window.SupabaseService.getResellerMetrics && resId) {
        try {
            metrics = await window.SupabaseService.getResellerMetrics(resId, resCode);
        } catch (e) {
            console.warn("Impossible de charger les métriques revendeur:", e);
        }
    }

    // 1. STATS ROW
    const statsRow = document.getElementById("resellerStatsRow");
    if (statsRow) {
        statsRow.innerHTML = `
            <div class="admin-stat-card">
                <span class="stat-title">Commissions Totales</span>
                <span class="stat-value stat-value-orange">${Number(metrics.totalGenerated || 0).toLocaleString("fr-FR")} FCFA</span>
                <span class="stat-sub">Cumul de tous vos gains</span>
            </div>
            <div class="admin-stat-card stat-card-highlight">
                <span class="stat-title">Solde Disponible</span>
                <span class="stat-value stat-value-green">${Number(metrics.availableBalance || 0).toLocaleString("fr-FR")} FCFA</span>
                <span class="stat-sub">Prêt à être retiré via Mobile Money</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-title">Commissions Déjà Virées</span>
                <span class="stat-value">${Number(metrics.paidBalance || 0).toLocaleString("fr-FR")} FCFA</span>
                <span class="stat-sub">Paiements validés & reçus</span>
            </div>
            <div class="admin-stat-card">
                <span class="stat-title">Commandes Validées</span>
                <span class="stat-value">${metrics.totalSalesCount || 0}</span>
                <span class="stat-sub">Achats de vos filleuls</span>
            </div>
        `;
    }

    // 2. TAB 1: MES VENTES & COMMISSIONS
    const salesTbody = document.getElementById("resellerSalesTableBody");
    if (salesTbody) {
        const orders = metrics.orders || [];
        const commissions = metrics.commissions || [];

        if (orders.length === 0 && commissions.length === 0) {
            salesTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                Aucune vente enregistrée pour le moment. Partagez votre lien de parrainage pour commencer à gagner !
            </td></tr>`;
        } else {
            salesTbody.innerHTML = commissions.map(c => {
                const relatedOrder = orders.find(o => o.id === c.order_id) || {};
                const orderAmount = Number(relatedOrder.total_amount || relatedOrder.total || (c.amount * 10)) || 0;
                const orderStatus = relatedOrder.payment_status || relatedOrder.status || "CONFIRMED";
                const commStatus = c.status || "PENDING";
                const commDate = c.created_at ? new Date(c.created_at).toLocaleDateString("fr-FR") : "-";

                let statusBadgeClass = "badge-pending";
                let statusLabel = "En Attente";
                if (commStatus === "AVAILABLE" || commStatus === "VALIDATED") {
                    statusBadgeClass = "badge-available";
                    statusLabel = "Disponible";
                } else if (commStatus === "PAID") {
                    statusBadgeClass = "badge-paid";
                    statusLabel = "Viré";
                } else if (commStatus === "CANCELLED") {
                    statusBadgeClass = "badge-cancelled";
                    statusLabel = "Annulé";
                }

                return `<tr>
                    <td><strong>${c.order_id || "-"}</strong></td>
                    <td>${commDate}</td>
                    <td>${orderAmount.toLocaleString("fr-FR")} FCFA</td>
                    <td>10%</td>
                    <td style="color: var(--accent-orange); font-weight: 700;">+${Number(c.amount || 0).toLocaleString("fr-FR")} FCFA</td>
                    <td><span class="admin-order-badge badge-${orderStatus.toLowerCase()}">${orderStatus}</span></td>
                    <td><span class="admin-order-badge ${statusBadgeClass}">${statusLabel}</span></td>
                </tr>`;
            }).join("");
        }
    }

    // 3. TAB 2: MON CODE & LIEN
    const displayCode = document.getElementById("displayResellerCode");
    if (displayCode) displayCode.textContent = resCode;

    const displayLink = document.getElementById("displayResellerLink");
    if (displayLink) {
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/+$/, "");
        displayLink.value = `${baseUrl}?ref=${encodeURIComponent(resCode)}`;
    }

    // 4. TAB 3: MES RETRAITS
    const withdrawalsTbody = document.getElementById("resellerWithdrawalsTableBody");
    if (withdrawalsTbody) {
        const payouts = metrics.payouts || [];
        if (payouts.length === 0) {
            withdrawalsTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                Aucune demande de retrait effectuée pour le moment.
            </td></tr>`;
        } else {
            withdrawalsTbody.innerHTML = payouts.map(p => {
                const dateReq = p.requested_at ? new Date(p.requested_at).toLocaleDateString("fr-FR") : (p.date_formatted || "-");
                const datePaid = p.processed_at ? new Date(p.processed_at).toLocaleDateString("fr-FR") : "-";
                let badgeClass = "badge-pending";
                if (p.status === "PAID" || p.status === "COMPLETED") badgeClass = "badge-paid";
                if (p.status === "CANCELLED" || p.status === "REJECTED") badgeClass = "badge-cancelled";

                return `<tr>
                    <td><strong>${p.id}</strong></td>
                    <td>${dateReq}</td>
                    <td style="font-weight: 700;">${Number(p.amount || 0).toLocaleString("fr-FR")} FCFA</td>
                    <td>${p.payment_method || "Mobile Money"} (${p.payment_account || "-"})</td>
                    <td><span class="admin-order-badge ${badgeClass}">${p.status}</span></td>
                    <td>${p.transaction_reference || "—"}</td>
                    <td>${datePaid}</td>
                </tr>`;
            }).join("");
        }
    }

    // 5. TAB 4: PROFIL DE RÉCEPTION
    if (currentResellerSession) {
        const countryInput = document.getElementById("profileCountry");
        const methodInput = document.getElementById("profilePayoutMethod");
        const accountInput = document.getElementById("profilePayoutAccount");
        const nameInput = document.getElementById("profilePayoutName");

        if (countryInput && currentResellerSession.country) countryInput.value = currentResellerSession.country;
        if (methodInput && currentResellerSession.payout_method) methodInput.value = currentResellerSession.payout_method;
        if (accountInput && (currentResellerSession.payout_account || currentResellerSession.phone)) {
            accountInput.value = currentResellerSession.payout_account || currentResellerSession.phone;
        }
        if (nameInput && currentResellerSession.name) nameInput.value = currentResellerSession.name;
    }
}

function copyResellerCodeToClipboard() {
    const codeEl = document.getElementById("displayResellerCode");
    const code = codeEl ? codeEl.textContent.trim() : "";
    if (!code) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            showToast(`Code "${code}" copié dans le presse-papier ! 📋`);
        }).catch(() => {
            showToast(`Code: ${code}`);
        });
    } else {
        showToast(`Code: ${code}`);
    }
}

function copyResellerLinkToClipboard() {
    const linkEl = document.getElementById("displayResellerLink");
    const link = linkEl ? linkEl.value.trim() : "";
    if (!link) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
            showToast("Lien de parrainage copié dans le presse-papier ! 🔗");
        }).catch(() => {
            showToast("Lien copié !");
        });
    } else {
        showToast("Lien: " + link);
    }
}

async function saveResellerProfile(event) {
    event.preventDefault();
    const country = document.getElementById("profileCountry")?.value || "Bénin";
    const method = document.getElementById("profilePayoutMethod")?.value || "Wave";
    const account = document.getElementById("profilePayoutAccount")?.value?.trim() || "";
    const name = document.getElementById("profilePayoutName")?.value?.trim() || "";

    if (!account || !name) {
        showToast("Veuillez remplir votre numéro et nom complet.");
        return;
    }

    if (currentResellerSession) {
        currentResellerSession.country = country;
        currentResellerSession.payout_method = method;
        currentResellerSession.payout_account = account;
        currentResellerSession.name = name;

        // Mise à jour de la session stockée
        if (window.AuthService) {
            const s = window.AuthService.getSession();
            if (s && s.user) {
                s.user = { ...s.user, country, payout_method: method, payout_account: account, name };
                localStorage.setItem(window.AuthService.SESSION_KEY, JSON.stringify(s));
            }
        }

        // Persistance locale dans la liste des revendeurs
        const resellers = JSON.parse(localStorage.getItem("culture_resellers") || "[]");
        const idx = resellers.findIndex(r => r.id === currentResellerSession.id || r.referral_code === currentResellerSession.referral_code);
        if (idx !== -1) {
            resellers[idx] = { ...resellers[idx], country, payout_method: method, payout_account: account, name };
            localStorage.setItem("culture_resellers", JSON.stringify(resellers));
        }

        // Mise à jour distante Supabase si configuré
        if (window.SupabaseService && window.SupabaseService.isConfigured() && currentResellerSession.id) {
            try {
                const client = window.SupabaseService.getClient();
                if (client) {
                    await client.from("resellers").update({
                        name,
                        payout_method: method,
                        payout_account: account
                    }).eq("id", currentResellerSession.id);
                }
            } catch (e) {
                console.warn("Mise à jour profil Supabase échouée (sauvegardé localement):", e);
            }
        }

        showToast("Profil de réception mis à jour avec succès ! 💾");
    }
}

async function openResellerWithdrawalModal() {
    if (!currentResellerSession && window.AuthService) {
        const session = window.AuthService.getSession();
        if (session && session.user) currentResellerSession = session.user;
    }

    const modal = document.getElementById("resellerWithdrawalModal");
    if (!modal) return;

    let available = 0;
    const minPayout = Number(window.ENV_CONFIG?.DEFAULT_MIN_PAYOUT || localStorage.getItem("culture_min_payout") || 10000);

    const resId = currentResellerSession ? (currentResellerSession.id || currentResellerSession.reseller_id) : null;
    const resCode = currentResellerSession ? (currentResellerSession.referral_code || currentResellerSession.code) : null;

    if (window.SupabaseService && window.SupabaseService.getResellerMetrics && resId) {
        try {
            const metrics = await window.SupabaseService.getResellerMetrics(resId, resCode);
            available = Number(metrics.availableBalance || 0);
        } catch (e) {}
    }

    const balanceEl = document.getElementById("withdrawAvailableBalance");
    if (balanceEl) balanceEl.textContent = `${available.toLocaleString("fr-FR")} FCFA`;

    const minEl = document.getElementById("withdrawMinAmount");
    if (minEl) minEl.textContent = `${minPayout.toLocaleString("fr-FR")} FCFA`;

    const amtInput = document.getElementById("withdrawAmountInput");
    if (amtInput) {
        amtInput.min = String(minPayout);
        amtInput.value = available >= minPayout ? String(available) : "";
    }

    // Pré-remplir depuis le profil revendeur
    if (currentResellerSession) {
        const methodSelect = document.getElementById("withdrawMethodSelect");
        const accountInput = document.getElementById("withdrawAccountInput");
        const nameInput = document.getElementById("withdrawNameInput");

        if (methodSelect && currentResellerSession.payout_method) methodSelect.value = currentResellerSession.payout_method;
        if (accountInput && (currentResellerSession.payout_account || currentResellerSession.phone)) {
            accountInput.value = currentResellerSession.payout_account || currentResellerSession.phone;
        }
        if (nameInput && currentResellerSession.name) nameInput.value = currentResellerSession.name;
    }

    modal.classList.add("active");
}

function closeResellerWithdrawalModal() {
    const modal = document.getElementById("resellerWithdrawalModal");
    if (modal) modal.classList.remove("active");
}

async function handleWithdrawalSubmit(event) {
    event.preventDefault();

    const amtInput = document.getElementById("withdrawAmountInput");
    const amount = Number(amtInput?.value || 0);
    const method = document.getElementById("withdrawMethodSelect")?.value || "Wave";
    const account = document.getElementById("withdrawAccountInput")?.value?.trim() || "";
    const name = document.getElementById("withdrawNameInput")?.value?.trim() || "";

    const minPayout = Number(window.ENV_CONFIG?.DEFAULT_MIN_PAYOUT || localStorage.getItem("culture_min_payout") || 10000);

    if (amount < minPayout) {
        showToast(`❌ Le montant minimum de retrait est de ${minPayout.toLocaleString("fr-FR")} FCFA.`);
        return;
    }

    if (!account || !name) {
        showToast("❌ Veuillez renseigner le numéro et le nom du compte de réception.");
        return;
    }

    const resId = currentResellerSession ? (currentResellerSession.id || currentResellerSession.reseller_id) : null;
    const resCode = currentResellerSession ? (currentResellerSession.referral_code || currentResellerSession.code) : null;

    if (!resId) {
        showToast("Session revendeur introuvable. Veuillez vous reconnecter.");
        return;
    }

    try {
        if (window.SupabaseService && window.SupabaseService.createWithdrawalRequest) {
            const res = await window.SupabaseService.createWithdrawalRequest(resId, resCode, amount, method, account, name);
            if (res.success) {
                closeResellerWithdrawalModal();
                await renderResellerDashboard();
                showToast("Demande de retrait transmise avec succès ! 💸 Traitement sous 24-48h.");
            } else {
                showToast(`❌ ${res.message || "Impossible de créer la demande de retrait."}`);
            }
        }
    } catch (e) {
        console.error("Erreur demande de retrait:", e);
        showToast(`❌ Erreur: ${e.message}`);
    }
}
