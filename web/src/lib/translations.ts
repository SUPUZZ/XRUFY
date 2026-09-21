import zh from "./locales/zh-Hant.json";
import es from "./locales/es.json";
import ja from "./locales/ja.json";
import de from "./locales/de.json";
import pt from "./locales/pt.json";
import fr from "./locales/fr.json";
import type { Locale } from "./localization";

export type Dictionary = typeof zh;
export type TranslatedLocale = Exclude<Locale, "en">;
const dictionaries: Record<TranslatedLocale, Dictionary> = { "zh-Hant": zh, es, ja, de, pt, fr };
export function getDictionary(locale: TranslatedLocale) { return dictionaries[locale]; }
export const translatedSlugs = ["multidimensional-building-blocks-preschoolers", "cleanup-and-storage-tips"] as const;
export const translatedPaths = ["/", "/blog/", "/about/", "/support/", "/privacy/", "/terms/", ...translatedSlugs.map(slug => `/blog/${slug}/`)];
