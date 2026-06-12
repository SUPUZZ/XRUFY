import type { ReactNode } from "react";
import { BRAND_EMAIL } from "@/lib/constants";

export type FaqItem = { q: string; a: ReactNode };

export const faqItems: FaqItem[] = [
  {
    q: "What age is XRUFY best for?",
    a: "Our interlocking construction set is designed with preschoolers in mind—typically ages 3 to 8—when kids are building grip strength, patience, and spatial skills. Always check the age label on the box and Amazon listing for the latest guidance.",
  },
  {
    q: "Where can I buy XRUFY?",
    a: "You can purchase through our official Amazon listing. Use the “Shop on Amazon” buttons on this site to go straight to the product page with current price and shipping options.",
  },
  {
    q: "Is adult supervision required?",
    a: "Yes. Small parts can present a choking hazard for children under 3. Adult supervision is recommended. Follow all warnings on the packaging and listing.",
  },
  {
    q: "What if I need support or have a product question?",
    a: (
      <>
        Email us at{" "}
        <a href={`mailto:${BRAND_EMAIL}`} className="font-medium text-[#c94f03] underline-offset-2 hover:underline">
          {BRAND_EMAIL}
        </a>{" "}
        or use the contact form on this page. For Amazon orders, seller messaging on the listing is fastest.
      </>
    ),
  },
];

/** Plain-text FAQ items for JSON-LD structured data (no JSX). Used by FAQPage schema. */
export const faqSchemaItems: { question: string; answer: string }[] = [
  {
    question: "What age is XRUFY best for?",
    answer:
      "XRUFY interlocking construction sets are designed for preschoolers ages 3 to 8. This age range supports grip strength, patience, and spatial skills development. Always check the age label on the box and Amazon listing for the latest guidance.",
  },
  {
    question: "Where can I buy XRUFY building blocks?",
    answer:
      "XRUFY building blocks are available exclusively on Amazon.com. Use the 'Shop on Amazon' buttons on this site to go directly to the product page with current pricing and fast shipping options to the US and Canada.",
  },
  {
    question: "Is adult supervision required with XRUFY toys?",
    answer:
      "Yes. XRUFY sets contain small parts that can present a choking hazard for children under 3 years old. Adult supervision is recommended. Follow all warnings on the packaging and Amazon listing.",
  },
  {
    question: "How do I contact XRUFY for product support or questions?",
    answer:
      "You can email XRUFY at xrufy_brand@163.com, use the contact form on the Support page, or use Amazon seller messaging on the product listing page for order-related questions.",
  },
  {
    question: "Are XRUFY blocks safe for toddlers?",
    answer:
      "XRUFY blocks are recommended for ages 3 and up due to small parts. For children under 3, the product should not be used due to choking hazard risks. Always inspect pieces before play and supervise young builders.",
  },
  {
    question: "What comes in the XRUFY building block set?",
    answer:
      "The XRUFY set includes 100+ interlocking construction pieces in multiple colors, toy figures, a full-color building manual, and a reusable storage bin. Everything needed for open-ended STEAM play.",
  },
];
