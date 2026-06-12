import { getSiteUrl } from "@/lib/seo";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * BreadcrumbList JSON-LD for navigation context.
 * AI engines use breadcrumbs to understand site structure and page hierarchy.
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();
  const itemListElement = items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
