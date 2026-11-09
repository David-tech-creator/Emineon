import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCasesBySlugs, getDictionary } from "@/content";
import { getInsights } from "@/lib/insights";
import { isLocale } from "@/lib/i18n";
import { webPageNode } from "@/lib/graph";
import { landingPath } from "@/lib/routes";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { JsonLd, pageMetadata } from "@/components/sections/pages/shared";
import {
  ApproachSection,
  FdeSection,
  FinalCta,
  GapSection,
  HomeHero,
  IndustriesSection,
  InsightsSection,
  ProofStrip,
  ServicesGrid,
  TrustSection,
  WorkSection,
} from "@/components/sections/home";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/", title: meta.home.title, description: meta.home.description, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { home, common } = dict;
  // The Organization / ProfessionalService entity itself is rendered site-wide by the layout (src/lib/graph.ts).
  const jsonLd = {
    "@context": "https://schema.org",
    ...webPageNode(locale, "/", { name: dict.meta.home.title, description: dict.meta.home.description }),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <HomeHero locale={locale} dict={dict} />
      <ProofStrip proof={home.proof} />
      <GapSection gap={home.gap} />
      <ServicesGrid locale={locale} intro={home.services} services={dict.services} exploreLabel={common.cta.explore} />
      <ApproachSection locale={locale} approach={home.approach} labels={{ day: common.labels.day }} />
      <FdeSection fde={home.fde} offices={dict.offices} mapLabel={common.a11y.mapLabel} hqLabel={common.labels.hq} />
      <IndustriesSection
        locale={locale}
        intro={home.industries}
        industries={dict.industries}
        labels={{ core: common.labels.core, adjacent: common.labels.adjacent, valueStreams: common.labels.valueStreams }}
      />
      <WorkSection
        locale={locale}
        intro={home.work}
        cases={getCasesBySlugs(locale, home.work.featured)}
        labels={{ representative: common.labels.representative, readCase: common.cta.readCase }}
      />
      <TrustSection trust={home.trust} />
      <InsightsSection
        locale={locale}
        intro={home.insights}
        insights={getInsights(locale).slice(0, 3)}
        minRead={common.units.minRead}
      />
      <RelatedLinks
        locale={locale}
        label={dict.seo.labels.footerColumn}
        links={[
          { label: dict.seo.pages.switzerland, href: landingPath("switzerland") },
          { label: dict.seo.pages.geneva, href: landingPath("geneva") },
          { label: dict.seo.pages.governance, href: landingPath("governance") },
          { label: dict.seo.pages.faq, href: "/faq" },
        ]}
      />
      <FinalCta locale={locale} cta={home.cta} />
    </>
  );
}
