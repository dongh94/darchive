import { ArrowRight } from "lucide-react";
import { CardLink } from "@/shared/ui";
import type { HomeUpdate } from "../data/home-content";

type UpdateCardProps = {
  update: HomeUpdate;
};

export function UpdateCard({ update }: UpdateCardProps) {
  return (
    <CardLink
      href={update.href}
      className="md:p-8"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-accent">{update.category}</span>
          <span className="text-xs text-muted-foreground">{update.date}</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-medium transition-colors group-hover:text-accent">{update.title}</h3>
          <p className="text-sm leading-6 text-muted-foreground">{update.description}</p>
        </div>

        <div className="flex items-center pt-2 text-sm text-foreground/70 transition-colors group-hover:text-foreground">
          <span>Read more</span>
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </CardLink>
  );
}
