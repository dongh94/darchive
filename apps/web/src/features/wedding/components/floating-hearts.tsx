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

const FLOATING_HEARTS: FloatingHeart[] = [
  { id: 1, x: "8%", driftX: "14%", delay: 0.2, duration: 16, size: 14 },
  { id: 2, x: "24%", driftX: "18%", delay: 3.4, duration: 19, size: 18 },
  { id: 3, x: "41%", driftX: "48%", delay: 1.6, duration: 14, size: 12 },
  { id: 4, x: "63%", driftX: "58%", delay: 5.8, duration: 21, size: 22 },
  { id: 5, x: "82%", driftX: "88%", delay: 2.8, duration: 17, size: 16 },
  { id: 6, x: "94%", driftX: "86%", delay: 7.2, duration: 24, size: 20 },
  { id: 7, x: "16%", driftX: "10%", delay: 9.1, duration: 18, size: 11 },
  { id: 8, x: "34%", driftX: "39%", delay: 6.5, duration: 22, size: 24 },
  { id: 9, x: "52%", driftX: "45%", delay: 10.4, duration: 15, size: 15 },
  { id: 10, x: "76%", driftX: "81%", delay: 8.8, duration: 20, size: 13 },
  { id: 11, x: "3%", driftX: "11%", delay: 12.6, duration: 23, size: 19 },
  { id: 12, x: "28%", driftX: "21%", delay: 14.2, duration: 16, size: 17 },
  { id: 13, x: "57%", driftX: "64%", delay: 13.1, duration: 19, size: 12 },
  { id: 14, x: "69%", driftX: "62%", delay: 16.4, duration: 25, size: 21 },
  { id: 15, x: "91%", driftX: "96%", delay: 15.5, duration: 18, size: 15 },
];

export function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {FLOATING_HEARTS.map((heart) => (
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
