import { AnimatedSection } from "./AnimatedSection";

const tiles = [
  {
    symbol: "◇",
    title: "Interlocking design",
    body: "Pieces connect with a satisfying click and stay secure through active play — no frustration for little builders. When it's time for a new idea, they come apart cleanly without adult help.",
    highlight: "Firm hold, easy release",
  },
  {
    symbol: "◎",
    title: "Preschool-friendly sizing",
    body: "Every block is proportioned for ages 3–8: large enough to grip confidently, small enough to build fine motor control. Rounded corners and smooth edges make handling natural and safe.",
    highlight: "Designed for developing hands",
  },
  {
    symbol: "✦",
    title: "Open-ended creativity",
    body: "No instruction sheet tells kids what to build — they decide. A castle becomes a zoo becomes a rocket launch pad. This freedom builds creative confidence and keeps play fresh day after day.",
    highlight: "Infinite stories, zero scripts",
  },
];

export function PlaySection() {
  return (
    <AnimatedSection id="play" className="border-b border-stone-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e85d04]">Design &amp; play</p>
          <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Bold building play — <span className="text-stone-500">your story, your rules</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Bold colors, sturdy connections, and open-ended builds. Whether it is a tower, a robot, or a &ldquo;spaceship
            garage,&rdquo; every session is hands-on discovery that grows with your child&rsquo;s abilities.
          </p>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {tiles.map((t) => (
            <article
              key={t.title}
              className="group rounded-2xl border border-stone-200 bg-[#f7f7f5] p-7 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg"
            >
              <p className="text-2xl text-[#e85d04] transition group-hover:scale-110" aria-hidden>
                {t.symbol}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">{t.title}</h3>
              <p className="mt-2 text-stone-600">{t.body}</p>
              <p className="mt-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#e85d04]">
                {t.highlight}
              </p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
