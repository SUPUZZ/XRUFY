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

## 多语言内容维护

全站支持英语、繁体中文、西班牙语、日语、德语、葡萄牙语和法语。英文保持原有根目录地址，其余语言分别使用 `/zh-Hant/`、`/es/`、`/ja/`、`/de/`、`/pt/`、`/fr/`。

导航栏可切换当前页面的语言，并保留查询参数和页面锚点。网站会记住用户主动选择的语言，下次访问根首页时使用该语言；直接访问文章等链接时尊重链接自身的语言。

- 英文页面位于 `web/src/app/(english)/`，英文文章位于 `web/content/blog/`。
- 六种翻译内容和表单文案位于 `web/src/lib/locales/`。
- 添加文章时，同步更新六份词典及 `web/src/lib/translations.ts` 中的文章和页面清单，并在 `LocalizedSite.tsx` 中维护封面、日期映射。
- 页面会生成独立 canonical、多语言 hreflang、分享信息和结构化数据；站点地图由 `web/src/app/sitemap.ts` 生成。

构建后运行多语言检查，校验导出页面、语言标记、链接、文章结构化数据和站点地图：

```bash
npm run check:localization -w web
```

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

## GitHub Pages 说明（xrufy.com）

仓库已提供自动部署工作流：`.github/workflows/deploy-pages.yml`

- 推送到 `main` 后会自动构建并发布 `web/out/` 到 GitHub Pages。
- 构建环境固定为：
  - `NEXT_PUBLIC_SITE_URL=https://xrufy.com`
  - `NEXT_PUBLIC_FEEDBACK_API_BASE_URL=https://api.supuzz.cn`
  - `NEXT_PUBLIC_FEEDBACK_BRAND_NAME=xrufy`
  - `NEXT_PUBLIC_BASE_PATH=""`（根域名部署不走子路径）
- `web/public/CNAME` 已设置为 `xrufy.com`，构建后会自动出现在发布产物根目录。

### 你在 GitHub 上需要确认

1. 仓库 `Settings -> Pages` 的 Source 选择 `GitHub Actions`。
2. Custom domain 填 `xrufy.com`，并开启 HTTPS。
3. DNS 提供商侧将 `xrufy.com` 正确解析到 GitHub Pages（A/AAAA 或 CNAME flattening）。
