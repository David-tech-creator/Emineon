import type { Headline } from "@/content/schema";
import { Button, Eyebrow, Heading, Reveal } from "@/components/ui";
import { cn } from "@/lib/cn";

type SectionIntroProps = {
  eyebrow: string;
  title: Headline;
  lead?: string;
  /** Already-localized CTA. */
  cta?: { label: string; href: string };
  id?: string;
  className?: string;
  /** "split" = heading left, lead + CTA right (desktop). "stack" = everything in one column. */
  layout?: "split" | "stack";
  headingClassName?: string;
};

/** Eyebrow → heading (one accent word) → lead → ghost CTA. Shared by every home section. */
export function SectionIntro({ eyebrow, title, lead, cta, id, className, layout = "split", headingClassName }: SectionIntroProps) {
  if (layout === "stack") {
    return (
      <div className={cn("max-w-3xl", className)}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading id={id} title={title} className={cn("mt-6", headingClassName)} />
        {lead && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lead text-fg-muted">{lead}</p>
          </Reveal>
        )}
        {cta && (
          <Reveal delay={0.16} className="mt-8">
            <Button href={cta.href} variant="ghost">
              {cta.label}
            </Button>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={cn("grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-8", className)}>
      <div className="md:col-span-7">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading id={id} title={title} className={cn("mt-6 max-w-[16ch]", headingClassName)} />
      </div>
      {(lead || cta) && (
        <div className="flex flex-col justify-end md:col-span-5 md:col-start-8">
          {lead && (
            <Reveal delay={0.1}>
              <p className="text-lead text-fg-muted">{lead}</p>
            </Reveal>
          )}
          {cta && (
            <Reveal delay={0.16} className="mt-6">
              <Button href={cta.href} variant="ghost">
                {cta.label}
              </Button>
            </Reveal>
          )}
        </div>
      )}
    </div>
  );
}
