-- =============================================================================
-- Teleiosis Mandate — Admin CMS Schema
-- Run this in Supabase → SQL Editor AFTER initial-schema.sql
-- =============================================================================


-- -----------------------------------------------------------------------------
-- 1. EVENTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  title            VARCHAR(500) NOT NULL,
  date             DATE         NOT NULL,
  time_start       VARCHAR(50),
  time_end         VARCHAR(50),
  location         VARCHAR(500),
  speaker          VARCHAR(255),
  type             VARCHAR(100) DEFAULT 'In Person',
  image_url        VARCHAR(1000),
  description      TEXT,
  is_recurring     BOOLEAN      NOT NULL DEFAULT FALSE,
  recurring_label  VARCHAR(255),
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_events" ON events FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- 2. TEACHING SERIES & TEACHINGS UPDATES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS teaching_series (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  title            VARCHAR(500) NOT NULL,
  description      TEXT,
  thumbnail_url    VARCHAR(1000),
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

ALTER TABLE teaching_series ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_teaching_series" ON teaching_series FOR SELECT USING (true);

-- Alter teachings table to support series
ALTER TABLE teachings 
  ADD COLUMN IF NOT EXISTS series_id UUID REFERENCES teaching_series(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS order_in_series INTEGER;

CREATE INDEX IF NOT EXISTS idx_teachings_series_id ON teachings(series_id);

CREATE TRIGGER teaching_series_updated_at
  BEFORE UPDATE ON teaching_series
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------------------------------------
-- 3. BLOG POSTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             VARCHAR(500) NOT NULL UNIQUE,
  title            VARCHAR(500) NOT NULL,
  category         VARCHAR(100) NOT NULL DEFAULT 'Devotional',
  excerpt          TEXT         NOT NULL,
  scripture        VARCHAR(255),
  scripture_text   TEXT,
  image_url        VARCHAR(1000),
  body             TEXT[]       NOT NULL DEFAULT '{}',
  read_time        VARCHAR(50)  DEFAULT '3 min read',
  published_at     TIMESTAMP    NOT NULL DEFAULT NOW(),
  created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_blog_posts" ON blog_posts FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- 3. QUOTES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quotes (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  text        TEXT         NOT NULL,
  scripture   VARCHAR(255),
  author      VARCHAR(255) DEFAULT 'Rhema Nyambe',
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_quotes" ON quotes FOR SELECT USING (is_active = true);

-- -----------------------------------------------------------------------------
-- 4. CO-LABOURERS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS co_labourers (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  initials    VARCHAR(10)  NOT NULL,
  title       VARCHAR(255),
  location    VARCHAR(255),
  bio         TEXT,
  image_url   VARCHAR(1000),
  sort_order  INTEGER      NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

ALTER TABLE co_labourers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_co_labourers" ON co_labourers FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- 5. AUTO-UPDATE updated_at TRIGGERS
-- -----------------------------------------------------------------------------
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- -----------------------------------------------------------------------------
-- 6. SEED EXISTING DATA — Quotes
-- -----------------------------------------------------------------------------
INSERT INTO quotes (text, scripture) VALUES
  ('The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. That which is perfect is come.', '1 Cor 13:10'),
  ('Leave nothing hanging in your life. Your Heavenly Father is very much concerned about the fine details. He is big enough to take care of the minutia of your life.', 'Psa 138:8'),
  ('Don''t advertise God small, show forth His excellence in all that concerns you. Through you, God is showing the world His Power.', 'Eph 2:10'),
  ('The fabric between Heaven and Earth is wearing thin as we reveal the Heart of the Father to the world. Let Heaven come.', 'Matt 6:10'),
  ('You are powerful, more than you know. The limits you see or the things that seem insurmountable are more scared of you than you are of them.', 'Eph 3:20'),
  ('Love is not naive, but in its function it is higher than the flaws and mistakes of others, it sees the greatest outcome from any situation, which is the perfection of that thing.', '1 Cor 13:4–5'),
  ('The things of God are permanent. God does not do temporal fixes. The work of Jesus in His death, burial and resurrection accomplished for us more than what we are experiencing now.', '1 Cor 13:10'),
  ('What you have inside of you is what the Father placed there to bless and impact the world. Don''t look outwardly to find who God made you to be. Look on the inside, there lies the treasure the world is eagerly awaiting.', '2 Cor 4:7'),
  ('Jesus came to give life more abundantly. There is a life that is overflowing, that gives life to all things around it. You are called to be a life-giving spirit.', '1 Cor 15:45'),
  ('You are the best at being you. Don''t try to be someone else. Who you are is only found in Christ, He is the one who defines you. You are a Heaven-class person, one of a kind.', 'Matt 5:16'),
  ('Grace is the divine enablement of God at work in a man. Grace is the person of Jesus Christ. You may not have what it takes, but you have WHO it takes.', 'Phil 4:13'),
  ('The highest call for any being is to be loved of God, and you, individually, are at the very centre of His affection. There is nothing that can ever separate you from the Love of God that is in Christ Jesus.', '1 John 3:1')
ON CONFLICT DO NOTHING;

-- -----------------------------------------------------------------------------
-- 7. SEED EXISTING DATA — Events
-- -----------------------------------------------------------------------------
INSERT INTO events (title, date, time_start, time_end, location, speaker, type, image_url) VALUES
  ('Administrating the Secrets of the Firmament', '2026-05-14', '2:00 PM', '5:00 PM', 'Emperors Crown Olympia, Lusaka', 'Rhema Nyambe', 'In Person', '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg'),
  ('Mapping His Footsteps', '2026-05-19', '2:00 PM', '5:00 PM', 'Emperors Crown Olympia, Lusaka', 'Rhema Nyambe', 'In Person', '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg'),
  ('Going Beyond', '2026-07-14', '2:00 PM', '5:00 PM', 'Emperors Crown Olympia, Lusaka', 'Rhema Nyambe', 'In Person', '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg'),
  ('In the Footsteps of the Ancient Ones', '2026-10-01', '2:00 PM', '5:00 PM', 'Emperors Crown Olympia, Lusaka', 'Rhema Nyambe', 'In Person', '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg'),
  ('Thunder Academy', '2026-11-01', '2:00 PM', '5:00 PM', 'Emperors Crown Olympia, Lusaka', 'Rhema Nyambe', 'In Person', '/images/vaishakh-pillai-CvWbabexORY-unsplash.jpg')
ON CONFLICT DO NOTHING;
