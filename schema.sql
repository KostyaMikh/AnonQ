-- ============================================================
--  AnonQ — Supabase Schema
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      TEXT UNIQUE NOT NULL,
  display_name  TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  phone         TEXT DEFAULT '',
  telegram      TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Lowercase index for case-insensitive phone/telegram lookups
CREATE INDEX IF NOT EXISTS users_phone_idx    ON users (phone);
CREATE INDEX IF NOT EXISTS users_telegram_idx ON users (LOWER(telegram));

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_username  TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
  text         TEXT NOT NULL,
  answer       TEXT DEFAULT NULL,
  answered_at  TIMESTAMPTZ DEFAULT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS questions_to_username_idx ON questions (to_username);

-- Disable Row Level Security (we use service role key from serverless functions)
ALTER TABLE users     DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
