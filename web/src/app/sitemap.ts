import type { MetadataRoute } from "next";
import { languageAlternates, localePath, locales } from "@/lib/localization";
import { translatedPaths } from "@/lib/translations";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap(locale => translatedPaths.map(path => ({
    url: `https://xrufy.com${localePath(locale, path)}`,
    alternates: { languages: languageAlternates(path) },
  })));
}
