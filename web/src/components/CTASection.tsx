import { AMAZON_PRODUCT_URL } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="border-t border-stone-800 bg-stone-900 py-14 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
        <div>
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-white sm:text-3xl">
            Ready to build?
          </h2>
          <p className="mt-2 text-stone-400">Order XRUFY on Amazon—fast shipping for most U.S. addresses.</p>
        </div>
        <a
          href={AMAZON_PRODUCT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition hover:bg-orange-50"
        >
          Shop on Amazon
        </a>
      </div>
    </section>
  );
}
