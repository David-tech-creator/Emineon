import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";
import { landingKeyFor, landingPath } from "@/lib/routes";
import { landingParams } from "@/lib/landing-params";
import { pageMetadata } from "@/components/sections/pages/shared";
import { GenevaPage, GovernancePage, SwitzerlandPage } from "@/components/sections/pages/seo/LandingPages";

/**
 * SEO landing pages with localized slugs (src/lib/routes.ts):
 *   /en/ai-consulting-switzerland · /fr/conseil-ia-suisse · /de/ki-beratung-schweiz
 *   /en/ai-consulting-geneva · /fr/conseil-ia-geneve · /de/ki-beratung-genf
 *   /en/ai-governance-switzerland · /fr/gouvernance-ia-suisse · /de/ki-governance-schweiz
 * Any other single segment 404s (dynamicParams = false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return landingParams();
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[landing]">): Promise<Metadata> {
  const { locale, landing } = await params;
  if (!isLocale(locale)) return {};
  const key = landingKeyFor(locale, landing);
  if (!key) return {};
  const m = getDictionary(locale).seo[key].meta;
  return pageMetadata({ locale, path: landingPath(key), title: m.title, description: m.description });
}

export default async function LandingPage({ params }: PageProps<"/[locale]/[landing]">) {
  const { locale, landing } = await params;
  if (!isLocale(locale)) notFound();
  const key = landingKeyFor(locale, landing);
  if (!key) notFound();
  const d = getDictionary(locale);
  if (key === "switzerland") return <SwitzerlandPage locale={locale} d={d} />;
  if (key === "geneva") return <GenevaPage locale={locale} d={d} />;
  return <GovernancePage locale={locale} d={d} />;
}
