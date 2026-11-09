import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, languageAlternates, localizedHref, locales } from "@/lib/i18n";
import { SITE_URL, TWITTER_HANDLE } from "@/lib/site";
import { siteGraph } from "@/lib/graph";
import { landingPath } from "@/lib/routes";
import { rssAlternate } from "@/components/sections/pages/shared/seo";
import { JsonLd } from "@/components/sections/pages/shared/JsonLd";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import type { NavData } from "@/components/layout/nav-types";
import { fontVariables } from "../fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#F1EEE8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.home.title,
      template: meta.titleTemplate.replace("{title}", "%s"),
    },
    description: meta.home.description,
    applicationName: meta.siteName,
    alternates: { canonical: localizedHref(locale, "/"), languages: languageAlternates("/"), types: rssAlternate(locale) },
    openGraph: {
      type: "website",
      siteName: meta.siteName,
      locale: meta.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => getDictionary(l).meta.ogLocale),
      title: meta.home.title,
      description: meta.home.description,
      url: localizedHref(locale, "/"),
    },
    twitter: { card: "summary_large_image", ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE } : {}) },
  };
}

/** Inline, pre-paint: mark JS available so reveal-hidden states only apply with JS. */
const jsFlag = `document.documentElement.classList.add('js')`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const navData: NavData = {
    nav: dict.nav,
    a11y: {
      openMenu: dict.common.a11y.openMenu,
      closeMenu: dict.common.a11y.closeMenu,
      mainNav: dict.common.a11y.mainNav,
      logoHome: dict.common.a11y.logoHome,
      close: dict.common.a11y.close,
    },
    services: dict.services.map(({ slug, index, name, short, icon }) => ({ slug, index, name, short, icon })),
    industries: dict.industries.map(({ slug, name, short, tier, icon }) => ({ slug, name, short, tier, icon })),
    extra: {
      switzerland: { href: landingPath("switzerland"), label: dict.seo.pages.switzerland, short: dict.seo.switzerland.meta.description },
      geneva: { href: landingPath("geneva"), label: dict.seo.pages.geneva, short: dict.seo.geneva.sectors.lead ?? "" },
      governance: { href: landingPath("governance"), label: dict.seo.pages.governance, short: dict.seo.governance.frameworks.items.map((f) => f.name.split(" (")[0]).slice(0, 3).join(" · ") },
    },
  };

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />

        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {/* The one Organization + WebSite graph (src/lib/graph.ts); pages add their own nodes by @id. */}
        <JsonLd data={siteGraph(locale)} />
        <a href="#main" className="skip-link">
          {dict.common.a11y.skipToContent}
        </a>
        <SmoothScroll>
          <Nav locale={locale} {...navData} />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer dict={dict} />
        </SmoothScroll>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
