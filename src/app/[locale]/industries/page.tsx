import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images } from "@/lib/media";
import { Button, Section } from "@/components/ui";
import {
  CtaBand,
  JsonLd,
  PageHero,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import { IndustryTiles, StreamsMatrix } from "@/components/sections/pages/industries/IndustrySections";

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/industries", title: meta.industries.title, description: meta.industries.description });
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const hub = d.hubs.industries;
  const ps = d.pageSections.industriesHub;
  const core = d.industries.filter((i) => i.tier === "core");
  const adjacent = d.industries.filter((i) => i.tier === "adjacent");
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.industries }];
  const tileLabels = { streamsCount: ps.streamsCount, explore: d.common.cta.explore };

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(locale, crumbs),
      {
        "@type": "ItemList",
        name: d.meta.industries.title,
        itemListElement: d.industries.map((ind, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(locale, `/industries/${ind.slug}`),
          name: ind.name,
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
        image={images["hero-geneva"]}
        mediaAlt=""
        // Keep the buoy out of the 21:9 crop (its top otherwise peeks in as a stray dot).
        mediaClassName="object-[50%_30%]"

        layout="background"
        actions={
          <Button href={localizedHref(locale, hub.cta.href)} size="lg" arrow>
            {hub.cta.label}
          </Button>
        }
      />

      <Section id="core">
        <SectionHeader eyebrow={hub.coreLabel} index="01" title={ps.coreTitle} lead={ps.coreLead} />
        <div className="mt-14 md:mt-20">
          <IndustryTiles locale={locale} industries={core} labels={tileLabels} size="lg" />
        </div>
      </Section>

      <Section id="adjacent" spacing="tight">
        <SectionHeader eyebrow={hub.adjacentLabel} index="02" title={ps.adjacentTitle} lead={ps.adjacentLead} />
        <div className="mt-10 md:mt-14">
          <IndustryTiles locale={locale} industries={adjacent} labels={tileLabels} size="sm" />
        </div>
      </Section>

      <Section tone="bone" id="value-streams">
        <SectionHeader eyebrow={ps.streamsEyebrow} index="03" title={ps.streamsTitle} lead={ps.streamsLead} />
        <div className="mt-14 md:mt-20">
          <StreamsMatrix locale={locale} industries={d.industries} />
        </div>
      </Section>

      <CtaBand
        eyebrow={d.home.cta.eyebrow}
        title={d.home.cta.title}
        text={d.home.cta.text}
        primary={{ label: hub.cta.label, href: localizedHref(locale, hub.cta.href) }}
        secondary={{ label: d.home.cta.secondary.label, href: localizedHref(locale, d.home.cta.secondary.href) }}
      />
    </>
  );
}
