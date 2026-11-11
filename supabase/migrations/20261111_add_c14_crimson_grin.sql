-- ==========================================================================
-- SUPABASE POSTGRESQL MIGRATION (ADDITIVE & NON-DESTRUCTIVE)
-- AJOUT DU NOUVEAU PRODUIT c14 (Crimson Grin Flap Crossbody) - Prix 10 000 - Stock 5
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
VALUES (
    'c14',
    'Crimson Grin Flap Crossbody',
    10000,
    'crossbody',
    'IMAGE/c 14_crimson_grin.png',
    'Sacoche bandoulière à rabat en toile ripstop noire texturée losange, ornée d''un regard rouge perçant sur le rabat et d''un large sourire acéré blanc contrastant. Équipée de boucles latérales mates haute résistance et d''une sangle tissée large entièrement ajustable pour un style streetwear nocturne affirmé.',
    '["Unique"]'::jsonb,
    'available',
    'DISPONIBLE',
    'Immédiat',
    100,
    5,
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
        SET stock = COALESCE(stock, 5)
        WHERE id = 'c14';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'products'
          AND column_name = 'physical_stock'
    ) THEN
        UPDATE public.products
        SET physical_stock = COALESCE(physical_stock, 5),
            sold_stock = COALESCE(sold_stock, 0)
        WHERE id = 'c14';
    END IF;
END $$;
