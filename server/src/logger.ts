import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";

const here = path.dirname(fileURLToPath(import.meta.url));

/** Always under `server/logs/` (next to `src/` / `dist/`) so cwd does not matter. */
const defaultFile = path.join(here, "..", "logs", "app.jsonl");

function ensureDirForFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const level = (process.env.LOG_LEVEL ?? "info") as pino.Level;
const disableFile =
  process.env.LOG_DISABLE_FILE === "1" || process.env.LOG_DISABLE_FILE === "true";

const filePath =
  process.env.LOG_FILE && process.env.LOG_FILE.trim().length > 0
    ? path.isAbsolute(process.env.LOG_FILE)
      ? process.env.LOG_FILE
      : path.join(process.cwd(), process.env.LOG_FILE)
    : defaultFile;

const streams: pino.StreamEntry[] = [{ level, stream: process.stdout }];

if (!disableFile) {
  ensureDirForFile(filePath);
  streams.push({ level, stream: pino.destination({ dest: filePath, sync: false }) });
}

export const logger = pino(
  {
    level,
    base: { service: "xrufy-server" },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams),
);
