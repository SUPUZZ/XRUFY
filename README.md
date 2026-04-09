# XRUFY monorepo

Two packages, one repo:

| Folder | Role |
|--------|------|
| **`web/`** | Next.js 16 storefront (App Router, Tailwind, content in `web/content/blog`). |
| **`server/`** | Node API (Express): `POST /api/forms`, `GET /health`. Reads `WEB3FORMS_ACCESS_KEY` from `server/.env`. |

The browser still calls **`/api/forms`** on the web origin. **`web/next.config.ts`** rewrites that path to **`SERVER_ORIGIN`** (default `http://127.0.0.1:4000`), so you do not need CORS for the site forms.

### 启动方式与浏览器地址（易混）

| 启动命令 | 网站在浏览器里打开 | 说明 |
|----------|-------------------|------|
| **`npm run docker:up`** | **http://localhost:3000** | 生产镜像：postgres + api + web；端口见 `docker.env` 的 **`WEB_PORT`**。 |
| **`npm run docker:dev`** | **http://localhost:3001**（默认） | 容器里跑 `next dev`；**本机 3001 → 容器内 3000**，所以**不是** 3000。若要 **3000**：在 `docker.env` 写 **`DEV_WEB_PORT=3000`** 且本机 3000 未被占用。 |
| **`npm install` 后 `npm run dev`** | **http://localhost:3000** | 不经过 Docker；需本机 Node，数据库可接 Docker 里的库 `127.0.0.1:5433`。 |

## Run everything with Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) running (engine must be up).

### Docker Hub 镜像加速（国内网络，无需注册 hub.docker.com）

拉取 `postgres:16-alpine`、`node:22-alpine` 等镜像时走加速源即可，**不必**打开 [Docker Hub 注册页](https://hub.docker.com/signup)。

1. 打开 **Docker Desktop** → **Settings（设置）** → **Docker Engine**。
2. 在 JSON 里加入 **`registry-mirrors`**（若已有其它配置，只合并这一段，不要删掉原有键）。可参考仓库里的 **`docker-daemon-mirror.example.json`**：

```json
"registry-mirrors": [
  "https://docker.m.daocloud.io"
]
```

3. 点击 **Apply & restart**，等待 Docker 重启完成。
4. 可选：在 [阿里云容器镜像服务](https://cr.console.aliyun.com/) 登录后获取「镜像加速器」专属地址，把上面的 URL 换成你的地址（通常更稳）。

然后执行：

```bash
npm install
npm run docker:up    # creates docker.env from example if missing, then builds & starts postgres + api + web
```

- Site: **http://localhost:3000** (change `WEB_PORT` in `docker.env` if needed).
- Postgres is exposed on the host as **`127.0.0.1:5433`** by default (`POSTGRES_PUBLISH_PORT` in `docker.env`) so it does not fight with a local PostgreSQL on 5432.
- First container init runs **`deploy/init-db.sql`** (table `form_submissions`). If you change the Drizzle schema later: `npm run docker:migrate`.
- Stop: `npm run docker:down`. Logs: `npm run docker:logs`.
- If you see **`pipe/docker_engine`** / “cannot find the file”: Docker Desktop is not running or still starting—open it from the Start menu, wait until the engine is **Running**, then run `docker info` to verify before `npm run docker:up`.
- If pull still hits **`registry-1.docker.io`** / **`HTTP CONNECT: unexpected EOF`**: compose defaults already use **`docker.m.daocloud.io/library/...`** — run `docker compose --env-file docker.env config` and confirm **`postgres.image`** is **not** `postgres:16-alpine` alone. If an old **`docker.env`** sets `POSTGRES_IMAGE=postgres:16-alpine`, remove that line or switch to the DaoCloud paths from **`docker.env.example`**. Also check Docker Desktop → **Settings → Resources → Proxies** (disable manual proxy or bypass registry hosts).

### 在容器里跑开发（热更新）

在同一套 Compose 里启动 **PostgreSQL + 单容器 dev**（挂载仓库根目录，容器内执行 `npm ci` + `npm run dev:docker`）。**默认把站点映射到本机 3001**（API 映射 **4001**），避免与本机 **`npm run dev`** 或 **`docker:up`** 占用的 **3000 / 4000** 冲突。需要 **3000** 时在 **`docker.env`** 设置 **`DEV_WEB_PORT=3000`**（并确保本机该端口空闲）。

```bash
npm run docker:dev       # 拉起 postgres（若未起）+ dev
npm run docker:dev:logs  # 跟随 dev 日志
npm run docker:dev:down  # 只停 dev 容器（postgres 仍可留给别的用途）
```

浏览器：**http://localhost:3001**（或 `docker.env` 里的 **`DEV_WEB_PORT`**）。数据库仍为本机 **`127.0.0.1:5433`**（`POSTGRES_PUBLISH_PORT`）。

**若浏览器提示连接失败：** 先看日志 **`npm run docker:dev:logs`**（持续跟随 `dev` 容器标准输出）。第一次启动时容器内要先跑完 **`npm ci`**（可能几分钟），日志里出现 Next 的 **Ready** / **Local:** 之后再访问；此前端口虽已映射，但应用尚未监听。

**若日志里 Next 报 lockfile / Permission denied：** 仓库已用命名卷挂载 **`web/.next`**，并去掉误伤 Next 的 **`PORT=4000`**。改完后请 **`docker compose --env-file docker.env --profile dev up -d --build dev`** 或再执行 **`npm run docker:dev`** 重建并启动。仍失败时把 **`web/package.json`** 里 **`dev:docker`** 改成带 **`--webpack`** 再试。

## Local dev without Docker (optional)

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

- **Docker stack**: `docker.env` (gitignored) — created from **`docker.env.example`** on first `npm run docker:up`.
- **npm + local API**: copy **`server/.env.example`** → **`server/.env`**. If Postgres runs only via Docker above, set `DATABASE_URL=postgresql://xrufy:YOUR_PASSWORD@127.0.0.1:5433/xrufy` (port **5433** matches default `POSTGRES_PUBLISH_PORT`).
- **Hosted Postgres** (Neon, Supabase, etc.): set `DATABASE_URL` in `server/.env` as usual.
- **`WEB3FORMS_ACCESS_KEY`**: optional; if unset but `DATABASE_URL` is set, forms still save to the DB and return `{ ok: true }`.
- **Newsletter only**: if neither DB nor Web3 is configured, signups append to **`server/data/newsletter-signups.jsonl`** (gitignored) so local dev works. For real email delivery, add Web3Forms or read that file / use DB.
- Optional **`web/.env.local`**: `SERVER_ORIGIN` if the API is not on `127.0.0.1:4000`.
- **Admin (`/admin`)**: set **`ADMIN_PASSWORD`** on the API ( **`server/.env`** or **`docker.env`** for Compose). Open **`http://localhost:3000/admin`** (or your `WEB_PORT` / `DEV_WEB_PORT`) and sign in to browse **`form_submissions`** (contact, feedback, subscribe) and **`server/data/newsletter-signups.jsonl`** when used. Optional **`ADMIN_SESSION_SECRET`** for cookie signing (defaults to a derivative of `ADMIN_PASSWORD`).
- **Homepage SEO (Google / social / Amazon funnel)**: set **`NEXT_PUBLIC_SITE_URL=https://xrufy.com`** in **`web/.env`** when deploying (see **`web/.env.example`**). If unset, the app falls back to **`https://xrufy.com`** (or **`VERCEL_URL`** on Vercel). Structured data on `/` describes the product and links the **Amazon** offer (`AMAZON_PRODUCT_URL` in code).

## Legacy

Static HTML from the first iteration lives in **`_legacy/`** (not part of the build).
