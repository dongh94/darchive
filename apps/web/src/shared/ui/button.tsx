import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonProps = ButtonBaseProps & Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps>;

type ButtonLinkProps = ButtonBaseProps & Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps>;

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-muted",
};

const buttonBaseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

export function Button({ children, className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonBaseClassName, buttonVariants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ children, className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonBaseClassName, buttonVariants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
