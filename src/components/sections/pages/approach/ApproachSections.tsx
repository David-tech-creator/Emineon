import type { ApproachStage, IconKey, Stage, TitledText, IconItem } from "@/content";
import { cn } from "@/lib/cn";
import { Card, CardGrid, Reveal } from "@/components/ui";
import { Icon } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* Compact Assess → Build → Run columns (services hub)                 */
/* ------------------------------------------------------------------ */

export function StageColumns({ stages, pricingLabel, durationLabel }: { stages: Stage[]; pricingLabel: string; durationLabel: string }) {
  return (
    <CardGrid className="grid-cols-1 md:grid-cols-3">
      {stages.map((s, i) => (
        <Reveal key={s.key} delay={i * 0.08} className="flex">
          <Card padding="lg" className="w-full">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-fg-muted">{s.label}</span>
              <Icon name={s.icon} size={28} accent className="text-fg-muted" />
            </div>
            <h3 className="mt-12 text-h3 font-medium text-fg">{s.title}</h3>
            <p className="mb-10 mt-4 text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
            <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <dt className="eyebrow text-fg-dim">{pricingLabel}</dt>
                <dd className="mt-2 font-mono text-[13px] text-fg">{s.pricing}</dd>
              </div>
              <div>
                <dt className="eyebrow text-fg-dim">{durationLabel}</dt>
                <dd className="mt-2 font-mono text-[13px] text-fg">{s.duration}</dd>
              </div>
            </dl>
          </Card>
        </Reveal>
      ))}
    </CardGrid>
  );
}

/* ------------------------------------------------------------------ */
/* Deep stage panels (approach page)                                   */
/* ------------------------------------------------------------------ */

type StageLabels = { includes: string; exit: string; pricing: string; duration: string };

export function StagePanels({ stages, labels }: { stages: ApproachStage[]; labels: StageLabels }) {
  return (
    <div className="border-t border-line">
      {stages.map((s, i) => (
        <Reveal key={s.key} delay={0.05} className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-8 border-b border-line py-14 md:grid-cols-12 md:py-20">
          <div className="col-span-4 md:col-span-4">
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center border border-line-strong">
                <Icon name={s.icon} size={28} accent className="text-fg" />
              </span>
              <span className="eyebrow text-fg-muted">{s.label}</span>
            </div>
            <h3 className="mt-8 text-[clamp(32px,4vw,56px)] font-medium leading-[0.98] tracking-[-0.035em] text-fg">{s.title}</h3>
            <p className="mt-5 max-w-[34ch] text-[22px] font-medium leading-snug tracking-[-0.015em] text-fg-quiet">{s.tagline}</p>
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-6">
            <p className="text-[17px] leading-[1.7] text-fg-muted">{s.text}</p>
            <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
              <div className="bg-[var(--bg)] p-4">
                <dt className="eyebrow text-fg-dim">{labels.pricing}</dt>
                <dd className="mt-2 font-mono text-[13px] leading-snug text-fg">{s.pricing}</dd>
              </div>
              <div className="bg-[var(--bg)] p-4">
                <dt className="eyebrow text-fg-dim">{labels.duration}</dt>
                <dd className="mt-2 font-mono text-[13px] leading-snug text-fg">{s.duration}</dd>
              </div>
            </dl>
          </div>
          <div className="col-span-4 md:col-span-3 md:col-start-10">
            <p className="eyebrow text-fg-dim">{labels.includes}</p>
            <ul className="mt-4 space-y-3">
              {s.includes.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] leading-snug text-fg">
                  <span aria-hidden className="mt-[8px] size-[5px] shrink-0 rounded-full bg-fg-dim" />
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-l border-ember pl-4">
              <p className="eyebrow text-fg-dim">{labels.exit}</p>
              <p className="mt-2 text-[15px] leading-snug text-fg">{s.exitCriteria}</p>
            </div>
          </div>
          {i < stages.length - 1 && <span className="sr-only">→</span>}
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing principles                                                  */
/* ------------------------------------------------------------------ */

export function PrinciplesGrid({ items, note }: { items: TitledText[]; note?: string }) {
  return (
    <>
      <CardGrid className="grid-cols-1 md:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="flex">
            <Card padding="lg" className="w-full">
              <span className="font-mono text-[13px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-h3 font-medium text-fg">{p.title}</h3>
              <p className="mt-4 max-w-[50ch] text-[16px] leading-relaxed text-fg-muted">{p.text}</p>
            </Card>
          </Reveal>
        ))}
      </CardGrid>
      {note && <p className="mt-6 font-mono text-[13px] text-fg-muted">{note}</p>}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Engagement models                                                   */
/* ------------------------------------------------------------------ */

export function ModelsGrid({
  items,
  bestForLabel,
}: {
  items: { icon: IconKey; name: string; bestFor: string; text: string }[];
  bestForLabel: string;
}) {
  return (
    <CardGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.06} className="flex">
          <Card className={cn("w-full", i === 0 && "bg-[color-mix(in_oklab,var(--bg),var(--ember)_6%)]")}>
            <Icon name={m.icon} size={32} accent className="text-fg" />
            <h3 className="mt-10 text-[22px] font-medium leading-tight text-fg">{m.name}</h3>
            <p className="mb-8 mt-3 text-[15px] leading-relaxed text-fg-muted">{m.text}</p>
            <div className="mt-auto border-t border-line pt-5">
              <p className="eyebrow text-fg-dim">{bestForLabel}</p>
              <p className="mt-2 text-[14px] leading-snug text-fg">{m.bestFor}</p>
            </div>
          </Card>
        </Reveal>
      ))}
    </CardGrid>
  );
}

/* ------------------------------------------------------------------ */
/* Icon item grid (team pods etc.)                                     */
/* ------------------------------------------------------------------ */

export function IconItemGrid({ items, columns = 4 }: { items: IconItem[]; columns?: 2 | 3 | 4 }) {
  const cls = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <CardGrid className={cn("grid-cols-1", cls)}>
      {items.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.06} className="flex">
          <Card className="w-full">
            <Icon name={p.icon} size={32} accent className="text-fg" />
            <h3 className="mt-10 text-[20px] font-medium leading-tight text-fg">{p.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
          </Card>
        </Reveal>
      ))}
    </CardGrid>
  );
}

/* ------------------------------------------------------------------ */
/* Sprint promise callout                                              */
/* ------------------------------------------------------------------ */

export function PromiseCallout({ label, text }: { label: string; text: string }) {
  return (
    <Reveal className="mt-16 grid grid-cols-4 items-start gap-x-[var(--gutter)] gap-y-4 border border-ember/40 p-6 md:grid-cols-12 md:p-10">
      <p className="eyebrow col-span-4 text-ember-ink md:col-span-3">{label}</p>
      <p className="col-span-4 text-[clamp(20px,2vw,28px)] font-medium leading-snug tracking-[-0.015em] text-fg md:col-span-9">{text}</p>
    </Reveal>
  );
}
