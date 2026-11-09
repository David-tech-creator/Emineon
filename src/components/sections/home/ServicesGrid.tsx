import Link from "next/link";
import type { HomeDict, Locale, Service } from "@/content/schema";
import { Icon } from "@/components/icons";
import { Arrow, Reveal } from "@/components/ui";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SectionIntro } from "./SectionIntro";

/** What we do: 5 services in a hairline grid (3 + 2), each linking to /services/[slug]. Bone section. */
export function ServicesGrid({
  locale,
  intro,
  services,
  exploreLabel,
}: {
  locale: Locale;
  intro: HomeDict["services"];
  services: Service[];
  exploreLabel: string;
}) {
  return (
    <section aria-labelledby="home-services-title" className="tone-bone relative py-24 md:py-32">
      <div className="container-site">
        <SectionIntro
          id="home-services-title"
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          cta={{ label: intro.cta.label, href: localizedHref(locale, intro.cta.href) }}
        />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 md:grid-cols-6">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.07} className={cn("bg-[var(--bg)]", i < 3 ? "md:col-span-2" : "md:col-span-3")}>
              <Link
                href={localizedHref(locale, `/services/${s.slug}`)}
                className="group relative flex h-full flex-col p-6 transition-colors duration-300 ease-[var(--ease-out-expo)] hover:bg-[color-mix(in_oklab,var(--bg),var(--fg)_4%)] md:min-h-[360px] md:p-8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[12px] tracking-[0.12em] text-fg-dim tabular">{s.index}</span>
                  <span className="flex size-12 items-center justify-center border border-line text-fg transition-colors duration-300 group-hover:border-ember-deep/60 group-hover:text-ember-ink">
                    <Icon name={s.icon} size={24} />
                  </span>
                </div>
                <div className="mt-auto pt-10 md:pt-14">
                  <h3 className="text-h3 font-medium text-fg">{s.name}</h3>
                  <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-fg-muted">{s.short}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.14em] text-fg uppercase transition-colors duration-200 group-hover:text-ember-ink">
                    {exploreLabel}
                    <Arrow diagonal className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
