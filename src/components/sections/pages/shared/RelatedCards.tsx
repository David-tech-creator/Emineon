import type { ReactNode } from "react";
import type { Headline, IconKey } from "@/content";
import { cn } from "@/lib/cn";
import { Arrow, Card, CardGrid, MediaFrame, Reveal, Section, type ImageAsset, type SectionTone } from "@/components/ui";
import { Icon } from "@/components/icons";
import { SectionHeader } from "./SectionHeader";

export type RelatedItem = {
  /** Already-localized href. */
  href: string;
  title: string;
  /** Small mono label above the title (sector, category, index...). */
  kicker?: string;
  text?: string;
  image?: ImageAsset;
  icon?: IconKey;
  /** Mono metrics row, e.g. [{ value: "-62%", label: "cycle time" }]. */
  metrics?: { value: string; label: string }[];
  /** Footer label next to the arrow (e.g. "Read case"). */
  cta?: string;
};

type RelatedCardsGridProps = {
  items: RelatedItem[];
  /** Columns on desktop (default: min(items, 3)). */
  columns?: 2 | 3 | 4;
  className?: string;
};

const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

/** Bordered grid of link cards (image / icon / kicker / title / text / metrics / arrow). */
export function RelatedCardsGrid({ items, columns, className }: RelatedCardsGridProps) {
  const cols = columns ?? (Math.min(Math.max(items.length, 2), 3) as 2 | 3);
  return (
    <CardGrid className={cn("grid-cols-1", colClass[cols], className)}>
      {items.map((it, i) => (
        <Reveal key={it.href} delay={i * 0.06} className="flex">
          <Card href={it.href} padding="none" className="group w-full">
            {it.image && (
              <MediaFrame image={it.image} alt="" ratio="aspect-[3/2]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
            )}
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                {it.kicker ? <span className="eyebrow text-fg-dim">{it.kicker}</span> : <span />}
                {it.icon && <Icon name={it.icon} size={28} accent className="text-fg-muted transition-colors duration-300 group-hover:text-fg" />}
              </div>
              <h3 className="mt-5 text-h3 font-medium text-balance text-fg">{it.title}</h3>
              {it.text && <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{it.text}</p>}
              {it.metrics && it.metrics.length > 0 && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                  {it.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <dd className="text-2xl font-medium tracking-[-0.03em] text-fg tabular">{m.value}</dd>
                      <dt className="mt-1 text-[13px] leading-snug text-fg-muted">{m.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
              <div className="mt-auto flex items-center gap-2 pt-8 text-[14px] text-fg-muted transition-colors duration-200 group-hover:text-ember-ink">
                {it.cta && <span>{it.cta}</span>}
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
              </div>
            </div>
          </Card>
        </Reveal>
      ))}
      {/* Fillers so an incomplete last row doesn't show the grid's line colour as a grey cell. */}
      {items.length % 2 !== 0 && (
        <div aria-hidden className={cn("hidden bg-[var(--bg)] md:block", cols !== 2 && "lg:hidden")} />
      )}
      {cols !== 2 && items.length % cols !== 0 && (
        <div
          aria-hidden
          className="hidden bg-[var(--bg)] lg:block"
          style={{ gridColumn: `span ${cols - (items.length % cols)}` }}
        />
      )}
    </CardGrid>
  );
}

type RelatedCardsProps = RelatedCardsGridProps & {
  eyebrow: string;
  index?: string;
  title: Headline | string;
  lead?: string;
  action?: ReactNode;
  tone?: SectionTone;
  id?: string;
};

/** A full section: header + related cards grid. */
export function RelatedCards({ eyebrow, index, title, lead, action, tone = "dark", id, items, columns, className }: RelatedCardsProps) {
  if (items.length === 0) return null;
  return (
    <Section tone={tone} id={id} className={className}>
      <SectionHeader eyebrow={eyebrow} index={index} title={title} lead={lead} action={action} />
      <RelatedCardsGrid items={items} columns={columns} className="mt-14 md:mt-20" />
    </Section>
  );
}
