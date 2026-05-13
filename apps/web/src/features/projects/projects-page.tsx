import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import {
  educationItems,
  projectContexts,
  projectGroups,
  projectSkills,
  projectsHero,
  skillCards,
  type ProjectItem,
} from "./data/projects-content";

const toneClassNames = {
  dark: "bg-[#0f6f3d] text-white",
  light: "bg-white text-[#122016]",
  accent: "bg-[#eaf7ee] text-[#122016]",
} satisfies Record<ProjectItem["tone"], string>;

export function ProjectsPage() {
  return (
    <main id="top" className="projects-page min-h-screen bg-[#f4fbf6] text-[#122016]" tabIndex={-1}>
      <Link className="projects-skip-link" href="#projects">
        본문 바로가기
      </Link>
      <HeroSection />
      <SkillStrip />
      <ContextSection />
      <FeaturedProjectsSection />
      <EducationSection />
      <SkillsSection />
    </main>
  );
}

function HeroSection() {
  const { contact } = projectsHero;

  return (
    <section className="projects-section-band flex min-h-screen items-center bg-[#0f6f3d] text-white">
      <div className="w-full">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-black text-white/70 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          D-Archive
        </Link>
        <p className="projects-eyebrow text-[#d9f99d]">{projectsHero.eyebrow}</p>
        <h1 className="projects-balanced-title mb-6 max-w-7xl text-5xl font-black leading-tight tracking-normal md:text-7xl xl:text-8xl">
          {projectsHero.title}
        </h1>
        <p className="max-w-4xl text-lg leading-relaxed text-white/70 md:text-xl">{projectsHero.description}</p>

        <div id="contact" className="mt-10 grid max-w-5xl gap-7 rounded-lg border border-white/15 bg-white/5 p-6 md:grid-cols-[1fr_auto] md:p-8">
          <div>
            <p className="projects-eyebrow mb-2 text-[#d9f99d]">Contact</p>
            <h2 className="mb-3 text-3xl font-black md:text-5xl">{contact.name}</h2>
            <p className="max-w-xl text-base leading-relaxed text-white/70">{contact.description}</p>
          </div>
          <div className="flex flex-wrap content-start items-start gap-3 md:justify-end">
            {contact.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {link.label}
                {link.external ? <ExternalLink className="h-3.5 w-3.5" /> : null}
              </Link>
            ))}
            <span className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-black text-white">
              {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillStrip() {
  return (
    <section className="grid auto-cols-[minmax(130px,1fr)] grid-flow-col overflow-x-auto bg-[#0f6f3d]" aria-label="핵심 역량">
      {projectSkills.map((skill) => (
        <p key={skill} className="m-0 grid min-h-[72px] place-items-center border-r border-[#0f6f3d]/10 bg-white px-5 font-black text-[#0f6f3d]">
          {skill}
        </p>
      ))}
    </section>
  );
}

function ContextSection() {
  return (
    <section className="grid gap-px bg-[#34a853]/20 lg:grid-cols-3" aria-label="프로젝트 경험 맥락">
      {projectContexts.map((context) => (
        <article key={context.title} className="min-h-44 bg-white p-7 md:p-9">
          <span className="mb-5 inline-flex rounded-lg text-xs font-black uppercase text-[#0f6f3d]">{context.label}</span>
          <h2 className="mb-2 text-2xl font-black md:text-3xl">{context.title}</h2>
          <p className="m-0 font-bold text-[#66717f]">{context.description}</p>
        </article>
      ))}
    </section>
  );
}

function FeaturedProjectsSection() {
  return (
    <section id="projects" className="projects-section-band bg-[#f4fbf6]">
      <SectionHeading
        eyebrow="Featured Work"
        title="프론트엔드 구현 경험을 보여주는 프로젝트"
        description="실무 프로젝트와 교육 과정 프로젝트를 구분해, 문제를 이해하고 화면으로 완성해 온 과정을 정리했습니다."
      />

      <div className="grid gap-14">
        {projectGroups.map((group) => (
          <div key={group.title} className="grid gap-6">
            <div className="grid max-w-5xl grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#0f6f3d] font-black text-white">{group.number}</span>
              <div>
                <h3 className="mb-2 text-3xl font-black">{group.title}</h3>
                <p className="m-0 leading-relaxed text-[#66717f]">{group.description}</p>
              </div>
            </div>

            {group.projects.map((project) => (
              <ProjectFeature key={project.title} project={project} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectFeature({ project }: { project: ProjectItem }) {
  const isDark = project.tone === "dark";

  return (
    <article className={cn("overflow-hidden rounded-lg border border-black/10 p-7 shadow-[0_24px_70px_rgba(18,23,31,0.12)] md:p-12", toneClassNames[project.tone])}>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#34a853] font-black text-white">{project.number}</span>
        <p className={cn("m-0 text-sm font-black", isDark ? "text-white/70" : "text-[#66717f]")}>{project.kicker}</p>
      </div>

      <h3 className="mb-3 text-4xl font-black md:text-5xl">{project.title}</h3>
      <div className={cn("mb-5 inline-flex rounded-lg px-3 py-2 text-xs font-black", isDark ? "bg-white/15 text-[#d9f99d]" : "bg-[#34a853]/10 text-[#0f6f3d]")}>
        {project.context}
      </div>
      <p className={cn("max-w-4xl text-base leading-relaxed md:text-lg", isDark ? "text-white/70" : "text-[#66717f]")}>{project.description}</p>

      {project.highlights ? (
        <ul className={cn("my-6 grid gap-2 pl-0", isDark ? "text-white/70" : "text-[#66717f]")}>
          {project.highlights.map((highlight) => (
            <li key={highlight} className="relative list-none pl-5 leading-relaxed before:absolute before:left-0 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-[#34a853]">
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className={cn("rounded-lg px-3 py-2 text-xs font-black", isDark ? "bg-white/15 text-white" : "bg-[#34a853]/10 text-[#0f6f3d]")}>
            {tag}
          </span>
        ))}
      </div>

      <ScreenshotStrip project={project} />
    </article>
  );
}

function ScreenshotStrip({ project }: { project: ProjectItem }) {
  return (
    <div
      className={cn(
        "mt-8 grid gap-3 max-lg:flex max-lg:overflow-x-auto max-lg:pb-2",
        project.screenshotLayout === "square" ? "grid-cols-3" : "grid-cols-4",
      )}
      aria-label={`${project.title} 실제 실행 화면`}
    >
      {project.screenshots.map((screenshot) => (
        <figure
          key={screenshot.src}
          className={cn(
            "m-0 overflow-hidden rounded-lg border bg-white/70 max-lg:w-[min(72vw,230px)] max-lg:shrink-0",
            project.tone === "dark" ? "border-white/15 bg-white/10" : "border-black/10",
            project.screenshotLayout === "square" ? "relative aspect-square" : "",
          )}
        >
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={420}
            height={project.screenshotLayout === "square" ? 420 : 650}
            className={cn("w-full object-cover object-top", project.screenshotLayout === "square" ? "h-full aspect-square" : "aspect-[9/14]")}
          />
          <figcaption
            className={cn(
              "text-center text-xs font-black",
              project.screenshotLayout === "square"
                ? "absolute bottom-2 left-2 right-2 rounded-lg bg-white/85 px-2 py-2 text-[#12171f]"
                : "px-2 py-3",
              project.tone === "dark" && project.screenshotLayout !== "square" ? "text-white/80" : "text-[#12171f]",
            )}
          >
            {screenshot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function EducationSection() {
  return (
    <section id="education" className="projects-section-band bg-white">
      <SectionHeading
        eyebrow="Education History"
        title="교육 과정을 통해 프로젝트 기반 개발 경험을 확장했습니다."
        description="프론트엔드 서비스 구현, 알고리즘과 웹 개발, 데이터 분석까지 단계별로 학습하며 실제 프로젝트 수행 경험을 쌓았습니다."
      />

      <div className="overflow-hidden rounded-lg border border-black/10 bg-black/10">
        {educationItems.map((education) => (
          <article key={education.title} className="grid gap-5 border-b border-[#34a853]/15 bg-[#f4fbf6] p-5 last:border-b-0 lg:grid-cols-[48px_minmax(0,1fr)] lg:items-center">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#0f6f3d] text-sm font-black text-white">{education.index}</div>
            <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.9fr)_minmax(320px,1.15fr)_minmax(260px,1fr)] lg:items-center">
              <div>
                <p className="mb-1 text-xs font-black uppercase text-[#0f6f3d]">{education.type}</p>
                <div className="flex flex-wrap items-start gap-3">
                  <h3 className="m-0 text-xl font-black md:text-2xl">{education.title}</h3>
                  <span className="rounded-lg bg-[#34a853]/10 px-3 py-1.5 text-xs font-black text-[#0f6f3d]">{education.status}</span>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {education.meta.map(([label, value]) => (
                  <p key={label} className="m-0 rounded-lg bg-white/70 p-3 text-sm font-black">
                    <span className="mb-1 block text-[11px] font-black text-[#66717f]">{label}</span>
                    {value}
                  </p>
                ))}
              </div>
              <p className="m-0 text-sm leading-relaxed text-[#66717f]">{education.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="projects-section-band bg-[#0f6f3d] text-white">
      <SectionHeading eyebrow="Frontend Skill Set" title="화면을 만드는 기술보다 흐름을 완성하는 기술에 집중합니다." isDark />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {skillCards.map((skill) => (
          <article key={skill.title} className="min-h-64 rounded-lg border border-white/15 bg-white/5 p-6">
            <h3 className="mb-4 text-2xl font-black">{skill.title}</h3>
            <p className="m-0 leading-relaxed text-white/70">{skill.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  isDark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  isDark?: boolean;
}) {
  return (
    <div className="mb-12 max-w-7xl">
      <p className={cn("projects-eyebrow", isDark ? "text-[#d9f99d]" : "text-[#0f6f3d]")}>{eyebrow}</p>
      <h2 className="projects-balanced-title mb-4 text-4xl font-black leading-tight md:text-5xl">{title}</h2>
      {description ? <p className={cn("m-0 max-w-4xl text-lg leading-relaxed", isDark ? "text-white/70" : "text-[#66717f]")}>{description}</p> : null}
    </div>
  );
}
