import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SupportContactForm } from "@/components/forms/SupportContactForm";
import { AMAZON_PRODUCT_URL, BRAND_EMAIL } from "@/lib/constants";
import { faqItems } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Support",
  description: "Message XRUFY, read quick answers, or optionally join the email list.",
};

function FormFallback() {
  return (
    <div className="animate-pulse rounded-2xl border border-stone-200 bg-stone-50 px-4 py-10 text-center text-sm text-stone-500">
      Loading form…
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* 1. 轻量首屏：把人带到「留言」 */}
        <section className="border-b border-stone-200 bg-gradient-to-b from-orange-50/40 to-white px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">Support</p>
            <h1 className="mt-2 font-[family-name:var(--font-outfit)] text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl sm:leading-tight">
              We’d love to hear from you
            </h1>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              Start with a short message below—questions, ideas, or how play went at home. No account needed; we read
              everything that comes in.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#e85d04] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#c94f03] sm:w-auto"
              >
                Send a message
              </a>
              <p className="text-center text-sm text-stone-500 sm:text-left">
                <span className="block sm:inline">Orders &amp; returns: </span>
                <a
                  href={AMAZON_PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#c94f03] underline-offset-2 hover:underline"
                >
                  Amazon
                </a>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">
                  Or email{" "}
                  <a href={`mailto:${BRAND_EMAIL}`} className="font-semibold text-stone-700 underline-offset-2 hover:underline">
                    {BRAND_EMAIL}
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* 2. 联系 / 反馈（主路径） */}
        <section
          id="contact"
          className="scroll-mt-24 border-b border-stone-200 bg-white px-4 py-12 sm:px-6 sm:py-16"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-xl">
            <h2 id="contact-heading" className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900 sm:text-3xl">
              Write to us
            </h2>
            <p id="contact-desc" className="mt-3 text-sm leading-relaxed text-stone-600">
              Choose <strong className="font-semibold text-stone-800">Contact</strong> for help or general questions,{" "}
              <strong className="font-semibold text-stone-800">Feedback</strong> if you want to share what worked—or what
              we should improve. Take your time; there’s no wrong length.
            </p>
            <div className="mt-8 rounded-2xl border border-orange-100 bg-[#fffaf5] p-5 shadow-sm sm:p-7">
              <Suspense fallback={<FormFallback />}>
                <SupportContactForm ariaDescribedBy="contact-desc" />
              </Suspense>
            </div>
          </div>
        </section>

        {/* 3. FAQ：自助浏览，不抢主路径 */}
        <section id="faq" className="scroll-mt-24 border-b border-stone-200 bg-[#f7f7f5] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-[family-name:var(--font-outfit)] text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
              Quick answers
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-stone-600">
              Prefer to skim first? These cover age, safety, and where to buy. You can still{" "}
              <a href="#contact" className="font-medium text-[#c94f03] underline-offset-2 hover:underline">
                send a message
              </a>{" "}
              anytime.
            </p>
            <FaqAccordion items={faqItems} className="mt-8" />
          </div>
        </section>

        {/* 4. 订阅：明确可选，放在最后 */}
        <section
          id="newsletter"
          className="scroll-mt-24 border-b border-stone-200 bg-white px-4 py-10 sm:px-6 sm:py-12"
          aria-labelledby="newsletter-heading"
        >
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-stone-200 bg-stone-50/80 px-5 py-8 sm:px-8">
            <h2 id="newsletter-heading" className="font-[family-name:var(--font-outfit)] text-lg font-bold text-stone-800">
              Optional: email updates
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              If you <em className="not-italic text-stone-600">want</em> play ideas or product news a few times a season,
              leave your email. No pressure—unsubscribe anytime.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
