-- ─────────────────────────────────────────────────────────
-- Program Groups: Restructure teachings into 3 main groups
-- Run in Supabase SQL editor
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS program_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(1000),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add program_group_id to teaching_series
ALTER TABLE teaching_series ADD COLUMN IF NOT EXISTS program_group_id UUID REFERENCES program_groups(id) ON DELETE SET NULL;

-- Add program_group_id to teachings (standalone if series_id IS NULL)
ALTER TABLE teachings ADD COLUMN IF NOT EXISTS program_group_id UUID REFERENCES program_groups(id) ON DELETE SET NULL;

-- Seed the 3 program groups
INSERT INTO program_groups (name, slug, description, sort_order) VALUES
  (
    'Manifested Sons of God Classes',
    'manifested-sons-of-god',
    'Weekly Saturday classes exploring the revelation of the sons of God — sonship, Kingdom authority, and the fullness of Christ in daily life.',
    0
  ),
  (
    'The Protocols of Heaven',
    'protocols-of-heaven',
    'Practical teachings where believers learn and activate the protocols and procedures of the Kingdom of Heaven in their everyday lives.',
    1
  ),
  (
    'Unto Perfection Conferences',
    'unto-perfection-conferences',
    'Annual intensive conferences bringing believers together for deep encounters with the Spirit and systematic teaching toward Christian perfection.',
    2
  )
ON CONFLICT (slug) DO NOTHING;

-- Assign all existing teachings and series to Manifested Sons of God Classes
UPDATE teaching_series
SET program_group_id = (SELECT id FROM program_groups WHERE slug = 'manifested-sons-of-god')
WHERE program_group_id IS NULL;

UPDATE teachings
SET program_group_id = (SELECT id FROM program_groups WHERE slug = 'manifested-sons-of-god')
WHERE program_group_id IS NULL;

-- RLS
ALTER TABLE program_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read program_groups" ON program_groups FOR SELECT USING (true);
CREATE POLICY "Admin write program_groups" ON program_groups FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
