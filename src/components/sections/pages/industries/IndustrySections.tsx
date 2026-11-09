import Link from "next/link";
import type { CaseStudy, Industry, Stat } from "@/content";
import { fill } from "@/content";
import { images } from "@/lib/media";
import { localizedHref, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Arrow, Counter, MediaFrame, Reveal, Tag } from "@/components/ui";
import { Icon } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Industry tiles (hub + "other sectors")                              */
/* ------------------------------------------------------------------ */

type TileLabels = { streamsCount: string; explore: string };

export function IndustryTiles({
  locale,
  industries,
  labels,
  size = "lg",
}: {
  locale: Locale;
  industries: Industry[];
  labels: TileLabels;
  size?: "lg" | "sm";
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-px border border-line bg-line", size === "lg" ? "md:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3")}>
      {industries.map((ind, i) => (
        <Reveal key={ind.slug} delay={i * 0.06} className="flex">
          <Link
            href={localizedHref(locale, `/industries/${ind.slug}`)}
            className="group relative flex w-full flex-col bg-[var(--bg)] text-fg"
          >
            <MediaFrame
              image={images[ind.image]}
              alt=""
              ratio={size === "lg" ? "aspect-[4/3]" : "aspect-[16/10]"}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            >
              <div className="flex items-start justify-between p-4 md:p-5">
                <span className="flex size-12 items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 group-hover:border-ember">
                  <Icon name={ind.icon} size={24} accent />
                </span>
                <span className="rounded-[2px] border border-line bg-paper px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink uppercase">
                  {fill(labels.streamsCount, { n: ind.valueStreams.length })}
                </span>
              </div>
            </MediaFrame>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className={cn("font-medium leading-[1.02] tracking-[-0.03em] text-fg", size === "lg" ? "text-h3" : "text-[22px]")}>
                {ind.name}
              </h3>
              {size === "lg" && <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-fg-muted">{ind.short}</p>}
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] text-fg transition-colors duration-200 group-hover:text-ember-ink">
                {labels.explore}
                <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
              </span>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
            />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Value-stream matrix (hub)                                           */
/* ------------------------------------------------------------------ */

export function StreamsMatrix({ locale, industries }: { locale: Locale; industries: Industry[] }) {
  return (
    <div className="border-t border-line">
      {industries.map((ind, i) => (
        <Reveal key={ind.slug} delay={i * 0.04}>
          <Link
            href={localizedHref(locale, `/industries/${ind.slug}`)}
            className="group grid grid-cols-4 gap-x-[var(--gutter)] gap-y-4 border-b border-line py-7 md:grid-cols-12 md:items-baseline"
          >
            <span className="col-span-4 flex items-center gap-4 md:col-span-4">
              <Icon name={ind.icon} size={22} accent className="text-fg-muted group-hover:text-fg" />
              <span className="text-[20px] font-medium leading-tight text-fg transition-colors group-hover:text-ember-ink">{ind.name}</span>
            </span>
            <span className="col-span-4 flex flex-wrap gap-2 md:col-span-7">
              {ind.valueStreams.map((v) => (
                <Tag key={v.name}>{v.name}</Tag>
              ))}
            </span>
            <span className="col-span-4 hidden justify-end md:col-span-1 md:flex">
              <Arrow className="text-fg-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember-ink" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Verified stat callout                                               */
/* ------------------------------------------------------------------ */

export function StatCallout({ stat, sourceLabel }: { stat: Stat; sourceLabel: string }) {
  return (
    <Reveal className="border border-line p-6 md:p-8">
      <p className="text-[clamp(48px,6vw,88px)] leading-none font-medium tracking-[-0.045em] text-fg tabular">
        <Counter value={stat.value} />
      </p>
      <p className="mt-6 max-w-[36ch] text-[16px] leading-snug text-fg">{stat.label}</p>
      {stat.source && (
        <p className="eyebrow mt-6 text-fg-dim">
          {sourceLabel}: {stat.source}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Compliance notes                                                    */
/* ------------------------------------------------------------------ */

export function ComplianceList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
      {items.map((c, i) => (
        <Reveal as="li" key={c} delay={i * 0.06} className="flex gap-5 bg-[var(--bg)] p-6 md:p-8">
          <Icon name={i % 2 === 0 ? "shield" : "residency"} size={26} accent className="mt-0.5 shrink-0 text-fg" />
          <p className="text-[16px] leading-relaxed text-fg">{c}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Featured case (large)                                               */
/* ------------------------------------------------------------------ */

type FeaturedCaseLabels = { representative: string; client: string; duration: string; readCase: string; results: string };

export function FeaturedCase({ locale, item, labels }: { locale: Locale; item: CaseStudy; labels: FeaturedCaseLabels }) {
  return (
    <Reveal>
      <Link
        href={localizedHref(locale, `/work/${item.slug}`)}
        className="group relative grid grid-cols-1 border border-line md:grid-cols-12"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
        <div className="md:col-span-6">
          <MediaFrame image={images[item.image]} alt="" ratio="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[520px]" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="flex flex-col p-6 md:col-span-6 md:p-10 lg:p-14">
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{labels.representative}</Tag>
            <Tag>{item.sectorLabel}</Tag>
          </div>
          <h3 className="mt-8 text-h3 font-medium text-balance text-fg">{item.title}</h3>
          <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">{item.summary}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-[12px]">
            <div>
              <dt className="eyebrow text-fg-dim">{labels.client}</dt>
              <dd className="mt-1.5 text-fg">{item.client}</dd>
            </div>
            <div>
              <dt className="eyebrow text-fg-dim">{labels.duration}</dt>
              <dd className="mt-1.5 text-fg">{item.duration}</dd>
            </div>
          </dl>
          <p className="eyebrow mt-10 text-fg-dim">{labels.results}</p>
          <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line">
            {item.results.slice(0, 4).map((r) => (
              <div key={r.label} className="bg-[var(--bg)] p-4">
                <dd className="text-[clamp(20px,2.2vw,30px)] leading-tight font-medium tracking-[-0.03em] text-balance text-fg tabular">{r.value}</dd>
                <dt className="mt-2 text-[13px] leading-snug text-fg-muted">{r.label}</dt>
              </div>
            ))}
          </dl>
          <span className="mt-10 inline-flex items-center gap-2 text-[15px] text-fg transition-colors group-hover:text-ember-ink">
            {labels.readCase}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
