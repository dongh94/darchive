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
        <div className="space-y-2 font-serif text-[15px] italic leading-relaxed text-brand-ink/80 md:text-base">
          <p>I just try to live every day</p>
          <p>as if I&apos;ve deliberately come back to this one day.</p>
        </div>

        <div className="space-y-1 text-[15px] leading-relaxed text-brand-ink md:text-base">
          <p>나는 매일을 살아가려 해요.</p>
          <p>마치 이 하루를 다시 살기 위해</p>
          <p>돌아온 것처럼.</p>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-widest text-brand-gold">
          &lt;어바웃 타임&gt;, Tim Lake 대사 中
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
        className="space-y-8 text-sm leading-8 text-brand-ink md:text-[15px]"
      >
        <h3 className="mb-4 font-serif text-xl text-brand-gold">저희 결혼합니다</h3>

        <p>
          다시 돌아오고 싶은 하루들 속에<br />
          늘 서로가 있었습니다.
        </p>

        <p>
          함께 웃던 시간,<br />
          서로에게 기대던 계절들이 모여<br />
          이제 하나의 약속이 되었습니다.
        </p>

        <p>
          저희가 함께 맞이할 첫날에<br />
          소중한 분들을 모시고 싶습니다.
        </p>

        <p>
          오셔서 따뜻한 마음으로<br />
          저희의 시작을 축복해 주세요.
        </p>
      </motion.div>
    </section>
  );
}
