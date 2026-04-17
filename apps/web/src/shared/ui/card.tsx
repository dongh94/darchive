import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  interactive?: boolean;
};

type CardLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  accent?: boolean;
};

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card",
        interactive && "transition-all hover:border-muted-foreground/20 hover:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardLink({ children, className, accent = false, ...props }: CardLinkProps) {
  return (
    <Link
      className={cn(
        "group block rounded-lg border p-6 transition-all",
        accent
          ? "border-accent/20 bg-accent/5 hover:border-accent/30 hover:bg-accent/10"
          : "border-border bg-card hover:border-muted-foreground/20 hover:bg-muted",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
