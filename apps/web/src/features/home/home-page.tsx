import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, Card, SectionHeading } from "@/shared/ui";
import { NavigationCard } from "./components/navigation-card";
import { UpdateCard } from "./components/update-card";
import { archiveNavigation, heroActions, homeContent, latestUpdates } from "./data/home-content";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IntroSection />
      <ArchiveNavigationSection />
      <LatestUpdatesSection />
      <QuoteSection />
      <HomeFooter />
    </div>
  );
}

function HeroSection() {
  const { hero } = homeContent;

  return (
    <section className="px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20 lg:px-12 lg:pb-32 lg:pt-28">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">{hero.eyebrow}</p>
            <h1 className="text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl">{hero.title}</h1>
          </div>

          <h2 className="text-xl leading-relaxed text-foreground/90 md:text-2xl lg:text-3xl">{hero.headline}</h2>

          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">{hero.description}</p>

          <div className="flex flex-wrap gap-3 pt-4 md:gap-4">
            {heroActions.map((action) => {
              const Icon = action.icon;

              return (
                <ButtonLink
                  key={action.title}
                  href={action.href}
                  variant={action.accent ? "primary" : "secondary"}
                >
                  <Icon className="h-4 w-4" />
                  {action.title}
                  {action.title === "About" ? <ArrowRight className="h-4 w-4" /> : null}
                </ButtonLink>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const { intro } = homeContent;

  return (
    <section className="border-y border-border bg-card px-4 py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground">{intro.eyebrow}</h3>
          <p className="text-lg leading-8 text-foreground/80 md:text-xl">{intro.body}</p>
        </div>
      </div>
    </section>
  );
}

function ArchiveNavigationSection() {
  return (
    <section className="px-4 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8 md:space-y-12">
          <SectionHeading eyebrow="Explore" title="Navigate the Archive" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {archiveNavigation.map((item) => (
              <NavigationCard key={item.title} item={item} />
            ))}

            <Card className="flex items-center justify-center border-dashed p-6 text-muted-foreground transition-colors hover:border-muted-foreground/50">
              <p className="text-sm">More sections coming soon...</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestUpdatesSection() {
  return (
    <section className="bg-muted/30 px-4 py-16 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-8 md:space-y-12">
          <SectionHeading eyebrow="Recent" title="Latest Updates" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {latestUpdates.map((update) => (
              <UpdateCard key={`${update.category}-${update.title}`} update={update} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <blockquote className="space-y-6">
          <p className="text-xl italic leading-relaxed text-foreground/90 md:text-2xl lg:text-3xl">
            &ldquo;{homeContent.quote}&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}

function HomeFooter() {
  const { footer } = homeContent;

  return (
    <footer className="border-t border-border px-4 py-12 md:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div className="space-y-3">
            <h4 className="text-lg font-medium">{footer.brand}</h4>
            <p className="text-sm leading-6 text-muted-foreground">{footer.description}</p>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm uppercase tracking-wider text-muted-foreground">Navigate</h5>
            <ul className="space-y-2">
              {archiveNavigation.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="text-sm uppercase tracking-wider text-muted-foreground">Connect</h5>
            <p className="text-sm text-foreground/80">
              Built with care and intention.
              <br />© 2026 Donghee Archive
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
