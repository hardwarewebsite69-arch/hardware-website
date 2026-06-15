-- Migration: Add user-specified categories and products for Kenyan hardware
-- Created: 2026-06-16

BEGIN;

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, sort_order)
VALUES 
  (gen_random_uuid(), 'Paints', 'paints', 'Quality interior and exterior paints, emulsions, and painting accessories.', 1),
  (gen_random_uuid(), 'Electrical', 'electrical', 'Cables, lighting, switches, and electrical protection devices.', 2),
  (gen_random_uuid(), 'Building Materials', 'building-materials', 'Cement, steel, aggregates, and construction essentials.', 3),
  (gen_random_uuid(), 'Plumbing', 'plumbing', 'Pipes, fittings, and high-quality sanitary ware.', 4)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order;

-- 2. Insert Products (using subqueries to get category IDs)

-- PAINTS
INSERT INTO public.products (category_id, name, slug, description, request_price)
SELECT id, 'Silk Vinyl', 'silk-vinyl', 'Premium silk finish vinyl paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Matt Vinyl', 'matt-vinyl', 'Durable matt finish vinyl paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Covermatt', 'covermatt', 'High-opacity covermatt paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Weather Guard', 'weather-guard', 'Weather-resistant exterior paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Plastic Emulsions', 'plastic-emulsions', 'Standard plastic emulsion paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Hi-Gloss', 'hi-gloss', 'High-gloss oil-based paint.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Paint Roller 9"', 'paint-roller-9', 'Standard 9-inch paint roller.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Paint Roller 4"', 'paint-roller-4', 'Small 4-inch paint roller.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Skimming Coat', 'skimming-coat', 'Ready-to-use skimming coat for smooth walls.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Crack Filler', 'crack-filler', 'High-quality filler for wall cracks.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Brushes', 'paint-brushes', 'Assorted high-quality paint brushes.', true FROM public.categories WHERE slug = 'paints'
UNION ALL
SELECT id, 'Masking Tape', 'masking-tape', 'Standard masking tape for painting.', true FROM public.categories WHERE slug = 'paints'
ON CONFLICT (slug) DO NOTHING;

-- ELECTRICAL
INSERT INTO public.products (category_id, name, slug, description, request_price)
SELECT id, 'Cables', 'electrical-cables', 'High-conductivity electrical cables.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'LED Bulbs', 'led-bulbs', 'Energy-efficient LED bulbs.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Switches', 'electrical-switches', 'Modern electrical switches.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Single Socket', 'single-socket', 'Standard single power socket.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Twin Socket', 'twin-socket', 'Double power socket.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'AC Floodlight', 'ac-floodlight', 'Powerful AC-powered floodlight.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Solar Floodlight', 'solar-floodlight', 'Eco-friendly solar floodlight.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Moisture Proof Lights', 'moisture-proof-lights', 'Durable moisture-proof lighting fixtures.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Dust Proof LEDs', 'dust-proof-leds', 'Industrial dust-proof LED lights.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Down Lights', 'down-lights', 'Sleek interior down lights.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Consumer Units', 'consumer-units', 'Reliable electrical consumer units.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Infrared Lights', 'infrared-lights', 'Specialized infrared heating/lighting.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'TV Guard', 'tv-guard', 'Voltage protector for TVs.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Fridge Guard', 'fridge-guard', 'Voltage protector for refrigerators.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Extensions', 'power-extensions', 'Multi-socket power extensions.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'Chandelier', 'chandelier', 'Elegant decorative chandeliers.', true FROM public.categories WHERE slug = 'electrical'
UNION ALL
SELECT id, 'MCBs', 'mcbs', 'Miniature Circuit Breakers for safety.', true FROM public.categories WHERE slug = 'electrical'
ON CONFLICT (slug) DO NOTHING;

-- BUILDING MATERIALS
INSERT INTO public.products (category_id, name, slug, description, request_price)
SELECT id, 'Cement', 'cement', 'Premium Portland cement 50kg bags.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Sand', 'sand', 'Clean construction sand.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Ballast', 'ballast', 'High-quality ballast for concrete.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Chips', 'chips', 'Graded stone chips.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Blocks', 'building-blocks', 'Standard concrete building blocks.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Hardcore', 'hardcore', 'Filling material for foundations.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Deformed Bars', 'deformed-bars', 'TMT deformed reinforcement bars.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Black Pipe', 'black-pipe', 'Industrial black steel pipes.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Furniture Pipes', 'furniture-pipes', 'Lightweight pipes for furniture.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Square Tubes', 'square-tubes', 'Structural square steel tubes.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Chainlinks', 'chainlinks', 'Galvanized fencing chainlinks.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Barbed Wire', 'barbed-wire', 'Standard security barbed wire.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Galvanized Wire', 'galvanized-wire', 'Rust-resistant galvanized wire.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Wire Mash', 'wire-mash', 'Reinforcement wire mesh.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Timber', 'timber', 'Treated construction timber.', true FROM public.categories WHERE slug = 'building-materials'
UNION ALL
SELECT id, 'Iron Sheet', 'iron-sheet', 'Galvanized or pre-painted iron sheets.', true FROM public.categories WHERE slug = 'building-materials'
ON CONFLICT (slug) DO NOTHING;

-- PLUMBING
INSERT INTO public.products (category_id, name, slug, description, request_price)
SELECT id, 'Pipes', 'plumbing-pipes', 'Assorted plumbing pipes (PPR, PVC).', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Fittings', 'plumbing-fittings', 'Connectors, elbows, and tees.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Asian Toilets', 'asian-toilets', 'Squatting toilets.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Step Toilet', 'step-toilet', 'Step-style toilets.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'English Toilets', 'english-toilets', 'Standard English-style sitting toilets.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Cisterns', 'toilet-cisterns', 'Toilet water tanks/cisterns.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Taps', 'taps-faucets', 'Durable water taps and faucets.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Spouts', 'shower-spouts', 'Plumbing spouts and outlets.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Mirrors', 'bathroom-mirrors', 'Bathroom mirrors.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Arabic Showers', 'arabic-showers', 'Handheld bidet/Arabic showers.', true FROM public.categories WHERE slug = 'plumbing'
UNION ALL
SELECT id, 'Shower Roses', 'shower-roses', 'Shower heads and roses.', true FROM public.categories WHERE slug = 'plumbing'
ON CONFLICT (slug) DO NOTHING;

COMMIT;
