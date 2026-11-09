import { getCase, getDictionary, staticParams } from "@/content";
import { ogRoute } from "../../_og/render";

const og = ogRoute<{ locale: string; slug: string }>(({ locale, slug }) => { const d = getDictionary(locale); const c = getCase(locale, slug); return c && { eyebrow: c.sectorLabel, title: c.title, footer: d.common.labels.representative, form: "wave", seed: slug.length * 13 }; });

export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;

export function generateStaticParams() {
  return staticParams.cases();
}
