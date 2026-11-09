import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images } from "@/lib/media";
import { Button, Reveal, Section } from "@/components/ui";
import {
  CtaBand,
  JsonLd,
  PageHero,
  RelatedCardsGrid,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import { ServiceIndexList } from "@/components/sections/pages/services/ServiceSections";
import { StageColumns } from "@/components/sections/pages/approach/ApproachSections";
import { IndustryTiles } from "@/components/sections/pages/industries/IndustrySections";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/services", title: meta.services.title, description: meta.services.description });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const hub = d.hubs.services;
  const ps = d.pageSections.servicesHub;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.services }];
  const featuredCases = d.home.work.featured
    .map((slug) => d.cases.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(locale, crumbs),
      {
        "@type": "ItemList",
        name: d.meta.services.title,
        itemListElement: d.services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(locale, `/services/${s.slug}`),
          name: s.name,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={hub.eyebrow}
        title={hub.title}
        lead={hub.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={images.filaments}
        mediaAlt=""
        layout="background"
        actions={
          <>
            <Button href={localizedHref(locale, "/contact")} size="lg" arrow>
              {d.common.cta.talk}
            </Button>
            <Button href={localizedHref(locale, hub.cta.href)} variant="ghost">
              {hub.cta.label}
            </Button>
          </>
        }
      />

      <Section id="services">
        <SectionHeader eyebrow={ps.listEyebrow} title={ps.listTitle} />
        <div className="mt-14 md:mt-20">
          <ServiceIndexList locale={locale} services={d.services} ctaLabel={d.common.cta.learnMore} />
        </div>
      </Section>

      <Section tone="bone" id="model">
        <SectionHeader
          eyebrow={ps.modelEyebrow}
          title={ps.modelTitle}
          lead={hub.modelNote}
          action={
            <Button href={localizedHref(locale, "/approach")} variant="ghost">
              {d.nav.items.approach}
            </Button>
          }
        />
        <div className="mt-14 md:mt-20">
          <StageColumns
            stages={d.home.approach.stages}
            pricingLabel={d.pageSections.approach.pricingLabel}
            durationLabel={d.pageSections.approach.durationLabel}
          />
        </div>
      </Section>

      <Section id="industries">
        <SectionHeader
          eyebrow={ps.industriesEyebrow}
          title={ps.industriesTitle}
          action={
            <Button href={localizedHref(locale, "/industries")} variant="ghost">
              {d.common.cta.allIndustries}
            </Button>
          }
        />
        <div className="mt-14 md:mt-20">
          <IndustryTiles
            locale={locale}
            industries={d.industries}
            size="sm"
            labels={{ streamsCount: d.pageSections.industriesHub.streamsCount, explore: d.common.cta.explore }}
          />
        </div>
      </Section>

      <Section tone="carbon" id="work" divider>
        <SectionHeader
          eyebrow={ps.workEyebrow}
          title={ps.workTitle}
          action={
            <Button href={localizedHref(locale, "/work")} variant="ghost">
              {d.common.cta.allWork}
            </Button>
          }
        />
        <RelatedCardsGrid
          className="mt-14 md:mt-20"
          items={featuredCases.map((c) => ({
            href: localizedHref(locale, `/work/${c.slug}`),
            kicker: c.sectorLabel,
            title: c.title,
            image: images[c.image],
            metrics: c.results.slice(0, 2),
            cta: d.common.cta.readCase,
          }))}
        />
        <Reveal>
          <p className="mt-6 font-mono text-[12px] text-fg-dim">{d.hubs.work.disclaimer}</p>
        </Reveal>
      </Section>

      <CtaBand
        eyebrow={d.home.cta.eyebrow}
        title={d.home.cta.title}
        text={d.home.cta.text}
        primary={{ label: d.home.cta.primary.label, href: localizedHref(locale, d.home.cta.primary.href) }}
        secondary={{ label: d.home.cta.secondary.label, href: localizedHref(locale, d.home.cta.secondary.href) }}
      />
    </>
  );
}
