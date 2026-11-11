-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION (ADDITIVE & NON-DESTRUCTIVE)
-- AJOUT DES 5 NOUVELLES SACOCHES CROSSBODY (c9 à c13)
-- Ne modifie ni n'écrase aucun produit ou stock existant (ON CONFLICT DO NOTHING)
-- ==========================================================================

INSERT INTO public.products (
    id,
    name,
    price,
    category,
    image,
    description,
    sizes,
    status,
    preorder_badge,
    release_date,
    reserved_percentage,
    total_stock,
    reserved_stock
)
VALUES
    (
        'c9',
        'ILLEGAL Ice Wash White-Star Crossbody',
        10000,
        'crossbody',
        'IMAGE/c 9_ice_white_star.png',
        'Sacoche bandoulière en toile technique à motif marbré bleu glacier et blanc façon acid-wash. Dotée du macro-logo étoile emblématique ILLEGAL imprimé en blanc contrastant sur la face avant. Équipée d''une poche frontale à accès rapide, de doubles fermetures éclair avec tirettes paracorde mouchetées et d''une sangle noire tissée haute résistance entièrement ajustable.',
        '["Unique"]'::jsonb,
        'available',
        'DISPONIBLE',
        'Immédiat',
        100,
        3,
        0
    ),
    (
        'c10',
        'ILLEGAL Star Blackout Crossbody',
        10000,
        'crossbody',
        'IMAGE/c 10_black_white_star.png',
        'L''édition bandoulière iconique du célèbre Star Pack. Toile technique noire intense rehaussée du macro-graphisme étoile blanche signature imprimé pleine face. Silhouette compacte et structurée avec double compartiment zippé, tirettes en corde tressée technique et sangle réglable à boucles mates pour un porté croisé urbain.',
        '["Unique"]'::jsonb,
        'available',
        'DISPONIBLE',
        'Immédiat',
        100,
        3,
        0
    ),
    (
        'c11',
        'ILLEGAL Shadow Flora Star Crossbody',
        10000,
        'crossbody',
        'IMAGE/c 11_shadow_flora_star.png',
        'Sac bandoulière en toile technique à motif floral sombre ton-sur-ton (anthracite et noir charbon), sublimé par l''étoile emblématique blanche ILLEGAL en grand format. Finitions soignées avec double zip fluide, tirettes paracorde mouchetées, pochette frontale discrète et bandoulière renforcée ajustable.',
        '["Unique"]'::jsonb,
        'available',
        'DISPONIBLE',
        'Immédiat',
        100,
        3,
        0
    ),
    (
        'c12',
        'ILLEGAL Ice Wash Black-Star Crossbody',
        10000,
        'crossbody',
        'IMAGE/c 12_ice_black_star.png',
        'Édition contraste inversé de la série Ice Wash : toile texturée bleu électrique délavé façon acid-wash marquée par le macro-logo étoile ILLEGAL imprimé en noir profond. Conçue pour le quotidien urbain avec double fermeture à glissière, tirettes paracorde tressées, poche avant pratique et sangle réglable ultra-solide.',
        '["Unique"]'::jsonb,
        'available',
        'DISPONIBLE',
        'Immédiat',
        100,
        3,
        0
    ),
    (
        'c13',
        'Sacred Stained-Glass Crossbody',
        10000,
        'crossbody',
        'IMAGE/c 13_stained_glass.png',
        'Pièce collector au design audacieux : sacoche noire ornée d''un double visuel façon vitrail gothique haute définition mêlant figures sacrées, éclats solaires dorés, bleu cyan électrique et flammes écarlates. Toile robuste, double compartiment zippé à tirettes paracorde et sangle réglable à boucle mate.',
        '["Unique"]'::jsonb,
        'available',
        'DISPONIBLE',
        'Immédiat',
        100,
        3,
        0
    )
ON CONFLICT (id) DO NOTHING;

-- Synchronisation optionnelle si la colonne stock ou physical_stock existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'products'
          AND column_name = 'stock'
    ) THEN
        UPDATE public.products
        SET stock = COALESCE(stock, 3)
        WHERE id IN ('c9', 'c10', 'c11', 'c12', 'c13');
    END IF;

    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'products'
          AND column_name = 'physical_stock'
    ) THEN
        UPDATE public.products
        SET physical_stock = COALESCE(physical_stock, 3),
            sold_stock = COALESCE(sold_stock, 0)
        WHERE id IN ('c9', 'c10', 'c11', 'c12', 'c13');
    END IF;
END $$;
