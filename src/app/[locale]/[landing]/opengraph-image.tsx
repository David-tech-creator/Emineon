import { getDictionary, isLocale } from "@/content";
import { landingKeyFor } from "@/lib/routes";
import { landingParams } from "@/lib/landing-params";
import { ogRoute } from "../_og/render";

const og = ogRoute<{ locale: string; landing: string }>(({ locale, landing }) => { if (!isLocale(locale)) return undefined; const key = landingKeyFor(locale, landing); if (!key) return undefined; const p = getDictionary(locale).seo[key]; return { eyebrow: p.hero.eyebrow, title: p.hero.title, form: key === "governance" ? "funnel" : key === "geneva" ? "wave" : "dome", seed: key.length * 17 }; });

export const alt = "Emineon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default og.Image;

export function generateStaticParams() {
  return landingParams();
}
