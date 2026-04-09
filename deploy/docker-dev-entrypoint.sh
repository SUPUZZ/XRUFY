#!/bin/sh
set -e
cd /app
if [ ! -x node_modules/.bin/concurrently ]; then
  echo "[xrufy-dev] 首次启动正在执行 npm ci（视网络需数分钟）。完成前本机映射端口无服务，访问会失败；请另开终端执行: npm run docker:dev:logs"
  npm ci
  echo "[xrufy-dev] npm ci 完成，正在启动 Next + API..."
fi
exec npm run dev:docker
