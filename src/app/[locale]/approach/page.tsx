import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { images, videos } from "@/lib/media";
import { Button, Section } from "@/components/ui";
import {
  CtaBand,
  FaqSection,
  InPageNav,
  JsonLd,
  PageHero,
  PhaseTimeline,
  SectionHeader,
  absoluteUrl,
  breadcrumbLd,
  organizationLd,
  pageMetadata,
} from "@/components/sections/pages/shared";
import {
  IconItemGrid,
  ModelsGrid,
  PrinciplesGrid,
  PromiseCallout,
  StagePanels,
} from "@/components/sections/pages/approach/ApproachSections";

export async function generateMetadata({ params }: PageProps<"/[locale]/approach">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/approach", title: meta.approach.title, description: meta.approach.description });
}

export default async function ApproachPage({ params }: PageProps<"/[locale]/approach">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const a = d.approach;
  const ps = d.pageSections.approach;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.approach }];
  const strip = (s: string) => s.replace(/^\s*\[\s*(\d+\s*—\s*)?|\s*\]\s*$/g, "");

  const sections = [
    { id: "model", label: strip(a.model.eyebrow) },
    { id: "pricing", label: strip(a.pricing.eyebrow) },
    { id: "sprint", label: strip(a.sprint.eyebrow) },
    { id: "models", label: strip(a.models.eyebrow) },
    { id: "team", label: strip(a.team.eyebrow) },
    { id: "faq", label: d.common.labels.faq },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbLd(locale, crumbs, "/approach"),
      {
        "@type": "ItemList",
        name: strip(a.model.eyebrow),
        itemListElement: a.model.stages.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.text,
            provider: organizationLd(),
            url: absoluteUrl(locale, "/approach"),
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        lead={a.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        image={images.atrium}
        mediaAlt=""
        layout="background"
        facts={a.model.stages.map((s) => ({ label: s.label, value: s.duration }))
          .concat([{ label: ps.pricingLabel, value: d.pageSections.service.pricingValue }])}
        actions={
          <>
            <Button href={localizedHref(locale, a.cta.primary.href)} size="lg" arrow>
              {a.cta.primary.label}
            </Button>
            <Button href="#sprint" variant="ghost">
              {strip(a.sprint.eyebrow)}
            </Button>
          </>
        }
      />

      <InPageNav items={sections} label={d.common.labels.onThisPage} />

      <Section id="model">
        <SectionHeader eyebrow={a.model.eyebrow} title={a.model.title} lead={a.model.lead} />
        <div className="mt-14 md:mt-20">
          <StagePanels
            stages={a.model.stages}
            labels={{ includes: ps.includesLabel, exit: ps.exitLabel, pricing: ps.pricingLabel, duration: ps.durationLabel }}
          />
        </div>
      </Section>

      <Section id="pricing" tone="bone">
        <SectionHeader eyebrow={a.pricing.eyebrow} title={a.pricing.title} lead={a.pricing.lead} />
        <div className="mt-14 md:mt-20">
          <PrinciplesGrid items={a.pricing.principles} note={a.pricing.note} />
        </div>
      </Section>

      <Section id="sprint" lines>
        <SectionHeader eyebrow={a.sprint.eyebrow} title={a.sprint.title} lead={a.sprint.lead} />
        <PhaseTimeline
          className="mt-16 md:mt-24"
          outputsLabel={ps.outputsLabel}
          steps={a.sprint.weeks.map((w) => ({ label: w.label, title: w.title, text: w.text, outputs: w.outputs }))}
        />
        <PromiseCallout label={ps.promiseLabel} text={a.sprint.promise} />
      </Section>

      <Section id="models" tone="carbon" divider>
        <SectionHeader eyebrow={a.models.eyebrow} title={a.models.title} lead={a.models.lead} />
        <div className="mt-14 md:mt-20">
          <ModelsGrid items={a.models.items} bestForLabel={ps.bestForLabel} />
        </div>
      </Section>

      <Section id="team" tone="bone">
        <SectionHeader eyebrow={a.team.eyebrow} title={a.team.title} lead={a.team.lead} />
        <div className="mt-14 md:mt-20">
          <IconItemGrid items={a.team.pods} />
        </div>
      </Section>

      <FaqSection id="faq" eyebrow={ps.faqEyebrow} title={ps.faqTitle} items={a.faq} />

      <CtaBand
        eyebrow={ps.ctaEyebrow}
        title={a.cta.title}
        text={a.cta.text}
        video={videos["hero-oak"]}
        primary={{ label: a.cta.primary.label, href: localizedHref(locale, a.cta.primary.href) }}
        secondary={{ label: a.cta.secondary.label, href: localizedHref(locale, a.cta.secondary.href) }}
      />
    </>
  );
}
