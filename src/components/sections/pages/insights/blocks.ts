import type { Block } from "@/content";
import { plainInline } from "@/lib/markdown";

/** URL-safe, accent-free anchor id from a heading. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’'"«»“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export type TocItem = { id: string; label: string };

/** Unique ids for every h2 in a block list (stable across renders). */
export function headingIds(blocks: Block[]): Map<number, string> {
  const seen = new Map<string, number>();
  const out = new Map<number, string>();
  blocks.forEach((b, i) => {
    if (b.type !== "h2") return;
    const base = slugify(plainInline(b.text)) || `section-${i}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.set(i, n ? `${base}-${n + 1}` : base);
  });
  return out;
}

export function toc(blocks: Block[]): TocItem[] {
  const ids = headingIds(blocks);
  // Headings often carry their own "1." numbering; the ToC adds its own index.
  return blocks.flatMap((b, i) => (b.type === "h2" ? [{ id: ids.get(i)!, label: plainInline(b.text).replace(/^\d+[.)]\s+/, "") }] : []));
}

/** Word count of a block list (for JSON-LD). */
export function wordCount(blocks: Block[]): number {
  const text = blocks.map((b) => (b.type === "list" ? b.items.map(plainInline).join(" ") : b.type === "code" ? "" : plainInline(b.text))).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
