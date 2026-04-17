type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h3 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</h3>
      {title ? <h2 className="text-2xl font-medium md:text-3xl">{title}</h2> : null}
    </div>
  );
}
