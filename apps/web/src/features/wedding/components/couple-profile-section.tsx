"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { weddingContent } from "../data/wedding-content";
import { cn } from "../lib/utils";

type CoupleProfile = (typeof weddingContent.couple)[keyof typeof weddingContent.couple];

export function CoupleProfileSection() {
  return (
    <section className="space-y-20 bg-white px-8 py-24">
      <ProfileCard profile={weddingContent.couple.groom} imageSide="left" />
      <ProfileCard profile={weddingContent.couple.bride} imageSide="right" />
    </section>
  );
}

function ProfileCard({ profile, imageSide }: { profile: CoupleProfile; imageSide: "left" | "right" }) {
  const isImageRight = imageSide === "right";

  return (
    <div className={cn("flex flex-col items-center gap-10 md:flex-row", isImageRight && "md:flex-row-reverse")}>
      <motion.div
        initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-sm md:w-1/2"
      >
        <Image
          src={profile.imageUrl}
          alt={profile.imageAlt}
          fill
          unoptimized
          className="object-cover grayscale-[0.3]"
          sizes="(min-width: 768px) 210px, 356px"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className={cn("w-full space-y-6 md:w-1/2", isImageRight ? "text-right" : "text-left")}
      >
        <div className="space-y-1">
          <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-brand-gold">{profile.role}</h4>
          <h3 className="font-serif text-2xl font-light">{profile.name}</h3>
        </div>

        <ProfileFacts
          align={isImageRight ? "right" : "left"}
          facts={[profile.birthDate, profile.hometown, profile.occupation]}
        />

        <div className="border-t border-brand-gold/10 pt-4">
          <p className="text-xs tracking-widest text-brand-muted">{profile.parents}</p>
        </div>
      </motion.div>
    </div>
  );
}

function ProfileFacts({ facts, align }: { facts: string[]; align: "left" | "right" }) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4 text-sm font-light leading-relaxed text-brand-muted",
        align === "right" && "items-end",
      )}
    >
      {facts.map((fact) => (
        <div key={fact} className="flex items-center gap-3">
          {align === "left" ? <span className="h-1 w-1 rounded-full bg-brand-gold" /> : null}
          <p>{fact}</p>
          {align === "right" ? <span className="h-1 w-1 rounded-full bg-brand-gold" /> : null}
        </div>
      ))}
    </div>
  );
}
