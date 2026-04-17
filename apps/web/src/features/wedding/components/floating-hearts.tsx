import { useState } from "react";
import { Heart } from "lucide-react";
import { motion } from "motion/react";

type FloatingHeart = {
  id: number;
  x: string;
  driftX: string;
  delay: number;
  duration: number;
  size: number;
};

export function FloatingHearts() {
  const [hearts] = useState<FloatingHeart[]>(() =>
    [...Array(15)].map((_, index) => {
      const x = Math.random() * 100;
      const driftX = x + (Math.random() * 20 - 10);

      return {
        id: index,
        x: `${x}%`,
        driftX: `${driftX}%`,
        delay: Math.random() * 20,
        duration: 12 + Math.random() * 12,
        size: 10 + Math.random() * 15,
      };
    }),
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, x: heart.x, y: "110%" }}
          animate={{
            opacity: [0, 0.4, 0],
            y: "-10%",
            x: [heart.x, heart.driftX],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-brand-gold/15"
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
