const DEFAULT_API_BASE_URL = "https://api.supuzz.cn";
const DEFAULT_BRAND_NAME = "xrufy";

function trimTrailingSlash(input: string) {
  return input.endsWith("/") ? input.slice(0, -1) : input;
}

export function getFeedbackApiBaseUrl() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_FEEDBACK_API_BASE_URL ?? DEFAULT_API_BASE_URL);
}

export function getFeedbackTenantDomain() {
  const fromEnv = process.env.NEXT_PUBLIC_FEEDBACK_DOMAIN?.trim().toLowerCase();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location.hostname) {
    return window.location.hostname.toLowerCase();
  }
  return "localhost";
}

export function getFeedbackTenantBrand() {
  return (process.env.NEXT_PUBLIC_FEEDBACK_BRAND_NAME ?? DEFAULT_BRAND_NAME).trim().toLowerCase();
}
