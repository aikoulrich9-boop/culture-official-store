-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION
-- CATALOGUE DES PRODUITS STREETWEAR & SYNCHRONISATION MULTI-CLIENTS
-- Migration Version: 20261027_products_catalog_schema.sql
-- ==========================================================================

-- 1. TABLE DES PRODUITS (public.products)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0 CHECK (price >= 0),
    category TEXT NOT NULL DEFAULT 'bags',
    image TEXT,
    description TEXT,
    sizes JSONB DEFAULT '["Unique"]'::jsonb,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'preorder', 'upcoming')),
    preorder_badge TEXT DEFAULT 'DISPONIBLE',
    release_date TEXT DEFAULT 'Immédiat',
    reserved_percentage NUMERIC DEFAULT 100 CHECK (reserved_percentage >= 0 AND reserved_percentage <= 100),
    total_stock INT DEFAULT 50 CHECK (total_stock >= 0),
    reserved_stock INT DEFAULT 0 CHECK (reserved_stock >= 0),
    stock INT DEFAULT 10 CHECK (stock >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rétrocompatibilité colonne stock
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 10;

-- Index pour filtres par catégorie et statut
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

-- 2. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Lecture publique pour la boutique en ligne
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
    ON public.products
    FOR SELECT
    USING (true);

-- Modification / Création / Suppression réservée aux administrateurs
DROP POLICY IF EXISTS "Allow admin full access on products" ON public.products;
CREATE POLICY "Allow admin full access on products"
    ON public.products
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 3. TRIGGER AUTOMATIQUE updated_at
DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. INSERTION / MISE À JOUR DU CATALOGUE OFFICIEL (SEED)
INSERT INTO public.products (id, name, price, category, image, description, sizes, status, preorder_badge, release_date, reserved_percentage, total_stock, reserved_stock, stock)
VALUES
    ('c1', 'Terra Icon Crossbody', 8000, 'crossbody', 'IMAGE/c 1.png', 'Sac streetwear noir avec illustration colorée d''un personnage sur la Terre.', '["Unique"]'::jsonb, 'preorder', '⚡ DROP / PRÉVENTE', '15 Oct. 2026', 85, 50, 42, 10),
    ('c2', 'Aero Character Crossbody', 8000, 'crossbody', 'IMAGE/c 2.png', 'Sac bandoulière technique résistant aux intempéries avec personnage à capuche rouge.', '["Unique"]'::jsonb, 'preorder', '⚡ DROP / PRÉVENTE', '15 Oct. 2026', 90, 50, 45, 8),
    ('c3', 'Portrait Editorial Crossbody', 8000, 'crossbody', 'IMAGE/c 3.png', 'Sac portrait artistique premium avec compartiments à double accès rapide.', '["Unique"]'::jsonb, 'upcoming', '⏳ BIENTÔT DISPONIBLE', '28 Oct. 2026', 60, 50, 30, 12),
    ('c4', 'Camo Beanie Crossbody', 8000, 'crossbody', 'IMAGE/c 4.png', 'Illustration signature du personnage au bonnet camouflage urbain et bandage streetwear.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 50, 50, 15),
    ('c5', 'All-Star Shooter Crossbody', 8000, 'crossbody', 'IMAGE/c 4_shooter.png', 'Illustration dynamique du joueur All-Star #12 au tir signature et regard étoilé.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 50, 50, 10),
    ('c6', 'Manga Rebel Crossbody', 8000, 'crossbody', 'IMAGE/c 5.png', 'Graphisme d''auteur façon croquis manga brut aux hachures expressives et cheveux blonds.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 50, 50, 10),
    ('c7', 'Boxy Silhouette Crossbody', 8000, 'crossbody', 'IMAGE/c 6.png', 'Silhouette streetwear underground en veste worker vintage oversize et pantalon cargo large.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 50, 50, 10),
    ('c8', 'Stealth Blackout Crossbody', 8000, 'crossbody', 'IMAGE/c 7.png', 'Édition purement minimaliste All-Black en toile balistique 1680D sans marquage.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 50, 50, 12),
    ('h1', 'Heavyweight Boxy Hoodie', 8000, 'hoodies', 'IMAGE/hoodie.jpg', 'Hoodie en coton bio haute densité 450gsm avec coupe ample.', '["S", "M", "L", "XL"]'::jsonb, 'preorder', '⚡ DROP / PRÉVENTE', '20 Oct. 2026', 75, 40, 30, 10),
    ('t1', 'Creator Studio Tee', 8000, 'tees', 'IMAGE/tee.jpg', 'T-shirt en jersey de coton peigné imprimé d''illustrations graphiques.', '["S", "M", "L", "XL"]'::jsonb, 'upcoming', '⏳ BIENTÔT DISPONIBLE', '28 Oct. 2026', 40, 60, 24, 18),
    ('cap1', 'Urban Explorer Cap', 8000, 'caps', 'IMAGE/cap.jpg', 'Casquette classique utilitaire à 6 panneaux.', '["Taille Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 30, 30, 20),
    ('dj1', 'Veste Hoodie Raw Indigo Denim 480gsm', 12000, 'hoodies', 'IMAGE/denim_jacket.jpg', 'Veste à capuche zippée en denim brut indigo lourd 480gsm.', '["S", "M", "L", "XL"]'::jsonb, 'upcoming', '⏳ BIENTÔT DISPONIBLE', 'Bientôt disponible', 0, 50, 0, 50),
    ('sac1', 'ILLEGAL Blackout Pack Vol.1', 12000, 'backpacks', 'IMAGE/sac_illegal_black.png', 'Sac à dos en toile technique noire intense avec logo ILLEGAL brodé.', '["Unique"]'::jsonb, 'preorder', '⚡ DROP / PRÉVENTE', '15 Oct. 2026', 88, 40, 35, 10),
    ('sac2', 'ILLEGAL Star Pack Vol.2', 12000, 'backpacks', 'IMAGE/sac_illegal_star.png', 'Version signature de la collection ILLEGAL × Priority.', '["Unique"]'::jsonb, 'preorder', '⚡ DROP / PRÉVENTE', '15 Oct. 2026', 92, 40, 37, 10),
    ('sac3', 'ILLEGAL Ocean Camo Pack', 14000, 'backpacks', 'IMAGE/sac_illegal_blue.png', 'Edition premium en tissu camo aquatique bleu céruléen.', '["Unique"]'::jsonb, 'upcoming', '⏳ BIENTÔT DISPONIBLE', '28 Oct. 2026', 65, 30, 20, 6),
    ('sac4', 'ILLEGAL Cobalt Icon Pack', 12000, 'backpacks', 'IMAGE/sac_illegal_cobalt.png', 'Sac à dos technique bleu cobalt emblématique ILLEGAL avec patch brodé, étoile découpée et tags exclusifs.', '["Unique"]'::jsonb, 'available', 'DISPONIBLE', 'Immédiat', 100, 40, 40, 10)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    category = EXCLUDED.category,
    image = EXCLUDED.image,
    description = EXCLUDED.description,
    sizes = EXCLUDED.sizes,
    status = EXCLUDED.status,
    preorder_badge = EXCLUDED.preorder_badge,
    release_date = EXCLUDED.release_date,
    reserved_percentage = EXCLUDED.reserved_percentage,
    total_stock = EXCLUDED.total_stock,
    reserved_stock = EXCLUDED.reserved_stock,
    updated_at = NOW();
