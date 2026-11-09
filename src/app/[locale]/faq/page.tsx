import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, type FaqGroupKey } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { landingPath } from "@/lib/routes";
import { abs, webPageNode } from "@/lib/graph";
import { Button } from "@/components/ui";
import { CtaBand, FaqSection, InPageNav, JsonLd, PageHero, breadcrumbLd, faqLd, pageMetadata } from "@/components/sections/pages/shared";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";

/** The full FAQ bank (SEO-PLAN §7), grouped, with one FAQPage node for all of it. */
export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = getDictionary(locale).seo.faqPage.meta;
  return pageMetadata({ locale, path: "/faq", title: m.title, description: m.description });
}

const ORDER: FaqGroupKey[] = ["firm", "engagements", "technology", "regulation"];
const TONES = ["dark", "carbon", "dark", "carbon"] as const;

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const s = d.seo;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: s.pages.faq }];
  const all = s.faq.items.map(({ q, a }) => ({ q, a }));
  const url = abs(locale, "/faq");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            webPageNode(locale, "/faq", { name: s.faqPage.meta.title, description: s.faqPage.meta.description }),
            faqLd(all, url),
            breadcrumbLd(locale, crumbs, "/faq"),
          ],
        }}
      />
      <PageHero
        locale={locale}
        eyebrow={s.faqPage.hero.eyebrow}
        title={s.faqPage.hero.title}
        lead={s.faqPage.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        layout="plain"
        actions={
          <Button href={localizedHref(locale, "/contact")} size="lg" arrow>
            {d.common.cta.talk}
          </Button>
        }
      />
      <InPageNav items={ORDER.map((g) => ({ id: `faq-${g}`, label: s.faq.groups[g] }))} label={d.common.labels.onThisPage} />
      {ORDER.map((g, i) => (
        <FaqSection
          key={g}
          id={`faq-${g}`}
          tone={TONES[i]}
          index={String(i + 1).padStart(2, "0")}
          eyebrow={s.faq.groups[g]}
          title={s.faq.groups[g]}
          items={s.faq.items.filter((f) => f.group === g).map(({ q, a }) => ({ q, a }))}
          jsonLd={false}
        />
      ))}
      <RelatedLinks
        locale={locale}
        label={s.labels.related}
        links={[
          { label: s.pages.switzerland, href: landingPath("switzerland") },
          { label: s.pages.geneva, href: landingPath("geneva") },
          { label: s.pages.governance, href: landingPath("governance") },
          { label: d.nav.items.approach, href: "/approach" },
        ]}
      />
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
