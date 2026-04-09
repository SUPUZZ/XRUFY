import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const ADMIN_COOKIE = "xrufy_admin";
/** 7 days */
const MAX_AGE_SEC = 7 * 24 * 60 * 60;

export function getSigningSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET?.trim();
  if (s) return s;
  const p = process.env.ADMIN_PASSWORD?.trim();
  if (p) return createHmac("sha256", "xrufy-admin-session").update(p).digest("hex");
  return null;
}

export function getAdminPassword(): string | null {
  const p = process.env.ADMIN_PASSWORD?.trim();
  return p && p.length > 0 ? p : null;
}

function signPayload(secret: string, exp: number): string {
  const payload = Buffer.from(JSON.stringify({ exp, v: 1 }), "utf8").toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyAdminToken(secret: string, token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  try {
    if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return false;
    }
  } catch {
    return false;
  }
  let parsed: { exp?: number };
  try {
    parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp?: number };
  } catch {
    return false;
  }
  if (typeof parsed.exp !== "number") return false;
  return parsed.exp > Math.floor(Date.now() / 1000);
}

export function getCookie(req: Request, name: string): string | undefined {
  const raw = req.headers.cookie;
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k !== name) continue;
    return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return undefined;
}

export function setAdminCookie(res: Response, token: string): void {
  const secure = process.env.NODE_ENV === "production";
  const parts = [
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}`,
    "HttpOnly",
    "Path=/",
    `Max-Age=${MAX_AGE_SEC}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearAdminCookie(res: Response): void {
  const secure = process.env.NODE_ENV === "production";
  const parts = [`${ADMIN_COOKIE}=`, "HttpOnly", "Path=/", "Max-Age=0", "SameSite=Lax"];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function issueAdminSession(res: Response): void {
  const secret = getSigningSecret();
  if (!secret) return;
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const token = signPayload(secret, exp);
  setAdminCookie(res, token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const secret = getSigningSecret();
  if (!secret) {
    res.status(503).json({ ok: false, error: "Admin is not configured (set ADMIN_PASSWORD)." });
    return;
  }
  const token = getCookie(req, ADMIN_COOKIE);
  if (!verifyAdminToken(secret, token)) {
    res.status(401).json({ ok: false, error: "Unauthorized." });
    return;
  }
  next();
}

export function safePasswordMatch(expected: string, got: string): boolean {
  if (expected.length !== got.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(got, "utf8"));
  } catch {
    return false;
  }
}
