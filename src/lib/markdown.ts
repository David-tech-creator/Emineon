/**
 * The small Markdown subset used by insights (content/insights/*.md), parsed into the
 * same Block[] the rest of the site renders. Pure functions: safe on server and client.
 *
 * Supported: frontmatter between `---` lines, paragraphs, `##`/`###` headings, `-`/`1.` lists,
 * `>` quotes (a last line `> -- Name` becomes the citation), fenced code blocks, and inline
 * **bold**, *italic*, `code` and [links](https://…). Anything else is plain text. No HTML is ever
 * passed through: text is rendered by React, so it is escaped.
 */
import type { Block } from "@/content/schema";

export type Frontmatter = Record<string, string>;

/** `key: value` lines between two `---` lines. Values are single-line; quotes around them are dropped. */
export function parseFrontmatter(src: string): { data: Frontmatter; body: string } {
  const m = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(src);
  if (!m) return { data: {}, body: src };
  const data: Frontmatter = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 1 || line.trimStart().startsWith("#")) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^(["'])([\s\S]*)\1$/, "$2");
  }
  return { data, body: m[2] };
}

/** "a, b, c" or "[a, b, c]" → ["a", "b", "c"] */
export function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((s) => s.trim().replace(/^(["'])(.*)\1$/, "$2"))
    .filter(Boolean);
}

/** Markdown body → Block[]. */
export function markdownToBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: Block[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let quote: string[] | null = null;

  const flushPara = () => {
    if (para.length) out.push({ type: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (list) out.push({ type: "list", ordered: list.ordered || undefined, items: list.items });
    list = null;
  };
  const flushQuote = () => {
    if (!quote) return;
    const parts = quote.filter((l, i, a) => l || (i > 0 && i < a.length - 1));
    const last = parts[parts.length - 1] ?? "";
    const cite = /^(?:--|—|–)\s*(.+)$/.exec(last)?.[1];
    const text = (cite ? parts.slice(0, -1) : parts).filter(Boolean).join(" ").trim();
    if (text) out.push(cite ? { type: "quote", text, cite } : { type: "quote", text });
    quote = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*```/.test(line)) {
      flushAll();
      const code: string[] = [];
      while (++i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i]);
      out.push({ type: "code", text: code.join("\n") });
      continue;
    }
    const h = /^(#{2,4})\s+(.*?)\s*#*\s*$/.exec(line);
    if (h) {
      flushAll();
      out.push({ type: h[1].length === 2 ? "h2" : "h3", text: h[2] });
      continue;
    }
    const q = /^>\s?(.*)$/.exec(line);
    if (q) {
      flushPara();
      flushList();
      (quote ??= []).push(q[1].trim());
      continue;
    }
    flushQuote();
    const li = /^\s*(?:([-*+])|(\d+)[.)])\s+(.*)$/.exec(line);
    if (li) {
      flushPara();
      const ordered = !li[1];
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { ordered, items: [] };
      }
      list.items.push(li[3].trim());
      continue;
    }
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    // A lazy continuation of the previous list item.
    if (list && /^\s{2,}\S/.test(line)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }
    // Images are not part of the subset: keep their alt text out of the prose.
    if (/^!\[[^\]]*\]\([^)]*\)\s*$/.test(line.trim())) continue;
    flushList();
    para.push(line.trim());
  }
  flushAll();
  return out;
}

/** Links that cannot run script: http(s), site paths, anchors and mail. */
export function safeHref(href: string): string | null {
  const h = href.trim();
  return /^(https?:\/\/|\/(?!\/)|#|mailto:)/i.test(h) ? h : null;
}

export type Inline =
  | { t: "text"; v: string }
  | { t: "code"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] };

const INLINE_RE = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|(?<![*\w])\*([^*\s][^*]*?)\*(?![*\w])/g;

/** Inline Markdown → a small tree. Unsafe links become their label. */
export function parseInline(text: string): Inline[] {
  const out: Inline[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ t: "text", v: text.slice(last, at) });
    if (m[1] !== undefined) out.push({ t: "code", v: m[1] });
    else if (m[2] !== undefined) {
      const href = safeHref(m[3]);
      out.push(href ? { t: "link", href, c: parseInline(m[2]) } : { t: "text", v: m[2] });
    } else if (m[4] !== undefined) out.push({ t: "strong", c: parseInline(m[4]) });
    else if (m[5] !== undefined) out.push({ t: "em", c: parseInline(m[5]) });
    last = at + m[0].length;
  }
  if (last < text.length) out.push({ t: "text", v: text.slice(last) });
  return out;
}

/** Inline Markdown → plain text (headings in the ToC, ids, descriptions, word counts). */
export function plainInline(text: string): string {
  const walk = (n: Inline[]): string => n.map((x) => (x.t === "text" || x.t === "code" ? x.v : walk(x.c))).join("");
  return walk(parseInline(text));
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inlineHtml(nodes: Inline[], origin: string): string {
  return nodes
    .map((n) => {
      switch (n.t) {
        case "text":
          return esc(n.v);
        case "code":
          return `<code>${esc(n.v)}</code>`;
        case "strong":
          return `<strong>${inlineHtml(n.c, origin)}</strong>`;
        case "em":
          return `<em>${inlineHtml(n.c, origin)}</em>`;
        case "link":
          return `<a href="${esc(n.href.startsWith("/") ? origin + n.href : n.href)}">${inlineHtml(n.c, origin)}</a>`;
      }
    })
    .join("");
}

/** Block[] → escaped HTML, for feeds and email. Site paths become absolute on `origin`. */
export function blocksToHtml(blocks: Block[], origin = ""): string {
  const i = (t: string) => inlineHtml(parseInline(t), origin);
  return blocks
    .map((b) => {
      switch (b.type) {
        case "p":
          return `<p>${i(b.text)}</p>`;
        case "h2":
          return `<h2>${i(b.text)}</h2>`;
        case "h3":
          return `<h3>${i(b.text)}</h3>`;
        case "code":
          return `<pre><code>${esc(b.text)}</code></pre>`;
        case "quote":
          return `<blockquote><p>${i(b.text)}</p>${b.cite ? `<p>${esc(b.cite)}</p>` : ""}</blockquote>`;
        case "list": {
          const tag = b.ordered ? "ol" : "ul";
          return `<${tag}>${b.items.map((x) => `<li>${i(x)}</li>`).join("")}</${tag}>`;
        }
      }
    })
    .join("\n");
}
