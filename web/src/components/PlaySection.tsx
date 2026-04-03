import { AnimatedSection } from "./AnimatedSection";

const tiles = [
  {
    symbol: "◇",
    title: "Interlocking design",
    body: "Pieces connect securely so builds stay standing through play—then come apart for the next idea.",
  },
  {
    symbol: "◎",
    title: "Preschool-friendly",
    body: "Sized for developing motor skills: grip, stack, align, and problem-solve without frustration.",
  },
  {
    symbol: "✦",
    title: "Open-ended creativity",
    body: "No single “right” model—kids lead the narrative, which keeps play fresh day after day.",
  },
];

export function PlaySection() {
  return (
    <AnimatedSection id="play" className="border-b border-stone-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Bold building play—<span className="text-stone-500">your story, your rules</span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Bold colors, sturdy connections, and open-ended builds. Whether it is a tower, a robot, or a “spaceship
            garage,” every session is hands-on discovery.
          </p>
        </header>
        <div className="grid gap-5 md:grid-cols-3">
          {tiles.map((t) => (
            <article
              key={t.title}
              className="group rounded-2xl border border-stone-200 bg-[#f7f7f5] p-7 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg"
            >
              <p className="text-2xl text-[#e85d04] transition group-hover:scale-110" aria-hidden>
                {t.symbol}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-outfit)] text-xl font-bold text-stone-900">{t.title}</h3>
              <p className="mt-2 text-stone-600">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
