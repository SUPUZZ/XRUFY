# XRUFY monorepo

Two packages, one repo:

| Folder | Role |
|--------|------|
| **`web/`** | Next.js 16 storefront (App Router, Tailwind, content in `web/content/blog`). |
| **`server/`** | Node API (Express): `POST /api/forms`, `GET /health`. Reads `WEB3FORMS_ACCESS_KEY` from `server/.env`. |

The browser still calls **`/api/forms`** on the web origin. **`web/next.config.ts`** rewrites that path to **`SERVER_ORIGIN`** (default `http://127.0.0.1:4000`), so you do not need CORS for the site forms.

## Scripts (run from repo root)

```bash
npm install          # all workspaces
npm run dev          # web :3000 + server :4000 (concurrently)
npm run dev:web      # only Next.js
npm run dev:server   # only API
npm run build        # server tsc, then next build
npm run start        # production: both (use after build)
npm run lint         # ESLint — web
npm run lint:server  # ESLint — server
```

## Configuration

- Copy **`server/.env.example`** → **`server/.env`**.
- **PostgreSQL**: from repo root run `docker compose up -d`, then `npm run db:push -w @xrufy/server` to create tables (`form_submissions`). Or use any hosted Postgres (Neon, Supabase, etc.) and set `DATABASE_URL`.
- **`WEB3FORMS_ACCESS_KEY`**: optional; if unset but `DATABASE_URL` is set, forms still save to the DB and return `{ ok: true }`.
- **Newsletter only**: if neither DB nor Web3 is configured, signups append to **`server/data/newsletter-signups.jsonl`** (gitignored) so local dev works. For real email delivery, add Web3Forms or read that file / use DB.
- Optional **`web/.env.local`**: `SERVER_ORIGIN` if the API is not on `127.0.0.1:4000`.

## Legacy

Static HTML from the first iteration lives in **`_legacy/`** (not part of the build).
