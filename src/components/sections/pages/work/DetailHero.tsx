import type { ReactNode } from "react";
import type { Locale } from "@/content";
import { cn } from "@/lib/cn";
import { Eyebrow, Heading, MediaFrame, Reveal, type ImageAsset } from "@/components/ui";
import { Breadcrumb } from "../shared/Breadcrumb";
import type { Crumb } from "../shared/seo";

type Fact = { label: string; value: ReactNode };

type DetailHeroProps = {
  locale: Locale;
  crumbs: Crumb[];
  breadcrumbLabel: string;
  eyebrow: string;
  /** Long plain-string title (case and article titles): set at h2 scale, not h1. */
  title: string;
  lead?: string;
  /** Tags / meta under the eyebrow. */
  meta?: ReactNode;
  facts?: Fact[];
  image: ImageAsset;
  /** "band" = wide image under the text (articles); "split" = image right on desktop (cases). */
  layout?: "band" | "split";
  className?: string;
};

/** Hero for long-titled detail pages (case studies, insights). The title renders as <h1>. */
export function DetailHero({ locale, crumbs, breadcrumbLabel, eyebrow, title, lead, meta, facts, image, layout = "band", className }: DetailHeroProps) {
  const factRow = facts && facts.length > 0 && (
    <Reveal delay={0.35}>
      <dl className="mt-12 grid grid-cols-1 gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-2 bg-canvas py-5 pr-4">
            <dt className="eyebrow text-fg-dim">{f.label}</dt>
            <dd className="text-[15px] leading-snug text-fg">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );

  if (layout === "split") {
    return (
      <section className={cn("hero-enter relative isolate overflow-hidden bg-canvas text-fg", className)}>
          <div className="container-site pb-16 pt-[calc(var(--nav-h)+48px)] md:pb-24 md:pt-[calc(var(--nav-h)+80px)]">
          <Reveal y={8}>
            <Breadcrumb locale={locale} items={crumbs} label={breadcrumbLabel} className="mb-10 md:mb-14" />
          </Reveal>
          <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
            <div className="col-span-4 md:col-span-7">
              <Reveal y={8} delay={0.05}>
                <Eyebrow live>{eyebrow}</Eyebrow>
              </Reveal>
              {meta && (
                <Reveal y={8} delay={0.1}>
                  <div className="mt-6 flex flex-wrap gap-2">{meta}</div>
                </Reveal>
              )}
              <Heading title={title} size="h2" as="h1" className="mt-8 max-w-[22ch] text-balance" delay={80} />
              {lead && (
                <Reveal delay={0.25}>
                  <p className="mt-8 max-w-[58ch] text-lead text-fg-muted">{lead}</p>
                </Reveal>
              )}
            </div>
            <Reveal y={0} duration={1.2} delay={0.15} className="col-span-4 md:col-span-5">
              <MediaFrame image={image} ratio="aspect-[4/5]" priority zoom={false} framed sizes="(min-width: 768px) 40vw, 100vw" />
            </Reveal>
          </div>
          {factRow}
        </div>
      </section>
    );
  }

  return (
    <section className={cn("hero-enter relative isolate overflow-hidden bg-canvas text-fg", className)}>
      <div className="container-site pt-[calc(var(--nav-h)+48px)] md:pt-[calc(var(--nav-h)+80px)]">
        <Reveal y={8}>
          <Breadcrumb locale={locale} items={crumbs} label={breadcrumbLabel} className="mb-10 md:mb-14" />
        </Reveal>
        <div className="max-w-[60rem]">
          <Reveal y={8} delay={0.05}>
            <Eyebrow live>{eyebrow}</Eyebrow>
          </Reveal>
          <Heading title={title} size="h2" as="h1" className="mt-8 text-balance" delay={80} />
          {lead && (
            <Reveal delay={0.25}>
              <p className="mt-8 max-w-[58ch] text-lead text-fg-muted">{lead}</p>
            </Reveal>
          )}
          {meta && (
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">{meta}</div>
            </Reveal>
          )}
        </div>
        {factRow}
      </div>
      <Reveal y={0} duration={1.2} delay={0.2} className="container-site mt-12 md:mt-16">
        <MediaFrame image={image} ratio="aspect-[4/3] md:aspect-[21/9]" priority zoom={false} framed sizes="(min-width: 1440px) 1376px, 100vw" />
      </Reveal>
    </section>
  );
}
