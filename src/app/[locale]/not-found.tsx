import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { locales } from "@/lib/i18n";
import { LocaleNotFoundView, type NotFoundCopy } from "./not-found-view";

export const metadata: Metadata = { robots: { index: false, follow: true } };

/**
 * Localized 404 inside the locale layout. not-found receives no params and must
 * stay static (headers() would make every route dynamic), so the three small
 * copies are passed down and the client view picks one from the URL.
 */
export default function LocaleNotFound() {
  const copies = Object.fromEntries(
    locales.map((l) => {
      const d = getDictionary(l);
      return [l, { ...d.common.notFound, docTitle: d.meta.titleTemplate.replace("{title}", d.meta.notFound.title) }];
    }),
  ) as Record<string, NotFoundCopy>;
  return <LocaleNotFoundView copies={copies} />;
}
