import { motion } from "motion/react";

export function Divider() {
  return (
    <div className="flex justify-center bg-white py-1">
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="h-px bg-brand-gold/20"
      />
    </div>
  );
}
