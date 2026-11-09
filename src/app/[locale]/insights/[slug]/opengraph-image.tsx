import { getDictionary } from "@/content";
import { hashString } from "@/lib/dot-lattice";
import { getInsight, insightParams } from "@/lib/insights";
import { ogRoute } from "../../_og/render";

const og = ogRoute<{ locale: string; slug: string }>(({ locale, slug }) => { const d = getDictionary(locale); const c = getInsight(d.locale, slug); if (!c) return undefined; const h = hashString(slug); return { eyebrow: c.category, title: c.title, footer: c.author, form: (["dome", "wave", "funnel"] as const)[h % 3], seed: h % 100_000 }; });

export const generateImageMetadata = og.generateImageMetadata;
export default og.Image;

export function generateStaticParams() {
  return insightParams();
}
