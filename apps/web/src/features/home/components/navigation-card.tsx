import { ArrowRight } from "lucide-react";
import { CardLink } from "@/shared/ui";
import type { HomeNavigationItem } from "../data/home-content";

type NavigationCardProps = {
  item: HomeNavigationItem;
};

export function NavigationCard({ item }: NavigationCardProps) {
  const Icon = item.icon;

  return (
    <CardLink
      href={item.href}
      accent={item.accent}
    >
      <div className="space-y-3">
        <div className={`inline-flex rounded-md p-2.5 ${item.accent ? "bg-accent/10 text-accent" : "bg-muted text-foreground/70"}`}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg font-medium transition-colors group-hover:text-accent">{item.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
        </div>

        <div className="flex items-center text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          <span>Explore</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </CardLink>
  );
}
