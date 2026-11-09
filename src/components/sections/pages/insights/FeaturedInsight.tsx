import type { Insight, Locale } from "@/content";
import { getDictionary } from "@/content";
import { Reveal } from "@/components/ui";
import { ReportCard } from "./ReportCard";

/** Lead story as a landscape "report" card: dot-lattice cover left (7 cols), title, dek and wordmark right. */
export function FeaturedInsight({ locale, insight, label }: { locale: Locale; insight: Insight; label: string }) {
  const d = getDictionary(locale);
  return (
    <Reveal>
      <ReportCard
        locale={locale}
        insight={insight}
        minRead={d.common.units.minRead}
        layout="landscape"
        label={label}
        cta={d.common.cta.readArticle}
        headingLevel="h2"
        priority
      />
    </Reveal>
  );
}
