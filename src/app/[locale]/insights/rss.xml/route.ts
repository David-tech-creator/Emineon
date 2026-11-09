import { getDictionary } from "@/content";
import { locales, localizedHref, type Locale } from "@/lib/i18n";
import { getInsights } from "@/lib/insights";
import { blocksToHtml } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

/** /{locale}/insights/rss.xml: the latest insights, full text, in the locale where translated. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (path: string) => new URL(path, SITE_URL).toString();

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const d = getDictionary(raw);
  const locale = d.locale as Locale;
  const posts = getInsights(locale).slice(0, 50);
  const self = abs(localizedHref(locale, "/insights/rss.xml"));
  const updated = posts[0] ? new Date(`${posts[0].date}T06:00:00Z`) : new Date();
  const items = posts
    .map((p) => {
      const url = abs(localizedHref(p.lang, `/insights/${p.slug}`));
      return `    <item>
      <title>${xml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T06:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${xml(p.author)}</dc:creator>
      <dc:language>${p.lang}</dc:language>
      <category>${xml(p.category)}</category>
      <description>${xml(p.dek)}</description>
      <content:encoded>${xml(blocksToHtml(p.body, SITE_URL))}</content:encoded>
    </item>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xml(`${d.meta.siteName} · ${d.meta.insights.title}`)}</title>
    <link>${abs(localizedHref(locale, "/insights"))}</link>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
    <description>${xml(d.meta.insights.description)}</description>
    <language>${locale}</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
