/**
 * i18n helpers. Locale list is owned by the content schema (single source of truth);
 * this module adds routing helpers used by layouts, Nav, LocaleSwitcher and proxy.ts.
 */
import { defaultLocale, locales, type Locale } from "@/content/schema";
import { localizeLandingPath } from "./routes";

export { defaultLocale, locales };
export type { Locale };

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Is this an external / non-routed href (http, mailto, tel, #hash)? */
export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/.test(href);
}

/**
 * Prefix a locale-less internal path with the locale.
 *   localizedHref("fr", "/services/ai-strategy") -> "/fr/services/ai-strategy"
 *   localizedHref("de", "/")                      -> "/de"
 * External links (http, mailto, tel, #) are returned unchanged.
 * Paths that already start with a locale are re-prefixed with the new one.
 */
export function localizedHref(locale: Locale, href: string = "/"): string {
  if (isExternalHref(href)) return href;
  // Landing pages have localized slugs (src/lib/routes.ts): any locale's slug maps to this locale's.
  const path = localizeLandingPath(locale, stripLocale(href.startsWith("/") ? href : `/${href}`));
  return path === "/" ? `/${locale}` : `/${locale}${path}`;

}

/** Remove a leading locale segment: "/fr/work/x" -> "/work/x", "/fr" -> "/". */
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = "/" + parts.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname || "/";
}

/** Read the locale from a pathname, falling back to the default. */
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

/** Swap the locale of a full pathname, keeping the rest of the path. */
export function switchLocalePath(pathname: string, next: Locale): string {
  return localizedHref(next, stripLocale(pathname));
}

/**
 * Pick the best supported locale from an Accept-Language header.
 * Honours q-values; matches on primary subtag (fr-CH -> fr, de-CH -> de).
 */
export function matchAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q);
  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}

/** hreflang alternates for generateMetadata: { en: "/en/x", fr: "/fr/x", de: "/de/x", "x-default": "/en/x" } */
export function languageAlternates(path: string = "/"): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[l] = localizedHref(l, path);
  out["x-default"] = localizedHref(defaultLocale, path);
  return out;
}
