import Image from "next/image";
import Link from "next/link";
import { AMAZON_PRODUCT_URL, HERO_FEATURE_IMAGE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#f7f7f5]">
      {/* 暖色光晕 + 与右侧照片呼应，无棋盘格 */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_78%_18%,rgba(232,93,4,0.12),transparent_58%),radial-gradient(ellipse_55%_50%_at_8%_88%,rgba(13,148,136,0.09),transparent_52%),radial-gradient(ellipse_70%_60%_at_15%_35%,rgba(245,230,211,0.45),transparent_55%),radial-gradient(ellipse_90%_40%_at_50%_100%,rgba(231,229,228,0.5),transparent_45%)]"
        aria-hidden
      />
      {/* 极淡纸质噪点感圆点，避免方格 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle_at_center,rgba(120,113,106,0.055)_1px,transparent_1.5px)] [background-size:22px_22px]"
        aria-hidden
      />

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
        <div className="order-1 flex w-full justify-center md:order-2 md:justify-end">
          <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-200 shadow-lg ring-1 ring-black/5 md:max-w-xl">
            <Image
              src={HERO_FEATURE_IMAGE.src}
              alt={HERO_FEATURE_IMAGE.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
