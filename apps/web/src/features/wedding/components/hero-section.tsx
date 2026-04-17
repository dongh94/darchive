"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";

type HeroSectionProps = {
  onIntroComplete: () => void;
};

export function HeroSection({ onIntroComplete }: HeroSectionProps) {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { couple, event, hero, location } = weddingContent;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsIntroVisible(false);
      document.body.style.overflow = "unset";
      onIntroComplete();
    }, 4000);

    return () => {
      document.body.style.overflow = "unset";
      window.clearTimeout(timer);
    };
  }, [onIntroComplete]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <Image
        src={hero.imageUrl}
        alt={hero.imageAlt}
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="420px"
      />

      <AnimatePresence>
        {isIntroVisible ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 px-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <motion.p
                initial={{ letterSpacing: "0.1em", opacity: 0 }}
                animate={{ letterSpacing: "0.4em", opacity: 1 }}
                transition={{ delay: 0.8, duration: 2 }}
                className="font-serif text-xl italic text-white md:text-2xl"
              >
                We&apos;re getting married
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="mx-auto mt-4 h-px bg-white/50"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-20 z-10 text-center text-white drop-shadow-lg">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isIntroVisible ? 0 : 1 }} transition={{ duration: 1 }}>
          <p className="mb-2 text-sm uppercase tracking-[0.3em]">{event.heroDateLabel}</p>
          <h1 className="font-serif text-4xl font-light">
            {couple.groom.name} &amp; {couple.bride.name}
          </h1>
          <p className="mt-4 text-sm opacity-80">{location.venue}</p>
        </motion.div>
      </div>
    </section>
  );
}
