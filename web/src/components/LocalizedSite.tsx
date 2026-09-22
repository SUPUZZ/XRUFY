import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "./Header";
import { BlogMarkdown } from "./BlogMarkdown";
import { LocalizedBlogList } from "./LocalizedBlogList";
import { NewsletterForm } from "./forms/NewsletterForm";
import { SupportContactForm } from "./forms/SupportContactForm";
import { AMAZON_PRODUCT_URL, BRAND_EMAIL, GALLERY_IMAGES } from "@/lib/constants";
import { languageAlternates, localePath, ogLocales } from "@/lib/localization";
import { getDictionary, translatedSlugs, type TranslatedLocale } from "@/lib/translations";

const postCovers = ["/images/blog/multidimensional-building-blocks.webp", "/images/blog/life-scene.webp", "/images/blog/holiday-building-play.webp"];
const postDates = ["2026-09-21", "2026-06-12", "2026-09-22"];
function contentFor(locale: TranslatedLocale, path: string) {
  const d = getDictionary(locale);
  const index = translatedSlugs.findIndex(slug => path === `/blog/${slug}/`);
  if (index >= 0) return { ...d.posts[index], index, article: true };
  if (path === "/") return { title: d.home.title, description: d.home.description, body: "", index: -1, article: false };
  if (path === "/blog/") return { title: `XRUFY · ${d.nav[1]}`, description: d.posts[0].description, body: "", index: -1, article: false };
  const page = d.pages[path.slice(1, -1) as keyof typeof d.pages];
  return { ...page, index: -1, article: false };
}
export function localizedMetadata(locale: TranslatedLocale, path: string): Metadata {
  const page = contentFor(locale, path);
  const url = `https://xrufy.com${localePath(locale, path)}`;
  const image = page.article ? postCovers[page.index] : postCovers[0];
  const imageAlt = "coverAlt" in page ? page.coverAlt : page.title;
  return {
    title: { absolute: page.title.includes("XRUFY") ? page.title : `${page.title} | XRUFY` }, description: page.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    keywords: "keywords" in page ? page.keywords : page.title,
    openGraph: { title: page.title, description: page.description, url, siteName: "XRUFY", locale: ogLocales[locale], type: page.article ? "article" : "website", ...(page.article ? { publishedTime: postDates[page.index], modifiedTime: page.index === 2 ? postDates[page.index] : "2026-09-21" } : {}), images: [{ url: image, alt: imageAlt }] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [image] },
  };
}
function localizeLinks(markdown: string, locale: TranslatedLocale) {
  return markdown.replace(/\]\((\/(?!\/)[^)]*)\)/g, (_, href: string) => {
    const [path, hash] = href.split("#");
    return `](${localePath(locale, path)}${hash ? `#${hash}` : ""})`;
  });
}
export function LocalizedSite({ locale, path }: { locale: TranslatedLocale; path: string }) {
  const d = getDictionary(locale), page = contentFor(locale, path);
  const link = (route: string) => localePath(locale, route);
  const posts = d.posts.map((post, index) => ({ ...post, slug: translatedSlugs[index], cover: postCovers[index], date: postDates[index] })).sort((a, b) => b.date.localeCompare(a.date));
  const shop = <a href={AMAZON_PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#e85d04] px-6 py-3 font-semibold text-white hover:bg-[#c94f03]">{d.nav[4]} ↗</a>;
  const date = postDates[page.index] ?? "2026-09-21";
  const url = `https://xrufy.com${link(path)}`;
  const schema = page.article ? {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: page.title,
    description: page.description, inLanguage: locale, url, mainEntityOfPage: url,
    datePublished: date, dateModified: page.index === 2 ? date : "2026-09-21", author: { "@type": "Organization", name: "XRUFY", url: "https://xrufy.com" },
    publisher: { "@type": "Organization", name: "XRUFY" }, image: `https://xrufy.com${postCovers[page.index]}`,
  } : { "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, inLanguage: locale, url };
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: d.nav[0], item: `https://xrufy.com${link("/")}` },
    ...(page.article ? [{ "@type": "ListItem", position: 2, name: d.nav[1], item: `https://xrufy.com${link("/blog/")}` }] : []),
    ...(path !== "/" ? [{ "@type": "ListItem", position: page.article ? 3 : 2, name: page.title, item: url }] : []),
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
    <Header locale={locale} labels={d.nav} />
    <main id="main" className="flex-1">
      {path === "/" ? <>
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <div><p className="font-semibold text-orange-700">XRUFY</p><h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{d.home.title}</h1><p className="mt-6 text-lg leading-relaxed text-stone-600">{d.home.description}</p>{shop}</div>
          <Image src="/family-scene-north-american.webp" alt={d.home.alt} width={1200} height={900} priority className="h-auto w-full rounded-3xl" />
        </section>
        {d.home.sections.map(([id, title, body]) => <section id={id} key={id} className="border-t border-stone-200 px-5 py-14 even:bg-white">
          <div className="mx-auto max-w-5xl"><h2 className="text-3xl font-bold">{title}</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-600">{body}</p>
            {id === "gallery" && <div className="mt-8 grid gap-5 sm:grid-cols-3">{GALLERY_IMAGES.map((image, index) => <Image key={image.src} src={image.src} alt={`${title} · ${index + 1}`} width={600} height={600} className="h-auto w-full rounded-2xl bg-white object-contain" />)}</div>}
            {id === "newsletter" && <div className="mt-6 max-w-xl"><NewsletterForm labels={d.forms} /></div>}
            {id === "discover" && shop}
          </div>
        </section>)}
        <section className="mx-auto max-w-5xl px-5 py-14"><h2 className="mb-6 text-3xl font-bold">{d.nav[1]}</h2><LocalizedBlogList posts={posts} locale={locale} search={d.search} noResults={d.noResults} read={d.read} /></section>
      </> : <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <Link href={link(page.article ? "/blog/" : "/")} className="font-semibold text-orange-700">← {page.article ? d.back : d.nav[0]}</Link>
        {page.article && <Image src={postCovers[page.index]} alt={"coverAlt" in page ? page.coverAlt ?? page.title : page.title} width={1200} height={630} priority className="mt-8 w-full rounded-2xl border border-stone-200" />}
        <h1 className="mt-8 text-4xl font-extrabold leading-tight">{page.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-600">{page.description}</p>
        {page.article && <p className="mt-4 text-sm text-stone-500"><time dateTime={date}>{new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(date))}</time> · {d.team}</p>}
        {["/privacy/", "/terms/"].includes(path) && <p className="mt-4 text-sm text-stone-500">{d.updated}: <time dateTime="2026-04-03">{new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date("2026-04-03"))}</time></p>}
        <div id={path === "/support/" ? "faq" : undefined} className="mt-10"><BlogMarkdown content={localizeLinks(page.body, locale)} /></div>
        {path === "/blog/" && <LocalizedBlogList posts={posts} locale={locale} search={d.search} noResults={d.noResults} read={d.read} />}
        {path === "/support/" && <><section id="contact" className="mt-10 rounded-2xl border border-stone-200 bg-white p-6"><h2 className="mb-6 text-2xl font-bold">{d.forms[0]}</h2><Suspense fallback={<p>{d.forms[9]}</p>}><SupportContactForm labels={d.forms} /></Suspense></section><section id="newsletter" className="mt-10"><h2 className="mb-6 text-2xl font-bold">{d.footer[6]}</h2><NewsletterForm labels={d.forms} /></section></>}
        {page.article && shop}
      </article>}
    </main>
    <footer className="border-t border-stone-200 px-5 py-12"><div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
      <div><Link href={link("/")} className="text-xl font-extrabold">XRUFY</Link><p className="mt-4 text-stone-600">{d.footer[0]}</p><a className="mt-4 block text-sm" href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a></div>
      <nav aria-label={d.footer[1]}><h2 className="mb-4 font-bold">{d.footer[1]}</h2>{["/", "/blog/", "/support/", "/about/"].map((route, index) => <Link key={route} className="mb-2 block hover:underline" href={link(route)}>{d.nav[index]}</Link>)}</nav>
      <nav aria-label={d.footer[3]}><h2 className="mb-4 font-bold">{d.footer[3]}</h2><Link className="mb-2 block" href={link("/privacy/")}>{d.footer[4]}</Link><Link className="mb-2 block" href={link("/terms/")}>{d.footer[5]}</Link><Link className="mb-2 block" href={`${link("/support/")}#newsletter`}>{d.footer[6]}</Link><p className="mt-6 text-sm text-stone-500">© {new Date().getFullYear()} XRUFY. {d.footer[7]}</p></nav>
    </div></footer>
  </>;
}
