import type { MetadataRoute } from "next";
import { caseSlugs, industrySlugs, serviceSlugs } from "@/content";
import { getInsights } from "@/lib/insights";
import { defaultLocale, locales, localizedHref } from "@/lib/i18n";
import { SITE_URL, LANDING_UPDATED } from "@/lib/site";
import { landingKeys, landingPath } from "@/lib/routes";

const abs = (path: string) => new URL(path, SITE_URL).toString();

/** Every route × locale, each with hreflang alternates (incl. x-default). */
export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"]; lastModified?: Date; only?: readonly string[] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    // SEO landing pages: localized slugs come from localizedHref (src/lib/routes.ts).
    ...landingKeys.map((k) => ({ path: landingPath(k), priority: 0.9, freq: "monthly" as const, lastModified: new Date(`${LANDING_UPDATED}T00:00:00Z`) })),
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    ...serviceSlugs.map((s) => ({ path: `/services/${s}`, priority: 0.8, freq: "monthly" as const })),
    { path: "/approach", priority: 0.8, freq: "monthly" },
    { path: "/industries", priority: 0.9, freq: "monthly" },
    ...industrySlugs.map((s) => ({ path: `/industries/${s}`, priority: 0.8, freq: "monthly" as const })),
    { path: "/work", priority: 0.8, freq: "monthly" },
    ...caseSlugs.map((s) => ({ path: `/work/${s}`, priority: 0.7, freq: "yearly" as const })),
    { path: "/insights", priority: 0.8, freq: "weekly" },
    // Posts list only the locales they are translated into; the others point their canonical at English.
    ...getInsights(defaultLocale).map((i) => ({
      path: `/insights/${i.slug}`,
      priority: 0.7,
      freq: "yearly" as const,
      lastModified: new Date(`${i.date}T00:00:00Z`),
      only: i.translations,
    })),
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/careers", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/legal/privacy", priority: 0.2, freq: "yearly" },
    { path: "/legal/imprint", priority: 0.2, freq: "yearly" },
  ];

  return routes.flatMap((r) => {
    const ls = locales.filter((l) => !r.only || r.only.includes(l));
    const languages: Record<string, string> = Object.fromEntries(ls.map((l) => [l, abs(localizedHref(l, r.path))]));
    languages["x-default"] = abs(localizedHref(defaultLocale, r.path));
    return ls.map((l) => ({
      url: abs(localizedHref(l, r.path)),
      lastModified: r.lastModified ?? buildDate,
      changeFrequency: r.freq,
      priority: r.priority,
      alternates: { languages },
      // Branded share card of the page (image sitemap; ids from generateImageMetadata).
      images: [abs(`${localizedHref(l, r.path)}/opengraph-image/card`)],
    }));

  });
}
