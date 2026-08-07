const DEFAULT_API_BASE_URL = "https://api.supuzz.cn";
const DEFAULT_BRAND_NAME = "xrufy";
const VISITOR_ID_STORAGE_KEY = "_xrufy_vid";

function trimTrailingSlash(input: string) {
  return input.endsWith("/") ? input.slice(0, -1) : input;
}

export function getPageviewApiBaseUrl() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_PAGEVIEW_API_BASE_URL ?? DEFAULT_API_BASE_URL);
}

export function getPageviewTenantDomain() {
  const fromEnv = process.env.NEXT_PUBLIC_PAGEVIEW_DOMAIN?.trim().toLowerCase();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location.hostname) {
    return window.location.hostname.toLowerCase();
  }
  return "localhost";
}

export function getPageviewTenantBrand() {
  return (process.env.NEXT_PUBLIC_PAGEVIEW_BRAND_NAME ?? DEFAULT_BRAND_NAME).trim().toLowerCase();
}

function getVisitorId() {
  try {
    let visitorId = localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
    }
    return visitorId;
  } catch {
    // Some private browsing contexts block localStorage access.
    return crypto.randomUUID();
  }
}

export interface PageViewPayload {
  brandName: string;
  domain: string;
  pageUrl: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  visitorId: string;
}

export interface PageViewResponse {
  id: string;
  createdAt: string;
  location?: {
    country: string;
    countryCode: string;
    city: string;
  };
}

export async function reportPageView(): Promise<PageViewResponse | null> {
  // Skip tracking on localhost development
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") return null;
  }

  try {
    const payload: PageViewPayload = {
      brandName: getPageviewTenantBrand(),
      domain: getPageviewTenantDomain(),
      pageUrl: typeof window !== "undefined" ? window.location.pathname + window.location.search : "/",
      visitorId: getVisitorId(),
    };

    if (typeof document !== "undefined" && document.referrer) {
      payload.referrer = document.referrer;
    }

    if (typeof navigator !== "undefined") {
      payload.userAgent = navigator.userAgent;
    }

    const res = await fetch(`${getPageviewApiBaseUrl()}/api/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
    });

    if (!res.ok) {
      console.warn("[pageview] Non-OK response:", res.status);
      return null;
    }

    return (await res.json()) as PageViewResponse;
  } catch (err) {
    // Silently fail — pageview tracking must never break the site
    if (process.env.NODE_ENV === "development") {
      console.warn("[pageview] Failed to report:", err);
    }
    return null;
  }
}

export async function reportPageViewDuration(pageViewId: string, duration: number): Promise<boolean> {
  try {
    const res = await fetch(`${getPageviewApiBaseUrl()}/api/pageview/${pageViewId}/duration`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ duration: Math.max(1, Math.round(duration)) }),
      credentials: "omit",
      keepalive: true,
    });

    return res.ok;
  } catch {
    return false;
  }
}
