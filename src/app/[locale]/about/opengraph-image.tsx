import { getDictionary } from "@/content";
import { locales } from "@/lib/i18n";
import { ogRoute } from "../_og/render";

const og = ogRoute<{ locale: string }>(({ locale }) => { const d = getDictionary(locale); return { eyebrow: d.about.hero.eyebrow, title: d.about.hero.title, form: "dome" }; });

export const alt = "Emineon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default og.Image;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
