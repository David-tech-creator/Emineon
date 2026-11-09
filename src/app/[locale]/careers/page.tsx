import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fill, getDictionary, type Role } from "@/content";
import { isLocale } from "@/lib/i18n";
import { images, videos } from "@/lib/media";
import { Button, Card, CardGrid, Reveal, Section } from "@/components/ui";
import { Icon } from "@/components/icons";
import { CtaBand, JsonLd, PageHero, SectionHeader, absoluteUrl, breadcrumbLd, pageMetadata } from "@/components/sections/pages/shared";
import { RoleList } from "@/components/sections/pages/careers/RoleList";
import { NetworkMap } from "@/components/sections/pages/about/NetworkMap";
import { OfficeList } from "@/components/sections/pages/about/OfficeList";

export async function generateMetadata({ params }: PageProps<"/[locale]/careers">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getDictionary(locale);
  return pageMetadata({ locale, path: "/careers", title: meta.careers.title, description: meta.careers.description });
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const c = d.careers;
  const L = d.common.labels;
  const crumbs = [{ label: d.meta.siteName, href: "/" }, { label: d.nav.items.careers }];
  const mailto = (subject: string) => `mailto:${c.apply.email}?subject=${encodeURIComponent(subject)}`;
  const roleMail = (r: Role) => mailto(fill(c.apply.subject, { role: r.title }));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbLd(locale, crumbs),
            {
              "@type": "ItemList",
              name: c.roles.eyebrow.replace(/[[\]]/g, "").trim(),
              url: absoluteUrl(locale, "/careers"),
              itemListElement: c.roles.items.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: r.title, url: `${absoluteUrl(locale, "/careers")}#${r.slug}` })),
            },
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
        image={images.careers}
        actions={
          <>
            <Button href="#roles" size="lg" arrow>
              {c.roles.eyebrow.replace(/^\s*\[\s*(\d+\s*—\s*)?|\s*\]\s*$/g, "")}
            </Button>
            <Button href={mailto(c.apply.title)} variant="ghost">
              {d.common.cta.emailUs}
            </Button>
          </>
        }
      />

      {/* 01 — Why */}
      <Section divider>
        <SectionHeader eyebrow={c.why.eyebrow} title={c.why.title} />
        <CardGrid className="mt-14 grid-cols-1 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {c.why.items.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05} className="flex">
              <Card padding="lg" className="w-full">
                <div className="flex items-start justify-between">
                  <Icon name={w.icon} size={32} accent className="text-fg" />
                  <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-12 text-h3 font-medium text-fg">{w.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{w.text}</p>
              </Card>
            </Reveal>
          ))}
        </CardGrid>
      </Section>

      {/* 02 — Roles */}
      <Section id="roles" tone="carbon" className="scroll-mt-[var(--nav-h)]">
        <SectionHeader eyebrow={c.roles.eyebrow} title={c.roles.title} lead={c.roles.lead} />
        <div className="mt-14 md:mt-20">
          <RoleList
            roles={c.roles.items}
            mailto={roleMail}
            labels={{
              location: L.locations,
              type: L.type,
              team: L.team,
              responsibilities: L.responsibilities,
              requirements: L.requirements,
              niceToHave: L.niceToHave,
              apply: d.common.cta.apply,
            }}
          />
        </div>
        <Reveal className="mt-12">
          <div className="flex flex-col gap-6 border border-dashed border-line-strong p-6 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h3 className="text-h3 font-medium text-fg">{c.roles.openApplication.title}</h3>
              <p className="mt-3 max-w-[56ch] text-fg-muted">{c.roles.openApplication.text}</p>
            </div>
            <Button href={mailto(c.apply.title)} variant="secondary" arrow>
              {d.common.cta.emailUs}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 03 — Locations */}
      <Section>
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <div className="col-span-4 md:col-span-4">
            <SectionHeader layout="stacked" eyebrow={c.locations.eyebrow} title={c.locations.title} />
            <Reveal delay={0.1}>
              <p className="mt-6 text-fg-muted">{c.locations.text}</p>
            </Reveal>
          </div>
          <Reveal y={0} duration={1.2} className="col-span-4 md:col-span-8">
            <NetworkMap offices={d.offices} label={d.common.a11y.mapLabel} />
          </Reveal>
        </div>
        <OfficeList offices={d.offices} hqLabel={L.hq} className="mt-14" />
      </Section>

      {/* 04 — Process */}
      <Section tone="bone">
        <SectionHeader eyebrow={c.process.eyebrow} title={c.process.title} />
        <ol className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.07} className="relative flex flex-col bg-[var(--bg)] p-6 md:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full border border-line-strong font-mono text-[12px] text-fg tabular">{i + 1}</span>
                <span className="h-px flex-1 bg-line-strong" aria-hidden />
                <span className="eyebrow text-fg-dim">
                  {L.step} {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-12 text-h3 font-medium text-fg">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        eyebrow={c.apply.email}
        title={{ pre: "", accent: c.apply.title, post: "." }}
        text={c.apply.text}
        primary={{ label: d.common.cta.emailUs, href: mailto(c.apply.title) }}
        video={videos.filaments}
      />
    </>
  );
}
