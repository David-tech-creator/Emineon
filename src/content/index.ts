import type {
  CaseSlug,
  CaseStudy,
  Dictionary,
  Industry,
  IndustrySlug,
  Locale,
  Service,
  ServiceSlug,
} from './schema';
import { caseSlugs, defaultLocale, industrySlugs, locales, serviceSlugs } from './schema';
import { en } from './en';
import { fr } from './fr';
import { de } from './de';

export * from './schema';

const dictionaries: Record<Locale, Dictionary> = { en, fr, de };

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Synchronous, static dictionary lookup. Falls back to the default locale. */
export function getDictionary(locale: string): Dictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export function getService(locale: string, slug: string): Service | undefined {
  return getDictionary(locale).services.find((s) => s.slug === slug);
}

export function getIndustry(locale: string, slug: string): Industry | undefined {
  return getDictionary(locale).industries.find((i) => i.slug === slug);
}

export function getCase(locale: string, slug: string): CaseStudy | undefined {
  return getDictionary(locale).cases.find((c) => c.slug === slug);
}

// Insights live in content/insights/*.md: see src/lib/insights.ts (server only).

export function getServicesBySlugs(locale: string, slugs: readonly ServiceSlug[]): Service[] {
  const all = getDictionary(locale).services;
  return slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is Service => !!x);
}

export function getIndustriesBySlugs(locale: string, slugs: readonly IndustrySlug[]): Industry[] {
  const all = getDictionary(locale).industries;
  return slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is Industry => !!x);
}

export function getCasesBySlugs(locale: string, slugs: readonly CaseSlug[]): CaseStudy[] {
  const all = getDictionary(locale).cases;
  return slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is CaseStudy => !!x);
}

/** Cases for a given industry. */
export function getCasesForIndustry(locale: string, industry: IndustrySlug): CaseStudy[] {
  return getDictionary(locale).cases.filter((c) => c.sector === industry);
}

/** Cases that used a given service. */
export function getCasesForService(locale: string, service: ServiceSlug): CaseStudy[] {
  return getDictionary(locale).cases.filter((c) => c.services.includes(service));
}

/** Replace "{key}" placeholders in a template string. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Format an ISO date for the locale, e.g. "12 March 2026" / "12 mars 2026" / "12. März 2026". */
export function formatDate(locale: string, iso: string): string {
  const d = getDictionary(locale);
  return new Intl.DateTimeFormat(d.common.dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Static params helpers for generateStaticParams. */
export const staticParams = {
  locales: () => locales.map((locale) => ({ locale })),
  services: () => locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug }))),
  industries: () => locales.flatMap((locale) => industrySlugs.map((slug) => ({ locale, slug }))),
  cases: () => locales.flatMap((locale) => caseSlugs.map((slug) => ({ locale, slug }))),
};
