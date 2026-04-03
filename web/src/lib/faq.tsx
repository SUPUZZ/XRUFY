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
