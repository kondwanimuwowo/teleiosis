-- Manifested Sons of God Class — seed upcoming fortnightly occurrences
-- Run in Supabase SQL Editor
-- Last class: 2026-04-18 | Pattern: every 14 days (fortnightly Saturday)

INSERT INTO events (
  title, date, time_start, time_end, location, speaker, type,
  is_recurring, recurrence_frequency, recurrence_interval_days, recurrence_day_of_week,
  recurring_label, description, image_url
)
VALUES
  (
    'Manifested Sons of God Class', '2026-05-02', '2:00 PM', '5:00 PM',
    'Emperors Crown Olympia, Along Chainama Road, Lusaka', 'Rhema Nyambe', 'In Person',
    true, 'fortnightly', 14, 'saturday',
    'Manifested Sons of God Class — Fortnightly Saturday',
    'A deep systematic teaching class held every two weeks, exploring the revelation of the Manifested Sons of God, Kingdom authority, and the fullness of Christ.',
    '/images/manifested-sons-of-god-class-light1.jpg'
  ),
  (
    'Manifested Sons of God Class', '2026-05-16', '2:00 PM', '5:00 PM',
    'Emperors Crown Olympia, Along Chainama Road, Lusaka', 'Rhema Nyambe', 'In Person',
    true, 'fortnightly', 14, 'saturday',
    'Manifested Sons of God Class — Fortnightly Saturday',
    'A deep systematic teaching class held every two weeks, exploring the revelation of the Manifested Sons of God, Kingdom authority, and the fullness of Christ.',
    '/images/manifested-sons-of-god-class-light1.jpg'
  ),
  (
    'Manifested Sons of God Class', '2026-05-30', '2:00 PM', '5:00 PM',
    'Emperors Crown Olympia, Along Chainama Road, Lusaka', 'Rhema Nyambe', 'In Person',
    true, 'fortnightly', 14, 'saturday',
    'Manifested Sons of God Class — Fortnightly Saturday',
    'A deep systematic teaching class held every two weeks, exploring the revelation of the Manifested Sons of God, Kingdom authority, and the fullness of Christ.',
    '/images/manifested-sons-of-god-class-light1.jpg'
  ),
  (
    'Manifested Sons of God Class', '2026-06-13', '2:00 PM', '5:00 PM',
    'Emperors Crown Olympia, Along Chainama Road, Lusaka', 'Rhema Nyambe', 'In Person',
    true, 'fortnightly', 14, 'saturday',
    'Manifested Sons of God Class — Fortnightly Saturday',
    'A deep systematic teaching class held every two weeks, exploring the revelation of the Manifested Sons of God, Kingdom authority, and the fullness of Christ.',
    '/images/manifested-sons-of-god-class-light1.jpg'
  )
ON CONFLICT DO NOTHING;
