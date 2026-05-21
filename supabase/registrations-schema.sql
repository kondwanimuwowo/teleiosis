CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(500) NOT NULL,
  email VARCHAR(500) NOT NULL,
  phone VARCHAR(100),
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'general', -- 'general' | 'event'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS registrations_event_id_idx ON registrations(event_id);
CREATE INDEX IF NOT EXISTS registrations_type_idx ON registrations(type);
CREATE INDEX IF NOT EXISTS registrations_created_at_idx ON registrations(created_at DESC);

-- RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Admin can read all
CREATE POLICY "Admin reads registrations" ON registrations
  FOR SELECT USING (auth.role() = 'service_role');

-- Anyone can insert (public registration form)
CREATE POLICY "Public can register" ON registrations
  FOR INSERT WITH CHECK (true);
