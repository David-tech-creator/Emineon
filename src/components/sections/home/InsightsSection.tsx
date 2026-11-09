import type { HomeDict, Insight, Locale } from "@/content/schema";
import { Reveal } from "@/components/ui";
import { localizedHref } from "@/lib/i18n";
import { ReportCard } from "@/components/sections/pages/insights/ReportCard";
import { SectionIntro } from "./SectionIntro";

/** Insights: the 3 latest articles as "report" cards. Bone section. */
export function InsightsSection({
  locale,
  intro,
  insights,
  minRead,
}: {
  locale: Locale;
  intro: HomeDict["insights"];
  insights: Insight[];
  minRead: string;
}) {
  return (
    <section aria-labelledby="home-insights-title" className="relative bg-canvas py-24 md:py-32">
      <div className="container-site">
        <SectionIntro
          id="home-insights-title"
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          cta={{ label: intro.cta.label, href: localizedHref(locale, intro.cta.href) }}
        />

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-8 md:mt-20 md:grid-cols-3 lg:gap-x-8">
          {insights.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.08} className="h-full">
              <ReportCard locale={locale} insight={a} minRead={minRead} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
