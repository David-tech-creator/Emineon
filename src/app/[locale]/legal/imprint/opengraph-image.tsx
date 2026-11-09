import { getDictionary } from "@/content";
import { locales } from "@/lib/i18n";
import { ogRoute } from "../../_og/render";

const og = ogRoute<{ locale: string }>(({ locale }) => { const d = getDictionary(locale); return { eyebrow: d.footer.legal.imprint, title: d.meta.imprint.title, form: "wave", seed: 4 }; });

export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
