import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { Section, Reveal } from "@/components/ui";
import { CtaBand, JsonLd, PageHero, breadcrumbLd, pageMetadata, absoluteUrl } from "@/components/sections/pages/shared";
import { FilterGrid } from "@/components/sections/pages/work/FilterGrid";
import { caseToItem } from "@/components/sections/pages/work/items";
import { videos } from "@/lib/media";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/work", title: meta.work.title, description: meta.work.description });
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const hub = d.hubs.work;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.work }];

  const options = d.industries
    .map((ind) => ({ value: ind.slug, label: ind.name, count: d.cases.filter((c) => c.sector === ind.slug).length }))
    .filter((o) => o.count > 0);
  const items = d.cases.map((c) => ({ ...caseToItem(locale, c), group: c.sector }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs),
            {
              "@type": "CollectionPage",
              name: d.meta.work.title,
              description: d.meta.work.description,
              url: absoluteUrl(locale, "/work"),
              hasPart: d.cases.map((c) => ({ "@type": "CreativeWork", name: c.title, url: absoluteUrl(locale, `/work/${c.slug}`) })),
            },
          ],
        }}
      />
      <PageHero
        locale={locale}
        eyebrow={hub.eyebrow}
        title={hub.title}
        lead={hub.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        layout="plain"
      />
      <Section spacing="none" className="pb-24 md:pb-32">
        <FilterGrid label={d.common.labels.sector} allLabel={hub.filterAll} options={options} items={items} param="sector" />
        <Reveal>
          <p className="mt-10 max-w-[80ch] border-l border-ember/60 pl-4 font-mono text-[12.5px] leading-relaxed text-fg-dim">
            {hub.disclaimer}
          </p>
        </Reveal>
      </Section>
      <CtaBand
        eyebrow={d.home.cta.eyebrow}
        title={d.approach.cta.title}
        text={d.approach.cta.text}
        primary={{ label: hub.cta.label, href: localizedHref(locale, hub.cta.href) }}
        secondary={{ label: d.nav.items.approach, href: localizedHref(locale, "/approach") }}
        video={videos.filaments}
      />
    </>
  );
}
