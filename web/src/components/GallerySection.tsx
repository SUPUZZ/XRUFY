"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % GALLERY_IMAGES.length;
    });
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    });
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, goNext, goPrev]);

  return (
    <section id="gallery" className="border-b border-stone-200 bg-[#f7f7f5] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            See it in the room
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Photos from our Amazon listing—the same set families receive at checkout.
          </p>
        </header>

        <div className="grid min-h-[380px] gap-4 md:grid-cols-[2fr_1fr] md:grid-rows-2">
          <motion.figure
            className="group relative min-h-[220px] overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 shadow-sm md:row-span-2"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button type="button" onClick={() => open(0)} className="relative block h-full w-full cursor-zoom-in">
              <Image
                src={GALLERY_IMAGES[0].src}
                alt={GALLERY_IMAGES[0].alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm font-semibold text-white">
                {GALLERY_IMAGES[0].caption}
              </figcaption>
            </button>
          </motion.figure>

          {GALLERY_IMAGES.slice(1).map((img, i) => (
            <motion.figure
              key={img.src}
              className="group relative min-h-[160px] overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i + 1), duration: 0.45 }}
            >
              <button type="button" onClick={() => open(i + 1)} className="relative block h-full w-full cursor-zoom-in">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm font-semibold text-white">
                  {img.caption}
                </figcaption>
              </button>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Previous button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/40 sm:left-6"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              className="relative max-h-[85vh] max-w-[90vw]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <Image
                  src={GALLERY_IMAGES[selectedIndex].src}
                  alt={GALLERY_IMAGES[selectedIndex].alt}
                  width={1500}
                  height={1500}
                  className="max-h-[85vh] w-auto object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-white/80">
                {GALLERY_IMAGES[selectedIndex].caption}
              </p>
            </motion.div>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur transition hover:bg-white/40 sm:right-6"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40 sm:right-6 sm:top-6"
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`h-2 w-2 rounded-full transition ${
                    i === selectedIndex ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}