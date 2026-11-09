import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images, videos } from "@/lib/media";
import { Card, CardGrid, MediaFrame, Reveal, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import { DotOakAnimated } from "@/components/brand";
import { CtaBand, JsonLd, MetricGrid, PageHero, SectionHeader, breadcrumbLd, organizationLd, pageMetadata } from "@/components/sections/pages/shared";
import { DeliveryMap } from "@/components/sections/home/DeliveryMap";
import { OfficeList } from "@/components/sections/pages/about/OfficeList";
import { FactBlock } from "@/components/sections/pages/seo/SeoSections";
import { Button } from "@/components/ui";
import { landingPath } from "@/lib/routes";
import { webPageNode } from "@/lib/graph";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: meta.about.title, description: meta.about.description });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const a = d.about;
  const hq = d.offices.find((o) => o.hq);
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.about }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs, "/about"),
            { ...webPageNode(locale, "/about", { type: "AboutPage", name: d.meta.about.title, description: d.meta.about.description }), mainEntity: organizationLd() },
          ],
        }}
      />
      <PageHero
        locale={locale}
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        lead={a.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={images["about-geneva"]}
        layout="background"
        className="min-h-[88svh] [&>div.container-site]:flex [&>div.container-site]:min-h-[88svh] [&>div.container-site]:flex-col [&>div.container-site]:justify-end"
      />

      {/* 01 — The name */}
      <Section divider>
        <SectionHeader eyebrow={a.name.eyebrow} title={a.name.title} />
        <div className="mt-12 grid grid-cols-4 gap-x-[var(--gutter)] gap-y-8 md:mt-16 md:grid-cols-12">
          {a.name.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className={i === 0 ? "col-span-4 md:col-span-4 md:col-start-4" : "col-span-4 md:col-span-5"}>
              <p className={i === 0 ? "text-lead text-fg" : "text-fg-muted"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 02 — The oak */}
      <Section tone="bone">
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-14 md:grid-cols-12">
          <div className="col-span-4 md:col-span-5">
            <SectionHeader layout="stacked" eyebrow={a.oak.eyebrow} title={a.oak.title} lead={a.oak.lead} />
            <div className="mt-14 max-w-[260px] text-fg md:mt-16 md:max-w-[440px]">
              <DotOakAnimated className="block h-auto w-full" />
            </div>
          </div>
          <ol className="col-span-4 border-t border-line md:col-span-6 md:col-start-7 md:self-end">
            {[...a.oak.layers].reverse().map((l, i, arr) => (
              <Reveal as="li" key={l.key} delay={i * 0.07} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 md:grid-cols-[4rem_10rem_1fr] md:py-9">
                <span className="font-mono text-[12px] text-fg-dim tabular">{String(arr.length - i).padStart(2, "0")}</span>
                <h3 className="text-h3 font-medium text-fg">{l.name}</h3>
                <p className="col-start-2 mt-3 text-fg-muted md:col-start-3 md:mt-0">{l.meaning}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* 03 — Principles */}
      <Section lines>
        <SectionHeader eyebrow={a.principles.eyebrow} title={a.principles.title} />
        <CardGrid className="mt-14 grid-cols-1 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {a.principles.items.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="flex">
              <Card padding="lg" className="w-full">
                <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-h3 font-medium text-balance text-fg">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      {/* 04 — HQ */}
      <Section divider>
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <Reveal y={0} duration={1.2} className="col-span-4 md:col-span-7">
            <MediaFrame image={images.atrium} ratio="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          <div className="col-span-4 flex flex-col md:col-span-4 md:col-start-9">
            <SectionHeader layout="stacked" eyebrow={a.hq.eyebrow} title={a.hq.title} size="h3" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-fg-muted">{a.hq.text}</p>
            </Reveal>
            {hq?.addressLines && (
              <Reveal delay={0.15} className="mt-auto pt-10">
                <address className="border-t border-line pt-6 not-italic">
                  <p className="eyebrow text-fg-dim">{d.common.labels.hq}</p>
                  <p className="mt-4 font-mono text-[14px] leading-relaxed text-fg">
                    {d.meta.siteName}
                    {hq.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </p>
                </address>
              </Reveal>
            )}
            <Reveal delay={0.2} className="pt-6">
              <Button href={localizedHref(locale, landingPath("geneva"))} variant="ghost" arrow>
                {d.seo.pages.geneva}
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Emineon at a glance: the quotable fact block (same facts as llms.txt) */}
      <FactBlock eyebrow={d.seo.facts.eyebrow} title={d.seo.facts.title} definition={d.seo.facts.definition} items={d.seo.facts.items} tone="bone" />

      {/* 05 — Network */}
      <Section tone="carbon" divider>
        <SectionHeader eyebrow={a.network.eyebrow} title={a.network.title} lead={a.network.lead} />
        <Reveal y={0} duration={1.2} className="mt-14 md:mt-20">
          <DeliveryMap offices={d.offices} label={d.common.a11y.mapLabel} hqLabel={d.common.labels.hq} />
        </Reveal>
        <MetricGrid items={a.network.stats} columns={3} className="mt-14 md:mt-20" />
        <OfficeList offices={d.offices} hqLabel={d.common.labels.hq} className="mt-14" />
      </Section>

      {/* 06 — Organisation */}
      <Section>
        <SectionHeader eyebrow={a.organisation.eyebrow} title={a.organisation.title} lead={a.organisation.lead} />
        <CardGrid className="mt-14 grid-cols-1 md:mt-20 md:grid-cols-3">
          {a.organisation.units.map((u, i) => (
            <Reveal key={u.title} delay={i * 0.06} className="flex">
              <Card padding="lg" className="w-full">
                <div className="flex items-start justify-between">
                  <Icon name={u.icon} size={36} accent className="text-fg" />
                  <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-14 text-h3 font-medium text-fg">{u.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{u.text}</p>
              </Card>
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      {/* 07 — Practices */}
      <Section tone="bone">
        <SectionHeader eyebrow={a.practices.eyebrow} title={a.practices.title} />
        <ol className="mt-14 border-t border-line md:mt-20">
          {a.practices.items.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.05} className="grid grid-cols-4 gap-x-[var(--gutter)] border-b border-line py-6 md:grid-cols-12 md:py-8">
              <span className="col-span-1 font-mono text-[12px] text-fg-dim tabular md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="col-span-3 text-[22px] font-medium tracking-[-0.015em] text-fg md:col-span-4 md:text-[28px]">{p.title}</h3>
              <p className="col-span-3 col-start-2 mt-2 text-fg-muted md:col-span-6 md:col-start-7 md:mt-0 md:self-center">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={a.cta.title}
        text={a.cta.text}
        primary={{ label: a.cta.primary.label, href: localizedHref(locale, a.cta.primary.href) }}
        secondary={{ label: a.cta.secondary.label, href: localizedHref(locale, a.cta.secondary.href) }}
        video={videos["hero-oak"]}
      />
    </>
  );
}
