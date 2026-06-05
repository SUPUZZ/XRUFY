import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export interface BlogJsonLdProps {
  title: string;
  description: string;
  coverImage?: string;
  coverAlt?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  slug: string;
}

/**
 * Article JSON-LD for blog posts — enables rich results and improves GEO entity extraction.
 * AI engines use Article schema to understand content authority, freshness, and topic.
 */
export function BlogJsonLd({
  title,
  description,
  coverImage,
  coverAlt,
  datePublished,
  dateModified,
  authorName = "XRUFY Team",
  slug,
}: BlogJsonLdProps) {
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${slug}/`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: title,
    description,
    url: postUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "en-US",
    about: [
      { "@type": "Thing", name: "Preschool construction toys" },
      { "@type": "Thing", name: "STEAM education" },
      { "@type": "Thing", name: "Early childhood development" },
    ],
    ...(coverImage
      ? {
          image: {
            "@type": "ImageObject",
            url: coverImage,
            caption: coverAlt ?? title,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
    />
  );
}
