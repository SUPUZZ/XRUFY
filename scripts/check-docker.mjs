import { spawnSync } from "node:child_process";

const r = spawnSync("docker", ["info"], {
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"],
});

if (r.status !== 0) {
  const err = (r.stderr || r.stdout || "").trim();
  console.error(`
无法连接 Docker 引擎（常见原因：Docker Desktop 未启动或未完全就绪）。

请在本机依次操作：
  1. 从开始菜单打开「Docker Desktop」
  2. 等待系统托盘里的鲸鱼图标变为 Running / 无 “Starting…”
  3. 在新终端执行：docker info   （应能打印 Server 信息）
  4. 再执行：npm run docker:up

若已安装但未启动引擎，错误里常出现：npipe://./pipe/docker_engine
${err ? `\nDocker 输出片段：\n${err.slice(0, 500)}\n` : ""}`);
  process.exit(1);
}
