-- Teleiosis Mandate - Real Teaching Data
-- Sourced from the actual audio library (public/teleiosis-audio-teachings)
-- Run this in Supabase SQL Editor
-- Replace 'https://cdn.teleiosis.org' with your actual Cloudflare R2 CDN URL after upload

-- ── CATEGORIES ─────────────────────────────────────────────────────────────
INSERT INTO teaching_categories (name, slug) VALUES
  ('Kingship',               'kingship'),
  ('Priesthood',             'priesthood'),
  ('The Christ Dimension',   'christ-dimension'),
  ('The God Frequency',      'god-frequency'),
  ('The Lamb of God',        'lamb-of-god'),
  ('The Ministry of the Spirit', 'ministry-of-spirit'),
  ('The Ministry of the Word',   'ministry-of-word'),
  ('Standalone',             'standalone')
ON CONFLICT (slug) DO NOTHING;

-- ── KINGSHIP SERIES ────────────────────────────────────────────────────────
INSERT INTO teachings (title, speaker, description, category_id, duration_minutes, published_date, audio_url, price, included_in_membership) VALUES
(
  'The Need for Kingship',
  'Rhema Nyambe',
  'Why does the believer need to understand kingship? This foundational teaching establishes the biblical basis for the royal identity of every son of God and the authority that comes with it.',
  (SELECT id FROM teaching_categories WHERE slug = 'kingship' LIMIT 1),
  43,
  '2024-06-22T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Kingship/Teleiosis Manifested Sons Class - The Need for Kingship 22-06-24.mp3',
  NULL,
  true
),
(
  'The Stance of a King',
  'Rhema Nyambe',
  'How does a king carry himself? This teaching covers the posture, mindset, and spiritual bearing of a believer walking in their royal identity in Christ.',
  (SELECT id FROM teaching_categories WHERE slug = 'kingship' LIMIT 1),
  48,
  '2024-07-20T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Kingship/Teleiosis Manifested Sons Class -The Stance of a King - 20-07-24.mp3',
  NULL,
  true
),
(
  'Training for Reigning: The Doctrine of Righteousness',
  'Rhema Nyambe',
  'Righteousness is not just a legal standing — it is the foundation of all reigning in life. This teaching unpacks how righteousness empowers us to exercise Kingdom authority with boldness and accuracy.',
  (SELECT id FROM teaching_categories WHERE slug = 'kingship' LIMIT 1),
  81,
  '2024-07-06T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Kingship/Teleiosis Manifested Sons Class -Training for Reigning - The Doctrine of Righteousness - 06-07-24.mp3',
  NULL,
  true
),
(
  'Training for Reigning: A Kingdom of Words',
  'Rhema Nyambe',
  'Words move the world more than we know. In creation God used words, and set a principle in motion that words will be the carriers of creative power. This teaching trains believers to speak as kings.',
  (SELECT id FROM teaching_categories WHERE slug = 'kingship' LIMIT 1),
  71,
  '2024-08-17T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Kingship/Teleiosis Manifested Sons Class -Training for Reigning - A Kingdom of Words -17-08-24.mp3',
  NULL,
  true
),

-- ── PRIESTHOOD SERIES ──────────────────────────────────────────────────────
(
  'Priesthood Orders and Responsibilities — Part 2',
  'Rhema Nyambe',
  'Continuing the exploration of priestly orders in Scripture and the practical responsibilities of the believer as a royal priest interceding for the world.',
  (SELECT id FROM teaching_categories WHERE slug = 'priesthood' LIMIT 1),
  47,
  '2024-03-02T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Priesthood/Teleiosis Manifested Sons Class -Priesthood Orders and Responsibilities Part 2 02-03-24.mp3',
  NULL,
  true
),
(
  'Priesthood Orders and Responsibilities — Part 3',
  'Rhema Nyambe',
  'The final teaching in the Priesthood series — drawing together orders, intercession, and the practical outworking of the believer''s priestly calling in the earth.',
  (SELECT id FROM teaching_categories WHERE slug = 'priesthood' LIMIT 1),
  49,
  '2024-03-16T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Priesthood/Teleiosis Manifested Sons Class -Priesthood Orders and Responsibilities Part 3 16-03-24.mp3',
  NULL,
  true
),

-- ── THE CHRIST DIMENSION SERIES ────────────────────────────────────────────
(
  'In Reality',
  'Rhema Nyambe',
  'What is the reality of Christ in you? This teaching cuts through religious theory to the lived, practical experience of the Christ life — going beyond doctrine into the actual experience of the new creation.',
  (SELECT id FROM teaching_categories WHERE slug = 'christ-dimension' LIMIT 1),
  73,
  '2023-07-22T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Christ Dimension/Teleiosis Manifested Sons Class - In Reality 22-07-23.mp3',
  NULL,
  true
),
(
  'Accessing the Christ Dimensions',
  'Rhema Nyambe',
  'Christ has dimensions — depths of reality that go beyond surface Christianity. This teaching explores how to access and move in the fullness of who Christ is within you.',
  (SELECT id FROM teaching_categories WHERE slug = 'christ-dimension' LIMIT 1),
  77,
  '2023-09-02T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Christ Dimension/Teleiosis Manifested Sons Class - Accessig the Christ Dimensions 02-09-23.mp3',
  NULL,
  true
),
(
  'The Christ Dimension: The Spirit of Truth',
  'Rhema Nyambe',
  'The Spirit of Truth leads us into all truth — not just factual information, but the reality of Christ. This teaching explores the Spirit''s role in opening the Christ dimension to every believer.',
  (SELECT id FROM teaching_categories WHERE slug = 'christ-dimension' LIMIT 1),
  86,
  '2023-09-16T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Christ Dimension/Teleiosis Manifested Sons Class - The Christ Dimension- The Spirit of Truth 16-09-23.mp3',
  NULL,
  true
),

-- ── THE GOD FREQUENCY 2025 ─────────────────────────────────────────────────
(
  'The God Frequency — Part 1',
  'Rhema Nyambe',
  'Everything in the universe operates on a frequency. God has a frequency — and believers are designed to be tuned to it. Part 1 lays the foundation for understanding and accessing the God frequency in everyday life.',
  (SELECT id FROM teaching_categories WHERE slug = 'god-frequency' LIMIT 1),
  71,
  '2025-01-04T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The God Frequency 2025/Teleiosis Manifested Sons Class - The God Frequency Part 1 04-01-25.mp3',
  NULL,
  true
),
(
  'The God Frequency — Part 2',
  'Rhema Nyambe',
  'Building on Part 1, this teaching goes deeper into practical alignment with the God frequency — how to stay tuned, how to transmit, and what it looks like to move in resonance with Heaven.',
  (SELECT id FROM teaching_categories WHERE slug = 'god-frequency' LIMIT 1),
  60,
  '2025-01-18T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The God Frequency 2025/Teleiosis Manifested Sons Class - The God Frequency Part 2 18-01-25.mp3',
  NULL,
  true
),

-- ── THE LAMB OF GOD 2026 ───────────────────────────────────────────────────
(
  'The Lamb of God: God''s Sacrifice — Part 1',
  'Rhema Nyambe',
  'The most recent series from the Manifested Sons Class. What does the sacrifice of the Lamb truly accomplish? This teaching goes beyond traditional atonement theology to the full scope of what the blood of the Lamb provides for every believer.',
  (SELECT id FROM teaching_categories WHERE slug = 'lamb-of-god' LIMIT 1),
  58,
  '2026-01-10T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Lamb of God/Teleiosis Manifested Sons Class - The Lamb of God (God_s Sacrifice)  Part 1 10-01-26.mp3',
  NULL,
  true
),
(
  'The Lamb of God: God''s Sacrifice — Part 2',
  'Rhema Nyambe',
  'Continuing the revelation of the Lamb — Part 2 explores the ongoing, present-tense work of the sacrifice, and how believers appropriate its fullness in their daily lives and Kingdom walk.',
  (SELECT id FROM teaching_categories WHERE slug = 'lamb-of-god' LIMIT 1),
  62,
  '2026-01-24T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Lamb of God/Teleiosis Manifested Sons Class - The Lamb of God (God_s Sacrifice)  Part 2 24-01-26.mp3',
  NULL,
  true
),

-- ── THE MINISTRY OF THE SPIRIT 2025 ────────────────────────────────────────
(
  'The Ministry of the Spirit — Part 1',
  'Rhema Nyambe',
  'The Holy Spirit is not passive — He is an active Spirit, at work in you right now on the inside. Part 1 introduces the nature, person, and present ministry of the Holy Spirit to every believer.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-spirit' LIMIT 1),
  32,
  '2025-09-13T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Spirit/Teleiosis Manifested Sons Class - The Ministry of the Spirit Part 1 13-9-25.mp3',
  NULL,
  true
),
(
  'The Ministry of the Spirit — Part 2',
  'Rhema Nyambe',
  'The Spirit''s ministry goes beyond the gifts and into the very forming of Christ in us. Part 2 explores how the Holy Spirit co-labours with the believer to produce the fullness of God.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-spirit' LIMIT 1),
  56,
  '2025-09-27T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Spirit/Teleiosis Manifested Sons Class - The Ministry of the Spirit Part 2 27-09-25.mp3',
  NULL,
  true
),
(
  'The Ministry of the Spirit — Part 3',
  'Rhema Nyambe',
  'The conclusion of the Spirit series — bringing together all that the Spirit does and equipping believers to yield fully to His ongoing transforming work.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-spirit' LIMIT 1),
  48,
  '2025-09-11T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Spirit/Teleiosis Manifested Sons Class - The Ministry of the Spirit Part 3 11-09-25.mp3',
  NULL,
  true
),

-- ── THE MINISTRY OF THE WORD 2025 ──────────────────────────────────────────
(
  'Ministry of the Word — Part 1',
  'Rhema Nyambe',
  'The Word of God is not just a book — it is a living force. Part 1 introduces the ministry of the Word, how it functions, and the believer''s call to handle it with precision and power.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-word' LIMIT 1),
  54,
  '2025-06-07T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Word 2025/Teleiosis Manifested Sons Class - Ministry of the Word Part 1 07-06-25.mp3',
  NULL,
  true
),
(
  'Ministry of the Word — Part 3',
  'Rhema Nyambe',
  'Continuing the deep exploration of how the Word functions as the primary instrument of Kingdom authority, transformation, and spiritual warfare.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-word' LIMIT 1),
  52,
  '2025-07-05T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Word 2025/Teleiosis Manifested Sons Class - Ministry of the Word Part 3 05-07-25.mp3',
  NULL,
  true
),
(
  'Ministry of the Word — Part 6: Prophecy as a Weapon',
  'Rhema Nyambe',
  'Prophecy is not just encouragement — it is a weapon. This teaching equips believers to wield the prophetic word strategically, accurately, and with Kingdom authority in spiritual warfare.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-word' LIMIT 1),
  23,
  '2025-08-16T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Word 2025/Teleiosis Manifested Sons Class - The Ministry of the Word Part 6 Prophecy as a weapon 16-08-25.mp3',
  NULL,
  true
),
(
  'Ministry of the Word — Part 5',
  'Rhema Nyambe',
  'A comprehensive session covering the advanced dimensions of the Word''s ministry — how it builds, equips, and matures the believer into the fullness of Christ.',
  (SELECT id FROM teaching_categories WHERE slug = 'ministry-of-word' LIMIT 1),
  74,
  '2025-09-02T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/The Ministry of the Word 2025/Teleiosis Manifested Sons Class - Mnistry of the Word Part 5 02-09-25.mp3',
  NULL,
  true
),

-- ── STANDALONE TEACHINGS ───────────────────────────────────────────────────
(
  'The Dimensions of Light: The Day and The Night',
  'Rhema Nyambe',
  'A rich exploration of light and darkness as spiritual realities — what it means to walk as children of the day, and how the dimensions of God''s light manifest in the life of a believer.',
  (SELECT id FROM teaching_categories WHERE slug = 'standalone' LIMIT 1),
  84,
  '2023-04-09T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Teleiosis Mandate Rhema Nyambe - The Dimensions Of Light- The Day and The Night 09-04-23.mp3',
  NULL,
  true
),
(
  'The Energy of God — Part 2',
  'Rhema Nyambe',
  'God''s energy is not a metaphor — it is the very dunamis power that raised Christ from the dead and now dwells in every believer. Part 2 explores how to access, release, and walk in this divine energy.',
  (SELECT id FROM teaching_categories WHERE slug = 'standalone' LIMIT 1),
  59,
  '2023-11-25T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Teleiosis Ministry Rhema Nyambe - The Energy of God Part 2 25-11-23.mp3',
  NULL,
  true
),
(
  'Born Free',
  'Rhema Nyambe',
  'You were not born into bondage — you were born free. This teaching unpacks the freedom that is the birthright of every son of God, and how to walk in that freedom with boldness and authority.',
  (SELECT id FROM teaching_categories WHERE slug = 'standalone' LIMIT 1),
  55,
  '2023-07-01T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Teleiosis Manifested Sons Class - Born Free 01-07-23.mp3',
  NULL,
  true
),
(
  'Christ the Door',
  'Rhema Nyambe',
  'Jesus declared "I am the door." This teaching explores what that means dimensionally — how Christ as the door opens realms, dimensions, and Kingdom realities to those who enter through Him.',
  (SELECT id FROM teaching_categories WHERE slug = 'standalone' LIMIT 1),
  55,
  '2023-08-05T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Teleiosis Manifested Sons Class - Christ the Door 05-08-23.mp3',
  NULL,
  true
),
(
  'Accessing the Knowledge of God: The Rapture',
  'Rhema Nyambe',
  'A 2.5-hour deep teaching on the Rapture — not as an escape theology, but as the fullness of the knowledge of God accessed by the mature sons. One of the longest and most comprehensive teachings in the library.',
  (SELECT id FROM teaching_categories WHERE slug = 'standalone' LIMIT 1),
  150,
  '2025-08-29T14:00:00Z',
  'https://cdn.teleiosis.org/teachings/Teleiosis Manifested Sons Class - Accessing the Knowledge of God - The Rapture 29-08-25.mp3',
  NULL,
  true
);

-- ── VERIFY ─────────────────────────────────────────────────────────────────
SELECT COUNT(*) as total_teachings FROM teachings;
SELECT
  t.title,
  t.speaker,
  t.duration_minutes,
  tc.name as category,
  t.included_in_membership
FROM teachings t
JOIN teaching_categories tc ON t.category_id = tc.id
ORDER BY tc.name, t.published_date ASC;
