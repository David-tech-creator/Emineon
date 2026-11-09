"use client";

import { useParams } from "next/navigation";
import type { CommonDict } from "@/content/schema";
import { isLocale, localizedHref } from "@/lib/i18n";
import { Button, Eyebrow, Heading } from "@/components/ui";

export type NotFoundCopy = CommonDict["notFound"] & { docTitle: string };

export function LocaleNotFoundView({ copies }: { copies: Record<string, NotFoundCopy> }) {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : "en";
  const nf = copies[locale] ?? copies.en;
  return (
    <>
      <title>{nf.docTitle}</title>
      <section className="hero-enter relative flex min-h-[80svh] items-center bg-canvas text-fg">
        <div className="container-site pb-24 pt-[calc(var(--nav-h)+64px)]">
          <Eyebrow>{nf.eyebrow}</Eyebrow>
          <Heading title={nf.title} size="h1" as="h1" className="mt-6 max-w-[14ch]" />
          <p className="mt-8 max-w-xl text-lead text-fg-muted">{nf.text}</p>
          <div className="mt-10">
            <Button href={localizedHref(locale, nf.cta.href)} size="lg" arrow>
              {nf.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
