"use client";

import { motion } from "framer-motion";

const blocks = [
  { className: "bottom-[8%] left-[12%] h-[22%] w-[45%] -rotate-6 bg-gradient-to-br from-amber-400 to-amber-600" },
  { className: "bottom-[28%] left-[38%] h-[18%] w-[38%] rotate-[8deg] bg-gradient-to-br from-teal-500 to-teal-700" },
  { className: "bottom-[42%] right-[18%] h-[20%] w-[42%] -rotate-[4deg] bg-gradient-to-br from-blue-400 to-blue-700" },
  { className: "bottom-[58%] left-[22%] h-[16%] w-[36%] rotate-[5deg] bg-gradient-to-br from-pink-400 to-pink-600" },
];

export function HeroMotionBlocks() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-lg shadow-xl ${b.className}`}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.15 + i * 0.1,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden
        />
      ))}
      <motion.div
        className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-orange-100/40 via-transparent to-teal-100/50 blur-2xl"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
    </div>
  );
}
