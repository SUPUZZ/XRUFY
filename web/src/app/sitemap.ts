import type { MetadataRoute } from "next";
import { languageAlternates, localePath, locales } from "@/lib/localization";
import { translatedPaths } from "@/lib/translations";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const translated = locales.flatMap(locale => translatedPaths.map(path => ({
    url: `https://xrufy.com${localePath(locale, path)}`,
    alternates: { languages: languageAlternates(path) },
  })));
  const englishOnly = getAllPosts().filter(post => !translatedPaths.includes(`/blog/${post.slug}/`)).map(post => ({
    url: `https://xrufy.com/blog/${post.slug}/`,
    lastModified: post.lastModified ?? post.date,
    alternates: { languages: languageAlternates(`/blog/${post.slug}/`) },
  }));
  return [...translated, ...englishOnly];
}
