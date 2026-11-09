import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";
import { JsonLd, breadcrumbLd, pageMetadata } from "@/components/sections/pages/shared";
import { LegalPage } from "@/components/sections/pages/legal/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return { ...pageMetadata({ locale, path: "/legal/privacy", title: meta.privacy.title, description: meta.privacy.description }), robots: { index: true, follow: true } };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/legal/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.footer.legal.privacy }];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbLd(locale, crumbs) }} />
      <LegalPage locale={locale} d={d} page={d.legal.privacy} crumbs={crumbs} />
    </>
  );
}
