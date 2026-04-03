-- First-time PostgreSQL init (docker-entrypoint-initdb.d).
-- Keep in sync with server/src/db/schema.ts (form_submissions).

CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  form_type VARCHAR(32) NOT NULL,
  email VARCHAR(320),
  name VARCHAR(200),
  topic VARCHAR(64),
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
