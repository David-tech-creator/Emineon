import Link from "next/link";
import type { CaseStudy, HomeDict, Locale } from "@/content/schema";
import { Arrow, Counter, MediaFrame, Reveal } from "@/components/ui";
import { images } from "@/lib/media";
import { localizedHref } from "@/lib/i18n";
import { SectionIntro } from "./SectionIntro";

/** Selected work: 3 representative case cards with image, client line and metrics. Bone section. */
export function WorkSection({
  locale,
  intro,
  cases,
  labels,
}: {
  locale: Locale;
  intro: HomeDict["work"];
  cases: CaseStudy[];
  labels: { representative: string; readCase: string };
}) {
  return (
    <section aria-labelledby="home-work-title" className="tone-bone relative py-24 md:py-32">
      <div className="container-site">
        <SectionIntro
          id="home-work-title"
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          cta={{ label: intro.cta.label, href: localizedHref(locale, intro.cta.href) }}
        />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.08} className="bg-[var(--bg)]">
              <Link href={localizedHref(locale, `/work/${c.slug}`)} className="group relative flex h-full flex-col">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <MediaFrame
                  image={images[c.image]}
                  alt=""
                  ratio="aspect-[16/10]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                >
                  <div className="flex h-full items-start justify-between p-4 md:p-5">
                    <span className="rounded-[2px] border border-line bg-paper px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink uppercase">
                      {c.sectorLabel}
                    </span>
                    <span className="rounded-[2px] border border-line bg-paper px-2 py-1 font-mono text-[10.5px] tracking-[0.12em] text-ink tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </MediaFrame>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="font-mono text-[11px] tracking-[0.1em] text-fg-dim uppercase">{c.client}</p>
                  <h3 className="mt-3 text-[22px] leading-[1.15] font-medium tracking-[-0.02em] text-balance text-fg md:min-h-[3.45em] md:text-[25px]">{c.title}</h3>

                  <dl className="mt-8 grid grid-cols-2 gap-px border-y border-line bg-line">
                    {c.results.slice(0, 2).map((m) => (
                      <div key={m.label} className="flex flex-col-reverse justify-end bg-[var(--bg)] py-4 pr-4 even:pl-4">
                        <dt className="mt-2 text-[13px] leading-snug text-fg-muted">{m.label}</dt>
                        <dd className="text-[30px] leading-none font-medium tracking-[-0.03em] text-fg md:text-[34px]">
                          <Counter value={m.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="font-mono text-[10.5px] tracking-[0.14em] text-fg-dim uppercase">{labels.representative}</span>
                    <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[11.5px] tracking-[0.12em] whitespace-nowrap text-fg uppercase transition-colors duration-200 group-hover:text-ember-ink">
                      {labels.readCase}
                      <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
