import { getDictionary } from "@/content";
import { locales } from "@/lib/i18n";
import { ogRoute } from "../_og/render";

const og = ogRoute<{ locale: string }>(({ locale }) => { const d = getDictionary(locale); return { eyebrow: d.contact.hero.eyebrow, title: d.contact.hero.title, form: "dome" }; });

export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
