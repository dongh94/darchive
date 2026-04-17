import { motion } from "motion/react";

export function Divider() {
  return (
    <div className="flex justify-center py-12">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-px bg-brand-gold/30"
      />
    </div>
  );
}
