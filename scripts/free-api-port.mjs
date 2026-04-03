/**
 * Frees the API dev port (default 4000) so `npm run dev` can start the server.
 * Cross-platform (Windows / macOS / Linux). Safe to run when nothing is listening.
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const killPort = require("kill-port");

const verbose = process.argv.includes("--verbose");
const port = Number(process.env.XRUFY_API_PORT || process.env.PORT || 4000);

if (!Number.isFinite(port) || port < 1) {
  console.error("[xrufy] Invalid port for free-api-port.");
  process.exit(1);
}

killPort(port)
  .then(() => {
    if (verbose) console.log(`[xrufy] Freed TCP port ${port}.`);
  })
  .catch((err) => {
    const msg = err && typeof err.message === "string" ? err.message : String(err);
    if (verbose && !/no process running on port/i.test(msg)) {
      console.warn("[xrufy] Port free (non-fatal):", msg);
    }
  });
