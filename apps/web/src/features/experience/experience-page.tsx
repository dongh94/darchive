import Link from "next/link";
import { ArrowLeft, Briefcase, Building2, CheckCircle2, Cloud, Network, PanelsTopLeft } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { coreCompetencies, experienceContent, experienceProjects, type ExperienceProject } from "./data/experience-content";

const focusMetrics = [
  { label: "Company", value: experienceContent.company, icon: Building2 },
  { label: "Role", value: experienceContent.role, icon: Briefcase },
  { label: "Domain", value: "Cloud Platform", icon: Cloud },
  { label: "Focus", value: "Console & Architecture", icon: PanelsTopLeft },
] as const;

export function ExperiencePage() {
  return (
    <main className="experience-page min-h-screen bg-[#f7f8fb] text-[#111827]">
      <HeroSection />
      <ProjectsTimeline />
      <CompetencySection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="px-5 pb-16 pt-10 md:px-12 md:pb-24 md:pt-14">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#4b5563] transition-colors hover:text-[#111827]">
          <ArrowLeft className="h-4 w-4" />
          D-Archive
        </Link>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#2563eb]">Experience</p>
            <h1 className="max-w-5xl text-4xl font-black leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
              클라우드 콘솔과 제품 개발 구조를 함께 개선해 온 프론트엔드 경험.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#4b5563]">{experienceContent.summary}</p>
          </div>

          <aside className="rounded-lg border border-[#d9e0ea] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#94a3b8]">Current</p>
                <h2 className="mt-2 text-3xl font-black">{experienceContent.company}</h2>
              </div>
              <span className="rounded-lg bg-[#111827] px-3 py-2 text-sm font-bold text-white">{experienceContent.period}</span>
            </div>
            <p className="text-lg font-bold text-[#2563eb]">{experienceContent.role}</p>
          </aside>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {focusMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div key={metric.label} className="rounded-lg border border-[#d9e0ea] bg-white p-5">
                <Icon className="mb-5 h-5 w-5 text-[#2563eb]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8]">{metric.label}</p>
                <p className="mt-2 text-lg font-black">{metric.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectsTimeline() {
  return (
    <section className="border-y border-[#d9e0ea] bg-white px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#2563eb]">Major Projects</p>
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">주요 프로젝트</h2>
          <p className="mt-4 text-lg leading-8 text-[#4b5563]">
            최근 아키텍처 개선과 디자인 시스템 업무부터 클라우드 자원 관리 콘솔, 레거시 마이그레이션까지 시간순으로 정리했습니다.
          </p>
        </div>

        <div className="grid gap-6">
          {experienceProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ExperienceProject }) {
  return (
    <article className="grid gap-0 overflow-hidden rounded-lg border border-[#d9e0ea] bg-[#f8fafc] lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="border-b border-[#d9e0ea] bg-[#111827] p-6 text-white lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#2563eb] text-sm font-black">{project.number}</span>
          <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/80">{project.period}</span>
        </div>
        <h3 className="text-2xl font-black leading-tight">{project.title}</h3>
      </div>

      <div className="grid gap-7 p-6 md:p-8">
        <InfoBlock title="프로젝트 개요" body={project.overview} />
        <InfoBlock title="담당 역할" body={project.role} />

        <div>
          <h4 className="mb-3 text-sm font-black uppercase tracking-widest text-[#64748b]">사용 기술</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span key={technology} className="rounded-lg border border-[#d9e0ea] bg-white px-3 py-2 text-xs font-bold text-[#334155]">
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-black uppercase tracking-widest text-[#64748b]">주요 수행 업무 및 성과</h4>
          <ul className="grid gap-3">
            {project.achievements.map((achievement) => (
              <li key={achievement} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 text-sm leading-6 text-[#334155] md:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#2563eb]" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-black uppercase tracking-widest text-[#64748b]">{title}</h4>
      <p className="m-0 text-base leading-7 text-[#334155]">{body}</p>
    </div>
  );
}

function CompetencySection() {
  return (
    <section className="px-5 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div>
            <div className="mb-5 inline-flex rounded-lg bg-[#dbeafe] p-3 text-[#2563eb]">
              <Network className="h-6 w-6" />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#2563eb]">Core Competencies</p>
            <h2 className="text-4xl font-black tracking-tight md:text-5xl">핵심 역량 요약</h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {coreCompetencies.map((competency, index) => (
              <div
                key={competency}
                className={cn(
                  "rounded-lg border border-[#d9e0ea] bg-white p-5 text-sm font-semibold leading-6 text-[#334155] shadow-sm",
                  index === 0 || index === 1 ? "md:col-span-2" : "",
                )}
              >
                {competency}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
