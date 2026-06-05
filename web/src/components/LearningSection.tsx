"use client";

import { motion } from "framer-motion";

const checklist = [
  {
    title: "Spatial reasoning & hand–eye coordination",
    desc: "Aligning pieces and balancing structures builds the visual-motor skills needed for writing, drawing, and sports.",
  },
  {
    title: "Patience, focus, and planning",
    desc: "Completing a build teaches delayed gratification — a skill linked to stronger academic outcomes in early elementary years.",
  },
  {
    title: "Pattern & color recognition",
    desc: "Sorting by shape or color introduces early math concepts: classification, sequencing, and symmetry.",
  },
  {
    title: "Cooperative play & communication",
    desc: "Sharing blocks, negotiating designs, and building together strengthens social-emotional skills for preschool and beyond.",
  },
  {
    title: "Early engineering thinking",
    desc: "Testing what makes a tower stand or a bridge hold weight is the foundation of the scientific method — observe, predict, test, repeat.",
  },
  {
    title: "Creative confidence",
    desc: "Open-ended play lets kids lead. When there is no single 'right' build, every idea is valid — and that builds self-esteem.",
  },
];

const stats = [
  { value: "3+", label: "Recommended age" },
  { value: "100+", label: "Pieces per set" },
  { value: "∞", label: "Ways to combine" },
  { value: "6", label: "Key skills developed" },
];

export function LearningSection() {
  return (
    <section id="learn" className="relative overflow-hidden py-16 sm:py-20">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#152a45] to-[#0f172a]"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-400">Learning through play</p>
          <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every build is a brain-building moment
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Construction play is one of the most research-backed forms of early STEM learning. Counting pieces, testing
            stability, and rebuilding after a wobble — these are the same patterns scientists and engineers use every day.
            XRUFY turns playtime into confident, curious thinking.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {checklist.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            >
              <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-white">
                <span className="mr-2 inline-block size-2 rounded-sm bg-[#e85d04]" aria-hidden />
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-white/50">
          Open-ended block play supports cognitive, social, and motor development in children ages 3–8.
          No screens, no scripts — just hands-on discovery.
        </p>
      </motion.div>
    </section>
  );
}
