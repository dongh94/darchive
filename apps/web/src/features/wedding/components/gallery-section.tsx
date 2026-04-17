"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";
import { SectionHeader } from "./section-header";

export function GallerySection() {
  return (
    <section id="gallery" className="px-6 py-20">
      <SectionHeader eyebrow="Gallery" description="우리의 소중한 순간들" />

      <div className="grid grid-cols-2 gap-2">
        {weddingContent.gallery.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 1) * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative aspect-[3/4] overflow-hidden rounded-sm bg-brand-beige/20"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              unoptimized
              className="object-cover"
              sizes="204px"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
