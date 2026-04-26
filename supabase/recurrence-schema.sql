-- Recurrence pattern fields for events
-- Run in Supabase SQL Editor BEFORE manifested-sons-seed.sql

ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_frequency VARCHAR(50);
-- values: 'daily' | 'weekly' | 'fortnightly' | 'monthly' | 'custom'

ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_interval_days INT;
-- for 'custom': number of days between occurrences (e.g. 14)

ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_day_of_week VARCHAR(20);
-- e.g. 'saturday' — helps display and admin UI validation
