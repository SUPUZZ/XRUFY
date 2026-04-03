import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BRAND_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Rules for using the XRUFY website.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-14 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-[#e85d04] hover:underline">
            ← Back to home
          </Link>
          <h1 className="mt-6 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-stone-900">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-stone-500">Last updated: April 3, 2026</p>

          <div className="mt-10 space-y-6 text-stone-600">
            <p>
              These Terms of Use (“Terms”) govern your access to and use of this XRUFY website (the “Site”). By using the
              Site, you agree to these Terms. If you do not agree, do not use the Site.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Who we are</h2>
            <p>
              The Site is operated by or on behalf of the XRUFY brand. Purchases are completed through third-party
              retailers (for example, Amazon), not on this Site unless we state otherwise.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Use of the Site</h2>
            <p>You agree to use the Site only in lawful ways. You may not:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Attempt to disrupt, scrape, or overload the Site</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Use the Site to distribute malware or harass others</li>
              <li>Reverse engineer or bypass security features</li>
            </ul>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Intellectual property</h2>
            <p>
              Text, graphics, logos, product images, and other content on the Site are owned by XRUFY or our licensors and
              are protected by copyright, trademark, and other laws. You may not copy, modify, or distribute Site content
              for commercial use without our prior written permission, except as allowed by law (for example, fair use) or
              for personal, non-commercial reference.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Product information</h2>
            <p>
              We try to keep descriptions accurate. Product details, pricing, availability, shipping, and returns are
              controlled by the retailer where you buy (for example, Amazon). Always read the listing, packaging, and
              safety information before purchase or use.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Links to third parties</h2>
            <p>
              The Site may link to Amazon or other sites. Those sites have their own terms and privacy policies. We are
              not responsible for third-party content or practices.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Disclaimer of warranties</h2>
            <p className="text-sm leading-relaxed">
              THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
              WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Limitation of liability</h2>
            <p className="text-sm leading-relaxed">
              TO THE FULLEST EXTENT PERMITTED BY LAW, XRUFY AND ITS TEAM WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING FROM YOUR USE OF THE
              SITE. OUR TOTAL LIABILITY FOR CLAIMS RELATING TO THE SITE WILL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU
              PAID US DIRECTLY FOR USE OF THE SITE IN THE TWELVE MONTHS BEFORE THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS
              (US$100), IF APPLICABLE. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE CASES, OUR LIABILITY
              IS LIMITED TO THE MAXIMUM EXTENT ALLOWED BY LAW.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Indemnity</h2>
            <p>
              You agree to defend and indemnify XRUFY and its representatives against claims, damages, losses, and expenses
              (including reasonable attorneys’ fees) arising from your misuse of the Site or violation of these Terms, to
              the extent permitted by law.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Governing law</h2>
            <p>
              These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-law rules,
              except where prohibited by your local law. Courts in Delaware (or the U.S. federal courts located there) have
              exclusive jurisdiction for disputes, unless applicable law requires otherwise.
            </p>
            <p>
              <em className="text-stone-500">
                Note: Replace Delaware with your company’s actual state of formation if different, after review by your
                attorney.
              </em>
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Changes</h2>
            <p>
              We may update these Terms. We will post the new date at the top. Continued use after changes means you accept
              the updated Terms.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Contact</h2>
            <p>
              For questions about these Terms, email us at{" "}
              <a href={`mailto:${BRAND_EMAIL}`} className="font-semibold text-[#c94f03] hover:underline">
                {BRAND_EMAIL}
              </a>
              , or contact us through our official Amazon seller messaging.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
