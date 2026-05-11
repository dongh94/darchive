import { motion } from 'motion/react';
import { Camera, Code, BookOpen, Clock, Globe, Heart, ArrowUpRight } from 'lucide-react';

const blocks = [
  {
    id: 1,
    title: 'Wedding',
    desc: '우리의 결혼 이야기와 소중한 순간들을 기록합니다.',
    icon: <Heart className="text-google-red" />,
    size: 'col-span-2 row-span-2',
    color: 'bg-google-red/10',
    tags: ['Life', 'Moment'],
    img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'DevLogs',
    desc: '개발 과정에서 배운 것과 경험한 것들.',
    icon: <Code className="text-google-blue" />,
    size: 'col-span-1 row-span-1',
    color: 'bg-google-blue/10',
    tags: ['Tech', 'Study']
  },
  {
    id: 3,
    title: 'Projects',
    desc: '상상하고 실험하며 만든 결과물들.',
    icon: <Globe className="text-google-green" />,
    size: 'col-span-1 row-span-2',
    color: 'bg-google-green/10',
    tags: ['Build', 'Lab']
  },
  {
    id: 4,
    title: 'Timeline',
    desc: '시간의 흐름에 따라 쌓인 삶의 흔적.',
    icon: <Clock className="text-google-yellow" />,
    size: 'col-span-1 row-span-1',
    color: 'bg-google-yellow/10',
    tags: ['History']
  },
  {
    id: 5,
    title: 'About',
    desc: '나에 대한 이야기와 철학을 담았습니다.',
    icon: <BookOpen className="text-google-blue" />,
    size: 'col-span-2 row-span-1',
    color: 'bg-google-blue/10',
    tags: ['Philosopy', 'Story']
  }
];

export default function BentoGrid() {
  return (
    <section className="px-6 md:px-12 py-20 pb-40" id="archive">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase opacity-40 mb-2">D-Archive</h2>
            <p className="text-3xl font-display font-bold">The Continuous Record</p>
          </div>
          <div className="hidden sm:block text-sm font-medium opacity-50 underline decoration-google-blue underline-offset-4 cursor-pointer">
            Explore All Fragments
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {blocks.map((block, idx) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`apple-card p-8 group relative ${block.size} min-h-[300px] flex flex-col justify-between cursor-pointer`}
            >
              {block.img && (
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src={block.img} alt={block.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${block.color}`}>
                    {block.icon}
                  </div>
                  <div className="flex gap-2">
                    {block.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold opacity-30">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-google-blue transition-colors">
                  {block.title}
                </h3>
                <p className="opacity-50 text-sm leading-relaxed max-w-[200px]">
                  {block.desc}
                </p>
              </div>

              <div className="relative z-10 self-end">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-[hsl(var(--background))] transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
