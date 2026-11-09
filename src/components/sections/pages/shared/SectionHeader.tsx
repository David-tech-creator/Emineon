import type { ReactNode } from "react";
import type { Headline } from "@/content";
import { cn } from "@/lib/cn";
import { Eyebrow, Heading, Reveal } from "@/components/ui";

type SectionHeaderProps = {
  eyebrow: string;
  index?: string;
  title: Headline | string;
  lead?: string;
  /** Right-aligned slot on desktop (e.g. a "View all" link). */
  action?: ReactNode;
  /** "split" (default): eyebrow left column, heading right. "stacked": all in one column. */
  layout?: "split" | "stacked";
  size?: "h2" | "h3";
  id?: string;
  className?: string;
};

/** Eyebrow + heading (one accent word) + optional lead. Use at the top of every section. */
export function SectionHeader({ eyebrow, index, title, lead, action, layout = "split", size = "h2", id, className }: SectionHeaderProps) {
  if (layout === "stacked") {
    return (
      <div className={cn("max-w-[64rem]", className)}>
        <Reveal y={8}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <Heading id={id} title={title} size={size} className="mt-6 max-w-[20ch] text-balance" />
        {lead && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[60ch] text-lead text-fg-muted">{lead}</p>
          </Reveal>
        )}
        {action && <div className="mt-8">{action}</div>}
      </div>
    );
  }
  return (
    <div className={cn("grid grid-cols-4 gap-x-[var(--gutter)] gap-y-6 md:grid-cols-12", className)}>
      <div className="col-span-4 md:col-span-3">
        <Reveal y={8}>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
      </div>
      <div className="col-span-4 md:col-span-9">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Heading id={id} title={title} size={size} className="max-w-[20ch] text-balance" />
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {lead && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[60ch] text-lead text-fg-muted">{lead}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
