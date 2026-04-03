import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import "./loadEnv.js";
import { db, pool } from "./db/client.js";
import { saveFormSubmission } from "./db/saveFormSubmission.js";
import { parseFormBody, submitParsedToWeb3 } from "./forms.js";
import { logger } from "./logger.js";
import { appendNewsletterSignupLocal } from "./persistSubscribeLocal.js";

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST ?? "0.0.0.0";
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const HAS_DB = Boolean(db);

const app = express();

const httpLogger = pinoHttp({
  logger,
  genReqId: (req: IncomingMessage, res: ServerResponse) => {
    const h = req.headers["x-request-id"];
    if (typeof h === "string" && h.length > 0) return h;
    const id = randomUUID();
    res.setHeader("x-request-id", id);
    return id;
  },
  autoLogging: {
    ignore: (req: IncomingMessage) => req.url === "/health",
  },
  customAttributeKeys: {
    req: "req",
    res: "res",
    err: "err",
    reqId: "reqId",
    responseTime: "responseTime",
  },
});

app.use(httpLogger);
app.use(express.json({ limit: "256kb" }));
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const e = err as { status?: number; body?: unknown };
    if (err instanceof SyntaxError && e.status === 400 && "body" in e) {
      res.status(400).json({ ok: false, error: "Invalid JSON." });
      return;
    }
    next(err);
  },
);

const corsOrigins = process.env.CORS_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean);
if (corsOrigins?.length) {
  app.use(
    cors({
      origin: corsOrigins,
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    }),
  );
}

app.get("/health", async (req, res) => {
  if (!pool) {
    res.json({ ok: true, service: "xrufy-server", database: "disabled" });
    return;
  }
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "xrufy-server", database: "connected" });
  } catch (err) {
    req.log.error({ err }, "database ping failed");
    res.json({
      ok: true,
      service: "xrufy-server",
      database: "error",
      hint: "Check server/.env DATABASE_URL; run npm run db:local-pg:start; free port 4000 if an old server is stuck.",
    });
  }
});

app.post("/api/forms", async (req, res) => {
  const parsed = parseFormBody(req.body);

  if (parsed.kind === "bot") {
    res.status(200).json({ ok: true });
    return;
  }

  if (parsed.kind === "invalid") {
    req.log.info(
      { formOutcome: "invalid", status: parsed.result.status },
      "form validation failed",
    );
    res.status(parsed.result.status).json(parsed.result.body);
    return;
  }

  const data = parsed.data;

  if (HAS_DB) {
    try {
      await saveFormSubmission(data);
    } catch (err) {
      req.log.error({ err, formType: data.formType }, "save form_submissions failed");
      res.status(503).json({ ok: false, error: "Database unavailable." });
      return;
    }
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    if (HAS_DB) {
      res.status(200).json({ ok: true });
      return;
    }
    /* Newsletter: save to server/data/newsletter-signups.jsonl when no DB/Web3 — so local dev still works */
    if (data.formType === "subscribe") {
      try {
        await appendNewsletterSignupLocal(data.email);
        req.log.info({ formOutcome: "newsletter_local" }, "newsletter saved to jsonl");
      } catch (err) {
        req.log.error({ err }, "newsletter file write failed");
        res.status(503).json({
          ok: false,
          error: "Could not save your email. Check server logs or email us directly.",
        });
        return;
      }
      res.status(200).json({ ok: true });
      return;
    }
    req.log.warn({ code: "NO_BACKEND" }, "form handler not configured");
    res.status(503).json({
      ok: false,
      code: "NO_BACKEND",
      error: "Form handler not configured on the server.",
    });
    return;
  }

  const web3 = await submitParsedToWeb3(data, WEB3FORMS_ACCESS_KEY);
  if (web3.status >= 400) {
    req.log.warn(
      { formType: data.formType, status: web3.status, web3Body: web3.body },
      "web3forms delivery not ok",
    );
  }
  res.status(web3.status).json(web3.body);
});

app.use((req, res) => {
  req.log.warn({ path: req.path }, "not found");
  res.status(404).json({ ok: false, error: "Not found." });
});

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  void next;
  req.log.error({ err }, "unhandled error");
  if (res.headersSent) return;
  res.status(500).json({ ok: false, error: "Internal server error." });
});

const server = app.listen(PORT, HOST, () => {
  logger.info(
    { port: PORT, host: HOST, db: HAS_DB ? "on" : "off" },
    "xrufy-server listening",
  );
});
server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    logger.error(
      { err, port: PORT },
      "port already in use — run npm run server:kill or set PORT in server/.env",
    );
  }
  throw err;
});
