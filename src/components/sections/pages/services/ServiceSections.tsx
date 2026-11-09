import Link from "next/link";
import type { Headline, Service, TitledText } from "@/content";
import { localizedHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Arrow, Card, CardGrid, MediaFrame, Reveal, Section, type ImageAsset, type SectionTone } from "@/components/ui";
import { Icon } from "@/components/icons";
import { SectionHeader } from "../shared/SectionHeader";

/* ------------------------------------------------------------------ */
/* Services index: large numbered rows                                 */
/* ------------------------------------------------------------------ */

export function ServiceIndexList({ locale, services, ctaLabel }: { locale: Locale; services: Service[]; ctaLabel: string }) {
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 0.05} className="border-b border-line">
          <Link
            href={localizedHref(locale, `/services/${s.slug}`)}
            className="group/row relative grid grid-cols-4 items-start gap-x-[var(--gutter)] gap-y-4 py-10 md:grid-cols-12 md:py-12"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/row:scale-x-100"
            />
            <span className="col-span-1 font-mono text-[13px] text-fg-dim tabular md:col-span-1 md:pt-3">{s.index}</span>
            <span className="col-span-3 flex justify-end md:order-last md:col-span-1 md:pt-2">
              <Icon name={s.icon} size={36} accent className="text-fg-muted transition-colors duration-300 group-hover/row:text-fg" />
            </span>
            <span className="col-span-4 md:col-span-5">
              <span className="block text-h2 font-medium leading-[0.98] tracking-[-0.035em] text-fg transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/row:translate-x-2">
                {s.name}
              </span>
            </span>
            <span className="col-span-4 md:col-span-5 md:pt-2">
              <span className="block max-w-[52ch] text-[16px] leading-relaxed text-fg-muted">{s.short}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-[14px] text-fg transition-colors duration-200 group-hover/row:text-ember-ink">
                {ctaLabel}
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/row:translate-x-1" />
              </span>
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

export function ProblemSection({
  id,
  eyebrow,
  index,
  title,
  paragraphs,
  image,
  tone = "dark",
}: {
  id?: string;
  eyebrow: string;
  index?: string;
  title: string;
  paragraphs: string[];
  image?: ImageAsset;
  tone?: SectionTone;
}) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
        <div className="col-span-4 md:col-span-5">
          <SectionHeader eyebrow={eyebrow} index={index} title={title} layout="stacked" />
          {image && (
            <Reveal delay={0.2} className="mt-12 hidden md:block">
              <MediaFrame image={image} alt="" ratio="aspect-[4/5]" sizes="(min-width: 1024px) 36vw, 100vw" />
            </Reveal>
          )}
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-7 md:pt-16">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className={cn("text-fg-muted", i === 0 ? "text-lead text-fg" : "mt-8 text-[17px] leading-[1.7]")}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* What we deliver: numbered 2x2 grid                                  */
/* ------------------------------------------------------------------ */

export function DeliverGrid({
  id,
  eyebrow,
  index,
  title,
  items,
  tone = "dark",
}: {
  id?: string;
  eyebrow: string;
  index?: string;
  title: Headline | string;
  items: TitledText[];
  tone?: SectionTone;
}) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeader eyebrow={eyebrow} index={index} title={title} />
      <CardGrid className="mt-14 grid-cols-1 md:mt-20 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06} className="flex">
            <Card padding="lg" className="w-full">
              <span className="font-mono text-[13px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-h3 font-medium text-fg md:mt-16">{it.title}</h3>
              <p className="mt-4 max-w-[48ch] text-[16px] leading-relaxed text-fg-muted">{it.text}</p>
            </Card>
          </Reveal>
        ))}
      </CardGrid>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverables checklist                                              */
/* ------------------------------------------------------------------ */

export function DeliverablesList({
  id,
  eyebrow,
  index,
  title,
  items,
  image,
  tone = "dark",
}: {
  id?: string;
  eyebrow: string;
  index?: string;
  title: Headline | string;
  items: string[];
  image?: ImageAsset;
  tone?: SectionTone;
}) {
  return (
    <Section id={id} tone={tone}>
      <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
        <div className="col-span-4 md:col-span-5">
          <SectionHeader eyebrow={eyebrow} index={index} title={title} layout="stacked" />
          {image && (
            <Reveal delay={0.15} className="mt-12">
              <MediaFrame image={image} alt="" ratio="aspect-[3/2]" sizes="(min-width: 1024px) 36vw, 100vw" />
            </Reveal>
          )}
        </div>
        <ol className="col-span-4 border-t border-line md:col-span-6 md:col-start-7">
          {items.map((d, i) => (
            <Reveal as="li" key={d} delay={i * 0.05} className="flex items-baseline gap-6 border-b border-line py-6">
              <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 text-[18px] leading-snug text-fg">{d}</span>
              <span aria-hidden className="size-[5px] shrink-0 translate-y-[-2px] rounded-full bg-fg-dim" />
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Compact list of other services                                      */
/* ------------------------------------------------------------------ */

export function OtherServices({
  locale,
  eyebrow,
  title,
  services,
}: {
  locale: Locale;
  eyebrow: string;
  title: Headline | string;
  services: Service[];
}) {
  return (
    <Section spacing="tight" divider>
      <SectionHeader eyebrow={eyebrow} title={title} size="h3" />
      <CardGrid className="mt-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.slug} href={localizedHref(locale, `/services/${s.slug}`)} className="group min-h-[180px]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] text-fg-dim tabular">{s.index}</span>
              <Icon name={s.icon} size={24} accent className="text-fg-muted group-hover:text-fg" />
            </div>
            <span className="mt-auto flex items-end justify-between gap-4 pt-10">
              <span className="text-[20px] font-medium leading-tight text-fg">{s.name}</span>
              <Arrow className="mb-1 shrink-0 text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember-ink" />
            </span>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
