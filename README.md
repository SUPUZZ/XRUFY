# XRUFY Frontend (GitHub Pages)

该仓库已整理为**前端静态站点**：只保留 `web/`（Next.js 16 App Router），并通过外部 Feedback API 处理“订阅/反馈”。

## 本地开发

```bash
npm install
npm run dev
```

浏览器访问：`http://localhost:3000`

## 构建静态产物

项目使用 Next.js 静态导出（`output: "export"`）：

```bash
npm run build
```

构建完成后输出目录：`web/out/`  
该目录可直接用于 GitHub Pages 发布。

## Feedback API 配置

在 `web/.env.local`（或 CI 环境变量）里配置：

```env
NEXT_PUBLIC_FEEDBACK_API_BASE_URL=https://api.supuzz.cn
NEXT_PUBLIC_FEEDBACK_BRAND_NAME=xrufy
# 可选；不填时自动使用当前站点 hostname
# NEXT_PUBLIC_FEEDBACK_DOMAIN=www.xrufy.com
```

前端调用关系：

- 订阅表单 -> `POST /api/subscribe`
- 联系/反馈表单 -> `POST /api/feedback`

请求体租户维度使用 `brandName + domain`，符合多品牌隔离要求。

## GitHub Pages 说明

- `npm run build` 后，将 `web/out/` 作为静态文件目录发布。
- 若使用仓库子路径部署（例如 `https://<user>.github.io/<repo>/`），建议额外配置 `basePath` / `assetPrefix` 后再构建。
