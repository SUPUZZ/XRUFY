import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "newsletter-signups.jsonl");

/**
 * When neither Web3Forms nor Postgres is configured, append signups to a local file
 * so dev / small VPS installs still capture emails.
 */
export async function appendNewsletterSignupLocal(email: string): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ email, at: new Date().toISOString() }) + "\n";
  await fs.appendFile(SIGNUPS_FILE, line, "utf8");
}

export type LocalNewsletterLine = { email: string; at: string };

/** Newest lines last in file; returns chronological order (oldest first). */
export async function readNewsletterSignupsLocal(): Promise<LocalNewsletterLine[]> {
  try {
    const raw = await fs.readFile(SIGNUPS_FILE, "utf8");
    const lines = raw.split("\n").filter((l) => l.trim().length > 0);
    const out: LocalNewsletterLine[] = [];
    for (const line of lines) {
      try {
        const o = JSON.parse(line) as LocalNewsletterLine;
        if (o && typeof o.email === "string" && typeof o.at === "string") out.push(o);
      } catch {
        /* skip bad line */
      }
    }
    return out;
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return [];
    throw e;
  }
}
