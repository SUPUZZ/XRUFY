import { count, desc, eq, type SQL } from "drizzle-orm";
import { Router } from "express";
import {
  ADMIN_COOKIE,
  clearAdminCookie,
  getAdminPassword,
  getCookie,
  getSigningSecret,
  issueAdminSession,
  requireAdmin,
  safePasswordMatch,
  verifyAdminToken,
} from "./adminAuth.js";
import { db } from "./db/client.js";
import { formSubmissions } from "./db/schema.js";
import { readNewsletterSignupsLocal } from "./persistSubscribeLocal.js";

const router = Router();

router.post("/login", (req, res) => {
  const password = getAdminPassword();
  if (!password) {
    res.status(503).json({
      ok: false,
      error: "Set ADMIN_PASSWORD in server environment (e.g. server/.env or docker.env).",
    });
    return;
  }
  const body = req.body as { password?: string };
  const got = typeof body?.password === "string" ? body.password : "";
  if (!safePasswordMatch(password, got)) {
    res.status(401).json({ ok: false, error: "Invalid password." });
    return;
  }
  issueAdminSession(res);
  res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
  clearAdminCookie(res);
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  const secret = getSigningSecret();
  if (!secret) {
    res.json({ ok: true, authenticated: false, configured: false });
    return;
  }
  const token = getCookie(req, ADMIN_COOKIE);
  const authenticated = verifyAdminToken(secret, token);
  res.json({ ok: true, authenticated, configured: true });
});

router.get("/form-submissions", requireAdmin, async (req, res) => {
  if (!db) {
    res.json({
      ok: true,
      database: false,
      items: [] as unknown[],
      total: 0,
      hint: "DATABASE_URL not set or DB unreachable — only local newsletter file may have data.",
    });
    return;
  }

  const rawType = typeof req.query.formType === "string" ? req.query.formType : "all";
  const formType =
    rawType === "contact" || rawType === "feedback" || rawType === "subscribe" ? rawType : "all";

  let limit = Number(req.query.limit);
  if (!Number.isFinite(limit) || limit < 1) limit = 100;
  if (limit > 500) limit = 500;

  let offset = Number(req.query.offset);
  if (!Number.isFinite(offset) || offset < 0) offset = 0;

  const whereClause: SQL | undefined =
    formType === "all" ? undefined : eq(formSubmissions.formType, formType);

  try {
    const countBase = db.select({ n: count() }).from(formSubmissions);
    const [countRow] = whereClause
      ? await countBase.where(whereClause)
      : await countBase;
    const total = Number(countRow?.n ?? 0);

    const listBase = db.select().from(formSubmissions);
    const listFiltered = whereClause ? listBase.where(whereClause) : listBase;
    const items = await listFiltered
      .orderBy(desc(formSubmissions.createdAt))
      .limit(limit)
      .offset(offset);

    res.json({
      ok: true,
      database: true,
      items: items.map((row) => ({
        id: row.id,
        formType: row.formType,
        email: row.email,
        name: row.name,
        topic: row.topic,
        message: row.message,
        createdAt: row.createdAt.toISOString(),
      })),
      total,
      limit,
      offset,
    });
  } catch (err) {
    req.log.error({ err }, "admin form-submissions query failed");
    res.status(500).json({ ok: false, error: "Query failed." });
  }
});

router.get("/local-newsletter", requireAdmin, async (req, res) => {
  try {
    const items = await readNewsletterSignupsLocal();
    const limitRaw = Number(req.query.limit);
    const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(500, limitRaw) : 200;
    const slice = items.length > limit ? items.slice(-limit).reverse() : [...items].reverse();
    res.json({ ok: true, items: slice, total: items.length });
  } catch (err) {
    req.log.error({ err }, "admin local-newsletter read failed");
    res.status(500).json({ ok: false, error: "Could not read local file." });
  }
});

export { router as adminRouter };
