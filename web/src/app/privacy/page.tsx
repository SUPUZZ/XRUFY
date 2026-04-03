import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BRAND_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How XRUFY handles information when you use this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-14 sm:px-6">
        <article className="mx-auto max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-[#e85d04] hover:underline">
            ← Back to home
          </Link>
          <h1 className="mt-6 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-stone-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-stone-500">Last updated: April 3, 2026</p>

          <div className="mt-10 space-y-6 text-stone-600">
            <p>
              This policy describes how XRUFY (“we,” “us”) treats information when you visit this website (the “Site”).
              It is meant to support common compliance needs for a small brand site that primarily links out to Amazon
              for purchases.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Information we collect</h2>
            <p>
              <strong className="text-stone-800">Information you send us.</strong> If you email us or use a contact form
              (if we add one later), we receive whatever you choose to provide (for example, name, email address, and
              message content).
            </p>
            <p>
              <strong className="text-stone-800">Automatic data.</strong> Like most sites, our hosting or analytics tools
              may log technical data such as IP address, browser type, device type, general location derived from IP,
              referring URLs, and pages viewed. We use this to operate and improve the Site and to understand aggregate
              traffic—not to sell personal information as a business model.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">
              Cookies and similar technologies
            </h2>
            <p>
              We or our service providers may use cookies, local storage, or pixels for essential site function,
              preferences, or measurement. If we run advertising or analytics that use non-essential cookies, we will
              align notices and choices with applicable law (for example, consent banners where required).
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">How we use information</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide and maintain the Site</li>
              <li>Respond to inquiries you send us</li>
              <li>Measure performance and fix errors</li>
              <li>Comply with law and protect rights and safety</li>
            </ul>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Third parties</h2>
            <p>
              <strong className="text-stone-800">Amazon.</strong> When you click “Shop on Amazon” or similar links, you
              leave our Site. Amazon’s privacy policy and terms govern data collected on Amazon’s services. We do not
              control Amazon’s practices.
            </p>
            <p>
              <strong className="text-stone-800">Hosting, fonts, analytics.</strong> We may use vendors (for example,
              website hosting, Google Fonts, or analytics). Those vendors process data under their own policies and our
              agreements with them.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Retention</h2>
            <p>
              We keep information only as long as needed for the purposes above, unless a longer period is required by law.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Your rights</h2>
            <p>
              Depending on where you live, you may have rights to access, correct, delete, or restrict certain processing
              of personal information, or to opt out of certain sales or sharing (as defined by local law). To exercise
              rights, contact us using the method below. We may need to verify your request.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Children</h2>
            <p>
              Our products are for families, but this Site is not intended to collect personal information from children
              under 13. If you believe we have collected such information, contact us and we will delete it where
              required.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">International visitors</h2>
            <p>
              If you access the Site from outside the United States, your information may be processed in the United
              States or other countries where we or our vendors operate.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Changes</h2>
            <p>
              We may update this policy from time to time. The “Last updated” date at the top will change when we do.
              Continued use of the Site after changes means you accept the revised policy.
            </p>

            <h2 className="font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">Contact</h2>
            <p>
              For privacy questions, email us at{" "}
              <a href={`mailto:${BRAND_EMAIL}`} className="font-semibold text-[#c94f03] hover:underline">
                {BRAND_EMAIL}
              </a>
              , or use the messaging options on our official Amazon seller listing for XRUFY.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
