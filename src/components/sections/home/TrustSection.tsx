import type { HomeDict } from "@/content/schema";
import { Icon } from "@/components/icons";
import { Eyebrow, Heading, Reveal } from "@/components/ui";

/** Your data / trust: residency, nFADP/FINMA/GDPR, EU AI Act, model-agnostic. */
export function TrustSection({ trust }: { trust: HomeDict["trust"] }) {
  return (
    <section aria-labelledby="home-trust-title" className="tone-stone relative isolate overflow-hidden py-24 md:py-32">
      {/* Faint concentric rings: a perimeter around the data */}
      <div aria-hidden className="pointer-events-none absolute top-1/2 -left-[20%] -z-10 hidden aspect-square w-[70%] -translate-y-1/2 lg:block">
        {[1, 0.78, 0.56, 0.34].map((s) => (
          <span
            key={s}
            className="absolute inset-0 m-auto rounded-full border border-line"
            style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          />
        ))}
      </div>

      <div className="container-site grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
            <Eyebrow>{trust.eyebrow}</Eyebrow>
            <Heading id="home-trust-title" title={trust.title} className="mt-6 max-w-[12ch]" />
            {trust.lead && (
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-lead text-fg-muted">{trust.lead}</p>
              </Reveal>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
            {trust.pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 0.07} className="group flex flex-col bg-canvas p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center border border-line-strong text-fg">
                    <Icon name={p.icon} size={24} accent />
                  </span>
                  <span className="font-mono text-[11px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-10 text-[21px] leading-tight font-medium tracking-[-0.015em] text-fg">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{p.text}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-6 flex gap-3 border-l border-ember/60 pl-4 font-mono text-[12px] leading-relaxed tracking-[0.02em] text-fg-muted">
              {trust.footnote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
