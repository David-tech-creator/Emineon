import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { languageAlternates, localizedHref, locales, type Locale } from "@/lib/i18n";
import { SITE_URL, TWITTER_HANDLE } from "@/lib/site";
import { abs, orgRef } from "@/lib/graph";

type PageMetadataInput = {
  locale: Locale;
  /** Locale-less path, e.g. "/services/ai-strategy" (landing pages: the English path). */
  path: string;
  title: string;
  description: string;
  /**
   * Every route has its own branded OG card (opengraph-image.tsx next to the page,
   * rendered by src/app/[locale]/_og). File-based images take precedence, so pages
   * no longer pass photos here. Kept for the rare page without a card.
   */
  image?: { src: string; width: number; height: number; alt?: string };
  type?: "website" | "article";
  /** Articles: ISO dates, author names, section and tags (article:* meta). */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  /** Locales that really have this page's content (hreflang). Default: all. */
  alternateLocales?: readonly Locale[];
  /** Locale of the canonical URL, when this page shows another locale's content. Default: `locale`. */
  canonicalLocale?: Locale;
  /** Use the title as-is (no " · Emineon" template). */
  absoluteTitle?: boolean;
};

/** <link rel="alternate" type="application/rss+xml"> for every page (alternates are replaced per segment, so each page sets it). */
export function rssAlternate(locale: Locale) {
  const d = getDictionary(locale);
  return { "application/rss+xml": [{ url: localizedHref(locale, "/insights/rss.xml"), title: `${d.meta.siteName} ${d.meta.insights.title}` }] };
}

/** og:locale of each site locale (Facebook/LinkedIn locale codes). */
export function ogLocaleOf(locale: Locale): string {
  return getDictionary(locale).meta.ogLocale;
}

/**
 * Standard page metadata: title, description, canonical, hreflang alternates,
 * Open Graph (absolute url via metadataBase, og:locale + alternates, article:*)
 * and Twitter. The locale layout sets metadataBase and the title template.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  alternateLocales,
  canonicalLocale,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const { meta } = getDictionary(locale);
  const url = localizedHref(canonicalLocale ?? locale, path);
  let languages = languageAlternates(path);
  if (alternateLocales) {
    languages = Object.fromEntries(Object.entries(languages).filter(([l]) => l === "x-default" || (alternateLocales as readonly string[]).includes(l)));
  }
  const others = locales.filter((l) => l !== locale && (!alternateLocales || alternateLocales.includes(l)));
  // A title that already names the brand ("About Emineon: …") must not get " · Emineon" again.
  absoluteTitle = absoluteTitle ?? title.includes(meta.siteName);

  const shareTitle = absoluteTitle ? title : meta.titleTemplate.replace("{title}", title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages, types: rssAlternate(locale) },

    openGraph: {
      type,
      siteName: meta.siteName,
      locale: meta.ogLocale,
      alternateLocale: others.map(ogLocaleOf),
      title: shareTitle,
      description,
      url,
      ...(image ? { images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt ?? shareTitle }] } : {}),
      ...(type === "article"
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime, authors, section, tags }
        : {}),
    },
    // No twitter:image: X falls back to og:image (the route's branded card).
    twitter: { card: "summary_large_image", title: shareTitle, description, ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE } : {}) },
  };
}

/** Absolute URL for JSON-LD. */
export function absoluteUrl(locale: Locale, path: string): string {
  return abs(locale, path);
}

/**
 * Reference to the one Organization node (rendered site-wide by the locale
 * layout from src/lib/graph.ts). Pages only point at it by @id.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- locale kept for call-site compatibility
export function organizationLd(_locale?: Locale): { "@id": string } {
  return orgRef;
}

export type Crumb = { label: string; href?: string };

/** schema.org BreadcrumbList from crumbs whose hrefs are locale-less paths. The last crumb gets `pagePath` as item. */
export function breadcrumbLd(locale: Locale, crumbs: Crumb[], pagePath?: string): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => {
      const href = c.href ?? (i === crumbs.length - 1 ? pagePath : undefined);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        ...(href ? { item: absoluteUrl(locale, href) } : {}),
      };
    }),
  };
}

/** schema.org FAQPage node. */
export function faqLd(items: { q: string; a: string }[], url?: string): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    ...(url ? { "@id": `${url}#faq`, url } : {}),
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export { SITE_URL };
