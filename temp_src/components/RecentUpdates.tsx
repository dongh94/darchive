import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

const updates = [
  {
    category: 'Wedding',
    date: '2026.04.15',
    title: 'Our Story',
    desc: '두 사람이 만나 하나의 이야기를 만들어가기까지',
    color: 'bg-google-red'
  },
  {
    category: 'DevLogs',
    date: '2026.04.10',
    title: 'Building a Personal Archive',
    desc: '개인 아카이브 플랫폼을 설계하며 배운 것들',
    color: 'bg-google-blue'
  }
];

export default function RecentUpdates() {
  return (
    <section className="px-6 md:px-12 py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-[hsl(var(--border))]" />
            <h2 className="text-sm font-semibold tracking-widest uppercase opacity-40">Recent Updates</h2>
            <div className="h-[1px] flex-1 bg-[hsl(var(--border))]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {updates.map((update, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-6 p-6 rounded-[var(--radius-apple)] border border-transparent hover:border-[hsl(var(--border))] hover:bg-[hsl(var(--background))] transition-all group"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold opacity-30 mb-2 uppercase">{update.category}</span>
                <div className={`w-12 h-12 rounded-2xl ${update.color} flex items-center justify-center text-white shadow-lg shadow-${update.color.split('-')[1]}-500/20`}>
                  <ExternalLink size={20} />
                </div>
              </div>
              <div>
                <span className="text-xs font-mono opacity-40">{update.date}</span>
                <h4 className="text-xl font-display font-bold mt-1 mb-2 group-hover:text-google-blue transition-colors">
                  {update.title}
                </h4>
                <p className="text-sm opacity-50 leading-relaxed">
                  {update.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
