import type { Metadata } from "next";
import { RelatedLinks } from "@/components/sections/pages/seo/SeoSections";
import { landingPath } from "@/lib/routes";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { isLocale, localizedHref } from "@/lib/i18n";
import { Reveal, Section } from "@/components/ui";
import { webPageNode } from "@/lib/graph";
import { JsonLd, PageHero, SectionHeader, breadcrumbLd, pageMetadata } from "@/components/sections/pages/shared";
import { ContactForm } from "@/components/sections/pages/contact/ContactForm";
import { DeliveryMap } from "@/components/sections/home/DeliveryMap";
import { OfficeList } from "@/components/sections/pages/about/OfficeList";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: meta.contact.title, description: meta.contact.description });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const c = d.contact;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.contact }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs),
            webPageNode(locale, "/contact", { type: "ContactPage", name: d.meta.contact.title, description: d.meta.contact.description }),
          ],
        }}
      />
      <PageHero
        locale={locale}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        lead={c.hero.lead}
        breadcrumbs={crumbs}
        breadcrumbLabel={d.common.a11y.breadcrumb}
        layout="plain"
      />

      <Section spacing="none" className="pb-24 md:pb-32">
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-16 border-t border-line pt-12 md:grid-cols-12 md:pt-16">
          <div className="col-span-4 md:col-span-7">
            <Reveal>
              <h2 className="text-h3 font-medium text-fg">{c.form.title}</h2>
              <p className="mt-3 max-w-[52ch] text-fg-muted">{c.form.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <ContactForm
                locale={locale}
                form={d.common.form}
                privacyHref={localizedHref(locale, "/legal/privacy")}
                privacyLabel={d.footer.legal.privacy}
              />
            </Reveal>
          </div>

          <aside className="col-span-4 md:col-span-4 md:col-start-9">
            <div className="flex flex-col gap-12 md:sticky md:top-[calc(var(--nav-h)+40px)]">
              <Reveal>
                <h2 className="eyebrow text-fg-dim">{c.direct.title}</h2>
                <dl className="mt-6 border-t border-line">
                  <div className="border-b border-line py-5">
                    <dt className="eyebrow text-fg-dim">{c.direct.emailLabel}</dt>
                    <dd className="mt-2">
                      <a href={`mailto:${c.direct.email}`} className="text-[22px] font-medium tracking-[-0.01em] text-fg transition-colors hover:text-ember-ink md:text-[26px]">
                        {c.direct.email}
                      </a>
                    </dd>
                  </div>
                  <div className="border-b border-line py-5">
                    <dt className="eyebrow text-fg-dim">{c.direct.addressLabel}</dt>
                    <dd className="mt-3">
                      <address className="font-mono text-[14px] not-italic leading-relaxed text-fg">
                        {c.direct.addressLines.map((l) => (
                          <span key={l} className="block">
                            {l}
                          </span>
                        ))}
                      </address>
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 flex items-start gap-2 text-[14px] text-fg-muted">
                  <span aria-hidden className="animate-pulse-dot mt-[7px] size-1.5 shrink-0 rounded-full bg-ember" />
                  {c.direct.responseTime}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="eyebrow text-fg-dim">{c.next.title}</h2>
                <ol className="mt-6 border-t border-line">
                  {c.next.steps.map((s, i) => (
                    <li key={s.title} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-5">
                      <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="text-fg">{s.title}</h3>
                        <p className="mt-1 text-[14px] leading-snug text-fg-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="carbon" divider>
        <SectionHeader eyebrow={c.officesTitle} title={d.about.network.title} lead={d.about.network.lead} />
        <Reveal y={0} duration={1.2} className="mt-14 md:mt-20">
          <DeliveryMap offices={d.offices} label={d.common.a11y.mapLabel} hqLabel={d.common.labels.hq} />
        </Reveal>
        <OfficeList offices={d.offices} hqLabel={d.common.labels.hq} className="mt-14" />
      </Section>
      <RelatedLinks
        locale={locale}
        label={d.seo.labels.related}
        links={[
          { label: d.seo.pages.geneva, href: landingPath("geneva") },
          { label: d.seo.pages.faq, href: "/faq" },
          { label: d.seo.pages.switzerland, href: landingPath("switzerland") },
        ]}
      />
    </>
  );
}
