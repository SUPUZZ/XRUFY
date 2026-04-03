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
