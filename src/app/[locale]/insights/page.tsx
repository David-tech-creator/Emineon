import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fill, formatDate, getDictionary } from "@/content";
import { getInsights } from "@/lib/insights";
import { localizedHref } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import { Section } from "@/components/ui";
import { JsonLd, PageHero, absoluteUrl, breadcrumbLd, pageMetadata } from "@/components/sections/pages/shared";
import { FilterGrid } from "@/components/sections/pages/work/FilterGrid";
import { insightToItem } from "@/components/sections/pages/work/items";
import { FeaturedInsight } from "@/components/sections/pages/insights/FeaturedInsight";
import { slugify } from "@/components/sections/pages/insights/blocks";
import { NewsletterBand } from "@/components/sections/pages/insights/NewsletterBand";
import { newsletterLabels } from "@/components/sections/pages/insights/labels";

export async function generateMetadata({ params }: PageProps<"/[locale]/insights">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  const base = pageMetadata({ locale, path: "/insights", title: meta.insights.title, description: meta.insights.description });
  return {
    ...base,
    alternates: { ...base.alternates, types: { "application/rss+xml": [{ url: localizedHref(locale, "/insights/rss.xml"), title: `Emineon ${meta.insights.title}` }] } },
  };
}

export default async function InsightsPage({ params }: PageProps<"/[locale]/insights">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const hub = d.hubs.insights;
  const all = getInsights(locale);
  const [featured, ...rest] = all;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.insights }];

  const cats = Array.from(new Set(rest.map((i) => i.category)));
  const options = cats.map((c) => ({ value: slugify(c), label: c, count: rest.filter((i) => i.category === c).length }));
  const items = rest.map((i) => ({
    ...insightToItem(locale, i, `${i.category} · ${formatDate(locale, i.date)}`),
    group: slugify(i.category),
    cta: fill(d.common.units.minRead, { n: i.readingMinutes }),
  }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs),
            {
              "@type": "Blog",
              name: d.meta.insights.title,
              description: d.meta.insights.description,
              url: absoluteUrl(locale, "/insights"),
              inLanguage: locale,
              blogPost: all.map((i) => ({ "@type": "BlogPosting", headline: i.title, datePublished: i.date, inLanguage: i.lang, url: absoluteUrl(i.lang, `/insights/${i.slug}`) })),
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
        {featured && <FeaturedInsight locale={locale} insight={featured} label={hub.latest} />}
        <div className="mt-16 md:mt-24">
          <FilterGrid label={d.common.labels.category} allLabel={hub.filterAll} options={options} items={items} param="topic" />
        </div>
      </Section>
      <NewsletterBand locale={locale} labels={newsletterLabels(d)} />
    </>
  );
}
