"use client";

import { motion } from "motion/react";

export function InvitationMessageSection() {
  return (
    <section className="space-y-12 bg-white px-10 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-2 font-serif text-sm italic text-brand-muted md:text-base">
          <p>You can not be happy every day.</p>
          <p>But there are happy things every day.</p>
        </div>

        <div className="space-y-1 text-sm leading-relaxed text-brand-ink md:text-base">
          <p>매일 행복할 순 없지만,</p>
          <p>행복한 것들은 매일 있어.</p>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-brand-gold opacity-70">
          &lt;월트 디즈니&gt;, 곰돌이 푸 中
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="mx-auto h-px w-12 bg-brand-gold/20"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="space-y-8 text-[13px] font-light leading-loose text-brand-ink md:text-sm"
      >
        <h3 className="mb-4 font-serif text-lg text-brand-gold">저희 결혼합니다</h3>

        <p>
          저희의 결혼 소식이<br />
          부담스럽지 않게 다가가길 바라며,<br />
          편한 마음으로 오셔서<br />
          축하해주시면 감사하겠습니다.
        </p>

        <p>
          혹여 참석이 어려우시더라도 부담 갖지 마시고,<br />
          마음으로 축하해주시면 감사하겠습니다.
        </p>
      </motion.div>
    </section>
  );
}
