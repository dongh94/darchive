"use client";

import Image from "next/image";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";
import { SectionHeader } from "./section-header";

export function LocationSection() {
  const { location } = weddingContent;

  return (
    <section id="location" className="px-6 py-20">
      <SectionHeader eyebrow="Location" title={location.venue} description={`${location.address} · ${location.phone}`} />

      <div className="relative mx-auto mb-12 aspect-square max-w-[280px] overflow-hidden rounded-full border border-brand-gold/10 bg-brand-beige">
        <Image
          src={location.mapImageUrl}
          alt={`${location.venue} 위치 지도`}
          fill
          unoptimized
          className="object-cover opacity-50"
          sizes="280px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 -m-4 rounded-full bg-brand-gold"
            />
            <MapPin size={32} className="relative z-10 text-brand-gold" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-brand-gold">
            <Navigation size={16} />
            <h4 className="text-sm font-medium uppercase tracking-widest">Subway</h4>
          </div>
          <p className="text-sm leading-relaxed text-brand-muted">
            {location.transitLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-brand-gold/20 py-3 text-xs font-medium transition-colors hover:bg-brand-gold/5">
            <ExternalLink size={14} /> Naver Map
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-md border border-brand-gold/20 py-3 text-xs font-medium transition-colors hover:bg-brand-gold/5">
            <ExternalLink size={14} /> Kakao Map
          </button>
        </div>
      </div>
    </section>
  );
}
