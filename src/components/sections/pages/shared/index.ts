/**
 * Shared page sections (owner: pages-a; imported by pages-b).
 * Stable APIs — extend with optional props only.
 *
 *   PageHero        hero under the fixed nav: breadcrumb, eyebrow, h1, lead, actions, facts, media (stacked|background|plain)
 *   Breadcrumb      mono trail (locale-less hrefs) — pair with breadcrumbLd()
 *   SectionHeader   eyebrow + heading + lead (+ action), split or stacked
 *   RelatedCards    section with header + bordered link-card grid; RelatedCardsGrid = grid only
 *   MetricGrid      big mono counters in a bordered grid
 *   FaqSection      sticky header + accordion + FAQPage JSON-LD
 *   CtaBand         closing CTA band with glow and optional ambient media
 *   InPageNav       sticky in-page section nav (client)
 *   JsonLd          <script type="application/ld+json">
 *   seo helpers     pageMetadata(), absoluteUrl(), organizationLd(), breadcrumbLd(), faqLd()
 */
export { PageHero, type HeroFact } from "./PageHero";
export { Breadcrumb } from "./Breadcrumb";
export { SectionHeader } from "./SectionHeader";
export { RelatedCards, RelatedCardsGrid, type RelatedItem } from "./RelatedCards";
export { MetricGrid } from "./MetricGrid";
export { FaqSection } from "./FaqSection";
export { CtaBand } from "./CtaBand";
export { InPageNav, type InPageNavItem } from "./InPageNav";
export { JsonLd } from "./JsonLd";
export { pageMetadata, absoluteUrl, organizationLd, breadcrumbLd, faqLd, type Crumb } from "./seo";
export { PhaseTimeline, type TimelineStep } from "./PhaseTimeline";
