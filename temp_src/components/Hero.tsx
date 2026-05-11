import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-google-blue/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-google-red/5 blur-[100px] rounded-full delay-1000 animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full border border-[hsl(var(--border))] mb-8"
        >
          <Sparkles size={14} className="text-google-blue" />
          <span className="text-xs font-semibold tracking-wide uppercase opacity-70">Between Tech and Life, a space for my records.</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8"
        >
          Tech & Life <br />
          <span className="text-google-blue">나를 기록하는 공간.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl opacity-60 max-w-2xl mx-auto mb-10 leading-relaxed font-light whitespace-pre-line"
        >
          개발하며 배운 것들, 살아가며 남기고 싶은 순간들.{"\n"}
          이곳은 단순한 포트폴리오를 넘어, 나의 경험과 생각이 쌓여가는 개인 아카이브입니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-primary text-[hsl(var(--background))] rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all">
            Explore Archive <ArrowRight size={18} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-muted border border-[hsl(var(--border))] rounded-2xl font-semibold hover:bg-[hsl(var(--border))] transition-colors">
            About Me
          </button>
        </motion.div>
      </div>
    </section>
  );
}
