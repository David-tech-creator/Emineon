import type { IconKey, IndustrySlug, NavDict, ServiceSlug } from "@/content/schema";

/** Slim, serialisable data passed from the server layout to the client Nav. */
export type NavService = { slug: ServiceSlug; index: string; name: string; short: string; icon: IconKey };
export type NavIndustry = { slug: IndustrySlug; name: string; short: string; tier: "core" | "adjacent"; icon: IconKey };
export type NavA11y = { openMenu: string; closeMenu: string; mainNav: string; logoHome: string; close: string };
/** SEO landing pages surfaced in the menus (hrefs locale-less, English slugs). */
export type NavExtraLink = { href: string; label: string; short: string };
export type NavExtra = { switzerland: NavExtraLink; geneva: NavExtraLink; governance: NavExtraLink };
export type NavData = { nav: NavDict; a11y: NavA11y; services: NavService[]; industries: NavIndustry[]; extra: NavExtra };

