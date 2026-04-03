import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export function BrandStorySection() {
  return (
    <AnimatedSection className="border-b border-stone-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e85d04]">Our brand</p>
            <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Play should feel bold, bright, and worth trying again tomorrow.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-stone-600">
              XRUFY exists for the in-between years—when kids are not babies anymore but still need tactile,
              forgiving toys. We obsess over click-together feel, color balance, and sets that work for solo play
              or sibling teams.
            </p>
            <ul className="mt-8 space-y-3 text-stone-700">
              <li className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-teal-500" aria-hidden />
                <span>
                  <strong className="text-stone-900">Safety-aware design</strong> — age labels and choking-hazard
                  guidance you can trust on every package and listing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-[#e85d04]" aria-hidden />
                <span>
                  <strong className="text-stone-900">Honest materials story</strong> — we speak plainly to parents,
                  not marketing jargon.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-2 shrink-0 rounded-sm bg-blue-500" aria-hidden />
                <span>
                  <strong className="text-stone-900">Always listening</strong> — feedback shapes the next colors,
                  manuals, and accessories we ship.
                </span>
              </li>
            </ul>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center font-semibold text-[#c94f03] hover:underline"
            >
              Read our full story →
            </Link>
          </div>
          <div className="relative rounded-3xl border border-stone-200 bg-gradient-to-br from-orange-50 via-white to-teal-50 p-8 shadow-inner sm:p-10">
            <div className="absolute right-6 top-6 size-24 rounded-2xl bg-gradient-to-br from-amber-400/30 to-orange-500/20 blur-2xl" aria-hidden />
            <blockquote className="relative font-[family-name:var(--font-outfit)] text-2xl font-semibold leading-snug text-stone-900">
              “If a toy only has one ending, kids stop asking ‘what if?’ We build for the what-ifs.”
            </blockquote>
            <p className="relative mt-6 text-sm font-medium text-stone-500">— XRUFY product philosophy</p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-600 shadow-sm">
                Preschool-first
              </span>
              <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-600 shadow-sm">
                STEAM-friendly
              </span>
              <span className="rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-600 shadow-sm">
                Family-tested
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
