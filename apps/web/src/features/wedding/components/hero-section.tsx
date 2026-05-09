"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";

export function HeroSection() {
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const { couple, event, hero, location } = weddingContent;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsIntroVisible(false);
      document.body.style.overflow = "unset";
    }, 1450);

    return () => {
      document.body.style.overflow = "unset";
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      <Image
        src={hero.imageUrl}
        alt={hero.imageAlt}
        fill
        priority
        unoptimized
        className="object-cover object-center"
        sizes="420px"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />

      <AnimatePresence>
        {isIntroVisible ? (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 overflow-hidden [perspective:1000px]"
          >
            <motion.div
              initial={{ rotateY: 0, x: 0 }}
              animate={{ rotateY: -78, x: "-8%" }}
              transition={{ delay: 0.24, duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 origin-left bg-brand-cream shadow-[18px_0_35px_rgba(44,44,44,0.18)] [backface-visibility:hidden] [transform-style:preserve-3d]"
            >
              <DoorPanel side="left" imageUrl="/images/wedding/main-portrait.jpeg" />
            </motion.div>
            <motion.div
              initial={{ rotateY: 0, x: 0 }}
              animate={{ rotateY: 78, x: "8%" }}
              transition={{ delay: 0.24, duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 origin-right bg-brand-cream shadow-[-18px_0_35px_rgba(44,44,44,0.18)] [backface-visibility:hidden] [transform-style:preserve-3d]"
            >
              <DoorPanel side="right" imageUrl="/images/wedding/main-portrait.jpeg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.24, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="h-16 w-px bg-brand-gold/45" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-20 z-10 text-center text-white drop-shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isIntroVisible ? 0 : 1, y: isIntroVisible ? 12 : 0 }}
          transition={{ delay: isIntroVisible ? 0 : 0.05, duration: 0.7, ease: "easeOut" }}
        >
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

function DoorPanel({ side, imageUrl }: { side: "left" | "right"; imageUrl: string }) {
  const isLeft = side === "left";

  return (
    <div className="relative h-full w-full overflow-hidden bg-brand-cream">
      <div className={isLeft ? "absolute inset-y-0 left-0 w-[200%]" : "absolute inset-y-0 right-0 w-[200%]"}>
        <Image
          src={imageUrl}
          alt=""
          fill
          unoptimized
          aria-hidden="true"
          className="object-cover object-center"
          sizes="420px"
        />
      </div>
      <div className={isLeft ? "absolute inset-y-0 right-0 w-px bg-white/50" : "absolute inset-y-0 left-0 w-px bg-white/50"} />
      <div className={isLeft ? "absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/20 to-transparent" : "absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/20 to-transparent"} />
    </div>
  );
}
