/**
 * llms.txt / llms-full.txt (llmstxt.org), generated from the same content and
 * the same entity facts as the pages (src/content, src/lib/graph.ts), so they
 * cannot contradict the site. English is canonical; FR/DE URLs are listed.
 */
import { getDictionary, type Locale } from "@/content";
import { getInsights } from "@/lib/insights";
import { abs } from "@/lib/graph";
import { landingKeys, landingPath } from "@/lib/routes";
import { CONTACT_EMAIL, LANDING_UPDATED, SITE_URL, activeProfiles } from "@/lib/site";

const headline = (h: { pre: string; accent: string; post?: string }) => `${h.pre}${h.accent}${h.post ?? ""}`.replace(/\s+/g, " ").trim();

export function llmsTxt(): string {
  const d = getDictionary("en");
  const s = d.seo;
  const facts = s.facts.items.map((f) => `- ${f.label}: ${f.value}`).join("\n");
  const profiles = activeProfiles();
  return `# ${d.meta.siteName}

> ${s.facts.definition}

## Key facts

${facts}${profiles.length ? `\n- Profiles: ${profiles.map((p) => p.url).join(" , ")}` : ""}

## Pages

- [${s.pages.switzerland}](${abs("en", landingPath("switzerland"))}): ${s.switzerland.meta.description}
- [${s.pages.geneva}](${abs("en", landingPath("geneva"))}): ${s.geneva.meta.description}
- [${s.pages.governance}](${abs("en", landingPath("governance"))}): ${s.governance.meta.description}
- [Services](${abs("en", "/services")}): ${d.services.map((x) => x.name).join(", ")}
${d.services.map((x) => `  - [${s.titles.services[x.slug]}](${abs("en", `/services/${x.slug}`)}): ${x.short}`).join("\n")}
- [Approach](${abs("en", "/approach")}): Assess, Build, Run; the 30-day sprint; pricing
- [Industries](${abs("en", "/industries")})
${d.industries.map((x) => `  - [${s.titles.industries[x.slug]}](${abs("en", `/industries/${x.slug}`)}): ${x.short}`).join("\n")}
- [Representative engagements](${abs("en", "/work")}): anonymised, labelled representative
- [Insights](${abs("en", "/insights")}) ([RSS](${abs("en", "/insights/rss.xml")}))
- [FAQ](${abs("en", "/faq")}): ${s.faq.items.length} questions and answers
- [About](${abs("en", "/about")}) · [Contact](${abs("en", "/contact")})
- [Full facts for language models](${SITE_URL}/llms-full.txt)

## Other languages

- Français : ${abs("fr", landingPath("switzerland"))} · ${abs("fr", landingPath("geneva"))} · ${abs("fr", "/faq")}
- Deutsch: ${abs("de", landingPath("switzerland"))} · ${abs("de", landingPath("geneva"))} · ${abs("de", "/faq")}

Last updated: ${LANDING_UPDATED}
`;
}

export function llmsFullTxt(locale: Locale = "en"): string {
  const d = getDictionary(locale);
  const s = d.seo;
  const out: string[] = [];
  const push = (...l: string[]) => out.push(...l);

  push(`# ${d.meta.siteName}: full facts`, "", `> ${s.facts.definition}`, "");
  push("## 1. Emineon at a glance", "", ...s.facts.items.map((f) => `- ${f.label}: ${f.value}`), "");

  push("## 2. Services", "");
  for (const x of d.services) {
    push(`### ${x.name}`, `URL: ${abs(locale, `/services/${x.slug}`)}`, "", x.short, "");
    push(...x.problem.paragraphs, "");
    push("What we deliver:", ...x.deliver.map((t) => `- ${t.title}: ${t.text}`), "");
    push("Phases:", ...x.phases.map((p) => `- ${p.name} (${p.duration}): ${p.text}`), "");
    push("Deliverables:", ...x.deliverables.map((t) => `- ${t}`), "");
  }

  push("## 3. Approach: Assess, Build, Run", `URL: ${abs(locale, "/approach")}`, "");
  push(...d.home.approach.stages.map((st) => `- ${st.label}: ${st.title}. ${st.text} Pricing: ${st.pricing}. Duration: ${st.duration}.`), "");
  push(`### ${headline(d.home.approach.sprint.title)}`, d.home.approach.sprint.sub, "");
  push(...d.home.approach.sprint.weeks.map((w) => `- ${w.label}, ${w.title}: ${w.text}`), "");

  push("## 4. Industries", "");
  for (const x of d.industries) {
    push(`### ${s.titles.industries[x.slug]}`, `URL: ${abs(locale, `/industries/${x.slug}`)}`, "", x.short, "");
    push(...x.context.paragraphs, "");
    if (x.stat) push(`Figure: ${x.stat.value}: ${x.stat.label} (source: ${x.stat.source ?? "ge.ch"})`, "");
    push("Value streams:", ...x.valueStreams.map((v) => `- ${v.name}: ${v.description}`), "");
  }

  push("## 5. Representative engagements", "", "Anonymised under NDA and labelled as representative engagements. Clients are not named.", "");
  for (const c of d.cases) {
    push(`### ${c.title}`, `URL: ${abs(locale, `/work/${c.slug}`)}`, `Sector: ${c.sectorLabel}. Client: ${c.client}. Duration: ${c.duration}.`, "", c.summary, "");
    push("Results:", ...c.results.map((r) => `- ${r.value} ${r.label}`), "");
  }

  push(`## 6. ${s.pages.governance}`, `URL: ${abs(locale, landingPath("governance"))}`, "", s.governance.hero.lead, "");
  for (const f of s.governance.frameworks.items) {
    push(`### ${f.name}`, `Concerns: ${f.scope}`, "", f.summary, ...f.points.map((p) => `- ${p}`), `Source: ${f.source}`, "");
  }
  push(s.governance.disclaimer, "");

  push("## 7. Frequently asked questions", "");
  for (const f of s.faq.items) push(`### ${f.q}`, f.a, "");

  push("## 8. Offices and delivery hubs", "");
  for (const o of d.offices) push(`- ${o.city}, ${o.country}${o.hq ? ` (headquarters: ${o.addressLines?.join(", ")})` : ""}`);
  push("", "Geneva is the only Swiss office. Clients elsewhere in Switzerland are served from Geneva, with engineers on site.", "");

  push(
    "## 9. What Emineon does not do",
    "",
    "- No recruitment, staffing or talent placement.",
    "- No software licences and no proprietary operating system or SaaS product: earlier versions of emineon.com described an \"Emineon OS\" and recruitment services; both are discontinued.",
    "- No reselling of a single AI vendor: Emineon is model-agnostic.",
    "",
  );

  push("## 10. Landing pages in other languages", "");
  for (const k of landingKeys) push(`- ${s.pages[k]}: ${["en", "fr", "de"].map((l) => abs(l as Locale, landingPath(k))).join(" · ")}`);
  push("", `Insights: ${getInsights(locale).map((a) => `${a.title} (${abs(a.lang, `/insights/${a.slug}`)})`).join("; ")}`, "");

  push("## Contact", "", `- Email: ${CONTACT_EMAIL}`, `- Contact form: ${abs(locale, "/contact")}`, "", `Last updated: ${LANDING_UPDATED}`, "");
  return out.join("\n");
}
