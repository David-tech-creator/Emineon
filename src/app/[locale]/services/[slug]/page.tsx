import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fill,
  getCasesBySlugs,
  getDictionary,
  getIndustriesBySlugs,
  getService,
  staticParams,
  type Service,
} from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images } from "@/lib/media";
import { Button, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import {
  CtaBand,
  FaqSection,
  InPageNav,
  JsonLd,
  MetricGrid,
  PageHero,
  PhaseTimeline,
  RelatedCards,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  organizationLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import {
  DeliverGrid,
  DeliverablesList,
  OtherServices,
  ProblemSection,
} from "@/components/sections/pages/services/ServiceSections";
import { serviceImage, serviceSecondaryImage, serviceVideo } from "@/components/sections/pages/services/media";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { landingPath } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams.services();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = getService(locale, slug);
  if (!s) return {};
  const d = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/services/${s.slug}`,
    title: d.seo.titles.services[s.slug],
    description: fill(d.meta.serviceDetail, { name: s.name, short: s.short }),
  });
}

function engagementSpan(s: Service) {
  const first = s.phases[0]?.duration;
  const last = s.phases[s.phases.length - 1]?.duration;
  return first && last && first !== last ? `${first} → ${last}` : (first ?? "");
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const s = getService(locale, slug);
  if (!s) notFound();
  const d = getDictionary(locale);
  const L = d.common.labels;
  const ps = d.pageSections.service;
  const cases = getCasesBySlugs(locale, s.relatedCases);
  const industries = getIndustriesBySlugs(locale, s.relatedIndustries);
  const others = d.services.filter((x) => x.slug !== s.slug);
  const path = `/services/${s.slug}`;
  const crumbs = [
    { label: d.meta.siteName, href: "/" },
    { label: d.nav.items.services, href: "/services" },
    { label: s.name },
  ];

  const sections = [
    { id: "problem", label: L.problem },
    { id: "deliver", label: L.whatWeDeliver },
    { id: "phases", label: L.phases },
    { id: "deliverables", label: L.deliverables },
    { id: "outcomes", label: L.outcomes },
    ...(cases.length ? [{ id: "work", label: L.relatedCases }] : []),
    ...(industries.length ? [{ id: "industries", label: L.relatedIndustries }] : []),
    { id: "faq", label: L.faq },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(locale, crumbs, path),
      {
        "@type": "Service",
        "@id": `${absoluteUrl(locale, path)}#service`,
        name: s.name,
        description: s.short,
        serviceType: s.name,
        url: absoluteUrl(locale, path),
        inLanguage: locale,
        provider: organizationLd(),
        areaServed: [{ "@type": "Country", name: "Switzerland" }, { "@type": "Place", name: "Europe" }],
        audience: { "@type": "BusinessAudience", audienceType: "Regulated and document-heavy organisations" },
        availableLanguage: ["en", "fr", "de"],
        // No invented prices: the pricing model, not a figure.
        offers: { "@type": "Offer", description: ps.pricingValue, seller: organizationLd() },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: L.deliverables,
          itemListElement: s.deliverables.map((x) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: x } })),
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        lead={s.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={serviceImage(s.slug)}
        video={serviceVideo(s.slug)}
        mediaAlt=""
        layout="background"
        aside={
          <span className="hidden size-24 items-center justify-center border border-line-strong md:flex lg:size-28">
            <Icon name={s.icon} size={48} accent className="text-fg" />
          </span>
        }
        facts={[
          { label: L.service, value: `${s.index} / ${String(d.services.length).padStart(2, "0")}` },
          { label: ps.factPhases, value: s.phases.map((p) => p.name).join(" → ") },
          { label: ps.factEngagement, value: engagementSpan(s) },
          { label: ps.factPricing, value: ps.pricingValue },
        ]}
        actions={
          <>
            <Button href={localizedHref(locale, "/contact")} size="lg" arrow>
              {d.common.cta.talk}
            </Button>
            <Button href={localizedHref(locale, "/approach#sprint")} variant="ghost">
              {d.common.cta.startSprint}
            </Button>
          </>
        }
      />

      <InPageNav items={sections} label={L.onThisPage} />

      <ProblemSection
        id="problem"
        eyebrow={L.problem}
        index="01"
        title={s.problem.title}
        paragraphs={s.problem.paragraphs}
        image={serviceSecondaryImage(s.slug)}
      />

      <DeliverGrid id="deliver" eyebrow={L.whatWeDeliver} index="02" title={ps.deliverTitle} items={s.deliver} tone="carbon" />

      <Section tone="bone" id="phases">
        <SectionHeader eyebrow={L.howWeWork} index="03" title={ps.phasesTitle} />
        <PhaseTimeline
          className="mt-16 md:mt-24"
          steps={s.phases.map((p) => ({ label: p.duration, title: p.name, text: p.text }))}
        />
      </Section>

      <DeliverablesList
        id="deliverables"
        eyebrow={L.deliverables}
        index="04"
        title={ps.deliverablesTitle}
        items={s.deliverables}
      />

      <Section id="outcomes" tone="carbon" divider>
        <SectionHeader eyebrow={L.outcomes} index="05" title={ps.outcomesTitle} />
        <MetricGrid className="mt-14 md:mt-20" items={s.outcomes} note={L.outcomesNote} />
      </Section>

      <RelatedCards
        id="work"
        eyebrow={L.relatedCases}
        index="06"
        title={ps.relatedCasesTitle}
        action={
          <Button href={localizedHref(locale, "/work")} variant="ghost">
            {d.common.cta.allWork}
          </Button>
        }
        items={cases.map((c) => ({
          href: localizedHref(locale, `/work/${c.slug}`),
          kicker: `${L.representative} · ${c.sectorLabel}`,
          title: c.title,
          image: images[c.image],
          metrics: c.results.slice(0, 2),
          cta: d.common.cta.readCase,
        }))}
      />

      <RelatedCards
        id="industries"
        tone="bone"
        eyebrow={L.relatedIndustries}
        index="07"
        title={ps.relatedIndustriesTitle}
        items={industries.map((ind) => ({
          href: localizedHref(locale, `/industries/${ind.slug}`),
          kicker: ind.tier === "core" ? L.core : L.adjacent,
          title: ind.name,
          text: ind.short,
          icon: ind.icon,
          cta: d.common.cta.explore,
        }))}
      />

      <FaqSection id="faq" eyebrow={L.faq} index="08" title={ps.faqTitle} items={s.faq} />

      <RelatedLinks
        locale={locale}
        label={d.seo.labels.related}
        links={[
          { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
          ...(s.slug === "ai-operations" || s.slug === "adoption-enablement" || s.slug === "ai-strategy"
            ? [{ label: d.seo.pages.governance, href: landingPath("governance") }]
            : []),
          { label: d.seo.pages.geneva, href: landingPath("geneva") },
          { label: d.seo.pages.faq, href: "/faq" },
        ]}
      />

      <OtherServices locale={locale} eyebrow={d.common.labels.services} title={ps.otherServicesTitle} services={others} />

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
