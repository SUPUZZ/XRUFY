import { AMAZON_PRODUCT_URL, GALLERY_IMAGES } from "@/lib/constants";
import { getSiteUrl, HOME_DESCRIPTION, SITE_NAME } from "@/lib/seo";

/**
 * JSON-LD for Google rich results context: Organization, WebSite, Product → Amazon offer.
 * @see https://developers.google.com/search/docs/appearance/structured-data/product
 */
export function HomeJsonLd() {
  const siteUrl = getSiteUrl();
  const productImages = GALLERY_IMAGES.map((img) => img.src);

  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: siteUrl,
      description: HOME_DESCRIPTION,
      logo: productImages[0] ?? `${siteUrl}/family-scene-north-american.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: SITE_NAME,
      url: siteUrl,
      description: HOME_DESCRIPTION,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/`,
      url: siteUrl,
      name: `${SITE_NAME} — Preschool STEAM construction toys`,
      description: HOME_DESCRIPTION,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#product` },
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: "XRUFY Interlocking Construction Building Blocks — 100+ Piece STEAM Set for Kids",
      description: HOME_DESCRIPTION,
      image: productImages,
      brand: { "@type": "Brand", name: SITE_NAME },
      category: "Toys & Games > Building Toys",
      additionalProperty: [
        { "@type": "PropertyValue", "name": "Recommended age", "value": "Ages 3–8" },
        { "@type": "PropertyValue", "name": "Piece count", "value": "100+" },
      ],
      offers: {
        "@type": "Offer",
        url: AMAZON_PRODUCT_URL,
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        seller: {
          "@type": "Organization",
          name: "Amazon.com",
        },
      },
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
