import type { Dictionary, LegalPage as LegalPageData, Locale } from "@/content";
import { Eyebrow, Heading, Reveal, Section } from "@/components/ui";
import { Breadcrumb } from "../shared/Breadcrumb";
import type { Crumb } from "../shared/seo";
import { Prose } from "../insights/Prose";
import { Toc } from "../insights/Toc";
import { toc } from "../insights/blocks";

/** Legal document layout: title, updated line, intro, sticky ToC, long-form body. */
export function LegalPage({ locale, d, page, crumbs }: { locale: Locale; d: Dictionary; page: LegalPageData; crumbs: Crumb[] }) {
  const items = toc(page.blocks);
  return (
    <>
      <section className="hero-enter relative bg-canvas text-fg">
        <div className="container-site pb-14 pt-[calc(var(--nav-h)+48px)] md:pb-20 md:pt-[calc(var(--nav-h)+80px)]">
          <Breadcrumb locale={locale} items={crumbs} label={d.common.a11y.breadcrumb} className="mb-10 md:mb-14" />
          <Eyebrow>{crumbs[crumbs.length - 1]?.label ?? page.title}</Eyebrow>
          <Heading title={page.title} size="h1" as="h1" className="mt-6 max-w-[16ch] max-sm:text-[36px]" />
          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-fg-dim">{page.updated}</p>
        </div>
      </section>
      <Section divider spacing="none" className="pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
          <aside className="col-span-4 hidden lg:col-span-3 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+40px)]">
              <Toc items={items} label={d.common.labels.onThisPage} />
            </div>
          </aside>
          <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-5">
            <Reveal>
              <p className="max-w-[68ch] text-lead text-fg">{page.intro}</p>
            </Reveal>
            <Prose blocks={page.blocks} className="mt-14" />
          </div>
        </div>
      </Section>
    </>
  );
}
