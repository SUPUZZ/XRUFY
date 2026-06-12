import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export interface FaqItemData {
  question: string;
  answer: string;
}

export interface FaqJsonLdProps {
  faqs: FaqItemData[];
}

/**
 * FAQPage JSON-LD for the Support page and blog posts.
 * Critical for GEO: AI engines heavily favor FAQ-structured content
 * and may surface these Q&As directly in generative responses.
 */
export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
