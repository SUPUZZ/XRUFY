import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const locales = ["en", "zh-Hant", "es", "ja", "de", "pt", "fr"];
const routes = ["/", "/blog/", "/about/", "/support/", "/privacy/", "/terms/",
  "/blog/multidimensional-building-blocks-preschoolers/", "/blog/cleanup-and-storage-tips/", "/blog/holiday-toy-gifts-preschoolers/"];
const localized = (locale, route) => locale === "en" ? route : `/${locale}${route}`;
const output = path.join(root, "out");
const englishOnlyRoutes = fs.readdirSync(path.join(root, "content/blog"))
  .filter(file => file.endsWith(".md"))
  .map(file => `/blog/${file.slice(0, -3)}/`)
  .filter(route => !routes.includes(route));
const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<loc>/g) ?? []).length, locales.length * routes.length + englishOnlyRoutes.length);
for (const locale of locales) {
  if (locale !== "en") {
    const dictionary = JSON.parse(fs.readFileSync(path.join(root, "src/lib/locales", `${locale}.json`), "utf8"));
    assert.equal(dictionary.nav.length, 8);
    assert.equal(dictionary.forms.length, 26);
    assert.equal(dictionary.posts.length, 3);
    assert.equal(dictionary.home.sections.length, 7);
  }
  for (const route of locale === "en" ? [...routes, ...englishOnlyRoutes] : routes) {
    const available = englishOnlyRoutes.includes(route) ? ["en"] : locales;
    const localPath = localized(locale, route);
    const html = fs.readFileSync(path.join(output, localPath, "index.html"), "utf8");
    const url = `https://xrufy.com${localPath}`;
    assert(html.includes(`<html lang="${locale}"`), `${localPath}: HTML language`);
    assert(html.includes(`<link rel="canonical" href="${url}"`), `${localPath}: canonical`);
    const alternates = html.match(/<link\b[^>]*rel="alternate"[^>]*>/g) ?? [];
    assert.equal(alternates.length, available.length + 1, `${localPath}: language links`);
    assert(alternates.some(tag => tag.includes('hrefLang="x-default"') && tag.includes(`href="https://xrufy.com${route}"`)), `${localPath}: default language`);
    for (const target of available) {
      assert(alternates.some(tag => tag.includes(`hrefLang="${target}"`) && tag.includes(`href="https://xrufy.com${localized(target, route)}"`)), `${localPath}: reciprocal ${target}`);
    }
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${localPath}: heading`);
    if (available.length === 1) {
      for (const target of locales.filter(item => item !== "en")) {
        assert(!html.includes(`href="/${target}${route}"`), `${localPath}: unavailable translation link`);
      }
      const blogIndex = fs.readFileSync(path.join(output, "blog/index.html"), "utf8");
      assert(blogIndex.includes(`href="${route}"`), `${localPath}: discoverable in blog index`);
    }
    assert(sitemap.includes(`<loc>${url}</loc>`), `${localPath}: sitemap`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert(main && !main.includes("undefined"), `${localPath}: main content`);
    for (const match of main.matchAll(/href="(\/[^"#?]*)[^\"]*"/g)) {
      const destination = decodeURIComponent(match[1]);
      if (destination.startsWith("/_next/")) continue;
      assert(fs.existsSync(path.join(output, destination, "index.html")), `${localPath}: broken internal link ${destination}`);
      if (locale !== "en") assert(destination.startsWith(`/${locale}/`), `${localPath}: link leaves language`);
    }
    if (route.startsWith("/blog/") && route !== "/blog/") {
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const article = schemas.find(item => item["@type"] === "BlogPosting");
      assert.equal(article.url, url);
      assert.equal(article.inLanguage, locale === "en" ? "en-US" : locale);
      assert(schemas.some(item => item["@type"] === "BreadcrumbList"));
      const blogIndex = fs.readFileSync(path.join(output, localized(locale, "/blog/"), "index.html"), "utf8");
      assert(blogIndex.includes(`href="${localPath}"`), `${localPath}: discoverable in localized blog index`);
      if (route === "/blog/holiday-toy-gifts-preschoolers/") {
        assert(article.datePublished.startsWith("2026-09-22"), `${localPath}: publication date`);
        assert(article.dateModified.startsWith("2026-09-22"), `${localPath}: modification date`);
        assert(html.includes('<meta name="keywords"'), `${localPath}: localized keywords`);
        assert((main.match(/<h2\b/g) ?? []).length >= 8, `${localPath}: complete seasonal sections`);
      }
    }
  }
}
console.log(`${locales.length * routes.length + englishOnlyRoutes.length} pages passed: languages, reciprocal SEO links, canonicals, internal links, article schema and sitemap.`);
