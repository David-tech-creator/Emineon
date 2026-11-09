import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Names the AI answer-engine and search crawlers explicitly (GEO, SEO-PLAN §5.2),
 * as Rive Foundry does. A crawler that matches a named group ignores the "*"
 * group, so every group repeats the disallows. Only /api/ is off limits.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckDuckBot",
  "Amazonbot",
  "meta-externalagent",
  "MistralAI-User",
  "cohere-ai",
  "YouBot",
  "CCBot",
];

const DISALLOW = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
