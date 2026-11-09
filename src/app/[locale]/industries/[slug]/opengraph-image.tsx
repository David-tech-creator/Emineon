import { getIndustry, staticParams } from "@/content";
import { hashString } from "@/lib/dot-lattice";
import { ogRoute } from "../../_og/render";

const og = ogRoute<{ locale: string; slug: string }>(({ locale, slug }) => { const i = getIndustry(locale, slug); return i && { eyebrow: i.hero.eyebrow, title: i.hero.title, form: (["wave", "funnel", "dome"] as const)[hashString(slug) % 3], seed: hashString(slug) % 100_000 }; });

export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;

export function generateStaticParams() {
  return staticParams.industries();
}
