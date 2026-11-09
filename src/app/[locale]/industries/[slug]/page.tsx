import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fill, getCase, getDictionary, getIndustry, getServicesBySlugs, staticParams } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images } from "@/lib/media";
import { Button, Reveal, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import {
  CtaBand,
  InPageNav,
  JsonLd,
  PageHero,
  RelatedCardsGrid,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  organizationLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import {
  ComplianceList,
  FeaturedCase,
  IndustryTiles,
  StatCallout,
} from "@/components/sections/pages/industries/IndustrySections";
import { ValueStreamTabs } from "@/components/sections/pages/industries/ValueStreamTabs";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { landingPath } from "@/lib/routes";
import { WEBSITE_ID } from "@/lib/graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams.industries();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/industries/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const ind = getIndustry(locale, slug);
  if (!ind) return {};
  const d = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/industries/${ind.slug}`,
    title: d.seo.titles.industries[ind.slug],
    description: fill(d.meta.industryDetail, { name: ind.name, short: ind.short }),
  });
}

export default async function IndustryPage({ params }: PageProps<"/[locale]/industries/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const ind = getIndustry(locale, slug);
  if (!ind) notFound();
  const d = getDictionary(locale);
  const L = d.common.labels;
  const ps = d.pageSections.industry;
  const relatedCase = getCase(locale, ind.relatedCase);
  const services = getServicesBySlugs(locale, ind.relatedServices);
  const others = d.industries.filter((x) => x.slug !== ind.slug);
  const useCaseCount = ind.valueStreams.reduce((n, v) => n + v.useCases.length, 0);
  const path = `/industries/${ind.slug}`;
  const crumbs = [
    { label: d.meta.siteName, href: "/" },
    { label: d.nav.items.industries, href: "/industries" },
    { label: ind.name },
  ];

  const sections = [
    { id: "context", label: L.context },
    { id: "value-streams", label: L.valueStreams },
    { id: "compliance", label: L.compliance },
    ...(relatedCase ? [{ id: "work", label: L.relatedCases }] : []),
    { id: "services", label: L.relatedServices },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(locale, crumbs, path),
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(locale, path)}#webpage`,
        url: absoluteUrl(locale, path),
        name: ind.name,
        description: ind.short,
        inLanguage: locale,
        about: { "@type": "Thing", name: ind.name },
        isPartOf: { "@id": WEBSITE_ID },
        publisher: organizationLd(),
        mentions: services.map((s) => ({
          "@type": "Service",
          name: s.name,
          url: absoluteUrl(locale, `/services/${s.slug}`),
          provider: organizationLd(),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(locale, path)}#value-streams`,
        name: `${L.valueStreams}: ${ind.name}`,
        itemListElement: ind.valueStreams.map((v, i) => ({ "@type": "ListItem", position: i + 1, name: v.name, description: v.description })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={ind.hero.eyebrow}
        title={ind.hero.title}
        lead={ind.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={images[ind.image]}
        mediaAlt=""
        layout="background"
        aside={
          <span className="hidden size-24 items-center justify-center border border-line-strong text-fg md:flex lg:size-28">
            <Icon name={ind.icon} size={48} accent />
          </span>
        }
        facts={[
          { label: ps.factTier, value: ind.tier === "core" ? L.core : L.adjacent },
          { label: ps.factStreams, value: String(ind.valueStreams.length).padStart(2, "0") },
          { label: ps.factUseCases, value: String(useCaseCount).padStart(2, "0") },
          { label: L.relatedServices, value: String(services.length).padStart(2, "0") },
        ]}
        actions={
          <>
            <Button href={localizedHref(locale, "/contact")} size="lg" arrow>
              {d.hubs.industries.cta.label}
            </Button>
            {relatedCase && (
              <Button href={localizedHref(locale, `/work/${relatedCase.slug}`)} variant="ghost">
                {d.common.cta.readCase}
              </Button>
            )}
          </>
        }
      />

      <InPageNav items={sections} label={L.onThisPage} />

      <Section id="context" lines>
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <SectionHeader eyebrow={L.context} index="01" title={ind.context.title} layout="stacked" />
            {ind.context.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className={i === 0 ? "mt-10 text-lead text-fg" : "mt-6 text-[17px] leading-[1.7] text-fg-muted"}>{p}</p>
              </Reveal>
            ))}
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8 md:pt-14">
            {ind.stat && <StatCallout stat={ind.stat} sourceLabel={L.source} />}
            <Reveal delay={0.15} className={ind.stat ? "mt-px" : undefined}>
              <div className="border border-line p-6 md:p-8">
                <p className="eyebrow text-fg-dim">{L.valueStreams}</p>
                <ol className="mt-5 space-y-3">
                  {ind.valueStreams.map((v, i) => (
                    <li key={v.name} className="flex items-baseline gap-4 text-[16px] text-fg">
                      <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                      {v.name}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section id="value-streams" tone="carbon" divider>
        <SectionHeader eyebrow={L.valueStreams} index="02" title={ps.valueStreamsTitle} lead={ps.valueStreamsLead} />
        <div className="mt-14 md:mt-20">
          <ValueStreamTabs streams={ind.valueStreams} useCasesLabel={L.useCases} />
        </div>
      </Section>

      <Section id="compliance" tone="bone">
        <SectionHeader eyebrow={L.compliance} index="03" title={ps.complianceTitle} lead={ps.complianceLead} />
        <div className="mt-14 md:mt-20">
          <ComplianceList items={ind.compliance} />
        </div>
      </Section>

      {relatedCase && (
        <Section id="work">
          <SectionHeader
            eyebrow={L.relatedCases}
            index="04"
            title={ps.relatedCaseTitle}
            action={
              <Button href={localizedHref(locale, "/work")} variant="ghost">
                {d.common.cta.allWork}
              </Button>
            }
          />
          <div className="mt-14 md:mt-20">
            <FeaturedCase
              locale={locale}
              item={relatedCase}
              labels={{
                representative: L.representative,
                client: L.client,
                duration: L.duration,
                readCase: d.common.cta.readCase,
                results: L.results,
              }}
            />
            <p className="mt-5 max-w-[80ch] font-mono text-[12px] leading-relaxed text-fg-dim">{L.representativeNote}</p>
          </div>
        </Section>
      )}

      <Section id="services" tone="carbon" divider>
        <SectionHeader eyebrow={L.relatedServices} index={relatedCase ? "05" : "04"} title={ps.relatedServicesTitle} />
        <RelatedCardsGrid
          className="mt-14 md:mt-20"
          items={services.map((s) => ({
            href: localizedHref(locale, `/services/${s.slug}`),
            kicker: s.index,
            title: s.name,
            text: s.short,
            icon: s.icon,
            cta: d.common.cta.learnMore,
          }))}
        />
      </Section>

      <Section spacing="tight" divider>
        <SectionHeader eyebrow={L.industries} title={ps.otherIndustriesTitle} size="h3" />
        <div className="mt-10">
          <IndustryTiles
            locale={locale}
            industries={others}
            size="sm"
            labels={{ streamsCount: d.pageSections.industriesHub.streamsCount, explore: d.common.cta.explore }}
          />
        </div>
      </Section>

      <RelatedLinks
        locale={locale}
        label={d.seo.labels.related}
        links={[
          ...(ind.tier === "core" ? [{ label: d.seo.pages.geneva, href: landingPath("geneva") }] : []),
          { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
          ...(ind.slug === "banking-wealth" || ind.slug === "life-sciences" || ind.slug === "international-organisations"
            ? [{ label: d.seo.pages.governance, href: landingPath("governance") }]
            : []),
        ]}
      />

      <CtaBand
        eyebrow={d.home.cta.eyebrow}
        title={d.home.cta.title}
        text={d.home.cta.text}
        primary={{ label: d.hubs.industries.cta.label, href: localizedHref(locale, d.hubs.industries.cta.href) }}
        secondary={{ label: d.home.cta.secondary.label, href: localizedHref(locale, d.home.cta.secondary.href) }}
      />
    </>
  );
}
