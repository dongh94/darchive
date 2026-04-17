import { Heart } from "lucide-react";
import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-cream"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-4 text-center"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full bg-brand-gold/20 blur-xl"
          />
          <Heart size={48} className="relative z-10 fill-brand-gold/10 text-brand-gold" />
        </div>
        <p className="text-xs font-light uppercase tracking-[0.5em] text-brand-gold">Loading Invitation</p>
      </motion.div>
    </motion.div>
  );
}
