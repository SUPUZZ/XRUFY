export const locales = ["en", "zh-Hant", "es", "ja", "de", "pt", "fr"] as const;
export type Locale = typeof locales[number];
export const translatedSlugs = ["multidimensional-building-blocks-preschoolers", "cleanup-and-storage-tips", "holiday-toy-gifts-preschoolers"] as const;
export const translatedPaths = ["/", "/blog/", "/about/", "/support/", "/privacy/", "/terms/", ...translatedSlugs.map(slug => `/blog/${slug}/`)];
export function availableLocales(pathname: string): readonly Locale[] {
  return translatedPaths.includes(routeWithoutLocale(pathname)) ? locales : ["en"];
}
export const languageNames: Record<Locale, string> = {
  en: "English", "zh-Hant": "繁體中文", es: "Español", ja: "日本語",
  de: "Deutsch", pt: "Português", fr: "Français",
};
export const ogLocales: Record<Locale, string> = {
  en: "en_US", "zh-Hant": "zh_TW", es: "es_ES", ja: "ja_JP", de: "de_DE", pt: "pt_BR", fr: "fr_FR",
};
export function isLocale(value: string): value is Locale {
  return locales.some(locale => locale === value);
}
export function routeWithoutLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) parts.shift();
  return `/${parts.join("/")}${parts.length ? "/" : ""}`;
}
export function localePath(locale: Locale, pathname = "/") {
  const path = routeWithoutLocale(pathname);
  return locale === "en" ? path : `/${locale}${path}`;
}
export function languageAlternates(pathname: string) {
  const base = "https://xrufy.com";
  return Object.fromEntries([
    ...availableLocales(pathname).map(locale => [locale, base + localePath(locale, pathname)]),
    ["x-default", base + localePath("en", pathname)],
  ]);
}
