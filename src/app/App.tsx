import { ArrowRight, BookOpen, Code2, Heart, Clock, Folder } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 md:px-8 lg:px-12 pt-12 md:pt-20 lg:pt-28 pb-16 md:pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {/* Site Title */}
            <div className="space-y-2">
              <p className="text-sm tracking-wider text-muted-foreground uppercase">Personal Platform</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ fontWeight: 500, lineHeight: 1.1 }}>
                Donghee Archive
              </h1>
            </div>
            
            {/* Headline */}
            <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground/90" style={{ fontWeight: 400, lineHeight: 1.5 }}>
              삶과 개발, 그리고 중요한 순간들을 기록하는 개인 플랫폼
            </h2>
            
            {/* Supporting Text */}
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl" style={{ lineHeight: 1.7 }}>
              이곳은 단순한 포트폴리오가 아니라,<br className="hidden sm:block" />
              배운 것과 만든 것, 그리고 소중한 순간들을 함께 쌓아가는 개인 아카이브입니다.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Heart className="w-4 h-4" />
                Wedding
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
                <Code2 className="w-4 h-4" />
                DevLogs
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground border border-border rounded-lg hover:bg-muted transition-colors">
                About
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / Identity Section */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
              About This Platform
            </h3>
            <p className="text-lg md:text-xl text-foreground/80" style={{ lineHeight: 1.8 }}>
              이 사이트는 삶의 중요한 순간과 개발자로서의 기록을 함께 담기 위해 만든 개인 플랫폴입니다.
              Wedding, DevLogs, Timeline, Projects처럼 서로 다른 이야기들이 하나의 흐름 안에서 자연스럽게 이어지도록 구성하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            <div>
              <h3 className="text-xs tracking-widest text-muted-foreground uppercase mb-2">
                Explore
              </h3>
              <h2 className="text-2xl md:text-3xl" style={{ fontWeight: 500 }}>
                Navigate the Archive
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Wedding Card */}
              <NavigationCard
                icon={<Heart className="w-5 h-5" />}
                title="Wedding"
                description="우리의 결혼 이야기와 소중한 순간들"
                accent
              />
              
              {/* DevLogs Card */}
              <NavigationCard
                icon={<Code2 className="w-5 h-5" />}
                title="DevLogs"
                description="개발 과정에서 배운 것과 경험한 것들"
              />
              
              {/* About Card */}
              <NavigationCard
                icon={<BookOpen className="w-5 h-5" />}
                title="About"
                description="나에 대한 이야기와 생각들"
              />
              
              {/* Timeline Card */}
              <NavigationCard
                icon={<Clock className="w-5 h-5" />}
                title="Timeline"
                description="시간 순으로 기록된 삶의 흐름"
              />
              
              {/* Projects Card */}
              <NavigationCard
                icon={<Folder className="w-5 h-5" />}
                title="Projects"
                description="만들고 실험한 프로젝트들"
              />
              
              {/* Coming Soon */}
              <div className="border border-dashed border-border rounded-lg p-6 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 transition-colors">
                <p className="text-sm">More sections coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            <div>
              <h3 className="text-xs tracking-widest text-muted-foreground uppercase mb-2">
                Recent
              </h3>
              <h2 className="text-2xl md:text-3xl" style={{ fontWeight: 500 }}>
                Latest Updates
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <FeaturedContentCard
                category="Wedding"
                title="Our Story"
                description="두 사람이 만나 하나의 이야기를 만들어가기까지"
                date="2026.04.15"
              />
              
              <FeaturedContentCard
                category="DevLogs"
                title="Building a Personal Archive"
                description="개인 아카이브 플랫폼을 설계하며 배운 것들"
                date="2026.04.10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Personal Message */}
      <section className="px-4 md:px-8 lg:px-12 py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="space-y-6">
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 italic" style={{ lineHeight: 1.6 }}>
              "기록은 지나간 시간을 남기는 일이기도 하지만,<br className="hidden md:block" />
              앞으로의 나를 만들어가는 일이기도 하다고 생각합니다."
            </p>
          </blockquote>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div className="space-y-3">
              <h4 className="text-lg" style={{ fontWeight: 500 }}>Donghee Archive</h4>
              <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
                A personal platform for recording life, development, and meaningful moments.
              </p>
            </div>
            
            {/* Navigation */}
            <div className="space-y-3">
              <h5 className="text-sm uppercase tracking-wider text-muted-foreground">Navigate</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Wedding</a></li>
                <li><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">DevLogs</a></li>
                <li><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Timeline</a></li>
                <li><a href="#" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Projects</a></li>
              </ul>
            </div>
            
            {/* Info */}
            <div className="space-y-3">
              <h5 className="text-sm uppercase tracking-wider text-muted-foreground">Connect</h5>
              <p className="text-sm text-foreground/80">
                Built with care and intention.<br />
                © 2026 Donghee Archive
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Navigation Card Component
function NavigationCard({ 
  icon, 
  title, 
  description, 
  accent = false 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  accent?: boolean;
}) {
  return (
    <a 
      href="#"
      className={`
        group block p-6 rounded-lg border transition-all
        ${accent 
          ? 'bg-accent/5 border-accent/20 hover:bg-accent/10 hover:border-accent/30' 
          : 'bg-card border-border hover:bg-muted hover:border-muted-foreground/20'
        }
      `}
    >
      <div className="space-y-3">
        <div className={`
          inline-flex p-2.5 rounded-md
          ${accent 
            ? 'bg-accent/10 text-accent' 
            : 'bg-muted text-foreground/70'
          }
        `}>
          {icon}
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-lg group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

// Featured Content Card Component
function FeaturedContentCard({
  category,
  title,
  description,
  date
}: {
  category: string;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <a 
      href="#"
      className="group block bg-card border border-border rounded-lg p-6 md:p-8 hover:border-muted-foreground/20 transition-all"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-accent">
            {category}
          </span>
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl group-hover:text-accent transition-colors" style={{ fontWeight: 500 }}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground" style={{ lineHeight: 1.6 }}>
            {description}
          </p>
        </div>
        
        <div className="flex items-center text-sm text-foreground/70 group-hover:text-foreground transition-colors pt-2">
          <span>Read more</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}
