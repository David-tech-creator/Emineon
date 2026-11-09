/**
 * Emineon content schema — the single typed contract between content and UI.
 *
 * Conventions (see CONTENT.md):
 * - Every user-facing string lives here, in all three locales (en, fr, de).
 * - `href` values are locale-less internal paths ("/services/ai-strategy").
 *   Components prefix the active locale. External links start with "http" or "mailto:".
 * - Template placeholders use curly braces: "{n} min read", "© {year} Emineon".
 * - `Headline` splits a heading for the two-tone emphasis (one grotesk, no
 *   italics): `pre` renders in a quiet grey, `accent` + `post` in full ink.
 * - Slugs are stable and identical across locales.
 * - Icon and image keys come from the fixed lists below (shared with the assets agent).
 */

export const locales = ['en', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/* ------------------------------------------------------------------ */
/* Fixed key lists (shared with icons + media agents)                  */
/* ------------------------------------------------------------------ */

export const iconKeys = [
  'strategy',
  'agents',
  'platform',
  'operations',
  'adoption',
  'trading',
  'banking',
  'intl-orgs',
  'life-sciences',
  'fragrance',
  'manufacturing',
  'trust',
  'residency',
  'fde',
  'sprint',
  'evals',
  'outcome',
  'globe',
  'roots',
  'branch',
  'shield',
  'spark',
  'arrow-right',
  'arrow-up-right',
] as const;
export type IconKey = (typeof iconKeys)[number];

export const imageKeys = [
  'hero-geneva',
  'atrium',
  'oak-veins',
  'filaments',
  'hands-graph',
  'ind-trading',
  'ind-banking',
  'ind-intl',
  'ind-life',
  'ind-fragrance',
  'ind-manufacturing',
  'case-1',
  'case-2',
  'case-3',
  'case-4',
  'case-5',
  'case-6',
  'insight-1',
  'insight-2',
  'insight-3',
  'insight-4',
  'insight-5',
  'insight-6',
  'careers',
  'about-geneva',
] as const;
export type ImageKey = (typeof imageKeys)[number];

/* ------------------------------------------------------------------ */
/* Stable slugs                                                        */
/* ------------------------------------------------------------------ */

export const serviceSlugs = [
  'ai-strategy',
  'agentic-systems',
  'data-ai-platforms',
  'ai-operations',
  'adoption-enablement',
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export const industrySlugs = [
  'commodities-trading',
  'banking-wealth',
  'international-organisations',
  'life-sciences',
  'fragrance-flavour-chemicals',
  'industry-manufacturing',
] as const;
export type IndustrySlug = (typeof industrySlugs)[number];

export const caseSlugs = [
  'trade-confirmation-agents',
  'private-bank-kyc-refresh',
  'multilingual-document-pipeline',
  'regulatory-submission-drafting',
  'formulation-knowledge-graph',
  'maintenance-copilot',
] as const;
export type CaseSlug = (typeof caseSlugs)[number];

/**
 * Insights are Markdown files in content/insights/ (see the README there), read at build
 * time by src/lib/insights.ts. Slugs are file names, so they are open-ended.
 */
export type InsightSlug = string;

/** Fixed topic vocabulary for insights. The first tag of a post is its category. */
export const insightTags = ['delivery', 'industry', 'governance', 'commercial', 'engineering', 'briefing'] as const;
export type InsightTag = (typeof insightTags)[number];

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

export interface Headline {
  pre: string;
  /** Where the heading turns from quiet grey to full ink (two-tone emphasis). */
  accent: string;
  post?: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  /** Optional source line, shown in mono under the stat. */
  source?: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface IconItem extends TitledText {
  icon: IconKey;
}

export interface Hero {
  eyebrow: string;
  title: Headline;
  lead: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: Headline;
  lead?: string;
}

/** Text in p/h/quote/list blocks may carry inline Markdown: **bold**, *italic*, `code`, [links](https://…). */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'code'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; ordered?: boolean; items: string[] };

export interface LinkItem {
  label: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/* Global                                                              */
/* ------------------------------------------------------------------ */

export interface MetaDict {
  siteName: string;
  /** e.g. "{title} · Emineon" */
  titleTemplate: string;
  home: PageMeta;
  services: PageMeta;
  approach: PageMeta;
  industries: PageMeta;
  work: PageMeta;
  insights: PageMeta;
  about: PageMeta;
  careers: PageMeta;
  contact: PageMeta;
  privacy: PageMeta;
  imprint: PageMeta;
  notFound: PageMeta;
  /** Fallback description templates for detail pages: "{name}: {short}" */
  serviceDetail: string;
  industryDetail: string;
  caseDetail: string;
  insightDetail: string;
  ogLocale: string;
}

export interface MegaFeatured {
  eyebrow: string;
  title: string;
  text: string;
  cta: Cta;
}

export interface NavDict {
  items: {
    services: string;
    industries: string;
    work: string;
    insights: string;
    about: string;
    careers: string;
    approach: string;
    contact: string;
  };
  cta: string;
  mega: {
    services: {
      eyebrow: string;
      intro: string;
      groupServices: string;
      groupModel: string;
      approachLabel: string;
      approachText: string;
      viewAll: string;
      featured: MegaFeatured;
    };
    industries: {
      eyebrow: string;
      intro: string;
      groupCore: string;
      groupAdjacent: string;
      viewAll: string;
      featured: MegaFeatured;
    };
  };
  locale: {
    label: string;
    names: Record<Locale, string>;
    short: Record<Locale, string>;
  };
}

export interface FormTopic {
  value: string;
  label: string;
}

export interface CommonDict {
  /** BCP-47 for Intl formatting, e.g. "en-CH" */
  dateLocale: string;
  cta: {
    talk: string;
    bookCall: string;
    startSprint: string;
    seeHow: string;
    explore: string;
    learnMore: string;
    readMore: string;
    readCase: string;
    readArticle: string;
    viewAll: string;
    allServices: string;
    allIndustries: string;
    allWork: string;
    allInsights: string;
    backToServices: string;
    backToIndustries: string;
    backToWork: string;
    backToInsights: string;
    apply: string;
    emailUs: string;
  };
  labels: {
    service: string;
    services: string;
    industry: string;
    industries: string;
    case: string;
    insight: string;
    sector: string;
    client: string;
    duration: string;
    stack: string;
    results: string;
    /** Case study results heading (Headline-style: pre + accent + post). */
    resultsTitle: Headline;
    problem: string;
    whatWeDeliver: string;
    howWeWork: string;
    phases: string;
    deliverables: string;
    outcomes: string;
    outcomesNote: string;
    faq: string;
    valueStreams: string;
    useCases: string;
    compliance: string;
    context: string;
    challenge: string;
    approach: string;
    system: string;
    components: string;
    relatedServices: string;
    relatedIndustries: string;
    relatedCases: string;
    relatedInsights: string;
    representative: string;
    representativeNote: string;
    category: string;
    published: string;
    readingTime: string;
    author: string;
    onThisPage: string;
    share: string;
    location: string;
    locations: string;
    team: string;
    type: string;
    responsibilities: string;
    requirements: string;
    niceToHave: string;
    email: string;
    address: string;
    hq: string;
    live: string;
    step: string;
    week: string;
    day: string;
    core: string;
    adjacent: string;
    source: string;
    copyLink: string;
    linkCopied: string;
  };
  units: {
    /** "{n} min read" */
    minRead: string;
    /** "{n} weeks" */
    weeks: string;
    /** "{n} days" */
    days: string;
  };
  form: {
    name: string;
    email: string;
    company: string;
    role: string;
    topic: string;
    topicPlaceholder: string;
    topics: FormTopic[];
    message: string;
    messagePlaceholder: string;
    consent: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    required: string;
    invalidEmail: string;
    tooShort: string;
    optional: string;
    newsletterLabel: string;
    newsletterPlaceholder: string;
    newsletterSubmit: string;
    newsletterSuccess: string;
    newsletterError: string;
    /** Label of the hidden anti-spam field (screen readers skip it). */
    honeypot: string;
    sendAnother: string;
    tooLong: string;
    /** Shown when the API answers 429. */
    rateLimited: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    mainNav: string;
    footerNav: string;
    breadcrumb: string;
    languageSwitcher: string;
    currentLanguage: string;
    logoHome: string;
    opensInNewTab: string;
    scrollDown: string;
    playVideo: string;
    pauseVideo: string;
    previous: string;
    next: string;
    close: string;
    decorative3d: string;
    mapLabel: string;
    readingProgress: string;
  };
  notFound: {
    eyebrow: string;
    title: Headline;
    text: string;
    cta: Cta;
  };
}

export interface Office {
  id: string;
  city: string;
  country: string;
  region: string;
  role: string;
  hq?: boolean;
  /** Only the HQ carries a street address. */
  addressLines?: string[];
  lat: number;
  lon: number;
}

export interface FooterDict {
  tagline: string;
  brandLine: string;
  columns: {
    services: string;
    industries: string;
    company: string;
    offices: string;
  };
  companyLinks: LinkItem[];
  newsletter: {
    title: string;
    text: string;
  };
  legal: {
    privacy: string;
    imprint: string;
  };
  /** "© {year} Emineon. All rights reserved." */
  copyright: string;
  rooted: string;
  backToTop: string;
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export type StageKey = 'assess' | 'build' | 'run';

export interface Stage {
  key: StageKey;
  icon: IconKey;
  label: string;
  title: string;
  text: string;
  pricing: string;
  duration: string;
}

export interface SprintWeek {
  label: string;
  title: string;
  text: string;
}

export interface HomeDict {
  hero: {
    eyebrow: string;
    title: Headline;
    sub: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    ticker: string[];
    scrollHint: string;
  };
  proof: {
    eyebrow: string;
    stats: Stat[];
    note: string;
  };
  gap: {
    eyebrow: string;
    title: Headline;
    paragraphs: string[];
    stat: Stat;
    mock: {
      title: string;
      status: string;
      items: { task: string; state: string }[];
    };
  };
  services: SectionIntro & { cta: Cta };
  approach: SectionIntro & {
    stages: Stage[];
    sprint: {
      eyebrow: string;
      title: Headline;
      sub: string;
      weeks: SprintWeek[];
      cta: Cta;
    };
  };
  fde: SectionIntro & {
    points: IconItem[];
    map: {
      title: string;
      caption: string;
    };
    stats: Stat[];
  };
  industries: SectionIntro & { cta: Cta };
  work: SectionIntro & { cta: Cta; featured: CaseSlug[] };
  trust: SectionIntro & {
    pillars: IconItem[];
    footnote: string;
  };
  insights: SectionIntro & { cta: Cta };
  cta: {
    eyebrow: string;
    title: Headline;
    text: string;
    primary: Cta;
    secondary: Cta;
  };
}

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export interface ServicePhase {
  name: string;
  duration: string;
  text: string;
}

export interface Service {
  slug: ServiceSlug;
  icon: IconKey;
  /** "01".."05" */
  index: string;
  name: string;
  short: string;
  hero: Hero;
  problem: {
    title: string;
    paragraphs: string[];
  };
  deliver: TitledText[];
  phases: ServicePhase[];
  deliverables: string[];
  outcomes: Metric[];
  faq: FaqItem[];
  relatedIndustries: IndustrySlug[];
  relatedCases: CaseSlug[];
}

export interface ValueStream {
  name: string;
  description: string;
  useCases: string[];
}

export interface Industry {
  slug: IndustrySlug;
  icon: IconKey;
  image: ImageKey;
  tier: 'core' | 'adjacent';
  name: string;
  short: string;
  hero: Hero;
  /** Verified public figure (ge.ch) where one exists. */
  stat?: Stat;
  context: {
    title: string;
    paragraphs: string[];
  };
  valueStreams: ValueStream[];
  compliance: string[];
  relatedCase: CaseSlug;
  relatedServices: ServiceSlug[];
}

export interface CaseStudy {
  slug: CaseSlug;
  sector: IndustrySlug;
  /** Display label for the sector, e.g. "Commodities trading" */
  sectorLabel: string;
  title: string;
  /** Always anonymised, e.g. "A Geneva commodities trader" */
  client: string;
  summary: string;
  challenge: string[];
  approach: string[];
  system: {
    text: string;
    components: string[];
  };
  results: Metric[];
  stack: string[];
  duration: string;
  image: ImageKey;
  services: ServiceSlug[];
}

export interface Insight {
  slug: InsightSlug;
  title: string;
  dek: string;
  /** Localised label of the first tag. */
  category: string;
  tags: InsightTag[];
  readingMinutes: number;
  /** ISO date */
  date: string;
  /** An ImageKey from src/lib/media.ts, or empty: the cover is then the procedural dot lattice for the slug. */
  cover: string;
  /** Practice byline, never an invented person. */
  author: string;
  body: Block[];
  relatedServices: ServiceSlug[];
  /** The language the text is actually in: the page locale, or 'en' when no translation exists. */
  lang: Locale;
  /** Locales with a real translation; always includes 'en'. */
  translations: Locale[];
  /** Written by the autonomous insights agent (nas/insights). */
  generated: boolean;
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

export interface HubsDict {
  services: Hero & { modelNote: string; cta: Cta };
  industries: Hero & { coreLabel: string; adjacentLabel: string; cta: Cta };
  work: Hero & { disclaimer: string; filterAll: string; cta: Cta };
  insights: Hero & { filterAll: string; latest: string; cta: Cta };
}

export interface ApproachStage extends Stage {
  tagline: string;
  includes: string[];
  exitCriteria: string;
}

export interface ApproachDict {
  hero: Hero;
  model: SectionIntro & { stages: ApproachStage[] };
  pricing: SectionIntro & { principles: TitledText[]; note: string };
  sprint: SectionIntro & {
    weeks: (SprintWeek & { outputs: string[] })[];
    promise: string;
  };
  models: SectionIntro & {
    items: { icon: IconKey; name: string; bestFor: string; text: string }[];
  };
  team: SectionIntro & { pods: IconItem[] };
  faq: FaqItem[];
  cta: { title: Headline; text: string; primary: Cta; secondary: Cta };
}

export interface AboutDict {
  hero: Hero;
  name: SectionIntro & { paragraphs: string[] };
  oak: SectionIntro & {
    layers: { key: 'roots' | 'trunk' | 'branches' | 'canopy'; name: string; meaning: string }[];
  };
  principles: SectionIntro & { items: TitledText[] };
  hq: SectionIntro & { text: string };
  network: SectionIntro & { stats: Stat[] };
  organisation: SectionIntro & { units: IconItem[] };
  practices: SectionIntro & { items: TitledText[] };
  cta: { title: Headline; text: string; primary: Cta; secondary: Cta };
}

export interface Role {
  slug: string;
  title: string;
  team: string;
  locations: string[];
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export interface CareersDict {
  hero: Hero;
  why: SectionIntro & { items: IconItem[] };
  roles: SectionIntro & { items: Role[]; openApplication: TitledText };
  locations: SectionIntro & { text: string };
  process: SectionIntro & { steps: TitledText[] };
  apply: {
    title: string;
    text: string;
    email: string;
    /** "Application: {role}" */
    subject: string;
  };
}

export interface ContactDict {
  hero: Hero;
  form: { title: string; text: string };
  direct: {
    title: string;
    emailLabel: string;
    email: string;
    addressLabel: string;
    addressLines: string[];
    responseTime: string;
  };
  next: { title: string; steps: TitledText[] };
  officesTitle: string;
}

export interface LegalPage {
  title: string;
  /** e.g. "Last updated: 1 November 2026" */
  updated: string;
  intro: string;
  blocks: Block[];
}

export interface LegalDict {
  privacy: LegalPage;
  imprint: LegalPage;
}

/**
 * Section headings for the services / industries / approach pages (added by pages-a).
 * Lives in locales/<l>/page-sections.ts.
 */
export interface PageSectionsDict {
  servicesHub: {
    listEyebrow: string;
    listTitle: Headline;
    modelEyebrow: string;
    modelTitle: Headline;
    industriesEyebrow: string;
    industriesTitle: Headline;
    workEyebrow: string;
    workTitle: Headline;
  };
  service: {
    deliverTitle: Headline;
    phasesTitle: Headline;
    deliverablesTitle: Headline;
    outcomesTitle: Headline;
    faqTitle: Headline;
    relatedCasesTitle: Headline;
    relatedIndustriesTitle: Headline;
    otherServicesTitle: Headline;
    /** Fact labels in the hero */
    factEngagement: string;
    factPhases: string;
    factPricing: string;
    pricingValue: string;
  };
  industriesHub: {
    /** "{n} value streams" */
    streamsCount: string;
    streamsEyebrow: string;
    streamsTitle: Headline;
    streamsLead: string;
    coreTitle: Headline;
    coreLead: string;
    adjacentTitle: Headline;
    adjacentLead: string;
  };
  industry: {
    valueStreamsTitle: Headline;
    valueStreamsLead: string;
    complianceTitle: Headline;
    complianceLead: string;
    relatedCaseTitle: Headline;
    relatedServicesTitle: Headline;
    otherIndustriesTitle: Headline;
    /** Fact labels in the hero */
    factTier: string;
    factStreams: string;
    factUseCases: string;
  };
  approach: {
    faqEyebrow: string;
    faqTitle: Headline;
    ctaEyebrow: string;
    includesLabel: string;
    exitLabel: string;
    pricingLabel: string;
    durationLabel: string;
    bestForLabel: string;
    outputsLabel: string;
    promiseLabel: string;
  };
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export interface Dictionary {
  locale: Locale;
  meta: MetaDict;
  nav: NavDict;
  common: CommonDict;
  footer: FooterDict;
  offices: Office[];
  home: HomeDict;
  hubs: HubsDict;
  services: Service[];
  approach: ApproachDict;
  industries: Industry[];
  cases: CaseStudy[];
  /** Insight chrome (tags, notes). The articles themselves are Markdown in content/insights/. */
  blog: BlogDict;
  newsletter: NewsletterDict;
  email: EmailDict;
  about: AboutDict;
  careers: CareersDict;
  contact: ContactDict;
  legal: LegalDict;
  pageSections: PageSectionsDict;
  /** SEO/GEO landing pages, FAQ bank, fact block and query-carrying titles (src/content/locales/<l>/seo.ts). */
  seo: SeoDict;
}

/* ------------------------------------------------------------------ */
/* Insights, newsletter, email                                         */
/* ------------------------------------------------------------------ */

export interface BlogDict {
  tags: Record<InsightTag, string>;
  /** "RSS feed" */
  rss: string;
  /** Note on FR/DE pages of a post that exists in English only. */
  englishOnly: string;
  /** Disclosure on posts written by the insights agent. */
  generatedNote: string;
  /** Byline for agent posts. */
  agentAuthor: string;
}

/** Double opt-in newsletter states (form + confirmation redirect). */
export interface NewsletterDict {
  /** After submit: check your inbox. */
  sent: string;
  confirmed: string;
  expired: string;
  failed: string;
  rateLimited: string;
  /** Small print under the field. */
  note: string;
  sending: string;
}

export interface EmailDict {
  /** Footer line of every email, e.g. "Emineon · Route de Vandœuvres 77A, 1253 Vandœuvres, Switzerland". */
  footer: string;
  confirm: {
    subject: string;
    preheader: string;
    title: string;
    text: string;
    button: string;
    ignore: string;
  };
  contactReceipt: {
    subject: string;
    preheader: string;
    title: string;
    /** "{name}" */
    greeting: string;
    text: string;
    signoff: string;
  };
}

/* ------------------------------------------------------------------ */
/* SEO / GEO (landing pages, FAQ bank, fact block)                     */
/* ------------------------------------------------------------------ */

export type FaqGroupKey = 'firm' | 'engagements' | 'technology' | 'regulation';

/** One entry of the FAQ bank (SEO-PLAN §7). `id` is stable across locales. */
export interface FaqEntry extends FaqItem {
  id: string;
  group: FaqGroupKey;
}

export interface FactItem {
  label: string;
  value: string;
}

/** A section intro plus a body: used by the landing pages. */
export interface LandingSection extends SectionIntro {
  paragraphs?: string[];
}

export interface SwitzerlandLanding {
  meta: PageMeta;
  hero: Hero;
  services: SectionIntro;
  engagement: SectionIntro & { columns: { stage: string; what: string; pricing: string; duration: string } };
  swiss: SectionIntro & { items: TitledText[]; cta: Cta };
  sectors: SectionIntro;
  where: SectionIntro & { places: TitledText[]; note: string; cta: Cta };
  work: SectionIntro;
  choose: SectionIntro & { items: TitledText[] };
  faq: SectionIntro;
  /** FAQ bank ids shown on the page (with FAQPage JSON-LD). */
  faqIds: string[];
}

export interface GenevaLanding {
  meta: PageMeta;
  hero: Hero;
  context: LandingSection & { stats: Stat[] };
  sectors: SectionIntro & { items: { industry: IndustrySlug; title: string; text: string }[] };
  onsite: LandingSection & { points: TitledText[] };
  data: SectionIntro & { items: TitledText[] };
  work: SectionIntro;
  faq: SectionIntro;
  faqIds: string[];
  /** Geneva-only questions, shown after the bank entries. */
  faqExtra: FaqItem[];
}

export interface GovernanceFramework {
  key: 'finma' | 'nfadp' | 'euaiact' | 'swiss';
  name: string;
  /** Who it concerns, one line. */
  scope: string;
  summary: string;
  points: string[];
  /** Plain-text source line (publisher · document). */
  source: string;
}

export interface GovernanceLanding {
  meta: PageMeta;
  hero: Hero;
  frameworks: SectionIntro & { items: GovernanceFramework[] };
  table: SectionIntro & {
    columns: { framework: string; concerns: string; asks: string; build: string };
    rows: { framework: string; concerns: string; asks: string; build: string }[];
  };
  controls: SectionIntro & { items: IconItem[] };
  reading: SectionIntro;
  /** Existing insight slugs that act as spokes of the hub. */
  insightSlugs: string[];
  services: SectionIntro;
  faq: SectionIntro;
  faqIds: string[];
  disclaimer: string;
}

export interface SeoDict {
  /** Short names of the new pages (nav, footer, breadcrumbs, related links). */
  pages: { switzerland: string; geneva: string; governance: string; faq: string };
  labels: {
    /** "Updated" (before a date). */
    updated: string;
    /** Footer column title. */
    footerColumn: string;
    /** Related-links strip eyebrow. */
    related: string;
    /** Social links label in the footer. */
    follow: string;
    /** Link to the FAQ page, "{n}" = number of questions. */
    allQuestions: string;
  };
  /** Query-carrying <title>s for existing pages (the template adds " · Emineon"). */
  titles: {
    services: Record<ServiceSlug, string>;
    industries: Record<IndustrySlug, string>;
  };
  /** "Emineon at a glance": the quotable fact block (About, country page, llms.txt). */
  facts: { eyebrow: string; title: Headline; definition: string; items: FactItem[] };
  faq: { groups: Record<FaqGroupKey, string>; items: FaqEntry[] };
  faqPage: { meta: PageMeta; hero: Hero };
  switzerland: SwitzerlandLanding;
  geneva: GenevaLanding;
  governance: GovernanceLanding;
}
