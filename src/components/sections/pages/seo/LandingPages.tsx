/**
 * The SEO landing pages (SEO-PLAN §4.1–4.3), rendered by src/app/[locale]/[landing]/page.tsx.
 * Content: src/content/locales/<locale>/seo.ts. Structure: answer-first hero,
 * substantive sections, FAQ (FAQPage JSON-LD), CTA. Each page has its own
 * WebPage + Service/CollectionPage + BreadcrumbList nodes and points at the one
 * Organization by @id.
 */
import type { Dictionary, FaqItem, Locale } from "@/content";
import { getCasesBySlugs, getIndustriesBySlugs } from "@/content";
import { getInsight } from "@/lib/insights";
import { localizedHref } from "@/lib/i18n";
import { landingPath } from "@/lib/routes";
import { abs, orgRef, webPageNode } from "@/lib/graph";
import { LANDING_UPDATED, CONTACT_EMAIL } from "@/lib/site";
import { images } from "@/lib/media";
import { Button, Reveal, Section } from "@/components/ui";
import {
  CtaBand,
  FaqSection,
  JsonLd,
  PageHero,
  RelatedCards,
  RelatedCardsGrid,
  SectionHeader,
  breadcrumbLd,
  faqLd,
  type Crumb,
} from "@/components/sections/pages/shared";
import { IndustryTiles, StatCallout } from "@/components/sections/pages/industries/IndustrySections";
import { DataTable, FactBlock, LinkRows, TextCards, UpdatedStamp } from "./SeoSections";

type Props = { locale: Locale; d: Dictionary };

export function faqByIds(d: Dictionary, ids: string[]): FaqItem[] {
  return ids.map((id) => d.seo.faq.items.find((f) => f.id === id)).filter((f): f is NonNullable<typeof f> => !!f).map(({ q, a }) => ({ q, a }));
}

function caseCards(locale: Locale, d: Dictionary, slugs: Dictionary["home"]["work"]["featured"]) {
  return getCasesBySlugs(locale, slugs).map((c) => ({
    href: localizedHref(locale, `/work/${c.slug}`),
    kicker: `${d.common.labels.representative} · ${c.sectorLabel}`,
    title: c.title,
    image: images[c.image],
    metrics: c.results.slice(0, 2),
    cta: d.common.cta.readCase,
  }));
}

function Cta({ locale, d }: Props) {
  return (
    <CtaBand
      eyebrow={d.home.cta.eyebrow}
      title={d.home.cta.title}
      text={d.home.cta.text}
      primary={{ label: d.home.cta.primary.label, href: localizedHref(locale, d.home.cta.primary.href) }}
      secondary={{ label: d.home.cta.secondary.label, href: localizedHref(locale, d.home.cta.secondary.href) }}
    />
  );
}

function heroActions(locale: Locale, d: Dictionary, secondary?: { label: string; href: string }) {
  return (
    <>
      <Button href={localizedHref(locale, "/contact")} size="lg" arrow>
        {d.common.cta.talk}
      </Button>
      {secondary && (
        <Button href={localizedHref(locale, secondary.href)} variant="ghost">
          {secondary.label}
        </Button>
      )}
      <UpdatedStamp locale={locale} label={d.seo.labels.updated} iso={LANDING_UPDATED} className="basis-full" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* AI consulting in Switzerland (pillar)                               */
/* ------------------------------------------------------------------ */

export function SwitzerlandPage({ locale, d }: Props) {
  const p = d.seo.switzerland;
  const path = landingPath("switzerland");
  const url = abs(locale, path);
  const crumbs: Crumb[] = [{ label: d.meta.siteName, href: "/" }, { label: d.seo.pages.switzerland }];
  const faqs = faqByIds(d, p.faqIds);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode(locale, path, { name: p.meta.title, description: p.meta.description, dateModified: LANDING_UPDATED }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: d.seo.pages.switzerland,
        serviceType: "AI consulting",
        description: p.meta.description,
        url,
        provider: orgRef,
        areaServed: { "@type": "Country", name: "Switzerland" },
        availableLanguage: ["en", "fr", "de"],
      },
      faqLd(faqs, url),
      breadcrumbLd(locale, crumbs, path),
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        lead={p.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        layout="plain"
        actions={heroActions(locale, d, { label: d.seo.pages.geneva, href: landingPath("geneva") })}
      />

      <FactBlock eyebrow={d.seo.facts.eyebrow} title={d.seo.facts.title} definition={d.seo.facts.definition} items={d.seo.facts.items} />

      <Section id="services">
        <SectionHeader eyebrow={p.services.eyebrow} title={p.services.title} lead={p.services.lead} />
        <div className="mt-14 md:mt-20">
          <LinkRows
            items={d.services.map((s) => ({ href: localizedHref(locale, `/services/${s.slug}`), index: s.index, title: d.seo.titles.services[s.slug], text: s.short }))}
          />
        </div>
      </Section>

      <Section id="engagement" tone="bone">
        <SectionHeader eyebrow={p.engagement.eyebrow} title={p.engagement.title} lead={p.engagement.lead} />
        <div className="mt-14 md:mt-20">
          <DataTable
            head={[p.engagement.columns.stage, p.engagement.columns.what, p.engagement.columns.pricing, p.engagement.columns.duration]}
            rows={d.home.approach.stages.map((s) => [s.label, s.text, s.pricing, s.duration])}
          />
          <Reveal className="mt-8">
            <Button href={localizedHref(locale, "/approach#sprint")} variant="ghost" arrow>
              {d.common.cta.startSprint}
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section id="swiss">
        <SectionHeader
          eyebrow={p.swiss.eyebrow}
          title={p.swiss.title}
          lead={p.swiss.lead}
          action={
            <Button href={localizedHref(locale, p.swiss.cta.href)} variant="ghost" arrow>
              {p.swiss.cta.label}
            </Button>
          }
        />
        <div className="mt-14 md:mt-20">
          <TextCards items={p.swiss.items} columns={2} icons={["residency", "shield", "trust", "branch"]} />
        </div>
      </Section>

      <Section id="sectors" tone="carbon" divider>
        <SectionHeader eyebrow={p.sectors.eyebrow} title={p.sectors.title} lead={p.sectors.lead} />
        <div className="mt-14 md:mt-20">
          <IndustryTiles
            locale={locale}
            industries={d.industries}
            size="sm"
            labels={{ streamsCount: d.pageSections.industriesHub.streamsCount, explore: d.common.cta.explore }}
          />
        </div>
      </Section>

      <Section id="where">
        <SectionHeader
          eyebrow={p.where.eyebrow}
          title={p.where.title}
          lead={p.where.lead}
          action={
            <Button href={localizedHref(locale, p.where.cta.href)} variant="ghost" arrow>
              {p.where.cta.label}
            </Button>
          }
        />
        <div className="mt-14 md:mt-20">
          <TextCards items={p.where.places} />
          <p className="mt-6 font-mono text-[12px] leading-relaxed text-fg-dim">{p.where.note}</p>
        </div>
      </Section>

      <RelatedCards id="work" tone="bone" eyebrow={p.work.eyebrow} title={p.work.title} items={caseCards(locale, d, d.home.work.featured)} />

      <Section id="choose">
        <SectionHeader eyebrow={p.choose.eyebrow} title={p.choose.title} lead={p.choose.lead} />
        <div className="mt-14 md:mt-20">
          <TextCards items={p.choose.items} />
        </div>
      </Section>

      <FaqSection id="faq" tone="carbon" eyebrow={p.faq.eyebrow} title={p.faq.title} items={faqs} jsonLd={false} action={faqMore(locale, d)} />
      <Cta locale={locale} d={d} />
    </>
  );
}

function faqMore(locale: Locale, d: Dictionary) {
  return (
    <Button href={localizedHref(locale, "/faq")} variant="ghost" arrow>
      {fillCount(d.seo.labels.allQuestions, d.seo.faq.items.length)}
    </Button>
  );
}

const fillCount = (t: string, n: number) => t.replace("{n}", String(n));

/* ------------------------------------------------------------------ */
/* AI consulting in Geneva                                             */
/* ------------------------------------------------------------------ */

export function GenevaPage({ locale, d }: Props) {
  const p = d.seo.geneva;
  const path = landingPath("geneva");
  const url = abs(locale, path);
  const crumbs: Crumb[] = [
    { label: d.meta.siteName, href: "/" },
    { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
    { label: d.offices.find((o) => o.hq)?.city ?? "Genève" },
  ];
  const faqs = [...faqByIds(d, p.faqIds), ...p.faqExtra];
  const industries = getIndustriesBySlugs(locale, p.sectors.items.map((x) => x.industry));
  const hq = d.offices.find((o) => o.hq);
  const geneveCases = d.cases.filter((c) => p.sectors.items.some((x) => x.industry === c.sector)).map((c) => c.slug);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode(locale, path, { name: p.meta.title, description: p.meta.description, dateModified: LANDING_UPDATED }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: d.seo.pages.geneva,
        serviceType: "AI consulting",
        description: p.meta.description,
        url,
        provider: orgRef,
        areaServed: { "@type": "City", name: "Geneva", containedInPlace: { "@type": "Country", name: "Switzerland" } },
        availableLanguage: ["en", "fr", "de"],
      },
      faqLd(faqs, url),
      breadcrumbLd(locale, crumbs, path),
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        lead={p.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={images["hero-geneva"]}
        mediaAlt=""
        mediaClassName="object-[50%_30%]"
        actions={heroActions(locale, d, { label: d.seo.pages.switzerland, href: landingPath("switzerland") })}
      />

      <Section id="context" lines>
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <div className="col-span-4 md:col-span-6">
            <SectionHeader eyebrow={p.context.eyebrow} title={p.context.title} layout="stacked" />
            {p.context.paragraphs?.map((t, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className={i === 0 ? "mt-10 text-lead text-fg" : "mt-6 text-[17px] leading-[1.7] text-fg-muted"}>{t}</p>
              </Reveal>
            ))}
          </div>
          <div className="col-span-4 grid grid-cols-1 gap-px sm:grid-cols-2 md:col-span-6 md:pt-14">
            {p.context.stats.map((s) => (
              <StatCallout key={s.label} stat={s} sourceLabel={d.common.labels.source} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="sectors" tone="carbon" divider>
        <SectionHeader eyebrow={p.sectors.eyebrow} title={p.sectors.title} lead={p.sectors.lead} />
        <RelatedCardsGrid
          className="mt-14 md:mt-20"
          items={p.sectors.items.map((x, i) => ({
            href: localizedHref(locale, `/industries/${x.industry}`),
            kicker: d.common.labels.core,
            title: d.seo.titles.industries[x.industry] ?? x.title,
            text: x.text,
            icon: industries[i]?.icon,
            cta: d.common.cta.explore,
          }))}
        />
      </Section>

      <Section id="onsite">
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <div className="col-span-4 md:col-span-7">
            <SectionHeader eyebrow={p.onsite.eyebrow} title={p.onsite.title} layout="stacked" />
            {p.onsite.paragraphs?.map((t, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <p className={i === 0 ? "mt-10 text-lead text-fg" : "mt-6 text-[17px] leading-[1.7] text-fg-muted"}>{t}</p>
              </Reveal>
            ))}
          </div>
          {hq?.addressLines && (
            <Reveal delay={0.15} className="col-span-4 md:col-span-4 md:col-start-9 md:self-end">
              <address className="border-t border-line pt-6 not-italic">
                <p className="eyebrow text-fg-dim">{d.common.labels.hq}</p>
                <p className="mt-4 font-mono text-[14px] leading-relaxed text-fg">
                  {d.meta.siteName}
                  {hq.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 block underline decoration-line-strong underline-offset-4 hover:text-ember-ink">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </address>
            </Reveal>
          )}
        </div>
        <div className="mt-14 md:mt-20">
          <TextCards items={p.onsite.points} icons={["strategy", "globe", "fde"]} />
        </div>
      </Section>

      <Section id="data" tone="bone">
        <SectionHeader
          eyebrow={p.data.eyebrow}
          title={p.data.title}
          action={
            <Button href={localizedHref(locale, landingPath("governance"))} variant="ghost" arrow>
              {d.seo.pages.governance}
            </Button>
          }
        />
        <div className="mt-14 md:mt-20">
          <TextCards items={p.data.items} icons={["residency", "shield", "intl-orgs"]} />
        </div>
      </Section>

      <RelatedCards id="work" eyebrow={p.work.eyebrow} title={p.work.title} lead={p.work.lead} items={caseCards(locale, d, geneveCases as Dictionary["home"]["work"]["featured"])} />

      <FaqSection id="faq" tone="carbon" eyebrow={p.faq.eyebrow} title={p.faq.title} items={faqs} jsonLd={false} action={faqMore(locale, d)} />
      <Cta locale={locale} d={d} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* AI governance in Switzerland (hub)                                  */
/* ------------------------------------------------------------------ */

export function GovernancePage({ locale, d }: Props) {
  const p = d.seo.governance;
  const path = landingPath("governance");
  const url = abs(locale, path);
  const crumbs: Crumb[] = [{ label: d.meta.siteName, href: "/" }, { label: d.seo.pages.governance }];
  const faqs = faqByIds(d, p.faqIds);
  const insights = p.insightSlugs.map((s) => getInsight(locale, s)).filter((x): x is NonNullable<typeof x> => !!x);
  const services = d.services.filter((s) => s.slug === "ai-operations" || s.slug === "adoption-enablement");

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...webPageNode(locale, path, { type: "CollectionPage", name: p.meta.title, description: p.meta.description, dateModified: LANDING_UPDATED }),
        about: [{ "@type": "Thing", name: "AI governance" }, { "@type": "Thing", name: "FINMA Guidance 08/2024" }, { "@type": "Thing", name: "nFADP" }, { "@type": "Thing", name: "EU AI Act" }],
        mainEntity: { "@id": `${url}#reading` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#reading`,
        name: p.reading.title.pre + p.reading.title.accent,
        itemListElement: insights.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: abs(a.lang, `/insights/${a.slug}`), name: a.title })),
      },
      faqLd(faqs, url),
      breadcrumbLd(locale, crumbs, path),
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        lead={p.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        layout="plain"
        facts={p.frameworks.items.map((f) => ({ label: f.key === "swiss" ? "CH" : f.key === "euaiact" ? "EU" : f.key === "finma" ? "FINMA" : "nFADP", value: f.name }))}
        actions={heroActions(locale, d, { label: d.seo.pages.switzerland, href: landingPath("switzerland") })}
      />

      <Section id="frameworks">
        <SectionHeader eyebrow={p.frameworks.eyebrow} title={p.frameworks.title} lead={p.frameworks.lead} />
        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 md:grid-cols-2">
          {p.frameworks.items.map((f, i) => (
            <Reveal key={f.key} delay={i * 0.05} className="flex flex-col bg-[var(--bg)] p-8 md:p-10">
              <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-h3 font-medium text-balance text-fg">{f.name}</h3>
              <p className="eyebrow mt-4 text-fg-dim">{f.scope}</p>
              <p className="mt-6 text-[16px] leading-relaxed text-fg">{f.summary}</p>
              <ul className="mt-6 space-y-3">
                {f.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ember" />
                    {pt}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 font-mono text-[11.5px] tracking-[0.1em] text-fg-dim uppercase">
                {d.common.labels.source}: {f.source}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="at-a-glance" tone="bone">
        <SectionHeader eyebrow={p.table.eyebrow} title={p.table.title} />
        <div className="mt-14 md:mt-20">
          <DataTable
            head={[p.table.columns.framework, p.table.columns.concerns, p.table.columns.asks, p.table.columns.build]}
            rows={p.table.rows.map((r) => [r.framework, r.concerns, r.asks, r.build])}
          />
        </div>
      </Section>

      <Section id="controls">
        <SectionHeader eyebrow={p.controls.eyebrow} title={p.controls.title} lead={p.controls.lead} />
        <div className="mt-14 md:mt-20">
          <TextCards items={p.controls.items} icons={p.controls.items.map((c) => c.icon)} />
        </div>
      </Section>

      {insights.length > 0 && (
        <RelatedCards
          id="reading"
          tone="carbon"
          eyebrow={p.reading.eyebrow}
          title={p.reading.title}
          items={insights.map((a) => ({
            href: localizedHref(locale, `/insights/${a.slug}`),
            kicker: a.category,
            title: a.title,
            text: a.dek,
            cta: d.common.cta.readArticle,
          }))}
        />
      )}

      <Section id="services">
        <SectionHeader eyebrow={p.services.eyebrow} title={p.services.title} lead={p.services.lead} />
        <div className="mt-14 md:mt-20">
          <LinkRows
            items={services.map((s) => ({ href: localizedHref(locale, `/services/${s.slug}`), index: s.index, title: d.seo.titles.services[s.slug], text: s.short }))}
          />
        </div>
      </Section>

      <FaqSection id="faq" tone="carbon" eyebrow={p.faq.eyebrow} title={p.faq.title} items={faqs} jsonLd={false} action={faqMore(locale, d)} />
      <Section spacing="tight" tone="carbon" className="!pt-0">
        <p className="max-w-[80ch] font-mono text-[12px] leading-relaxed text-fg-dim">{p.disclaimer}</p>
      </Section>
      <Cta locale={locale} d={d} />
    </>
  );
}
