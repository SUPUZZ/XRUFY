import { AMAZON_PRODUCT_URL, GALLERY_IMAGES } from "@/lib/constants";
import { getSiteUrl, HOME_DESCRIPTION, SITE_NAME } from "@/lib/seo";

/**
 * Comprehensive JSON-LD for GEO & rich results: Organization, WebSite, Product → Amazon offer.
 * Enhanced with entity connections, FAQ signals, and North American market details.
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
      email: "xrufy_brand@163.com",
      logo: productImages[0] ?? `${siteUrl}/family-scene-north-american.png`,
      slogan: "Interlocking construction toys for preschool creators.",
      foundingDate: "2025",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      sameAs: [AMAZON_PRODUCT_URL],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "xrufy_brand@163.com",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: SITE_NAME,
      url: siteUrl,
      description: HOME_DESCRIPTION,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/support#contact`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/`,
      url: siteUrl,
      name: `${SITE_NAME} — Preschool STEAM Construction Toys | Official Site`,
      description: HOME_DESCRIPTION,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#product` },
      primaryImageOfPage: { "@id": `${siteUrl}/#product-image` },
      datePublished: "2025-06-01",
      dateModified: "2026-06-05",
      inLanguage: "en-US",
      speaks: "en-US",
      countryOfOrigin: "US",
    },
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#product-image`,
      url: productImages[0],
      caption: "XRUFY 100+ piece interlocking building blocks STEM toy for kids ages 3-8",
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/#product`,
      name: "XRUFY Interlocking Construction Building Blocks — 100+ Piece STEAM Set for Kids Ages 3-8",
      description:
        "XRUFY 100+ piece interlocking construction building blocks for preschoolers. Snap-together STEAM educational toy with storage bin, figures, and building guide. Ideal for open-ended play, fine motor skills, and early STEM learning for ages 3-8. Available on Amazon.com with fast shipping to the US and Canada.",
      image: productImages,
      brand: { "@type": "Brand", name: SITE_NAME },
      manufacturer: { "@type": "Organization", name: SITE_NAME },
      category: "Toys & Games > Building Toys",
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 3,
        suggestedMaxAge: 8,
        suggestedGender: "unisex",
      },
      isFamilyFriendly: true,
      material: "Plastic",
      additionalProperty: [
        { "@type": "PropertyValue", name: "Recommended age", value: "Ages 3–8" },
        { "@type": "PropertyValue", name: "Piece count", value: "100+" },
        { "@type": "PropertyValue", name: "Play type", value: "Open-ended, STEAM, interlocking construction" },
        { "@type": "PropertyValue", name: "Includes", value: "Storage bin, figures, building manual" },
      ],
      offers: {
        "@type": "Offer",
        "@id": `${siteUrl}/#offer`,
        url: AMAZON_PRODUCT_URL,
        availability: "https://schema.org/InStock",
        priceCurrency: "USD",
        price: "19.99",
        eligibleRegion: [
          { "@type": "Country", name: "US" },
          { "@type": "Country", name: "CA" },
        ],
        seller: {
          "@type": "Organization",
          name: "Amazon.com",
          url: "https://www.amazon.com/",
        },
        availabilityStarts: "2025-06-01",
      },
    },
    // FAQ signals — helps AI engines find Q&A content on homepage
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What age is XRUFY best for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "XRUFY interlocking construction sets are designed for preschoolers ages 3 to 8, supporting grip strength, patience, and spatial skills.",
          },
        },
        {
          "@type": "Question",
          name: "Where can I buy XRUFY building blocks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "XRUFY building blocks are available exclusively on Amazon.com. Visit the official Amazon listing for current pricing and fast shipping to the US and Canada.",
          },
        },
        {
          "@type": "Question",
          name: "How many pieces are in the XRUFY set?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The XRUFY set includes 100+ interlocking pieces, plus a storage bin, figures, and a full-color building manual.",
          },
        },
        {
          "@type": "Question",
          name: "Are XRUFY blocks good for STEM learning?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. XRUFY blocks are used in open-ended STEAM play that builds early engineering thinking, pattern recognition, fine motor coordination, and creative problem-solving for preschoolers.",
          },
        },
      ],
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
