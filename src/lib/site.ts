/**
 * Site-wide constants (non-translatable).
 *
 * OPEN DECISIONS live here, one place each (see TODO.md "SEO/GEO: decisions"):
 * - CONTACT_EMAIL: the only public address (schema, footer, contact, llms.txt).
 * - SOCIAL_PROFILES: Organization sameAs + footer social links. An empty url
 *   hides the link and drops it from sameAs, so nothing invented ever ships.
 * - FOUNDER: null until David confirms name + LinkedIn (BRIEF: no people on the site).
 * - TWITTER_HANDLE: twitter:site, only once an X account exists.
 * - LEGAL_NAME: registered name from Zefix (adds Organization.legalName).
 * - No continent count anywhere: copy lists the hubs instead.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.emineon.com";
export const CONTACT_EMAIL = "david.v@emineon.com";

export type SocialProfile = { id: "linkedin" | "x" | "github" | "crunchbase" | "wikidata" | "clutch"; label: string; url: string };

/** TODO(David): fill in real URLs. Empty = hidden in the footer and omitted from JSON-LD sameAs. */
export const SOCIAL_PROFILES: SocialProfile[] = [
  { id: "linkedin", label: "LinkedIn", url: "" }, // TODO: https://www.linkedin.com/company/<emineon>
  { id: "x", label: "X", url: "" }, // TODO: https://x.com/<handle>
  { id: "github", label: "GitHub", url: "" }, // TODO: only if Emineon gets its own org
  { id: "crunchbase", label: "Crunchbase", url: "" }, // TODO: https://www.crunchbase.com/organization/<emineon>
  { id: "clutch", label: "Clutch", url: "" }, // TODO: after the Clutch profile exists (SEO-PLAN §3)
  { id: "wikidata", label: "Wikidata", url: "" }, // TODO: https://www.wikidata.org/wiki/Q<id> (SEO-PLAN §9, P2)
];

/** Profiles that are actually set. */
export const activeProfiles = () => SOCIAL_PROFILES.filter((p) => /^https:\/\//.test(p.url));

/** X handle for twitter:site, e.g. "@emineon". Empty = omitted. TODO(David). */
export const TWITTER_HANDLE = "";

/** Registered legal name (Zefix), e.g. "Emineon SA". Empty = omitted. TODO(David). */
export const LEGAL_NAME = "";

/**
 * Founder slot for Organization.founder. Keep null until David approves.
 * When approved, set it to (shared @id with rive-foundry.com, SEO-PLAYBOOK §2):
 *   { id: "https://www.rive-foundry.com/#david", name: "David Vinkenroye", url: "https://www.rive-foundry.com/", sameAs: ["https://www.linkedin.com/in/<handle>/"] }
 */
export const FOUNDER: { id: string; name: string; url: string; sameAs: string[] } | null = null;

/**
 * Geneva HQ coordinates for schema.org GeoCoordinates. APPROXIMATE: taken from
 * the map pin for Route de Vandœuvres 77A; confirm against the exact entrance
 * (and the Google Business Profile pin) before launch.
 */
export const HQ_GEO = { latitude: 46.2196, longitude: 6.2006 } as const;

/** Visible "Updated" date on the SEO landing pages (ISO). Bump when their content changes. */
export const LANDING_UPDATED = "2026-11-09";
