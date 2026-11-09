import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fill, formatDate, getDictionary, getServicesBySlugs } from "@/content";
import { getInsight, getInsights, insightParams } from "@/lib/insights";
import { insightCover } from "@/lib/insight-cover";
import { isLocale, localizedHref } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { Arrow, Section, Tag } from "@/components/ui";
import { Icon } from "@/components/icons";
import { JsonLd, RelatedCards, absoluteUrl, breadcrumbLd, organizationLd, pageMetadata } from "@/components/sections/pages/shared";
import { DetailHero } from "@/components/sections/pages/work/DetailHero";
import { insightToItem } from "@/components/sections/pages/work/items";
import { Prose } from "@/components/sections/pages/insights/Prose";
import { Toc } from "@/components/sections/pages/insights/Toc";
import { ReadingProgress } from "@/components/sections/pages/insights/ReadingProgress";
import { Share } from "@/components/sections/pages/insights/Share";
import { NewsletterBand } from "@/components/sections/pages/insights/NewsletterBand";
import { newsletterLabels } from "@/components/sections/pages/insights/labels";
import { toc, wordCount } from "@/components/sections/pages/insights/blocks";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { landingPath } from "@/lib/routes";
import { WEBSITE_ID, serviceId } from "@/lib/graph";

export const dynamicParams = false;

export function generateStaticParams() {
  return insightParams();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/insights/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const a = getInsight(locale, slug);
  if (!a) return {};
  const d = getDictionary(locale);
  const base = pageMetadata({
    locale,
    path: `/insights/${slug}`,
    title: a.title,
    description: fill(d.meta.insightDetail, { dek: a.dek, title: a.title }),
    type: "article",
    publishedTime: a.date,
    modifiedTime: a.date,
    authors: [a.author],
    section: a.category,
    tags: a.tags.map((t) => d.blog.tags[t]),
    // A page without a translation shows the English text: it points at the English original.
    alternateLocales: a.translations,
    canonicalLocale: a.lang,
  });
  return base;

}

export default async function InsightPage({ params }: PageProps<"/[locale]/insights/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const a = getInsight(locale, slug);
  if (!a) notFound();
  const d = getDictionary(locale);
  const L = d.common.labels;
  const items = toc(a.body);
  const services = getServicesBySlugs(locale, a.relatedServices);
  const url = absoluteUrl(a.lang, `/insights/${a.slug}`);
  const cover = insightCover(a);
  const foreign = a.lang !== locale;

  const crumbs = [
    { label: d.meta.siteName, href: "/" },
    { label: d.nav.items.insights, href: "/insights" },
    { label: a.category },
  ];

  // Related: shared services first, then most recent.
  const others = getInsights(locale).filter((x) => x.slug !== a.slug);
  const overlap = (x: typeof a) => x.relatedServices.filter((s) => a.relatedServices.includes(s)).length;
  const related = [...others].sort((x, y) => overlap(y) - overlap(x) || y.date.localeCompare(x.date)).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs, `/insights/${a.slug}`),
            {
              "@type": "BlogPosting",
              "@id": `${url}#article`,
              headline: a.title,
              description: a.dek,
              image: [new URL(cover.src, SITE_URL).toString()],
              datePublished: a.date,
              dateModified: a.date,
              inLanguage: a.lang,
              articleSection: a.category,
              wordCount: wordCount(a.body),
              timeRequired: `PT${a.readingMinutes}M`,
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              url,
              keywords: a.tags.map((t) => d.blog.tags[t]).join(", "),
              isPartOf: { "@id": WEBSITE_ID },
              about: services.map((s) => ({ "@type": "Service", "@id": serviceId(locale, s.slug), name: s.name })),
              // Practice bylines ("Emineon · Strategy practice") are the organisation itself; no invented people.
              author: { "@type": "Organization", name: a.author, url: `${SITE_URL}/`, parentOrganization: organizationLd() },
              publisher: organizationLd(),
            },
          ],
        }}
      />
      <ReadingProgress targetId="article-body" label={d.common.a11y.readingProgress} />

      <DetailHero
        locale={locale}
        crumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        eyebrow={a.category}
        title={a.title}
        lead={a.dek}
        meta={
          <dl className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-[0.12em]">
            <div className="flex gap-2">
              <dt className="text-fg-dim">{L.published}</dt>
              <dd className="text-fg tabular">
                <time dateTime={a.date}>{formatDate(locale, a.date)}</time>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-fg-dim">{L.readingTime}</dt>
              <dd className="text-fg tabular">{fill(d.common.units.minRead, { n: a.readingMinutes })}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-fg-dim">{L.author}</dt>
              <dd className="text-fg normal-case tracking-[0.04em]">{a.author}</dd>
            </div>
          </dl>
        }
        image={cover}
      />

      <Section spacing="none" className="pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <aside className="col-span-4 hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+40px)] flex flex-col gap-12">
              <Toc items={items} label={L.onThisPage} />
              <Share url={url} title={a.title} labels={{ share: L.share, copyLink: L.copyLink, linkCopied: L.linkCopied, email: L.email }} />
            </div>
          </aside>
          <article id="article-body" lang={foreign ? a.lang : undefined} className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-5">
            {foreign && (
              <p lang={locale} className="mb-10 border-l border-ember pl-4 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-muted">
                {d.blog.englishOnly}
              </p>
            )}
            {/* Mobile ToC */}
            {items.length > 0 && (
              <details className="group mb-12 border-y border-line lg:hidden">
                <summary className="flex h-12 cursor-pointer list-none items-center justify-between font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg-muted">
                  {L.onThisPage}
                  <span aria-hidden className="text-ember-ink transition-transform group-open:rotate-45">+</span>
                </summary>
                <ol className="pb-4">
                  {items.map((it, i) => (
                    <li key={it.id}>
                      <a href={`#${it.id}`} className="flex gap-3 py-2 text-[14px] text-fg-muted hover:text-fg">
                        <span className="font-mono text-[11px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}
            <Prose blocks={a.body} lede />

            {a.generated && (
              <p lang={locale} className="mt-16 max-w-[68ch] text-[14px] leading-relaxed text-fg-dim">
                {d.blog.generatedNote}
              </p>
            )}

            <footer lang={foreign ? locale : undefined} className="mt-20 border-t border-line pt-10">
              <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                <div>
                  <p className="eyebrow text-fg-dim">{L.author}</p>
                  <p className="mt-3 text-fg">{a.author}</p>
                </div>
                <div className="lg:hidden">
                  <Share url={url} title={a.title} labels={{ share: L.share, copyLink: L.copyLink, linkCopied: L.linkCopied, email: L.email }} />
                </div>
              </div>
              {services.length > 0 && (
                <div className="mt-12">
                  <p className="eyebrow text-fg-dim">{L.relatedServices}</p>
                  <ul className="mt-5 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
                    {services.map((s) => (
                      <li key={s.slug} className="bg-canvas">
                        <Link href={localizedHref(locale, `/services/${s.slug}`)} className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-surface">
                          <Icon name={s.icon} size={24} accent className="mt-0.5 shrink-0 text-fg-muted" />
                          <span className="flex-1">
                            <span className="block text-fg group-hover:text-ember-ink">{s.name}</span>
                            <span className="mt-1 block text-[14px] leading-snug text-fg-muted">{s.short}</span>
                          </span>
                          <Arrow className="mt-1 shrink-0 text-fg-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ember-ink" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-12 flex flex-wrap gap-2">
                <Tag>{a.category}</Tag>
                <Tag>{formatDate(locale, a.date)}</Tag>
              </div>
            </footer>
          </article>
        </div>
      </Section>

      <RelatedCards
        tone="carbon"
        eyebrow={L.relatedInsights}
        title={d.home.insights.title}
        items={related.map((r) => insightToItem(locale, r))}
        columns={3}
        action={
          <Link href={localizedHref(locale, "/insights")} className="group flex items-center gap-2 text-[15px] text-fg hover:text-ember-ink">
            {d.common.cta.backToInsights}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        }
      />
      <RelatedLinks
        locale={locale}
        label={d.seo.labels.related}
        links={[
          ...services.slice(0, 2).map((s) => ({ label: d.seo.titles.services[s.slug], href: `/services/${s.slug}` })),
          { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
          ...(a.tags.some((t) => /regul|govern|compliance|data/.test(t)) || a.slug.includes("nfadp") || a.slug.includes("evals")
            ? [{ label: d.seo.pages.governance, href: landingPath("governance") }]
            : []),
        ]}
      />

      <NewsletterBand locale={locale} labels={newsletterLabels(d)} />
    </>
  );
}
