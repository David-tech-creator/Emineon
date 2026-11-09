import type { HomeDict, Locale } from "@/content/schema";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui";
import { localizedHref } from "@/lib/i18n";
import { SectionIntro } from "./SectionIntro";
import { SprintTimeline } from "./SprintTimeline";

/** How we work: Assess → Build → Run ladder, then the sticky 30-day sprint timeline. */
export function ApproachSection({
  locale,
  approach,
  labels,
}: {
  locale: Locale;
  approach: HomeDict["approach"];
  labels: { day: string };
}) {
  return (
    <section aria-labelledby="home-approach-title" className="relative bg-canvas">
      <div className="container-site pt-24 md:pt-32">
        <SectionIntro id="home-approach-title" eyebrow={approach.eyebrow} title={approach.title} lead={approach.lead} />

        <ol className="mt-14 grid grid-cols-1 border-t border-line md:mt-20 md:grid-cols-3">
          {approach.stages.map((st, i) => (
            <Reveal
              as="li"
              key={st.key}
              delay={i * 0.08}
              className="group relative flex flex-col border-b border-line py-10 md:border-b-0 md:px-8 md:py-12 md:border-l md:first:border-l-0 md:first:pl-0"
            >
              {/* Ladder connector */}
              {i < approach.stages.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[3.15rem] right-0 z-10 hidden size-2 translate-x-1/2 rotate-45 border-t border-r border-line-strong bg-canvas md:block"
                />
              )}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11.5px] tracking-[0.16em] text-fg-muted uppercase transition-colors duration-300 group-hover:text-ember-ink">{st.label}</span>
                <Icon name={st.icon} size={28} className="text-fg-muted transition-colors duration-300 group-hover:text-fg" />
              </div>
              <h3 className="mt-10 text-h3 font-medium text-fg">{st.title}</h3>
              <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-fg-muted">{st.text}</p>
              <div className="mt-auto grid grid-cols-2 gap-x-6 pt-10 font-mono text-[11.5px] tracking-[0.06em]">
                <p className="min-h-[3.4rem] border-t border-line pt-3 leading-[1.55] text-fg">{st.pricing}</p>
                <p className="min-h-[3.4rem] border-t border-line pt-3 leading-[1.55] text-fg-dim">{st.duration}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-8 border-t border-line md:mt-12">
        <SprintTimeline
          sprint={approach.sprint}
          ctaHref={localizedHref(locale, approach.sprint.cta.href)}
          dayLabel={labels.day}
        />
      </div>
    </section>
  );
}
