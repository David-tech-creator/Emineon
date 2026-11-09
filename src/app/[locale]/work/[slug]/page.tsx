import type { Metadata } from "next";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { landingPath } from "@/lib/routes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fill, getCase, getDictionary, getServicesBySlugs, staticParams } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images, videos } from "@/lib/media";
import { SITE_URL } from "@/lib/site";
import { Arrow, Reveal, Section, Tag } from "@/components/ui";
import { Icon } from "@/components/icons";
import {
  CtaBand,
  InPageNav,
  JsonLd,
  MetricGrid,
  RelatedCards,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  organizationLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import { DetailHero } from "@/components/sections/pages/work/DetailHero";
import { NarrativeSection, Paragraphs } from "@/components/sections/pages/work/CaseSections";
import { caseToItem } from "@/components/sections/pages/work/items";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticParams.cases();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const c = getCase(locale, slug);
  if (!c) return {};
  const d = getDictionary(locale);
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: c.title,
    description: `${c.summary} ${fill(d.meta.caseDetail, { title: c.client })}`.slice(0, 300),
    type: "article",
  });
}

export default async function CasePage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCase(locale, slug);
  if (!c) notFound();
  const d = getDictionary(locale);
  const L = d.common.labels;
  const industry = d.industries.find((i) => i.slug === c.sector);
  const services = getServicesBySlugs(locale, c.services);

  const crumbs = [
    { label: d.meta.siteName, href: "/" },
    { label: d.nav.items.work, href: "/work" },
    { label: c.sectorLabel },
  ];

  // Related: same sector first, then shared services, max 3.
  const others = d.cases.filter((x) => x.slug !== c.slug);
  const score = (x: typeof c) => (x.sector === c.sector ? 10 : 0) + x.services.filter((s) => c.services.includes(s)).length;
  const related = [...others].sort((a, b) => score(b) - score(a)).slice(0, 3);
  const idx = d.cases.findIndex((x) => x.slug === c.slug);
  const next = d.cases[(idx + 1) % d.cases.length];

  const sections = [
    { id: "challenge", label: L.challenge },
    { id: "approach", label: L.approach },
    { id: "system", label: L.system },
    { id: "results", label: L.results },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs),
            {
              "@type": "Article",
              headline: c.title,
              description: c.summary,
              about: c.sectorLabel,
              image: new URL(images[c.image].src, SITE_URL).toString(),
              url: absoluteUrl(locale, `/work/${c.slug}`),
              inLanguage: locale,
              author: organizationLd(),
              publisher: organizationLd(),
            },
          ],
        }}
      />

      <DetailHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        eyebrow={L.representative}
        title={c.title}
        lead={c.summary}
        meta={
          <>
            <Tag variant="solid">{c.sectorLabel}</Tag>
            {services.map((s) => (
              <Tag key={s.slug}>{s.name}</Tag>
            ))}
          </>
        }
        facts={[
          { label: L.client, value: c.client },
          { label: L.sector, value: industry?.name ?? c.sectorLabel },
          { label: L.duration, value: <span className="font-mono tabular">{c.duration}</span> },
          { label: L.services, value: services.map((s) => s.name).join(" · ") },
        ]}
        image={images[c.image]}
        layout="split"
      />

      <InPageNav items={sections} label={L.onThisPage} />

      <NarrativeSection id="challenge" index="01" label={L.challenge}>
        <Paragraphs items={c.challenge} />
      </NarrativeSection>

      <NarrativeSection id="approach" index="02" label={L.approach}>
        <Paragraphs items={c.approach} />
      </NarrativeSection>

      <NarrativeSection
        id="system"
        index="03"
        label={L.system}
        aside={
          <div>
            <p className="eyebrow text-fg-dim">{L.stack}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.stack.map((s) => (
                <li key={s}>
                  <Tag variant="solid">{s}</Tag>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Reveal>
          <p className="max-w-[64ch] text-lead text-fg">{c.system.text}</p>
        </Reveal>
        <p className="eyebrow mt-12 text-fg-dim">{L.components}</p>
        <ol className="mt-5 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {c.system.components.map((comp, i) => (
            <Reveal as="li" key={comp} delay={i * 0.05} className="flex gap-4 bg-canvas p-5 md:p-6">
              <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] leading-snug text-fg">{comp}</span>
            </Reveal>
          ))}
        </ol>
        <div className="mt-10 md:hidden">
          <p className="eyebrow text-fg-dim">{L.stack}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <li key={s}>
                <Tag variant="solid">{s}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </NarrativeSection>

      <Section id="results" tone="bone" className="scroll-mt-[calc(var(--nav-h)+52px)]">
        <SectionHeader eyebrow={L.results} index="04" title={L.resultsTitle} lead={c.client} />
        <MetricGrid items={c.results} columns={c.results.length >= 4 ? 4 : 3} className="mt-12 md:mt-16" />
        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[70ch] font-mono text-[12.5px] leading-relaxed text-fg-muted">
            <span className="text-fg">{L.representative}.</span> {L.representativeNote}
          </p>
          {services.length > 0 && (
            <ul className="flex shrink-0 flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={localizedHref(locale, `/services/${s.slug}`)} className="group flex items-center gap-3 text-[15px] text-fg hover:text-ember-ink">
                    <Icon name={s.icon} size={20} accent />
                    {s.name}
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <RelatedCards
        eyebrow={L.relatedCases}
        title={d.home.work.title}
        items={related.map((r) => caseToItem(locale, r))}
        columns={3}
        action={
          <Link href={localizedHref(locale, `/work/${next.slug}`)} className="group block max-w-[22rem] text-right">
            <span className="eyebrow text-fg-dim">{d.common.a11y.next}</span>
            <span className="mt-2 flex items-center justify-end gap-2 text-[15px] text-fg group-hover:text-ember-ink">
              {next.sectorLabel}
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        }
      />

      <RelatedLinks
        locale={locale}
        label={d.seo.labels.related}
        links={[
          { label: d.seo.titles.industries[c.sector], href: `/industries/${c.sector}` },
          ...c.services.slice(0, 1).map((s) => ({ label: d.seo.titles.services[s], href: `/services/${s}` })),
          { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
        ]}
      />

      <CtaBand
        eyebrow={d.home.cta.eyebrow}
        title={d.approach.cta.title}
        text={d.approach.cta.text}
        primary={{ label: d.hubs.work.cta.label, href: localizedHref(locale, d.hubs.work.cta.href) }}
        secondary={{ label: d.common.cta.backToWork, href: localizedHref(locale, "/work") }}
        video={videos.filaments}
      />
    </>
  );
}
