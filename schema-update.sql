-- ============================================================
--  AnonQ — Schema Update: blocked_ips
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

CREATE TABLE IF NOT EXISTS blocked_ips (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username    TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  ip          TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(username, ip)
);

CREATE INDEX IF NOT EXISTS blocked_ips_username_idx ON blocked_ips (username);
ALTER TABLE blocked_ips DISABLE ROW LEVEL SECURITY;

-- Add sender_ip to questions (for blocking)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS sender_ip TEXT DEFAULT '';
