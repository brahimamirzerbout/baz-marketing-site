-- BAZ Marketing Agency — initial schema
-- Extracted from lib/db.ts bootstrap(), adapted for PostgreSQL/Supabase.

CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  password_hash TEXT,
  role        TEXT NOT NULL DEFAULT 'member',
  team        TEXT,
  initials    TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#ff3b2f',
  created_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS orgs (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  kind        TEXT NOT NULL DEFAULT 'agency',
  plan        TEXT NOT NULL DEFAULT 'starter',
  notes       TEXT,
  created_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS leads (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT,
  website     TEXT,
  phone       TEXT,
  budget      TEXT,
  message     TEXT,
  source      TEXT NOT NULL DEFAULT 'marketing_site',
  status      TEXT NOT NULL DEFAULT 'new',
  score       INTEGER DEFAULT 0,
  owner       TEXT,
  service     TEXT NOT NULL DEFAULT '',
  intent      TEXT NOT NULL DEFAULT '',
  created_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000),
  updated_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);

CREATE TABLE IF NOT EXISTS customers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  contact_name TEXT,
  email       TEXT NOT NULL,
  phone       TEXT,
  tier        TEXT NOT NULL DEFAULT 'growth',
  mrr         INTEGER DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'active',
  notes       TEXT,
  owner       TEXT,
  created_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  tier        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active',
  mrr         INTEGER NOT NULL DEFAULT 0,
  start_date  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000),
  end_date    BIGINT
);

CREATE TABLE IF NOT EXISTS invoices (
  id          TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  amount      INTEGER NOT NULL,
  status      TEXT NOT NULL DEFAULT 'draft',
  issued_at   BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000),
  paid_at     BIGINT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS projects (
  id          TEXT PRIMARY KEY,
  customer_id TEXT REFERENCES customers(id) ON DELETE SET NULL,
  name        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active',
  scope       TEXT,
  deliverables TEXT,
  started_at  BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000),
  completed_at BIGINT
);

CREATE TABLE IF NOT EXISTS feedback (
  id           TEXT PRIMARY KEY,
  request_id   TEXT,
  customer_id  TEXT REFERENCES customers(id) ON DELETE SET NULL,
  ratings_json TEXT NOT NULL,
  overall      INTEGER NOT NULL,
  comment      TEXT,
  name         TEXT,
  role         TEXT,
  company      TEXT,
  public_ok    INTEGER DEFAULT 0,
  created_at   BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS feedback_requests (
  id           TEXT PRIMARY KEY,
  customer_id  TEXT REFERENCES customers(id) ON DELETE SET NULL,
  token        TEXT UNIQUE NOT NULL,
  requested_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000),
  submitted_at BIGINT,
  kind         TEXT NOT NULL DEFAULT 'quarterly'
);

CREATE TABLE IF NOT EXISTS ai_jobs (
  id           TEXT PRIMARY KEY,
  user_id      TEXT,
  kind         TEXT NOT NULL,
  provider     TEXT,
  model        TEXT,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  cost_usd     REAL DEFAULT 0,
  status       TEXT NOT NULL DEFAULT 'ok',
  created_at   BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS sessions (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT UNIQUE NOT NULL,
  expires_at BIGINT NOT NULL,
  created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

CREATE TABLE IF NOT EXISTS audit (
  id         BIGSERIAL PRIMARY KEY,
  actor      TEXT,
  action     TEXT NOT NULL,
  target     TEXT,
  meta       TEXT,
  created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW())::BIGINT * 1000)
);

-- Seed owner user (password: changeme-on-first-login)
INSERT INTO users (id, email, name, password_hash, role, initials, color)
VALUES (
  'owner_001',
  'owner@baz.agency',
  'BAZ Owner',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'owner',
  'BO',
  '#E7C274'
) ON CONFLICT (id) DO NOTHING;
