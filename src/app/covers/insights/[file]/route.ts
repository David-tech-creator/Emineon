import { coverSvg } from "@/lib/dot-lattice";
import { getInsights } from "@/lib/insights";

/**
 * /covers/insights/<slug>.svg: the procedural dot-lattice cover of an insight, drawn from its
 * slug at build time. Every post gets one, so a post published by the agent needs no image.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights("en").map((i) => ({ file: `${i.slug}.svg` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const slug = file.replace(/\.svg$/, "");
  if (!getInsights("en").some((i) => i.slug === slug)) return new Response("Not found", { status: 404 });
  return new Response(coverSvg(slug), {
    headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400, stale-while-revalidate=604800" },
  });
}
