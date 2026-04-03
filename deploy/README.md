# XRUFY 服务器部署（Docker）

## 包含内容

| 文件 | 说明 |
|------|------|
| `docker-compose.yml` | PostgreSQL + API + Next.js |
| `Dockerfile.api` / `Dockerfile.web` | 生产镜像构建 |
| `init-db.sql` | 首次初始化数据库表（与 `server/src/db/schema.ts` 保持一致） |
| `.env.example` | 环境变量模板 |
| `nginx.example.conf` | 可选：HTTPS 反代示例 |

## 要求

- Docker 24+ 与 Docker Compose v2
- 服务器可访问公网（若需证书与域名）

## 部署步骤

1. 将本仓库放到服务器（或 CI 构建后只传镜像与 compose）。

2. 进入本目录并配置环境变量：

   ```bash
   cd deploy
   cp .env.example .env
   # 编辑 .env：务必修改 POSTGRES_PASSWORD
   ```

3. 构建并启动：

   ```bash
   docker compose up -d --build
   ```

4. 访问：`http://<服务器IP>:3000`（若改了 `WEB_PORT` 则用对应端口）。

表单提交走站点同源 `/api/forms`，由 Next 反写到容器内 `http://api:4000`，**无需**把 API 端口暴露到公网。

## 已有数据卷、但改了数据库表结构时

`init-db.sql` 只在**第一次**初始化数据目录时执行。之后若改了 `server/src/db/schema.ts`，任选其一：

- 在能访问数据库的机器上：`DATABASE_URL=postgresql://... npm run db:push -w @xrufy/server`
- 或在 `deploy` 目录执行（需本机 compose 已创建过网络，且 postgres 在跑）：

  ```bash
  docker compose --profile migrate run --rm db-push
  ```

## HTTPS

在主机上安装 Nginx/Caddy 等，将 443 反代到 `127.0.0.1:WEB_PORT`，可参考 `nginx.example.conf`。

## 环境变量说明

- **POSTGRES_***：数据库账户与库名；与 `DATABASE_URL` 中一致。
- **WEB3FORMS_ACCESS_KEY**：可选；不填时只要数据库可用，表单仍会写入 `form_submissions`。
- **WEB_PORT**：宿主机映射到 Next 的端口。

## 健康检查

- API：`docker compose exec api wget -qO- http://127.0.0.1:4000/health`（镜像若无 wget，可用 `docker run --rm --network container:... curlimages/curl ...`）
