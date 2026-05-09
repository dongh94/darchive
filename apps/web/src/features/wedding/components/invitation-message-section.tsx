"use client";

import { motion } from "motion/react";
import { Divider } from "./divider";

export function InvitationMessageSection() {
  return (
    <>
      <InvitationQuote />
      <Divider />
      <InvitationBody />
    </>
  );
}

function InvitationQuote() {
  return (
    <section className="bg-white px-10 py-24 text-center">
      <SectionTitle>Quote</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-2 font-serif text-[15px] italic leading-relaxed text-brand-ink/80 md:text-base">
          <p>All we can do is do our best</p>
          <p>to relish this remarkable ride.</p>
        </div>

        <div className="space-y-1 text-[15px] leading-relaxed text-brand-ink md:text-base">
          <p>우리가 할 수 있는 건,</p>
          <p>이 놀라운 여정을 마음껏 누리는 것뿐입니다.</p>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-widest text-brand-gold">&lt;어바웃 타임&gt; 中</p>
      </motion.div>
    </section>
  );
}

function InvitationBody() {
  return (
    <section className="bg-white px-10 py-24 text-center">
      <SectionTitle>Invitation</SectionTitle>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.85, ease: "easeOut" }}
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
          돌아보면 사랑은<br />
          거창한 순간보다<br />
          평범한 하루들 속에 있었습니다.
        </p>

        <p>
          함께 걷던 길,<br />
          별일 없이 나누던 웃음,<br />
          말없이 기대던 계절들이<br />
          저희에게는 가장 특별한 시간이었습니다.
        </p>

        <p>
          이제 저희는<br />
          서로의 하루를 더 오래 함께 누리기로 약속합니다.
        </p>

        <p>
          그 첫걸음이 되는 날,<br />
          소중한 분들을 모시고 싶습니다.
        </p>

        <p>
          오셔서 저희의 시작을<br />
          따뜻하게 축복해 주세요.
        </p>
      </motion.div>
    </section>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-12 text-sm font-medium uppercase tracking-[0.4em] text-brand-gold">{children}</h2>;
}
