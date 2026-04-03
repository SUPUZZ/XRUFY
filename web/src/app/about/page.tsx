import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AMAZON_PRODUCT_URL, BRAND_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "XRUFY is a preschool-first construction toy brand—open-ended play, honest materials messaging, and support that listens.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-stone-200 bg-gradient-to-b from-orange-50/50 to-[#f7f7f5] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e85d04]">Brand</p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
              Built for curious hands
            </h1>
            <p className="mt-5 text-lg text-stone-600">
              XRUFY makes interlocking construction sets that feel satisfying to click together, forgiving when towers
              fall, and rich enough for siblings to share one table without running out of ideas.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">What we believe</h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            Childhood is short. Toys should earn their spot in the living room—not with noise and screens alone, but with
            moments where kids lose track of time because they are busy solving their own puzzles.
          </p>
          <p className="mt-4 leading-relaxed text-stone-600">
            We design for <strong className="text-stone-800">preschool motor skills</strong> (grip, alignment, patience)
            and for <strong className="text-stone-800">early confidence</strong> (“I can rebuild it”). Our Amazon listing
            is the storefront where most families meet us first—same photos, same promises, same support email on this
            site.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">
            Quality &amp; safety
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            Always follow age grading and small-parts warnings on the box and listing. We are transparent about how XRUFY
            should be used: supervised play for younger builders, especially when figures and small accessories are in the
            mix.
          </p>

          <h2 className="mt-12 font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">Talk to us</h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            Product ideas, packaging notes, or a question about your order—reach us on the{" "}
            <Link href="/support" className="font-semibold text-[#c94f03] hover:underline">
              Support
            </Link>{" "}
            page or email{" "}
            <a href={`mailto:${BRAND_EMAIL}`} className="font-semibold text-[#c94f03] hover:underline">
              {BRAND_EMAIL}
            </a>
            .
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex rounded-full border-2 border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 hover:border-stone-900"
            >
              Read the blog
            </Link>
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#e85d04] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#c94f03]"
            >
              Shop on Amazon
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
