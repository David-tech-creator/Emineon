/**
 * Building blocks of the SEO/GEO landing pages (country, Geneva, governance,
 * FAQ) and the fact block. Everything here is server-rendered text: the facts
 * engines quote must be in the HTML, not in a canvas or a client component.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import type { FactItem, Headline, IconKey, Locale, TitledText } from "@/content";
import { formatDate } from "@/content";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Arrow, Card, CardGrid, Reveal, Section, type SectionTone } from "@/components/ui";
import { Icon } from "@/components/icons";
import { SectionHeader } from "../shared/SectionHeader";

/** "Updated 9 November 2026": visible freshness signal on landing pages. */
export function UpdatedStamp({ locale, label, iso, className }: { locale: Locale; label: string; iso: string; className?: string }) {
  return (
    <p className={cn("font-mono text-[12px] tracking-[0.12em] text-fg-dim uppercase", className)}>
      {label} <time dateTime={iso}>{formatDate(locale, iso)}</time>
    </p>
  );
}

/** "Emineon at a glance": a definition sentence plus a <dl> of facts (same facts as llms.txt). */
export function FactBlock({
  eyebrow,
  title,
  definition,
  items,
  tone = "carbon",
  index,
  id = "at-a-glance",
}: {
  eyebrow: string;
  title: Headline;
  definition: string;
  items: FactItem[];
  tone?: SectionTone;
  index?: string;
  id?: string;
}) {
  return (
    <Section tone={tone} id={id} divider>
      <SectionHeader eyebrow={eyebrow} index={index} title={title} />
      <div className="mt-12 grid grid-cols-4 gap-x-[var(--gutter)] md:mt-16 md:grid-cols-12">
        <Reveal className="col-span-4 md:col-span-9 md:col-start-4">
          <p className="max-w-[62ch] text-lead text-fg">{definition}</p>
        </Reveal>
      </div>
      <dl className="mt-12 grid grid-cols-1 border-t border-line md:mt-16 md:grid-cols-2">
        {items.map((f) => (
          <div key={f.label} className="grid grid-cols-[8.5rem_1fr] gap-x-5 border-b border-line py-5 md:grid-cols-[11rem_1fr] md:odd:pr-8 md:even:border-l md:even:pl-8">
            <dt className="eyebrow pt-1 text-fg-dim">{f.label}</dt>
            <dd className="text-[16px] leading-relaxed text-pretty text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/** Numbered text cards (checklists, Swiss specifics, on-site points). */
export function TextCards({ items, columns = 3, icons }: { items: TitledText[]; columns?: 2 | 3; icons?: IconKey[] }) {
  return (
    <CardGrid className={cn("grid-cols-1 md:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.05} className="flex">
          <Card padding="lg" className="w-full">
            <div className="flex items-start justify-between">
              {icons?.[i] ? <Icon name={icons[i]} size={32} accent className="text-fg" /> : <span />}
              <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-10 text-h3 font-medium text-balance text-fg">{it.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{it.text}</p>
          </Card>
        </Reveal>
      ))}
    </CardGrid>
  );
}

/** Plain bordered table; scrolls horizontally on small screens. Engines lift tables well. */
export function DataTable({ caption, head, rows }: { caption?: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <Reveal className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
      <table className="w-full min-w-[720px] border-collapse border border-line text-left">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-[color-mix(in_oklab,var(--bg),var(--fg)_4%)]">
            {head.map((h) => (
              <th key={h} scope="col" className="eyebrow border-b border-line px-5 py-4 align-bottom font-normal text-fg-dim">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-b-0">
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="px-5 py-5 align-top text-[16px] font-medium text-fg">
                    {c}
                  </th>
                ) : (
                  <td key={j} className="px-5 py-5 align-top text-[15px] leading-relaxed text-fg-muted">
                    {c}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

/** Indexed list of link rows: title + one line + arrow (services on landing pages). */
export function LinkRows({ items }: { items: { href: string; index?: string; title: string; text: string; icon?: IconKey }[] }) {
  return (
    <ol className="border-t border-line">
      {items.map((it, i) => (
        <Reveal as="li" key={it.href} delay={i * 0.04}>
          <Link
            href={it.href}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 border-b border-line py-6 transition-colors hover:bg-[color-mix(in_oklab,var(--bg),var(--fg)_3%)] md:grid-cols-[4rem_minmax(0,22rem)_1fr_auto] md:py-8"
          >
            <span className="font-mono text-[12px] text-fg-dim tabular">{it.index ?? String(i + 1).padStart(2, "0")}</span>
            <span className="text-[20px] font-medium tracking-[-0.015em] text-fg md:text-[24px]">{it.title}</span>
            <span className="col-span-2 col-start-2 mt-2 text-fg-muted md:col-span-1 md:col-start-3 md:mt-0">{it.text}</span>
            <Arrow className="row-start-1 col-start-3 size-4 self-center text-fg-dim transition-colors group-hover:text-ember-ink md:col-start-4" />
          </Link>
        </Reveal>
      ))}
    </ol>
  );
}

/**
 * Contextual internal links with descriptive anchors (SEO-PLAN §10): placed
 * before the closing CTA on service, industry, case, insight and company pages.
 * `links` hrefs are locale-less.
 */
export function RelatedLinks({ locale, label, links }: { locale: Locale; label: string; links: { label: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <Section spacing="tight" divider aria-label={label}>
      <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:gap-12">
        <p className="eyebrow shrink-0 text-fg-dim">[ {label} ]</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={localizedHref(locale, l.href)} className="group inline-flex items-center gap-2 text-[17px] text-fg transition-colors hover:text-ember-ink">
                {l.label}
                <Arrow className="size-3.5 text-fg-dim transition-colors group-hover:text-ember-ink" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
