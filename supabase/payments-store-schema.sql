-- ─────────────────────────────────────────────────────────
-- Payments, Store Products, Site Stats
-- Run in Supabase SQL editor
-- ─────────────────────────────────────────────────────────

-- Site stats (editable from admin, displayed on home + about pages)
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

INSERT INTO site_stats (key, value, label, sort_order) VALUES
  ('lives_transformed', '500+', 'Lives Transformed', 0),
  ('years_of_ministry',  '10+',  'Years of Ministry',  1),
  ('conferences_held',   '10+',  'Conferences Held',   2),
  ('mandate_and_call',   '1',    'Mandate and Call',   3)
ON CONFLICT (key) DO NOTHING;

-- Store products (merch, books, resources)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) DEFAULT 'resource', -- 'merch' | 'book' | 'resource'
  image_url VARCHAR(1000),
  in_stock BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);

-- Lenco payment records
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(500) NOT NULL,
  name VARCHAR(500),
  phone VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ZMW',
  type VARCHAR(50) NOT NULL, -- 'partnership' | 'store' | 'event'
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending' | 'verified' | 'failed'
  lenco_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_type ON payments(type);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

-- Add slug to events for URL routing
ALTER TABLE events ADD COLUMN IF NOT EXISTS slug VARCHAR(500);
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug) WHERE slug IS NOT NULL;

-- RLS policies
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_stats" ON site_stats FOR SELECT USING (true);
CREATE POLICY "Admin write site_stats" ON site_stats FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Admin write products" ON products FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read payments" ON payments FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Service write payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Service update payments" ON payments FOR UPDATE USING (true);
