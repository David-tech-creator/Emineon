/**
 * Submits URLs to IndexNow (Bing, Yandex, Seznam, Naver and others).
 *
 * Google ignores IndexNow, but Bing acts within minutes, and Bing's index is
 * what several AI answer engines (ChatGPT search, Copilot, DuckDuckGo) read
 * from, so this is a GEO lever as much as an SEO one. (Adapted from Rive Foundry.)
 *
 * Usage:
 *   npm run indexnow                              every URL in the live sitemap + llms files
 *   npm run indexnow -- /en/ai-consulting-geneva  only the given paths or URLs
 *   npm run indexnow -- --dry-run                 print the list, submit nothing
 *
 * Run it after each production deploy that changes content.
 */
import { readFileSync } from "node:fs"

const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.emineon.com").replace(/\/$/, "")
const HOST = new URL(ORIGIN).host

/** Old-site URLs that now redirect (add them once the 301 map exists, SEO-PLAN §5.2). */
const RETIRED = []
const EXTRA = ["/llms.txt", "/llms-full.txt"]

const key = readFileSync(new URL("../src/lib/indexnow.ts", import.meta.url), "utf8").match(/"([0-9a-f]{32})"/)?.[1]
if (!key) {
  console.error("Could not read INDEXNOW_KEY from src/lib/indexnow.ts")
  process.exit(1)
}

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const explicit = args.filter((a) => !a.startsWith("--"))
const toUrl = (p) => (p.startsWith("http") ? p : `${ORIGIN}${p.startsWith("/") ? p : `/${p}`}`)

let urlList
if (explicit.length) {
  urlList = explicit.map(toUrl)
} else {
  const res = await fetch(`${ORIGIN}/sitemap.xml`)
  if (!res.ok) {
    console.error(`Could not fetch sitemap: HTTP ${res.status}`)
    process.exit(1)
  }
  const sitemap = await res.text()
  const fromSitemap = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  urlList = [...new Set([...fromSitemap, ...EXTRA.map(toUrl), ...RETIRED.map(toUrl)])]
}

if (!urlList.length) {
  console.error("No URLs to submit")
  process.exit(1)
}

const foreign = urlList.filter((u) => new URL(u).host !== HOST)
if (foreign.length) {
  console.error(`IndexNow only accepts URLs on ${HOST}. Rejecting:\n  ${foreign.join("\n  ")}`)
  process.exit(1)
}

if (dryRun) {
  console.log(`Dry run: ${urlList.length} URLs`)
  urlList.forEach((u) => console.log("  " + u))
  process.exit(0)
}

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList }),
})

// 200 = accepted, 202 = accepted but key still being validated. Both are fine.
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URLs`)
if (res.status >= 400) {
  console.error(await res.text())
  process.exit(1)
}
urlList.forEach((u) => console.log("  " + u))
