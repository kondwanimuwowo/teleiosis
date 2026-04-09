-- =============================================================================
-- Teleiosis Mandate — Initial Database Schema
-- Supabase / PostgreSQL
-- Generated from: SETUP_GUIDE.md + AUDIO_INTEGRATION_SUMMARY.md
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. TEACHING CATEGORIES
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS teaching_categories (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL UNIQUE,
  slug        VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);

-- Default categories aligned with the Teleiosis teaching library
INSERT INTO teaching_categories (name, slug, description) VALUES
  ('Sonship & Identity',    'sonship',     'Teachings on your true identity as a son/daughter of God'),
  ('Kingdom Authority',     'authority',   'Exercising dominion and authority in the Kingdom'),
  ('Christian Perfection',  'perfection',  'The pathway to Christian maturity and fullness in Christ'),
  ('Corporate Prayer',      'prayer',      'Intercession, worship, and unified prayer'),
  ('Heavenly Realms',       'heavenly',    'Understanding and accessing the supernatural realm'),
  ('Conferences',           'conferences', 'Teachings from annual conferences and events')
ON CONFLICT (slug) DO NOTHING;


-- -----------------------------------------------------------------------------
-- 2. TEACHINGS
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS teachings (
  id                     UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  title                  VARCHAR(500)   NOT NULL,
  description            TEXT           NOT NULL,
  speaker                VARCHAR(255),
  category_id            UUID           NOT NULL REFERENCES teaching_categories(id) ON DELETE CASCADE,
  duration_minutes       INTEGER,
  published_date         TIMESTAMP      NOT NULL DEFAULT NOW(),
  audio_url              VARCHAR(1000)  NOT NULL,
  thumbnail_url          VARCHAR(1000),
  price                  DECIMAL(10, 2),
  included_in_membership BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at             TIMESTAMP      NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teachings_category_id    ON teachings(category_id);
CREATE INDEX IF NOT EXISTS idx_teachings_published_date ON teachings(published_date DESC);


-- -----------------------------------------------------------------------------
-- 3. AUDIO FILES  (optional — for advanced file-level tracking)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audio_files (
  id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  teaching_id     UUID           NOT NULL REFERENCES teachings(id) ON DELETE CASCADE,
  filename        VARCHAR(500)   NOT NULL,
  cloudflare_url  VARCHAR(1000)  NOT NULL,
  file_size_mb    DECIMAL(10, 2),
  duration_seconds INTEGER,
  created_at      TIMESTAMP      NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audio_files_teaching_id ON audio_files(teaching_id);


-- -----------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- Public read access; admin-only writes (set auth.jwt role = 'admin' for admins)
-- -----------------------------------------------------------------------------

ALTER TABLE teaching_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachings            ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_files          ENABLE ROW LEVEL SECURITY;

-- Public can read all categories
CREATE POLICY "public_read_categories" ON teaching_categories
  FOR SELECT USING (true);

-- Public can read all teachings
CREATE POLICY "public_read_teachings" ON teachings
  FOR SELECT USING (true);

-- Public can read all audio files
CREATE POLICY "public_read_audio_files" ON audio_files
  FOR SELECT USING (true);

-- Only admins can insert teachings
CREATE POLICY "admin_insert_teachings" ON teachings
  FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Only admins can update teachings
CREATE POLICY "admin_update_teachings" ON teachings
  FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Only admins can delete teachings
CREATE POLICY "admin_delete_teachings" ON teachings
  FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');


-- -----------------------------------------------------------------------------
-- 5. AUTO-UPDATE updated_at TRIGGER
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER teachings_updated_at
  BEFORE UPDATE ON teachings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- -----------------------------------------------------------------------------
-- 6. SAMPLE DATA  (remove before production if not needed)
-- -----------------------------------------------------------------------------

-- Insert sample teachings — replace audio_url values with real Cloudflare R2 URLs
-- after uploading your files to the `teleiosis-audio` bucket.

INSERT INTO teachings (
  title,
  description,
  speaker,
  category_id,
  duration_minutes,
  published_date,
  audio_url,
  included_in_membership
)
SELECT
  t.title,
  t.description,
  t.speaker,
  c.id,
  t.duration_minutes,
  t.published_date::TIMESTAMP,
  t.audio_url,
  t.in_membership
FROM (VALUES
  (
    'The Sonship Revelation',
    'Understanding your true identity as a son of God — beyond servant-hood into full inheritance.',
    'Rhema Nyambe', 'sonship', 52, '2026-03-28',
    'https://cdn.teleiosis.org/teachings/sonship-revelation.mp3', true
  ),
  (
    'Kingdom Authority in the Marketplace',
    'Exercising dominion and Kingdom influence in everyday life — work, family, and community.',
    'Rhema Nyambe', 'authority', 45, '2026-04-01',
    'https://cdn.teleiosis.org/teachings/kingdom-authority.mp3', true
  ),
  (
    'Accessing the Christ Dimension',
    'Going beyond doctrine into lived experience — accessing the reality of Christ within.',
    'Rhema Nyambe', 'perfection', 58, '2026-01-15',
    'https://cdn.teleiosis.org/teachings/christ-dimension.mp3', true
  ),
  (
    'Priesthood: Orders and Responsibilities',
    'A foundational series on the believer''s access, intercession, and priestly function before God.',
    'Rhema Nyambe', 'prayer', 61, '2025-11-09',
    'https://cdn.teleiosis.org/teachings/priesthood-orders.mp3', false
  ),
  (
    'The Lamb of God — Part 1',
    'What the blood of the Lamb accomplishes beyond what most believers have received.',
    'Rhema Nyambe', 'perfection', 50, '2026-01-20',
    'https://cdn.teleiosis.org/teachings/lamb-of-god-1.mp3', true
  ),
  (
    'The Lamb of God — Part 2',
    'Continuing the revelation of what God''s sacrifice unlocks for every son of God.',
    'Rhema Nyambe', 'perfection', 48, '2026-01-27',
    'https://cdn.teleiosis.org/teachings/lamb-of-god-2.mp3', true
  )
) AS t(title, description, speaker, cat_slug, duration_minutes, published_date, audio_url, in_membership)
JOIN teaching_categories c ON c.slug = t.cat_slug;
