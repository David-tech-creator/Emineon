import type { ReactNode } from "react";
import type { Headline, Locale } from "@/content";
import { cn } from "@/lib/cn";
import { Eyebrow, Heading, MediaFrame, Reveal, type ImageAsset, type VideoAsset } from "@/components/ui";
import { Breadcrumb } from "./Breadcrumb";
import type { Crumb } from "./seo";

export type HeroFact = { label: string; value: string };

type PageHeroProps = {
  locale: Locale;
  eyebrow: string;
  /** Optional index shown in the eyebrow: [ 01 — Label ]. */
  index?: string;
  title: Headline | string;
  lead?: string;
  /** Crumbs with locale-less hrefs; last = current page. */
  breadcrumbs?: Crumb[];
  /** dict.common.a11y.breadcrumb (required when breadcrumbs are given). */
  breadcrumbLabel?: string;
  image?: ImageAsset;
  video?: VideoAsset;
  /** Alt override for the media ("" = decorative). */
  mediaAlt?: string;
  /** Extra classes on the <img>/<video>, e.g. "object-[50%_30%]" to steer the crop. */
  mediaClassName?: string;
  /**
   * "stacked" (default): text block on paper, then a wide framed media band.
   * "background": legacy name; since the light-first re-theme it renders like
   *   "stacked" (photography is framed on paper, never a dark full-bleed hero).
   * "plain": no media.
   */
  layout?: "stacked" | "background" | "plain";
  /** Mono fact row (e.g. duration / pricing / stage). */
  facts?: HeroFact[];
  /** Buttons etc. rendered under the lead. */
  actions?: ReactNode;
  /** Small element at the top-right of the text block (e.g. a large icon). */
  aside?: ReactNode;
  className?: string;
};

/**
 * Page hero used by every non-home page. Lives under the fixed nav.
 * The heading renders as <h1>.
 */
export function PageHero({
  locale,
  eyebrow,
  index,
  title,
  lead,
  breadcrumbs,
  breadcrumbLabel = "Breadcrumb",
  image,
  video,
  mediaAlt,
  mediaClassName,
  layout = "stacked",
  facts,
  actions,
  aside,
  className,
}: PageHeroProps) {
  const hasMedia = !!(image || video) && layout !== "plain";

  const text = (
    <div className="relative grid grid-cols-4 gap-x-[var(--gutter)] md:grid-cols-12">
      <div className="col-span-4 md:col-span-10 lg:col-span-9">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal y={8}>
            <Breadcrumb locale={locale} items={breadcrumbs} label={breadcrumbLabel} className="mb-10 md:mb-14" />
          </Reveal>
        )}
        <Reveal y={8} delay={0.05}>
          <Eyebrow index={index} live>
            {eyebrow}
          </Eyebrow>
        </Reveal>
        <Heading title={title} size="h1" as="h1" className="mt-6 max-w-[16ch] text-balance md:mt-8" delay={80} />
        {lead && (
          <Reveal delay={0.25}>
            <p className="mt-8 max-w-[58ch] text-lead text-fg-muted md:mt-10">{lead}</p>
          </Reveal>
        )}
        {actions && (
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>
          </Reveal>
        )}
      </div>
      {aside && <div className="col-span-4 mt-10 md:col-span-2 md:mt-0 md:justify-self-end lg:col-span-3">{aside}</div>}
    </div>
  );

  const factRow = facts && facts.length > 0 && (
    <Reveal delay={0.4}>
      <dl className="mt-14 grid grid-cols-2 gap-px border-y border-line bg-line md:mt-20 md:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-2 bg-[var(--bg)] py-5 pr-4 even:pl-4 md:pl-5 md:first:pl-0">
            <dt className="eyebrow text-fg-dim">{f.label}</dt>
            <dd className="font-mono text-[14px] leading-snug text-pretty text-fg tabular">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );

  return (
    <section className={cn("hero-enter relative isolate overflow-hidden bg-canvas text-fg", className)}>
      <div className="container-site pt-[calc(var(--nav-h)+56px)] md:pt-[calc(var(--nav-h)+96px)]">
        {text}
        {factRow}
      </div>
      {hasMedia ? (
        <Reveal y={0} duration={1.2} delay={0.2} className="container-site mt-14 md:mt-20">
          <MediaFrame
            image={image}
            video={video}
            alt={mediaAlt}
            ratio="aspect-[4/3] md:aspect-[21/9]"
            priority
            zoom={false}
            // Hairline only: the padded report-card gradient read as an off-centre grey
            // inset (light left edge, darker bottom) around bright photos.
            className="border border-line"
            mediaClassName={mediaClassName}

            sizes="(min-width: 1440px) 1376px, 100vw"
          />
        </Reveal>
      ) : (
        <div className="h-16 md:h-24" />
      )}
    </section>
  );
}
