import Link from "next/link";
import type { HomeDict, Industry, Locale } from "@/content/schema";
import { Icon } from "@/components/icons";
import { Arrow, MediaFrame, Reveal } from "@/components/ui";
import { images } from "@/lib/media";
import { localizedHref } from "@/lib/i18n";
import { SectionIntro } from "./SectionIntro";

/** Industries: 6 image tiles with icon, tier, short text and value streams. */
export function IndustriesSection({
  locale,
  intro,
  industries,
  labels,
}: {
  locale: Locale;
  intro: HomeDict["industries"];
  industries: Industry[];
  labels: { core: string; adjacent: string; valueStreams: string };
}) {
  return (
    <section aria-labelledby="home-industries-title" className="relative bg-canvas py-24 md:py-32">
      <div className="container-site">
        <SectionIntro
          id="home-industries-title"
          eyebrow={intro.eyebrow}
          title={intro.title}
          lead={intro.lead}
          cta={{ label: intro.cta.label, href: localizedHref(locale, intro.cta.href) }}
        />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={(i % 3) * 0.07} className="bg-canvas">
              <Link href={localizedHref(locale, `/industries/${ind.slug}`)} className="group relative flex h-full flex-col">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <MediaFrame
                  image={images[ind.image]}
                  alt=""
                  ratio="aspect-[4/3]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                >
                  <div className="flex items-start justify-between p-4 md:p-5">
                    <span className="flex size-10 items-center justify-center border border-line bg-paper text-ink transition-colors duration-300 group-hover:border-ember group-hover:text-ember-ink">
                      <Icon name={ind.icon} size={20} />
                    </span>
                    <span className="rounded-[2px] border border-line bg-paper px-2 py-1 font-mono text-[10.5px] tracking-[0.14em] text-ink uppercase">
                      {ind.tier === "core" ? labels.core : labels.adjacent}
                    </span>
                  </div>
                </MediaFrame>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="max-w-[18ch] text-[24px] leading-[1.08] font-medium tracking-[-0.02em] text-fg md:text-[27px]">
                    {ind.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{ind.short}</p>
                  <p className="mt-6 font-mono text-[10.5px] tracking-[0.16em] text-fg-dim uppercase">{labels.valueStreams}</p>
                  <ul className="mt-3 border-t border-line">
                    {ind.valueStreams.map((v, vi) => (
                      <li
                        key={v.name}
                        className="flex items-baseline gap-3 border-b border-line py-2 text-[14px] leading-snug text-fg"
                      >
                        <span aria-hidden className="font-mono text-[10.5px] tracking-[0.08em] text-fg-dim tabular">
                          {String(vi + 1).padStart(2, "0")}
                        </span>
                        {v.name}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex justify-end pt-6 text-fg-dim transition-colors duration-200 group-hover:text-ember-ink">
                    <Arrow diagonal className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
