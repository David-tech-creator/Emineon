import type { Insight } from "@/content/schema";
import { images, type ImageKey } from "@/lib/media";
import { COVER_SIZE } from "@/lib/dot-lattice";

/** Public path of the procedural cover of a slug (src/app/covers/insights/[file]/route.ts). */
export const coverPath = (slug: string) => `/covers/insights/${slug}.svg`;

/**
 * The cover of an insight: the media manifest image named in its frontmatter (`cover: insight-3`),
 * or else the deterministic dot-lattice cover drawn from its slug.
 */
export function insightCover(insight: Pick<Insight, "slug" | "cover">): { src: string; width: number; height: number; alt: string; blurDataURL?: string } {
  const key = insight.cover as ImageKey;
  if (insight.cover && key in images) return images[key];
  return { src: coverPath(insight.slug), ...COVER_SIZE, alt: "Abstract cover: a lattice of dots on a grainy ember and steel gradient." };
}
