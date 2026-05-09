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
          <p>We&apos;re all traveling through time together,</p>
          <p>every day of our lives.</p>
        </div>

        <div className="space-y-1 text-[15px] leading-relaxed text-brand-ink md:text-base">
          <p>우리는 모두 매일,</p>
          <p>함께 시간을 여행하고 있습니다.</p>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-widest text-brand-gold">
          &lt;어바웃 타임&gt; 中
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.9 }}
        className="mx-auto h-px w-12 bg-brand-gold/20"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.32, duration: 0.85, ease: "easeOut" }}
        className="space-y-8 text-sm leading-8 text-brand-ink md:text-[15px]"
      >
        <h3 className="font-serif text-xl leading-none text-brand-ink">
          <span
            className="px-1"
            style={{
              backgroundImage: "linear-gradient(to top, rgba(197, 160, 89, 0.34) 48%, transparent 48%)",
              backgroundRepeat: "no-repeat",
            }}
          >
            저희 결혼합니다.
          </span>
        </h3>

        <p>
          우리는 모두<br />
          매일 조금씩 시간을 여행하며 살아갑니다.
        </p>

        <p>
          그 시간들 속에서<br />
          저희는 서로를 만났고,<br />
          수많은 평범한 하루를 함께 지나왔습니다.
        </p>

        <p>
          함께 웃던 날들,<br />
          서로의 곁을 지켜주던 계절들이 모여<br />
          이제 하나의 약속이 되었습니다.
        </p>

        <p>
          저희가 함께 걸어갈<br />
          새로운 시간의 첫날에<br />
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
