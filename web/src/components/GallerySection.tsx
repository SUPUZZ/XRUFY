"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";

export function GallerySection() {
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
            <Image
              src={GALLERY_IMAGES[0].src}
              alt={GALLERY_IMAGES[0].alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-sm font-semibold text-white">
              {GALLERY_IMAGES[0].caption}
            </figcaption>
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
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-sm font-semibold text-white">
                {img.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
