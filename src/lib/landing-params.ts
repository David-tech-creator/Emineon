import { locales } from "@/lib/i18n";
import { landingKeys, landingSlugs } from "@/lib/routes";

/** generateStaticParams for src/app/[locale]/[landing]: each locale only gets its own slugs. */
export function landingParams() {
  return locales.flatMap((locale) => landingKeys.map((k) => ({ locale, landing: landingSlugs[k][locale] })));
}
