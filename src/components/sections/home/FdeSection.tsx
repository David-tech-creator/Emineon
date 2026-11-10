import type { HomeDict, Office } from "@/content/schema";
import { Icon } from "@/components/icons";
import { Counter, Reveal } from "@/components/ui";
import { DeliveryMap } from "./DeliveryMap";
import { SectionIntro } from "./SectionIntro";

/** Forward-deployed engineers + the global delivery map. Carbon section. */
export function FdeSection({
  fde,
  offices,
  mapLabel,
  hqLabel,
}: {
  fde: HomeDict["fde"];
  offices: Office[];
  mapLabel: string;
  hqLabel: string;
}) {
  return (
    <section aria-labelledby="home-fde-title" className="tone-stone relative overflow-hidden py-24 md:py-32">
      <div className="container-site">
        <SectionIntro id="home-fde-title" eyebrow={fde.eyebrow} title={fde.title} lead={fde.lead} />

        <ul className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:mt-20 md:grid-cols-3">
          {fde.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.07} className="bg-canvas p-6 md:p-8">
              <Icon name={p.icon} size={28} accent className="text-fg" />
              <h3 className="mt-8 text-[21px] leading-tight font-medium tracking-[-0.015em] text-fg">{p.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-fg-muted">{p.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Map */}
        <div className="mt-16 md:mt-24">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-fg-muted">{fde.map.title}</p>
              <p className="mt-3 max-w-xl text-[15px] text-fg-muted">{fde.map.caption}</p>
            </div>
            <dl className="grid grid-cols-3 gap-6 md:flex md:gap-12">
              {fde.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 font-mono text-[11px] tracking-[0.1em] text-fg-dim uppercase">{s.label}</dt>
                  <dd className="text-[36px] leading-none font-medium tracking-[-0.03em] text-fg md:text-[44px]">
                    <Counter value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative -mx-[var(--gutter)] py-8 md:mx-0 md:py-12">
            <DeliveryMap offices={offices} label={mapLabel} hqLabel={hqLabel} />
          </div>

          {/* City index (always visible; carries the labels on mobile) */}
          <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-7">
            {offices.map((o) => (
              <li key={o.id} className="bg-canvas px-4 py-4 last:col-span-2 lg:last:col-span-1">
                <p className="flex items-start gap-2 font-mono text-[11.5px] leading-[1.4] tracking-[0.12em] text-fg uppercase">
                  <span aria-hidden className={o.hq ? "mt-[0.42em] size-1.5 shrink-0 rounded-full bg-ember" : "mt-[0.42em] size-1.5 shrink-0 rounded-full bg-fg-muted"} />
                  {o.city}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-fg-dim">{o.hq ? hqLabel : o.region}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
