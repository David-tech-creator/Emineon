/**
 * Localized slugs for the SEO landing pages (SEO-PLAN §4: the query in the URL,
 * in the language of the query). Everything else keeps identical slugs across
 * locales (CONTENT.md).
 *
 * Content and code always link with the English path ("/ai-consulting-geneva");
 * localizedHref() swaps in the locale's slug, so hreflang alternates, the
 * sitemap, the locale switcher and llms.txt all follow automatically.
 * The pages themselves are served by src/app/[locale]/[landing]/page.tsx.
 */
import type { Locale } from "@/content/schema";

export const landingSlugs = {
  switzerland: { en: "ai-consulting-switzerland", fr: "conseil-ia-suisse", de: "ki-beratung-schweiz" },
  geneva: { en: "ai-consulting-geneva", fr: "conseil-ia-geneve", de: "ki-beratung-genf" },
  governance: { en: "ai-governance-switzerland", fr: "gouvernance-ia-suisse", de: "ki-governance-schweiz" },
} as const satisfies Record<string, Record<Locale, string>>;

export type LandingKey = keyof typeof landingSlugs;
export const landingKeys = Object.keys(landingSlugs) as LandingKey[];

/** Canonical (English, locale-less) path of a landing page: "/ai-consulting-geneva". */
export const landingPath = (key: LandingKey) => `/${landingSlugs[key].en}`;

/** Which landing page a slug (in any locale) belongs to. */
export function landingKeyForSlug(slug: string): LandingKey | undefined {
  return landingKeys.find((k) => Object.values(landingSlugs[k]).includes(slug as never));
}

/** The landing page for a slug only if it is the slug of that exact locale. */
export function landingKeyFor(locale: Locale, slug: string): LandingKey | undefined {
  return landingKeys.find((k) => landingSlugs[k][locale] === slug);
}

/** Rewrite the first segment of a locale-less path to the locale's landing slug (keeps the rest). */
export function localizeLandingPath(locale: Locale, path: string): string {
  const m = /^\/([^/?#]+)(.*)$/.exec(path);
  if (!m) return path;
  const key = landingKeyForSlug(m[1]);
  return key ? `/${landingSlugs[key][locale]}${m[2]}` : path;
}
