-- Run as PostgreSQL superuser (e.g. psql -U postgres) when DATABASE_URL user/db do not exist yet.
-- Then: npm run db:push -w @xrufy/server

CREATE USER xrufy WITH PASSWORD 'xrufy';
CREATE DATABASE xrufy OWNER xrufy;
GRANT ALL PRIVILEGES ON DATABASE xrufy TO xrufy;
