import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { HomeNavbar } from "./components/home-navbar";
import {
  archiveNavigation,
  footerLinks,
  heroActions,
  homeContent,
  latestUpdates,
  type HomeNavigationItem,
  type HomeUpdate,
} from "./data/home-content";

const accentStyles = {
  blue: {
    text: "text-[#4285f4]",
    background: "bg-[#4285f4]/10",
    solid: "bg-[#4285f4]",
  },
  red: {
    text: "text-[#ea4335]",
    background: "bg-[#ea4335]/10",
    solid: "bg-[#ea4335]",
  },
  yellow: {
    text: "text-[#fbbc05]",
    background: "bg-[#fbbc05]/15",
    solid: "bg-[#fbbc05]",
  },
  green: {
    text: "text-[#34a853]",
    background: "bg-[#34a853]/10",
    solid: "bg-[#34a853]",
  },
} satisfies Record<HomeNavigationItem["accent"], Record<"text" | "background" | "solid", string>>;

const cardSizeStyles = {
  featured: "md:col-span-2 md:row-span-2",
  tall: "md:row-span-2",
  wide: "md:col-span-2",
  standard: "",
} satisfies Record<HomeNavigationItem["size"], string>;

export function HomePage() {
  return (
    <div className="home-page min-h-screen bg-background text-foreground selection:bg-[#4285f4] selection:text-white">
      <HomeNavbar />
      <main>
        <HeroSection />
        <ArchiveSection />
        <RecentUpdatesSection />
      </main>
      <HomeFooter />
    </div>
  );
}

function HeroSection() {
  const { hero } = homeContent;

  return (
    <section className="px-5 pb-20 pt-32 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="home-fade-up inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-[#4285f4]" />
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground/70">{hero.eyebrow}</span>
        </div>

        <h1 className="home-fade-up mt-8 text-5xl font-bold leading-[1.1] tracking-tight [animation-delay:80ms] md:text-7xl lg:text-8xl">
          {hero.title}
          <br />
          <span className="text-[#4285f4]">{hero.highlightedTitle}</span>
        </h1>

        <p className="home-fade-up mx-auto mt-8 max-w-2xl whitespace-pre-line text-lg font-light leading-relaxed text-foreground/60 [animation-delay:160ms] md:text-xl">
          {hero.description}
        </p>

        <div className="home-fade-up mt-10 flex flex-col items-center justify-center gap-4 [animation-delay:240ms] sm:flex-row">
          {heroActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={cn(
                "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-8 py-3 font-semibold transition sm:w-auto",
                action.variant === "primary"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border bg-muted text-foreground hover:bg-border",
              )}
            >
              {action.title}
              {action.variant === "primary" ? <ArrowRight className="h-4.5 w-4.5" /> : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveSection() {
  const { archive } = homeContent;

  return (
    <section id="archive" className="px-5 py-20 pb-36 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-foreground/40">{archive.eyebrow}</h2>
            <p className="font-display text-3xl font-bold tracking-tight">{archive.title}</p>
          </div>
          <Link
            href="#archive"
            className="hidden text-sm font-medium text-foreground/50 underline decoration-[#4285f4] underline-offset-4 transition-colors hover:text-foreground sm:block"
          >
            {archive.action}
          </Link>
        </div>

        <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-6 md:grid-cols-4">
          {archiveNavigation.map((item) => (
            <ArchiveCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({ item }: { item: HomeNavigationItem }) {
  const Icon = item.icon;
  const accent = accentStyles[item.accent];

  return (
    <Link
      href={item.href}
      id={item.href.startsWith("#") ? item.href.slice(1) : undefined}
      className={cn(
        "home-card group relative flex min-h-[260px] flex-col justify-between overflow-hidden p-7",
        cardSizeStyles[item.size],
      )}
    >
      {item.image ? (
        <div className="absolute inset-0 z-0 opacity-10 transition-opacity group-hover:opacity-20">
          <Image src={item.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      ) : null}

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className={cn("rounded-lg p-3", accent.background)}>
            <Icon className={cn("h-6 w-6", accent.text)} />
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-foreground/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-[#4285f4]">
          {item.title}
        </h3>
        <p className="max-w-[220px] text-sm leading-relaxed text-foreground/50">{item.description}</p>
        {item.status ? (
          <span className="mt-5 inline-flex rounded-lg bg-muted px-3 py-2 text-xs font-bold text-foreground/60">{item.status}</span>
        ) : null}
      </div>

      <div className="relative z-10 self-end">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}

function RecentUpdatesSection() {
  return (
    <section className="bg-muted/30 px-5 py-20 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/40">Recent Updates</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {latestUpdates.map((update) => (
            <UpdateCard key={`${update.category}-${update.title}`} update={update} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UpdateCard({ update }: { update: HomeUpdate }) {
  const color = update.category === "Wedding" ? "red" : "blue";
  const accent = accentStyles[color];

  return (
    <Link
      href={update.href}
      className="group flex items-start gap-6 rounded-lg border border-transparent p-6 transition hover:border-border hover:bg-background"
    >
      <div className="flex shrink-0 flex-col items-center">
        <span className="mb-2 text-[10px] font-bold uppercase text-foreground/30">{update.category}</span>
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-sm", accent.solid)}>
          <ExternalLink className="h-5 w-5" />
        </span>
      </div>
      <div>
        <span className="font-mono text-xs text-foreground/40">{update.date}</span>
        <h3 className="mt-1 font-display text-xl font-bold tracking-tight transition-colors group-hover:text-[#4285f4]">
          {update.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/50">{update.description}</p>
      </div>
    </Link>
  );
}

function HomeFooter() {
  const { footer } = homeContent;

  return (
    <footer id="about" className="border-t border-border px-5 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex scale-75 gap-0.5" aria-hidden="true">
            <div className="h-6 w-1.5 rounded-full bg-[#4285f4]" />
            <div className="h-6 w-1.5 rounded-full bg-[#ea4335]" />
            <div className="h-6 w-1.5 rounded-full bg-[#fbbc05]" />
            <div className="h-6 w-1.5 rounded-full bg-[#34a853]" />
          </div>
          <p className="text-sm font-medium text-foreground/50">{footer.copyright}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-foreground/40 md:gap-8">
          {footerLinks.map((link) => (
            <Link key={link.title} href={link.href} className="transition-colors hover:text-foreground">
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="home-pulse h-2 w-2 rounded-full bg-[#34a853]" />
          <span className="text-xs font-medium text-foreground/40">{footer.status}</span>
        </div>
      </div>
    </footer>
  );
}
