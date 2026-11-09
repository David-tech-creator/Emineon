import { images, videos, type ImageKey, type VideoKey } from "@/lib/media";
import type { ServiceSlug } from "@/content";

/** Visual per service (atmospheric, decorative). Kept here so content stays text-only. */
export const serviceImageKey: Record<ServiceSlug, ImageKey> = {
  "ai-strategy": "hands-graph",
  "agentic-systems": "filaments",
  "data-ai-platforms": "oak-veins",
  "ai-operations": "atrium",
  "adoption-enablement": "careers",
};

/**
 * Optional ambient loop per service hero. Empty since the light re-shoot (Nov 2026):
 * the loops are dark footage and the hero is framed on paper, so the light still is used.
 */
export const serviceVideoKey: Partial<Record<ServiceSlug, VideoKey>> = {};

export function serviceImage(slug: ServiceSlug) {
  return images[serviceImageKey[slug]];
}

export function serviceVideo(slug: ServiceSlug) {
  const k = serviceVideoKey[slug];
  return k ? videos[k] : undefined;
}

/** Secondary visual (problem section), distinct from the hero. */
const serviceSecondaryKey: Record<ServiceSlug, ImageKey> = {
  "ai-strategy": "atrium",
  "agentic-systems": "hands-graph",
  "data-ai-platforms": "filaments",
  "ai-operations": "oak-veins",
  "adoption-enablement": "about-geneva",
};

export function serviceSecondaryImage(slug: ServiceSlug) {
  return images[serviceSecondaryKey[slug]];
}
