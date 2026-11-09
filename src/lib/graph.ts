/**
 * The one Emineon entity (SEO-PLAN §5.1, Rive Foundry playbook): a single
 * Organization + ProfessionalService node with a stable @id, plus the WebSite
 * node. The locale layout renders both on every page; pages reference them by
 * @id and add their own nodes (WebPage, Service, Article, FAQPage, BreadcrumbList).
 * llms.txt / llms-full.txt read the same facts, so a wrong fact is fixed here once.
 */
import { getDictionary, type Locale } from "@/content";
import { locales, localizedHref } from "@/lib/i18n";
import { CONTACT_EMAIL, FOUNDER, HQ_GEO, LEGAL_NAME, SITE_URL, activeProfiles } from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const orgRef = { "@id": ORG_ID } as const;

/** Absolute URL of a locale-less path in a locale (landing slugs localized). */
export function abs(locale: Locale, path: string): string {
  return new URL(localizedHref(locale, path), SITE_URL).toString();
}

export const serviceId = (locale: Locale, slug: string) => `${abs(locale, `/services/${slug}`)}#service`;

/** Geneva HQ as structured data (the only full address we publish). */
export function hqAddress(locale: Locale) {
  const hq = getDictionary(locale).offices.find((o) => o.hq);
  const [street, cityLine] = hq?.addressLines ?? [];
  const m = /^(\d{4})\s+(.+)$/.exec(cityLine ?? "");
  return {
    "@type": "PostalAddress",
    streetAddress: street,
    postalCode: m?.[1],
    addressLocality: m?.[2] ?? hq?.city,
    addressRegion: "GE",
    addressCountry: "CH",
  };
}

const KNOWS_ABOUT = [
  "Artificial intelligence consulting",
  "AI strategy",
  "Agentic AI",
  "Generative AI",
  "LLMOps",
  "AI evaluation",
  "AI governance",
  "FINMA Guidance 08/2024",
  "Swiss Federal Act on Data Protection (nFADP)",
  "EU AI Act",
  "Commodity trading",
  "Private banking and wealth management",
  "International organisations",
  "Life sciences",
  "Fragrance and flavour",
  "Manufacturing",
];

/** The Organization / ProfessionalService node (full). */
export function organizationNode(locale: Locale): Record<string, unknown> {
  const d = getDictionary(locale);
  const sameAs = activeProfiles().map((p) => p.url);
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: d.meta.siteName,
    ...(LEGAL_NAME ? { legalName: LEGAL_NAME } : {}),
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/icon.png`, width: 512, height: 512 },
    image: `${SITE_URL}/media/og-default.jpg`,
    description: d.seo.facts.definition,
    slogan: d.footer.brandLine,
    email: CONTACT_EMAIL,
    address: hqAddress(locale),
    // Approximate (map pin for Route de Vandœuvres 77A): see HQ_GEO in src/lib/site.ts.
    geo: { "@type": "GeoCoordinates", latitude: HQ_GEO.latitude, longitude: HQ_GEO.longitude },
    areaServed: [
      { "@type": "Country", name: "Switzerland" },
      { "@type": "City", name: "Geneva" },
      { "@type": "AdministrativeArea", name: "Romandie" },
      { "@type": "Place", name: "Europe" },
    ],
    knowsLanguage: ["en", "fr", "de"],
    knowsAbout: KNOWS_ABOUT,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: d.meta.services.title,
      itemListElement: d.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": serviceId(locale, s.slug), name: s.name },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      availableLanguage: ["English", "French", "German"],
      areaServed: "CH",
    },
    ...(sameAs.length ? { sameAs } : {}),
    // Founder slot: stays out until David approves (FOUNDER in src/lib/site.ts).
    ...(FOUNDER
      ? { founder: { "@type": "Person", "@id": FOUNDER.id, name: FOUNDER.name, url: FOUNDER.url, sameAs: FOUNDER.sameAs } }
      : {}),
  };
}

export function websiteNode(locale: Locale): Record<string, unknown> {
  const d = getDictionary(locale);
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: d.meta.siteName,
    description: d.meta.home.description,
    publisher: orgRef,
    inLanguage: [...locales],
  };
}

/** Site-wide graph, rendered once per page by the locale layout. */
export function siteGraph(locale: Locale): Record<string, unknown> {
  return { "@context": "https://schema.org", "@graph": [organizationNode(locale), websiteNode(locale)] };
}

/** A WebPage-type node for a page, tied to the site and the org. */
export function webPageNode(
  locale: Locale,
  path: string,
  opts: { type?: string | string[]; name: string; description?: string; dateModified?: string; about?: Record<string, unknown> },
): Record<string, unknown> {
  const url = abs(locale, path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: opts.about ?? orgRef,
    publisher: orgRef,
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}
