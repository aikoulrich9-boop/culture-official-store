/* ==========================================================================
   PRODUCTS DATA
   ========================================================================== */
const INITIAL_PRODUCTS = [
    {
        id: "dj1",
        name: "Veste Hoodie Raw Indigo Denim 480gsm",
        price: 12000,
        category: "hoodies",
        image: "IMAGE/denim_jacket.jpg.png",
        description: "Veste à capuche zippée en denim brut indigo lourd 480gsm. Coupe boxy streetwear avec capuche anatomique double épaisseur, fermeture éclair métallique renforcée, poignets et ourlet plissés élastiques. Conçue pour résister au temps et offrir une silhouette urbaine sculptée.",
        sizes: ["S", "M", "L", "XL"],
        status: "upcoming",
        preorderBadge: "⏳ BIENTÔT DISPONIBLE",
        releaseDate: "Bientôt disponible",
        reservedPercentage: 85,
        totalStock: 50,
        reservedStock: 42
    },
    {
        id: "c1",
        name: "Terra Icon Crossbody",
        price: 8000,
        category: "crossbody",
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
        category: "crossbody",
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
        category: "crossbody",
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
        name: "Camo Beanie Crossbody",
        price: 8000,
        category: "crossbody",
        image: "IMAGE/c 4.png",
        description: "Illustration signature du personnage au bonnet camouflage urbain et bandage streetwear. Toile technique déperlante.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 15,
        reservedStock: 0,
        stock: 15
    },
    {
        id: "c5",
        name: "All-Star Shooter Crossbody",
        price: 8000,
        category: "crossbody",
        image: "IMAGE/c 4_shooter.png",
        description: "Illustration dynamique du joueur All-Star #12 au tir signature et regard étoilé. Sangle logotée ajustable et zips étanches.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 10,
        reservedStock: 0,
        stock: 10
    },
    {
        id: "c6",
        name: "Manga Rebel Crossbody",
        price: 8000,
        category: "crossbody",
        image: "IMAGE/c 5.png",
        description: "Graphisme d'auteur façon croquis manga brut aux hachures expressives et cheveux blonds déstructurés. Toile textile ripstop premium.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 10,
        reservedStock: 0,
        stock: 10
    },
    {
        id: "c7",
        name: "Boxy Silhouette Crossbody",
        price: 8000,
        category: "crossbody",
        image: "IMAGE/c 6.png",
        description: "Silhouette streetwear underground en veste worker vintage oversize et pantalon cargo large. Mousquetons métalliques mats.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 10,
        reservedStock: 0,
        stock: 10
    },
    {
        id: "c8",
        name: "Stealth Blackout Crossbody",
        price: 8000,
        category: "crossbody",
        image: "IMAGE/c 7.png",
        description: "Édition purement minimaliste All-Black en toile balistique 1680D sans marquage. Design tactique ultra-épuré et tirette paracorde.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 12,
        reservedStock: 0,
        stock: 12
    },
    {
        id: "sac1",
        name: "ILLEGAL Blackout Pack Vol.1",
        price: 12000,
        category: "backpacks",
        image: "IMAGE/Sac 1.png",
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
        category: "backpacks",
        image: "IMAGE/Sac 2.png",
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
        price: 12000,
        category: "backpacks",
        image: "IMAGE/Sac 3.png",
        description: "Édition exclusive en tissu camo aquatique bleu céruléen avec motif all-over imprimé sublimation. Logo ILLEGAL en patch woven signature, macro-étoile emblématique blanche, zips étanches et bretelles ergonomiques. Sac à dos collector.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 10,
        reservedStock: 0,
        stock: 10
    },
    {
        id: "sac4",
        name: "ILLEGAL Cobalt Icon Pack",
        price: 12000,
        category: "backpacks",
        image: "IMAGE/sac_illegal_cobalt.png",
        description: "Édition emblématique de la collaboration ILLEGAL × Priority en toile technique bleu cobalt vibrant. Patch woven ILLEGAL International, macro-étoile emblématique blanche, emblème rouge Diesel en relief et double étiquette collector amovible (Diesel & Priority Star). Dos ergonomique matelassé et tirettes paracorde mouchetées.",
        sizes: [],
        status: "available",
        preorderBadge: "DISPONIBLE",
        releaseDate: "Immédiat",
        reservedPercentage: 100,
        totalStock: 10,
        reservedStock: 0,
        stock: 10
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
        reservedPercentage: 40,
        totalStock: 60,
        reservedStock: 24
    }
];

// Gestion impérative du cache et version du catalogue (invalidation des états obsolètes)
const CATALOGUE_STORAGE_VERSION = "20261028_v6_uniform_dimensions";
try {
    if (typeof localStorage !== "undefined") {
        if (localStorage.getItem("culture_catalogue_version") !== CATALOGUE_STORAGE_VERSION) {
            localStorage.removeItem("culture_products");
            localStorage.setItem("culture_catalogue_version", CATALOGUE_STORAGE_VERSION);
        }
    }
} catch (e) {}

let storedProducts = null;
try {
    const raw = localStorage.getItem("culture_products");
    if (raw) storedProducts = JSON.parse(raw);
} catch (e) {}

let PRODUCTS = [];
if (Array.isArray(storedProducts) && storedProducts.length > 0) {
    // 1. Filtrer formellement les anciens produits supprimés (h1 hoodie, cap1 casquette)
    storedProducts = storedProducts.filter(p => p && !['h1', 'cap1'].includes(String(p.id).toLowerCase()));

    PRODUCTS = storedProducts.map(prod => {
        const idLower = String(prod.id).toLowerCase();
        if (idLower === 'dj1' && (!prod.status || prod.status === 'preorder')) {
            prod.status = 'upcoming';
            prod.preorderBadge = '⏳ BIENTÔT DISPONIBLE';
            prod.releaseDate = 'Bientôt disponible';
        }
        const initMatch = INITIAL_PRODUCTS.find(i => String(i.id).toLowerCase() === idLower);
        if (initMatch) {
            // sac3 est disponible immédiatement à la vente dans la boutique
            const resolvedStatus = (idLower === 'sac3') ? 'available' : (prod.status || initMatch.status);
            const resolvedBadge = (idLower === 'sac3') ? 'DISPONIBLE' : (resolvedStatus === 'available' ? 'DISPONIBLE' : (prod.preorderBadge || initMatch.preorderBadge));
            const resolvedCat = (idLower === 'sac3') ? 'backpacks' : (prod.category || initMatch.category);
            const resolvedImg = initMatch.image || prod.image;

            return {
                ...initMatch,
                ...prod,
                category: resolvedCat,
                image: resolvedImg,
                stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : (initMatch.stock || 10),
                status: resolvedStatus,
                preorderBadge: resolvedBadge,
                releaseDate: resolvedStatus === 'available' ? 'Immédiat' : (prod.releaseDate || initMatch.releaseDate),
                reservedPercentage: prod.reservedPercentage !== undefined ? prod.reservedPercentage : (resolvedStatus === 'available' ? 100 : initMatch.reservedPercentage)
            };
        }
        return {
            ...prod,
            stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : 10
        };
    });

    // Compléter avec les nouveaux produits éventuels de INITIAL_PRODUCTS absents du stockage local
    INITIAL_PRODUCTS.forEach(init => {
        const existing = PRODUCTS.find(p => String(p.id).toLowerCase() === String(init.id).toLowerCase());
        if (!existing) {
            PRODUCTS.push({ ...init });
        } else {
            existing.image = init.image;
            if (String(init.id).toLowerCase() === 'sac3') {
                existing.status = 'available';
                existing.preorderBadge = 'DISPONIBLE';
                existing.category = 'backpacks';
                existing.price = 12000;
            }
        }
    });

    PRODUCTS = PRODUCTS.filter(p => !['h1', 'cap1'].includes(String(p.id).toLowerCase()));
    saveProductsToStorage();
} else {
    PRODUCTS = INITIAL_PRODUCTS.map(p => ({ ...p }));
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
                const cleanedList = list.filter(p => p && !['h1', 'cap1'].includes(String(p.id).toLowerCase()));

                PRODUCTS = cleanedList.map(prod => {
                    const idLower = String(prod.id).toLowerCase();
                    if (idLower === 'dj1' && (!prod.status || prod.status === 'preorder')) {
                        prod.status = 'upcoming';
                        prod.preorderBadge = '⏳ BIENTÔT DISPONIBLE';
                        prod.releaseDate = 'Bientôt disponible';
                    }
                    const initMatch = INITIAL_PRODUCTS.find(i => String(i.id).toLowerCase() === idLower);
                    if (initMatch) {
                        const resolvedStatus = (idLower === 'sac3') ? 'available' : (prod.status || initMatch.status);
                        const resolvedBadge = (idLower === 'sac3') ? 'DISPONIBLE' : (resolvedStatus === 'available' ? 'DISPONIBLE' : (prod.preorderBadge || initMatch.preorderBadge));
                        const resolvedCat = (idLower === 'sac3') ? 'backpacks' : (prod.category || initMatch.category);
                        const resolvedImg = initMatch.image || prod.image;

                        return {
                            ...initMatch,
                            ...prod,
                            category: resolvedCat,
                            image: resolvedImg,
                            stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : (initMatch.stock || 10),
                            status: resolvedStatus,
                            preorderBadge: resolvedBadge,
                            releaseDate: resolvedStatus === 'available' ? 'Immédiat' : (prod.releaseDate || initMatch.releaseDate),
                            reservedPercentage: prod.reservedPercentage !== undefined ? prod.reservedPercentage : (resolvedStatus === 'available' ? 100 : initMatch.reservedPercentage)
                        };
                    }
                    return {
                        ...prod,
                        stock: (prod.stock !== undefined && prod.stock !== null) ? Number(prod.stock) : 10
                    };
                });

                PRODUCTS = PRODUCTS.filter(p => !['h1', 'cap1'].includes(String(p.id).toLowerCase()) && INITIAL_PRODUCTS.some(init => String(init.id).toLowerCase() === String(p.id).toLowerCase()));

                INITIAL_PRODUCTS.forEach(init => {
                    const existing = PRODUCTS.find(p => String(p.id).toLowerCase() === String(init.id).toLowerCase());
                    if (!existing) {
                        PRODUCTS.push({ ...init });
                    } else {
                        existing.image = init.image;
                        if (String(init.id).toLowerCase() === 'sac3') {
                            existing.status = 'available';
                            existing.preorderBadge = 'DISPONIBLE';
                            existing.category = 'backpacks';
                            existing.price = 12000;
                        }
                    }
                });

                saveProductsToStorage();
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
            const filteredData = data.filter(d => d && !['h1', 'cap1'].includes(String(d.id).toLowerCase()));

            const mapped = filteredData.map(d => {
                const idLower = String(d.id).toLowerCase();
                const initMatch = INITIAL_PRODUCTS.find(i => String(i.id).toLowerCase() === idLower);

                const stk = (d.stock !== undefined && d.stock !== null)
                    ? Number(d.stock)
                    : ((d.total_stock !== undefined && d.total_stock !== null)
                        ? Number(d.total_stock)
                        : ((idLower === 'dj1') ? 50 : 10));

                const resolvedCategory = (idLower === 'sac3')
                    ? 'backpacks'
                    : ((d.category && d.category !== 'bags')
                        ? d.category
                        : (idLower.startsWith('c') ? 'crossbody' : (idLower.startsWith('sac') ? 'backpacks' : (d.category || 'crossbody'))));

                // sac3 est disponible immédiatement à la vente dans la boutique
                const resolvedStatus = (idLower === 'sac3')
                    ? 'available'
                    : ((idLower === 'dj1') ? 'upcoming' : (d.status || 'available'));

                const resolvedBadge = (idLower === 'sac3')
                    ? 'DISPONIBLE'
                    : ((idLower === 'dj1') ? '⏳ BIENTÔT DISPONIBLE' : (resolvedStatus === 'available' ? 'DISPONIBLE' : (d.preorder_badge || 'DISPONIBLE')));

                const resolvedRelease = (idLower === 'sac3')
                    ? 'Immédiat'
                    : ((idLower === 'dj1') ? 'Bientôt disponible' : (d.release_date || 'Immédiat'));

                const resolvedImage = (initMatch && initMatch.image) ? initMatch.image : d.image;

                return {
                    id: d.id,
                    name: (idLower === 'sac3') ? 'ILLEGAL Ocean Camo Pack' : d.name,
                    price: (idLower === 'sac3') ? 12000 : Number(d.price),
                    category: resolvedCategory,
                    image: resolvedImage,
                    description: (idLower === 'sac3') ? "Édition exclusive en tissu camo aquatique bleu céruléen avec motif all-over imprimé sublimation. Logo ILLEGAL en patch woven signature, macro-étoile emblématique blanche, zips étanches et bretelles ergonomiques. Sac à dos collector." : (d.description || ''),
                    sizes: Array.isArray(d.sizes) ? d.sizes : ["Unique"],
                    status: resolvedStatus,
                    preorderBadge: resolvedBadge,
                    releaseDate: resolvedRelease,
                    reservedPercentage: (idLower === 'sac3') ? 100 : (Number(d.reserved_percentage) || 100),
                    totalStock: stk,
                    reservedStock: (idLower === 'sac3') ? 0 : (Number(d.reserved_stock) || 0),
                    stock: stk
                };
            });

            // S'assurer que tous les INITIAL_PRODUCTS (ex: sac4, sac3) sont préservés même si absents de la table distante
            if (Array.isArray(INITIAL_PRODUCTS)) {
                INITIAL_PRODUCTS.forEach(init => {
                    const existing = mapped.find(p => String(p.id).toLowerCase() === String(init.id).toLowerCase());
                    if (!existing) {
                        mapped.push({ ...init });
                    } else {
                        existing.image = init.image;
                        if (String(init.id).toLowerCase() === 'sac3') {
                            existing.status = 'available';
                            existing.preorderBadge = 'DISPONIBLE';
                            existing.category = 'backpacks';
                            existing.price = 12000;
                        }
                    }
                });
            }

            PRODUCTS = mapped.filter(p => !['h1', 'cap1'].includes(String(p.id).toLowerCase()));
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

    const proceedToShippingBtn = document.getElementById("proceedToShippingBtn");
    if (proceedToShippingBtn) {
        proceedToShippingBtn.addEventListener("click", () => {
            goToCartStep('checkout');
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
       QUICK VIEW / IMMERSIVE SHOWCASE MODAL CLOSES
       ========================================================================== */
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            closeImmersiveProduct();
        });
    }

    if (quickViewOverlay) {
        quickViewOverlay.addEventListener("click", (e) => {
            if (e.target === quickViewOverlay) {
                closeImmersiveProduct();
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
            currentBoutiqueShowcaseIndex = 0;
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
    initImmersiveShowcaseListeners();
    checkInitialProductUrlParam();
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

function getCategoryLabel(category) {
    const cat = (category || "").toLowerCase();
    if (cat === "crossbody" || cat === "sacoches") return "Sacoche";
    if (cat === "backpacks" || cat === "sac_a_dos") return "Sac à dos";
    if (cat === "bags") return "Sac";
    if (cat === "hoodies") return "Hoodie";
    if (cat === "tees" || cat === "tshirts") return "T-Shirt";
    if (cat === "caps") return "Casquette";
    return category || "Streetwear";
}

function matchesCategoryFilter(productCategory, productId, filter) {
    if (!filter || filter === "all") return true;
    const cat = (productCategory || "").toLowerCase();
    const id = String(productId || "").toLowerCase();

    if (filter === "crossbody" || filter === "sacoches") {
        return cat === "crossbody" || cat === "sacoches" || (cat === "bags" && id.startsWith("c")) || id.startsWith("c");
    }
    if (filter === "backpacks" || filter === "sac_a_dos" || filter === "sacs") {
        return cat === "backpacks" || cat === "sac_a_dos" || cat === "sacs" || (cat === "bags" && id.startsWith("sac")) || id.startsWith("sac");
    }
    if (filter === "bags") {
        return cat === "bags" || cat === "crossbody" || cat === "backpacks" || id.startsWith("c") || id.startsWith("sac");
    }
    return cat === filter;
}

/* ==========================================================================
   FEATURED PRODUCTS FILTER ENGINE
   ========================================================================== */
let currentDisplayedCatalogue = [];

function getFilteredBoutiqueProducts() {
    return PRODUCTS.filter(p => {
        // Règle formelle : les articles non disponibles immédiatement ('upcoming' / Coming Soon)
        // ne doivent PAS figurer dans la boutique d'achat direct
        if (p.status === "upcoming") return false;

        const matchesCategory = matchesCategoryFilter(p.category, p.id, activeCategoryFilter);
        const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery) || 
                             p.description.toLowerCase().includes(activeSearchQuery);
        return matchesCategory && matchesSearch;
    });
}

let currentBoutiqueShowcaseIndex = 0;
let currentBoutiqueSelectedSize = null;

function filterAndRenderFeaturedProducts() {
    const productsGrid = document.getElementById("productsGrid");
    if (!productsGrid) return;

    const filtered = getFilteredBoutiqueProducts();
    currentDisplayedCatalogue = filtered;

    if (!filtered || filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="search-empty-state" style="text-align: center; grid-column: 1/-1; padding: 60px 0;">
                <p style="color: var(--text-secondary); font-size: 16px;">Aucun produit ne correspond à vos critères de recherche.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filtered.map(product => {
        const isWishlisted = wishlist.includes(product.id);
        const categoryLabel = getCategoryLabel(product.category);
        const stockCount = (product.stock !== undefined && product.stock !== null) 
            ? Number(product.stock) 
            : 10;

        let stockStatusText = `SÉRIE LIMITÉE // <strong>${stockCount}</strong> PIÈCES`;
        let stockClass = "in-stock";
        if (stockCount <= 0) {
            stockStatusText = "SOLD OUT // ÉPUISÉ";
            stockClass = "out-of-stock";
        } else if (stockCount <= 3) {
            stockStatusText = `DERNIÈRES PIÈCES // <strong>${stockCount}</strong> DISPOS`;
            stockClass = "low-stock";
        } else if (product.status === "preorder") {
            stockStatusText = `PRÉ-VENTE // DROP 02 (${stockCount} PIÈCES)`;
            stockClass = "preorder";
        }

        const isBackpack = product.category === "backpacks" || (product.id && product.id.startsWith("sac"));

        return `
            <div class="product-card" data-id="${product.id}" onclick="openQuickView('${product.id}')">
                <div class="product-card-img-wrapper">
                    <button type="button" 
                            class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                            aria-label="Ajouter aux favoris">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>

                    <div class="product-image-container">
                        <img src="${product.image}" 
                             alt="${product.name}" 
                             class="product-img-primary ${isBackpack ? 'backpack-img' : ''}" 
                             onerror="handleProductImageError(this)" 
                             loading="lazy">
                    </div>

                    <!-- Floating Circular Add Button (Ajout Direct Panier) -->
                    <button type="button" 
                            class="card-float-add-btn" 
                            onclick="event.stopPropagation(); addToCartDirect('${product.id}')" 
                            aria-label="Ajouter ${product.name} au panier"
                            title="Ajouter au panier">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>

                <div class="product-card-meta">
                    <span class="card-brand-label">CULTURE // ${categoryLabel.toUpperCase()}</span>
                    
                    <div class="product-title-row">
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>

                    <p class="product-short-desc">${product.description || ''}</p>

                    <div class="product-card-stock-row">
                        <div class="product-stock-tag ${stockClass}">
                            <span class="stock-tag-dot"></span>
                            <span class="stock-tag-label">${stockStatusText}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function handleProductImageError(imgEl) {
    if (!imgEl || imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = "true";
    imgEl.src = "IMAGE/logo P.png";
    imgEl.style.opacity = "0.35";
    imgEl.style.maxHeight = "120px";
}

function renderBoutiqueGrandShowcase(direction = 0) {
    const arenaEl = document.getElementById("boutiqueShowcaseArena");
    const switcherWrapperEl = document.getElementById("boutiqueBottomSwitcherWrapper");
    if (!arenaEl) return;

    const list = currentDisplayedCatalogue;
    if (!list || list.length === 0) {
        arenaEl.innerHTML = `
            <div class="search-empty-state" style="text-align: center; grid-column: 1/-1; padding: 60px 0;">
                <p style="color: var(--text-secondary); font-size: 16px;">Aucun produit ne correspond à vos filtres.</p>
            </div>
        `;
        if (switcherWrapperEl) switcherWrapperEl.innerHTML = '';
        return;
    }

    if (currentBoutiqueShowcaseIndex < 0 || currentBoutiqueShowcaseIndex >= list.length) {
        currentBoutiqueShowcaseIndex = 0;
    }

    const product = list[currentBoutiqueShowcaseIndex];
    if (!product) return;

    // Reset or keep selected size
    if (product.sizes && product.sizes.length > 0) {
        if (!currentBoutiqueSelectedSize || !product.sizes.includes(currentBoutiqueSelectedSize)) {
            currentBoutiqueSelectedSize = product.sizes[0];
        }
    } else {
        currentBoutiqueSelectedSize = "Unique";
    }

    const isWishlisted = wishlist.includes(product.id);
    const stockCount = (product.stock !== undefined && product.stock !== null) 
        ? Number(product.stock) 
        : 10;

    let stockStatusText = "EN STOCK";
    let stockClass = "in-stock";
    if (stockCount <= 0) {
        stockStatusText = "SOLD OUT // ÉPUISÉ";
        stockClass = "out-of-stock";
    } else if (stockCount <= 3) {
        stockStatusText = `DERNIÈRES PIÈCES (${stockCount})`;
        stockClass = "low-stock";
    } else if (product.status === "preorder") {
        stockStatusText = "PRÉ-VENTE // DROP 02";
        stockClass = "preorder";
    }

    const categoryLabel = getCategoryLabel(product.category);

    let animClass = "";
    if (direction > 0) animClass = "animate-from-right";
    else if (direction < 0) animClass = "animate-from-left";

    // Build sizes HTML ONLY for clothing with multiple sizes (no sizes for bags, crossbodies, caps)
    const isClothing = (product.category === "hoodies" || product.category === "tees" || product.category === "vetements" || product.category === "jackets");
    const hasMultipleSizes = product.sizes && product.sizes.length > 1;

    let sizesHtml = "";
    if (isClothing && hasMultipleSizes) {
        sizesHtml = `
            <div class="showcase-size-selector-box">
                <span class="showcase-size-title">Choose your size :</span>
                <div class="showcase-size-chips-list">
                    ${product.sizes.map(size => `
                        <button type="button" 
                                class="showcase-size-chip ${size === currentBoutiqueSelectedSize ? 'active' : ''}" 
                                onclick="selectBoutiqueSize('${size}')" 
                                aria-label="Taille ${size}">
                            ${size}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 1. RENDER ARENA (3 ZONES)
    arenaEl.innerHTML = `
        <!-- ZONE 1: INFORMATIONS GAUCHE (DESCRIPTION ÉPURÉE & TITRE) -->
        <div class="showcase-col-left">
            <div class="showcase-top-controls">
                <div class="showcase-arrows-group">
                    <button type="button" class="showcase-arrow-btn" onclick="switchBoutiqueProduct(-1)" aria-label="Produit précédent">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button type="button" class="showcase-arrow-btn" onclick="switchBoutiqueProduct(1)" aria-label="Produit suivant">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <div class="showcase-counter-badge">
                    <span class="counter-current">${String(currentBoutiqueShowcaseIndex + 1).padStart(2, '0')}</span>
                    <span class="counter-sep">/</span>
                    <span class="counter-total">${String(list.length).padStart(2, '0')}</span>
                </div>
            </div>

            <div class="showcase-brand-tag">
                <span>CULTURE // DROP OFFICIEL</span>
                <span class="dot-sep">•</span>
                <span>${categoryLabel}</span>
            </div>

            <h1 class="showcase-main-title">${product.name}</h1>
            <p class="showcase-tagline">STAND OUT WITHOUT TRYING</p>

            <p class="showcase-full-desc">${product.description}</p>
        </div>

        <!-- ZONE 2: PRODUIT EN GRAND SANS CADRE AU CENTRE (UNIFORME & +50%) -->
        <div class="showcase-col-center">
            <div class="showcase-ambient-halo"></div>
            <div class="showcase-product-float-stage" id="showcaseFloatStage">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="showcase-frameless-img ${animClass} ${product.id.startsWith('sac') ? 'backpack-img' : ''}" 
                     id="showcaseFramelessImg"
                     loading="eager"
                     decoding="async"
                     onerror="handleProductImageError(this)" />
                <div class="showcase-pedestal-shadow"></div>
            </div>
        </div>

        <!-- ZONE 3: PRIX, NOMBRE DISPONIBLE & BOUTONS D'ACHAT À DROITE -->
        <div class="showcase-col-right">
            <div class="showcase-price-box">
                <span class="showcase-price-tag">PRIX OFFICIEL</span>
                <div class="showcase-price-amount">${formatPrice(product.price)}</div>
                <div class="showcase-available-count">
                    SÉRIE LIMITÉE // <strong>${stockCount}</strong> PIÈCES DISPONIBLES
                </div>
            </div>

            ${sizesHtml}

            <div class="showcase-action-row">
                <button type="button" class="showcase-cta-main" onclick="addCurrentShowcaseProductToCart()">
                    <span>Ajouter au panier</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
                <button type="button" class="showcase-wishlist-toggle ${isWishlisted ? 'active' : ''}" 
                        onclick="toggleWishlistItem('${product.id}'); this.classList.toggle('active');" 
                        aria-label="${isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // 2. RENDER BOTTOM SWITCHER ("flèche en bas pour switcher sur le reste des produits")
    if (switcherWrapperEl) {
        switcherWrapperEl.innerHTML = `
            <div class="bottom-switcher-header">
                <span class="bottom-switcher-title">EXPLORER LA COLLECTION (${list.length} PIÈCES)</span>
                <span class="bottom-switcher-hint">Cliquez sur une pièce ou utilisez les flèches pour changer</span>
            </div>

            <div class="bottom-switcher-row">
                <button type="button" class="bottom-arrow-nav prev" onclick="switchBoutiqueProduct(-1)" aria-label="Produit précédent">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>

                <div class="bottom-switcher-viewport" id="bottomSwitcherViewport">
                    <div class="bottom-switcher-rail" id="bottomSwitcherRail">
                        ${list.map((item, idx) => `
                            <button type="button" 
                                    class="bottom-switcher-card ${idx === currentBoutiqueShowcaseIndex ? 'active' : ''}" 
                                    onclick="selectBoutiqueProductByIndex(${idx})" 
                                    aria-label="Sélectionner ${item.name}">
                                <div class="bottom-card-thumb">
                                    <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="handleProductImageError(this)">
                                </div>
                                <div class="bottom-card-info">
                                    <span class="bottom-card-name">${item.name}</span>
                                    <span class="bottom-card-price">${formatPrice(item.price)}</span>
                                </div>
                                ${idx === currentBoutiqueShowcaseIndex ? '<div class="bottom-card-indicator"></div>' : ''}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button type="button" class="bottom-arrow-nav next" onclick="switchBoutiqueProduct(1)" aria-label="Produit suivant">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>
            </div>
        `;

        setTimeout(() => {
            const activeCard = switcherWrapperEl.querySelector('.bottom-switcher-card.active');
            const viewport = document.getElementById('bottomSwitcherViewport');
            if (activeCard && viewport) {
                const cardOffset = activeCard.offsetLeft - viewport.offsetLeft - (viewport.clientWidth / 2) + (activeCard.clientWidth / 2);
                viewport.scrollTo({ left: Math.max(0, cardOffset), behavior: 'smooth' });
            }
        }, 50);
    }

    // Touch swipe listener on center image
    const floatImg = document.getElementById('showcaseFramelessImg');
    if (floatImg) {
        let touchStartX = 0;
        let touchStartY = 0;
        floatImg.addEventListener('touchstart', (e) => {
            if (e.changedTouches && e.changedTouches[0]) {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }
        }, { passive: true });
        floatImg.addEventListener('touchend', (e) => {
            if (e.changedTouches && e.changedTouches[0]) {
                const diffX = e.changedTouches[0].screenX - touchStartX;
                const diffY = e.changedTouches[0].screenY - touchStartY;
                if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX < 0) switchBoutiqueProduct(1);
                    else switchBoutiqueProduct(-1);
                }
            }
        }, { passive: true });
    }
}

function switchBoutiqueProduct(delta) {
    const list = currentDisplayedCatalogue;
    if (!list || list.length === 0) return;

    currentBoutiqueShowcaseIndex = (currentBoutiqueShowcaseIndex + delta + list.length) % list.length;
    renderBoutiqueGrandShowcase(delta);

    const currentProduct = list[currentBoutiqueShowcaseIndex];
    if (currentProduct && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('product', currentProduct.id);
        window.history.replaceState({ productId: currentProduct.id }, '', url.toString());
    }
}

function selectBoutiqueProductByIndex(index) {
    const list = currentDisplayedCatalogue;
    if (!list || index < 0 || index >= list.length) return;
    const direction = index > currentBoutiqueShowcaseIndex ? 1 : -1;
    currentBoutiqueShowcaseIndex = index;
    renderBoutiqueGrandShowcase(direction);

    const currentProduct = list[currentBoutiqueShowcaseIndex];
    if (currentProduct && window.history && window.history.replaceState) {
        const url = new URL(window.location.href);
        url.searchParams.set('product', currentProduct.id);
        window.history.replaceState({ productId: currentProduct.id }, '', url.toString());
    }
}

function selectBoutiqueSize(size) {
    currentBoutiqueSelectedSize = size;
    const chips = document.querySelectorAll('.showcase-size-chip');
    chips.forEach(chip => {
        if (chip.textContent.trim() === size) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
}

function addCurrentShowcaseProductToCart() {
    const list = currentDisplayedCatalogue;
    const product = list[currentBoutiqueShowcaseIndex];
    if (!product) return;

    const sizeToOrder = currentBoutiqueSelectedSize || (product.sizes && product.sizes[0]) || 'Unique';
    addItemToCartArray(product, sizeToOrder, product.status === 'preorder');
    openCartDrawer();
    showToast(`✓ ${product.name} ajouté au panier !`);
}

// Global exposes for onclick handlers
window.switchBoutiqueProduct = switchBoutiqueProduct;
window.selectBoutiqueProductByIndex = selectBoutiqueProductByIndex;
window.selectBoutiqueSize = selectBoutiqueSize;
window.addCurrentShowcaseProductToCart = addCurrentShowcaseProductToCart;
window.renderFeaturedProducts = function() { renderBoutiqueGrandShowcase(0); };


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

    if (product.sizes && product.sizes.length > 1) {
        openQuickView(productId);
        showToast("Veuillez sélectionner une taille.");
        return;
    }

    const defaultSize = (product.sizes && product.sizes.length === 1) ? product.sizes[0] : "";
    addItemToCartArray(product, defaultSize);
    showToast(`${product.name} ajouté au panier !`);
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
    goToCartStep('items');
    renderCart();
}

function closeCartDrawer() {
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove("active");
    setTimeout(() => {
        goToCartStep('items');
    }, 350);
}

function goToCartStep(step) {
    const panelItems = document.getElementById("cartPanelItems");
    const panelCheckout = document.getElementById("cartPanelCheckout");

    if (step === 'checkout') {
        if (!cart || cart.length === 0) {
            showToast("Votre sac est vide !");
            return;
        }
        if (panelItems) panelItems.classList.remove("active");
        if (panelCheckout) panelCheckout.classList.add("active");

        // Mise à jour dynamique du mini récapitulatif
        const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const summaryCount = document.getElementById("checkoutSummaryItemsCount");
        const summaryTotal = document.getElementById("checkoutSummaryTotal");
        if (summaryCount) summaryCount.textContent = `${count} article${count > 1 ? 's' : ''}`;
        if (summaryTotal) summaryTotal.textContent = formatPrice(total);
    } else {
        if (panelCheckout) panelCheckout.classList.remove("active");
        if (panelItems) panelItems.classList.add("active");
    }
}
window.goToCartStep = goToCartStep;

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalText = document.getElementById("cartSubtotal");
    const footer = document.getElementById("cartDrawerFooter");
    const shippingBarText = document.getElementById("shippingBarText");
    const shippingProgressFill = document.getElementById("shippingProgressFill");
    const proceedBtn = document.getElementById("proceedToShippingBtn");
    
    if (!container) return;

    let total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
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

    // Mini récapitulatif dans le panel de checkout
    const summaryCount = document.getElementById("checkoutSummaryItemsCount");
    const summaryTotal = document.getElementById("checkoutSummaryTotal");
    if (summaryCount) summaryCount.textContent = `${count} article${count > 1 ? 's' : ''}`;
    if (summaryTotal) summaryTotal.textContent = formatPrice(total);

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <p>Votre sac est vide.</p>
                <button class="btn btn-dark" style="margin-top: 15px;" onclick="closeCartDrawer()">Commencer les Achats</button>
            </div>
        `;
        if (subtotalText) subtotalText.textContent = "0 XOF";
        if (proceedBtn) {
            proceedBtn.innerHTML = "Votre sac est vide";
            proceedBtn.disabled = true;
            proceedBtn.style.opacity = "0.5";
            proceedBtn.style.pointerEvents = "none";
        }
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

    if (proceedBtn) {
        proceedBtn.innerHTML = `Continuer vers la Livraison (${formatPrice(total)}) →`;
        proceedBtn.disabled = false;
        proceedBtn.style.opacity = "1";
        proceedBtn.style.pointerEvents = "auto";
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
        : "2290165173634";

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
                <div class="cart-item-variant">${getCategoryLabel(product.category)}</div>
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
   IMMERSIVE PRODUCT SHOWCASE STAGE ENGINE (QUICK VIEW & SHARED TRANSITIONS)
   ========================================================================== */
let currentImmersiveProductId = null;
let currentImmersiveList = [];
let currentImmersiveIndex = 0;
let lastTriggerCardImgRect = null;
let lastFocusedElement = null;
let immersiveNavigationLock = false;
let touchStartX = 0;
let touchStartY = 0;

function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getNavigationListForProduct(productId) {
    const filtered = getFilteredBoutiqueProducts();
    if (filtered.some(p => p.id === productId)) {
        return filtered;
    }
    // Si ouvert depuis Coming Soon (ex: dj1) ou recherche globale hors filtre actif
    const allUnique = [];
    const seen = new Set();
    PRODUCTS.forEach(p => {
        const key = String(p.id).toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            allUnique.push(p);
        }
    });
    return allUnique;
}

function getAmbientGlowStyleForProduct(product) {
    const id = String(product.id || "").toLowerCase();
    const cat = String(product.category || "").toLowerCase();
    if (id === "sac4" || id === "sac3") {
        return "radial-gradient(circle at 50% 50%, rgba(0, 82, 255, 0.22) 0%, rgba(255, 90, 0, 0.06) 45%, transparent 72%)";
    }
    if (id === "dj1") {
        return "radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.22) 0%, rgba(255, 90, 0, 0.08) 48%, transparent 72%)";
    }
    if (cat === "backpacks" || id.startsWith("sac")) {
        return "radial-gradient(circle at 50% 50%, rgba(255, 90, 0, 0.16) 0%, rgba(255, 255, 255, 0.05) 48%, transparent 72%)";
    }
    return "radial-gradient(circle at 50% 50%, rgba(255, 90, 0, 0.14) 0%, rgba(120, 120, 140, 0.08) 50%, transparent 72%)";
}

function syncProductUrlParam(productId, replace = false) {
    try {
        const url = new URL(window.location.href);
        if (productId) {
            url.searchParams.set("product", productId);
        } else {
            url.searchParams.delete("product");
        }
        if (replace) {
            window.history.replaceState({ immersiveProduct: productId }, "", url.toString());
        } else {
            window.history.pushState({ immersiveProduct: productId }, "", url.toString());
        }
    } catch (e) {}
}

function checkInitialProductUrlParam() {
    try {
        const params = new URLSearchParams(window.location.search);
        const prodId = params.get("product");
        if (prodId) {
            const targetProd = PRODUCTS.find(p => String(p.id).toLowerCase() === String(prodId).toLowerCase());
            if (targetProd) {
                if (targetProd.id.startsWith("sac")) {
                    activeCategoryFilter = "backpacks";
                } else if (targetProd.id.startsWith("c")) {
                    activeCategoryFilter = "crossbody";
                } else {
                    activeCategoryFilter = "all";
                }
                const filterTags = document.querySelectorAll(".filter-tag");
                filterTags.forEach(t => {
                    if (t.dataset.filter === activeCategoryFilter) t.classList.add("active");
                    else t.classList.remove("active");
                });
                currentDisplayedCatalogue = getFilteredBoutiqueProducts();
                const idx = currentDisplayedCatalogue.findIndex(p => String(p.id).toLowerCase() === String(prodId).toLowerCase());
                if (idx !== -1) {
                    currentBoutiqueShowcaseIndex = idx;
                    renderBoutiqueGrandShowcase(0);
                    const boutiqueEl = document.getElementById("boutique");
                    if (boutiqueEl) boutiqueEl.scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }
        }
    } catch (e) {}
}

function initImmersiveShowcaseListeners() {
    // Clavier : Flèche Gauche, Flèche Droite, Échap
    document.addEventListener("keydown", (e) => {
        const overlay = document.getElementById("quickViewOverlay");
        if (!overlay || !overlay.classList.contains("active")) {
            if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key === "ArrowRight") {
                switchBoutiqueProduct(1);
            } else if (e.key === "ArrowLeft") {
                switchBoutiqueProduct(-1);
            }
            return;
        }

        if (e.key === "Escape") {
            e.preventDefault();
            closeImmersiveProduct();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            navigateImmersiveProduct(1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            navigateImmersiveProduct(-1);
        }
    });

    // Gestes tactiles (Swipe gauche / droite sur mobile)
    const stage = document.getElementById("quickViewModal");
    if (stage) {
        stage.addEventListener("touchstart", (e) => {
            if (!e.touches || e.touches.length !== 1) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        stage.addEventListener("touchend", (e) => {
            if (!e.changedTouches || e.changedTouches.length !== 1) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            const deltaY = e.changedTouches[0].clientY - touchStartY;

            // Valider un swipe horizontal franc (> 55px et dominant sur le scroll vertical)
            if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
                if (deltaX < 0) {
                    navigateImmersiveProduct(1);
                } else {
                    navigateImmersiveProduct(-1);
                }
            }
        }, { passive: true });
    }

    // Bouton Précédent du navigateur (popstate)
    window.addEventListener("popstate", () => {
        const params = new URLSearchParams(window.location.search);
        const prodId = params.get("product");
        const overlay = document.getElementById("quickViewOverlay");
        if (prodId && PRODUCTS.some(p => p.id === prodId)) {
            openQuickView(prodId, null, { skipUrlPush: true });
        } else if (overlay && overlay.classList.contains("active")) {
            closeImmersiveProduct({ skipUrlSync: true });
        }
    });
}

function openQuickView(productId, triggerEl = null, options = {}) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const overlay = document.getElementById("quickViewOverlay");
    const body = document.getElementById("quickViewModalBody");
    if (!overlay || !body) return;

    const wasAlreadyOpen = overlay.classList.contains("active");

    // Sauvegarder l'élément déclencheur pour restaurer le focus à la fermeture
    if (!wasAlreadyOpen) {
        lastFocusedElement = triggerEl || document.activeElement;
    }

    // Capturer la position (bounding box) de l'image dans la carte du catalogue pour l'animation FLIP
    lastTriggerCardImgRect = null;
    if (!wasAlreadyOpen && !prefersReducedMotion()) {
        const cardEl = document.querySelector(`.product-card[data-id="${productId}"] .product-img-primary`) ||
                       document.querySelector(`.carousel-item[data-id="${productId}"] .carousel-item-img`) ||
                       (productId === "dj1" ? document.querySelector(".flagship-drop-img") : null);
        if (cardEl) {
            const rect = cardEl.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                lastTriggerCardImgRect = rect;
            }
        }
    }

    // Construire la liste ordonnée de navigation
    currentImmersiveList = getNavigationListForProduct(productId);
    const foundIdx = currentImmersiveList.findIndex(p => p.id === productId);
    currentImmersiveIndex = foundIdx !== -1 ? foundIdx : 0;
    currentImmersiveProductId = product.id;

    // Rendu du contenu dans la scène immersive
    renderImmersiveShowcaseContent(product, options.direction || 0);

    // Ouvrir l'overlay et verrouiller le scroll arrière-plan proprement
    if (!wasAlreadyOpen) {
        overlay.classList.add("active");
        document.body.classList.add("immersive-modal-open");

        // Exécuter l'animation Shared Element (FLIP) de la carte vers la scène
        if (lastTriggerCardImgRect && !prefersReducedMotion()) {
            requestAnimationFrame(() => {
                const heroImg = document.getElementById("immersiveHeroImg");
                if (!heroImg) return;
                const finalRect = heroImg.getBoundingClientRect();
                if (finalRect.width > 0 && finalRect.height > 0) {
                    const deltaX = (lastTriggerCardImgRect.left + lastTriggerCardImgRect.width / 2) - (finalRect.left + finalRect.width / 2);
                    const deltaY = (lastTriggerCardImgRect.top + lastTriggerCardImgRect.height / 2) - (finalRect.top + finalRect.height / 2);
                    const scale = Math.max(0.25, Math.min(0.9, lastTriggerCardImgRect.height / finalRect.height));

                    heroImg.style.transition = "none";
                    heroImg.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`;
                    heroImg.style.opacity = "0.65";

                    requestAnimationFrame(() => {
                        heroImg.style.transition = "transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease";
                        heroImg.style.transform = "translate3d(0, 0, 0) scale(1)";
                        heroImg.style.opacity = "1";
                    });
                }
            });
        }
    }

    // Synchroniser l'URL sans recharger la page
    if (!options.skipUrlPush) {
        syncProductUrlParam(product.id, wasAlreadyOpen);
    }
}

function renderImmersiveShowcaseContent(product, direction = 0) {
    const body = document.getElementById("quickViewModalBody");
    const counterEl = document.getElementById("immersivePositionCounter");
    const glowEl = document.getElementById("immersiveAmbientGlow");
    if (!body) return;

    const totalItems = currentImmersiveList.length || 1;
    const currentPos = currentImmersiveIndex + 1;
    if (counterEl) {
        counterEl.textContent = `${String(currentPos).padStart(2, "0")} / ${String(totalItems).padStart(2, "0")}`;
    }

    if (glowEl) {
        glowEl.style.background = getAmbientGlowStyleForProduct(product);
    }

    // Produit suivant & précédent pour l'aperçu flottant (inspiré de la vidéo de référence)
    const nextIdx = (currentImmersiveIndex + 1) % totalItems;
    const prevIdx = (currentImmersiveIndex - 1 + totalItems) % totalItems;
    const nextProduct = currentImmersiveList[nextIdx] || product;
    const prevProduct = currentImmersiveList[prevIdx] || product;

    const isWishlisted = wishlist.includes(product.id);
    const isUpcoming = product.status === "upcoming";
    const isPreorder = product.status === "preorder";
    const stockCount = (product.stock !== undefined && product.stock !== null) 
        ? Number(product.stock) 
        : 10;
    const isOutOfStock = !isUpcoming && stockCount === 0;

    let stockBannerHtml = "";
    if (isUpcoming) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-tag upcoming-tag">
                    <span class="stock-tag-dot"></span>
                    <span class="stock-tag-label">⏳ BIENTÔT DISPONIBLE // SÉRIE PRÉVUE : ${stockCount} PIÈCES</span>
                </div>
            </div>
        `;
    } else if (isPreorder) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-tag low-stock">
                    <span class="stock-tag-dot pulse"></span>
                    <span class="stock-tag-label">${product.preorderBadge || '⚡ PRÉ-VENTE'} // EXPÉDITION : <strong>${product.releaseDate || 'Immédiat'}</strong></span>
                </div>
            </div>
        `;
    } else if (stockCount > 5) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-tag in-stock">
                    <span class="stock-tag-dot"></span>
                    <span class="stock-tag-label">EN STOCK // SÉRIE LIMITÉE : <strong>${stockCount} PIÈCES</strong> DISPONIBLES</span>
                </div>
            </div>
        `;
    } else if (stockCount > 0) {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-tag low-stock">
                    <span class="stock-tag-dot pulse"></span>
                    <span class="stock-tag-label">⚡ DERNIÈRE CHANCE // PLUS QUE <strong>${stockCount} PIÈCES</strong> RESTANTES</span>
                </div>
            </div>
        `;
    } else {
        stockBannerHtml = `
            <div class="qv-stock-banner">
                <div class="product-stock-tag out-of-stock">
                    <span class="stock-tag-dot"></span>
                    <span class="stock-tag-label">SOLD OUT // SÉRIE ÉPUISÉE</span>
                </div>
            </div>
        `;
    }

    const slideClass = direction > 0 ? "slide-from-right" : (direction < 0 ? "slide-from-left" : "initial-entrance");

    body.innerHTML = `
        <div class="quick-view-grid immersive-grid ${slideClass}" data-product-id="${product.id}">
            <!-- ZONE VISUELLE : Grande image du produit en lévitation -->
            <div class="qv-img-side immersive-visual-zone">
                <div class="immersive-stage-backdrop-label" aria-hidden="true">${getCategoryLabel(product.category).toUpperCase()}</div>
                
                <div class="immersive-product-pedestal">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         id="immersiveHeroImg"
                         class="immersive-hero-img ${product.id.startsWith('sac') ? 'is-backpack' : ''}"
                         onerror="handleProductImageError(this)">
                    <div class="immersive-pedestal-shadow"></div>
                </div>

                <div class="immersive-visual-caption">
                    <span class="caption-serial">REF // ${String(product.id).toUpperCase()}</span>
                    <span class="caption- separator">•</span>
                    <span class="caption-tagline">CULTURE STREETWEAR CO. — COTONOU</span>
                </div>

                ${totalItems > 1 ? `
                    <!-- Mini aperçu flottant du produit suivant (clin d'œil à la vidéo de référence) -->
                    <button class="immersive-next-teaser" onclick="navigateImmersiveProduct(1)" aria-label="Voir suivant : ${nextProduct.name}" title="Suivant : ${nextProduct.name}">
                        <div class="next-teaser-thumb">
                            <img src="${nextProduct.image}" alt="${nextProduct.name}" onerror="handleProductImageError(this)">
                        </div>
                        <div class="next-teaser-meta">
                            <span class="next-teaser-label">Suivant →</span>
                            <span class="next-teaser-name">${nextProduct.name}</span>
                        </div>
                    </button>
                ` : ''}
            </div>
            
            <!-- ZONE INFORMATIVE : Panneau éditorial structuré -->
            <div class="qv-text-side immersive-info-zone">
                <div class="immersive-meta-header stagger-item-1">
                    <span class="qv-badge">${getCategoryLabel(product.category)}</span>
                    ${product.releaseDate ? `<span class="immersive-release-pill">📦 ${product.releaseDate}</span>` : ''}
                </div>

                <h3 class="qv-title immersive-product-title stagger-item-2" id="immersiveProductTitle">${product.name}</h3>
                
                <div class="immersive-price-row stagger-item-2">
                    <div class="qv-price immersive-price">${formatPrice(product.price)}</div>
                    ${product.oldPrice ? `<span class="immersive-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>

                <div class="stagger-item-3">
                    ${stockBannerHtml}
                </div>

                <p class="qv-description immersive-description stagger-item-3">${product.description}</p>
                
                ${product.sizes && product.sizes.length > 0 ? `
                    <div class="qv-variants immersive-variants stagger-item-4">
                        <h5>Choisir votre taille</h5>
                        <div class="qv-sizes-row">
                            ${product.sizes.map((s, idx) => `
                                <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectModalSize(this)">${s}</button>
                            `).join("")}
                        </div>
                    </div>
                ` : ''}

                <div class="qv-actions-row immersive-actions-row stagger-item-4">
                    ${isUpcoming ? `
                        <button class="qv-add-to-cart qv-alert-btn" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid var(--accent-orange); color:#fff;" onclick="triggerDropAlert('${product.id}')">
                            <span>🔔 M'alerter au Drops</span>
                        </button>
                    ` : isOutOfStock ? `
                        <button class="qv-add-to-cart" disabled style="opacity:0.6; cursor:not-allowed;">
                            <span>❌ Épuisé pour le moment</span>
                        </button>
                    ` : `
                        <button class="qv-add-to-cart immersive-buy-btn" onclick="addFromModalToCart('${product.id}')">
                            <span>${isPreorder ? '⚡ Pré-commander — ' + formatPrice(product.price) : 'Ajouter au Sac — ' + formatPrice(product.price)}</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    `}
                    <button class="qv-wishlist ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem('${product.id}'); syncModalWishlistBtn(this)" aria-label="Ajouter aux favoris" title="Ajouter aux favoris">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>

                <!-- Navigation rapide de pied de panneau -->
                ${totalItems > 1 ? `
                    <div class="immersive-footer-switcher stagger-item-4">
                        <button class="switcher-link prev" onclick="navigateImmersiveProduct(-1)">
                            <span>← ${prevProduct.name}</span>
                        </button>
                        <button class="switcher-link next" onclick="navigateImmersiveProduct(1)">
                            <span>${nextProduct.name} →</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function navigateImmersiveProduct(step) {
    if (immersiveNavigationLock) return;
    if (!currentImmersiveList || currentImmersiveList.length <= 1) return;

    immersiveNavigationLock = true;
    setTimeout(() => { immersiveNavigationLock = false; }, 220);

    const total = currentImmersiveList.length;
    currentImmersiveIndex = (currentImmersiveIndex + step + total) % total;
    const targetProduct = currentImmersiveList[currentImmersiveIndex];
    if (!targetProduct) return;

    currentImmersiveProductId = targetProduct.id;

    const updateDOM = () => {
        renderImmersiveShowcaseContent(targetProduct, step);
        syncProductUrlParam(targetProduct.id, true);
    };

    // Utiliser View Transitions API si disponible et que l'utilisateur n'a pas activé reduced-motion
    if (document.startViewTransition && !prefersReducedMotion()) {
        try {
            document.startViewTransition(() => {
                updateDOM();
            });
        } catch (e) {
            updateDOM();
        }
    } else {
        updateDOM();
    }
}

function closeImmersiveProduct(options = {}) {
    const overlay = document.getElementById("quickViewOverlay");
    if (!overlay || !overlay.classList.contains("active")) return;

    overlay.classList.remove("active");
    document.body.classList.remove("immersive-modal-open");

    if (!options.skipUrlSync) {
        syncProductUrlParam(null, true);
    }

    // Faire défiler doucement la carte du dernier produit consulté dans le champ de vision si besoin
    if (currentImmersiveProductId) {
        const activeCard = document.querySelector(`.product-card[data-id="${currentImmersiveProductId}"]`);
        if (activeCard) {
            const rect = activeCard.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
            if (!isVisible) {
                activeCard.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
            }
            activeCard.classList.add("recently-inspected");
            setTimeout(() => activeCard.classList.remove("recently-inspected"), 1400);
        }
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        try {
            lastFocusedElement.focus({ preventScroll: true });
        } catch (e) {}
    }
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
    
    closeImmersiveProduct();
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
