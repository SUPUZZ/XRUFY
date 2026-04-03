"use client";

import { motion } from "framer-motion";

const checklist = [
  "Spatial reasoning & hand–eye coordination",
  "Patience, focus, and planning",
  "Color & pattern recognition",
  "Cooperative play with siblings or friends",
];

const stats = [
  { value: "3+", label: "Recommended age" },
  { value: "100%", label: "Imagination-powered" },
  { value: "∞", label: "Ways to combine" },
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
        className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Learning through building
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Construction play supports early STEM habits: counting pieces, testing stability, and trying again when a
            structure wobbles. XRUFY turns those moments into confidence.
          </p>
          <ul className="mt-8 space-y-3">
            {checklist.map((item, i) => (
              <motion.li
                key={item}
                className="relative pl-7 text-white/90"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <span className="absolute left-0 top-2 size-2 rounded-sm bg-[#e85d04]" aria-hidden />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
            >
              <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold text-white">{s.value}</p>
              <p className="mt-1 text-sm text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
