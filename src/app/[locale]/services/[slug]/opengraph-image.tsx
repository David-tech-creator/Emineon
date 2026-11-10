import { getService, staticParams } from "@/content";
import { hashString } from "@/lib/dot-lattice";
import { ogRoute } from "../../_og/render";

const og = ogRoute<{ locale: string; slug: string }>(({ locale, slug }) => { const s = getService(locale, slug); return s && { eyebrow: s.hero.eyebrow, title: s.hero.title, form: (["dome", "wave", "funnel"] as const)[hashString(slug) % 3], seed: hashString(slug) % 100_000 }; });

export const alt = "Emineon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default og.Image;

export function generateStaticParams() {
  return staticParams.services();
}
