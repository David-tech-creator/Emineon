/**
 * Insights: one Markdown file per article in content/insights/ (format in the README there).
 * English is canonical: `<slug>.md`. Translations sit next to it as `<slug>.fr.md` and
 * `<slug>.de.md`. A locale without a translation shows the English text, and its page points
 * its canonical at the English URL.
 *
 * Read from disk at build time (server only), so a new file goes live with the next deploy.
 * The autonomous agent in nas/insights/ publishes by committing files here.
 */
import fs from "node:fs";
import path from "node:path";
import { getDictionary, insightTags, locales, serviceSlugs } from "@/content";
import type { Insight, InsightTag, Locale, ServiceSlug } from "@/content";
import { markdownToBlocks, parseFrontmatter, parseList, plainInline, type Frontmatter } from "./markdown";

export const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type Source = { data: Frontmatter; body: string };
type Entry = { slug: string; en: Source; tr: Partial<Record<Locale, Source>> };

let cache: Entry[] | null = null;

function read(): Entry[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md");
  } catch {
    files = [];
  }
  const byFile = new Map(files.map((f) => [f, parseFrontmatter(fs.readFileSync(path.join(INSIGHTS_DIR, f), "utf8"))]));
  const entries: Entry[] = [];
  for (const [file, en] of byFile) {
    const slug = file.replace(/\.md$/, "");
    // `<slug>.fr.md` is a translation, not a post.
    if (!SLUG_RE.test(slug)) continue;
    if (en.data.draft === "true" || !en.data.title || !DATE_RE.test(en.data.date ?? "")) continue;
    const tr: Entry["tr"] = {};
    for (const l of locales) {
      if (l === "en") continue;
      const t = byFile.get(`${slug}.${l}.md`);
      if (t && t.data.title && t.data.draft !== "true" && t.body.trim()) tr[l] = t;
    }
    entries.push({ slug, en, tr });
  }
  entries.sort((a, b) => (b.en.data.date ?? "").localeCompare(a.en.data.date ?? "") || a.slug.localeCompare(b.slug));
  cache = entries;
  return entries;
}

function toInsight(e: Entry, locale: Locale): Insight {
  const d = getDictionary(locale);
  const src = e.tr[locale] ?? e.en;
  const lang: Locale = e.tr[locale] ? locale : "en";
  const tags = parseList(e.en.data.tags).filter((t): t is InsightTag => (insightTags as readonly string[]).includes(t));
  if (!tags.length) tags.push("briefing");
  const services = parseList(e.en.data.services).filter((s): s is ServiceSlug => (serviceSlugs as readonly string[]).includes(s));
  const body = markdownToBlocks(src.body);
  const words = body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.type === "code" ? "" : plainInline(b.text)))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const generated = e.en.data.generated === "true";
  return {
    slug: e.slug,
    title: src.data.title,
    dek: src.data.summary ?? e.en.data.summary ?? "",
    category: d.blog.tags[tags[0]],
    tags,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    date: e.en.data.date,
    cover: e.en.data.cover ?? "",
    author: src.data.author || e.en.data.author || (generated ? d.blog.agentAuthor : d.meta.siteName),
    body,
    relatedServices: services,
    lang,
    translations: ["en", ...locales.filter((l) => l !== "en" && e.tr[l])],
    generated,
  };
}

/** All published insights for a locale, newest first. */
export function getInsights(locale: Locale): Insight[] {
  return read().map((e) => toInsight(e, locale));
}

export function getInsight(locale: Locale, slug: string): Insight | undefined {
  const e = read().find((x) => x.slug === slug);
  return e ? toInsight(e, locale) : undefined;
}

/** Every slug × locale, for generateStaticParams. */
export function insightParams(): { locale: Locale; slug: string }[] {
  const slugs = read().map((e) => e.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}
