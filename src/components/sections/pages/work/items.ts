import type { CaseStudy, Insight, Locale } from "@/content";
import { getDictionary } from "@/content";
import { images } from "@/lib/media";
import { localizedHref } from "@/lib/i18n";
import { insightCover } from "@/lib/insight-cover";
import type { RelatedItem } from "../shared/RelatedCards";

/** Case study → RelatedItem card (image, sector kicker, title, client, two metrics). */
export function caseToItem(locale: Locale, c: CaseStudy): RelatedItem {
  const d = getDictionary(locale);
  return {
    href: localizedHref(locale, `/work/${c.slug}`),
    kicker: c.sectorLabel,
    title: c.title,
    text: c.client,
    image: images[c.image],
    metrics: c.results.slice(0, 2),
    cta: d.common.cta.readCase,
  };
}

/** Insight → RelatedItem card. */
export function insightToItem(locale: Locale, i: Insight, kicker?: string): RelatedItem {
  const d = getDictionary(locale);
  return {
    href: localizedHref(locale, `/insights/${i.slug}`),
    kicker: kicker ?? i.category,
    title: i.title,
    text: i.dek,
    image: insightCover(i),
    cta: d.common.cta.readArticle,
  };
}
