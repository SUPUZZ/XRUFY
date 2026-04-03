import Link from "next/link";
import { AMAZON_PRODUCT_URL } from "@/lib/constants";
import { HeroMotionBlocks } from "./HeroMotionBlocks";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#f7f7f5]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_15%,rgba(232,93,4,0.14),transparent_55%),radial-gradient(ellipse_50%_45%_at_5%_85%,rgba(13,148,136,0.11),transparent_50%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%3E%3Cpath%20fill%3D%22%239a9a9a%22%20fill-opacity%3D%220.15%22%20d%3D%22M0%200h24v24H0zm24%2024h24v24H24z%22%2F%3E%3C%2Fsvg%3E')]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
        <div className="order-2 md:order-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
            Interlocking construction · Ages 3+
          </p>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-extrabold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Build worlds.
            <br />
            Grow minds.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
            XRUFY blocks snap together with a satisfying click—perfect for little hands exploring
            shape, balance, and imagination. Made for preschoolers who love to create.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={AMAZON_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#e85d04] px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#c94f03]"
            >
              Shop on Amazon
            </a>
            <Link
              href="#gallery"
              className="inline-flex items-center justify-center rounded-full border-2 border-stone-200 bg-white px-7 py-3.5 text-base font-semibold text-stone-900 transition hover:border-stone-400"
            >
              See real photos
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-200/80 pt-8 sm:max-w-md">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Pieces</dt>
              <dd className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">100+</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Focus</dt>
              <dd className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">STEAM</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Play</dt>
              <dd className="font-[family-name:var(--font-outfit)] text-2xl font-bold text-stone-900">Open</dd>
            </div>
          </dl>
        </div>
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <HeroMotionBlocks />
        </div>
      </div>
    </section>
  );
}
