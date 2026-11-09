import type { HomeDict } from "@/content/schema";
import { Counter, Eyebrow, Reveal } from "@/components/ui";

/** Network stats with counters, in a hairline grid directly under the hero. */
export function ProofStrip({ proof }: { proof: HomeDict["proof"] }) {
  return (
    <section aria-label={proof.eyebrow.replace(/[[\]]/g, "").trim()} className="relative bg-canvas pt-14 pb-8 md:pt-20 md:pb-12">
      <div className="container-site">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow>{proof.eyebrow}</Eyebrow>
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-dim">{proof.note}</p>
        </div>
        <dl className="mt-8 grid grid-cols-2 border-t border-line md:mt-10 md:grid-cols-4">
          {proof.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.07}
              className={[
                "flex flex-col justify-between gap-6 border-b border-line py-7 md:border-b-0 md:py-10",
                i % 2 === 1 ? "pl-5 md:pl-8" : "pr-5 md:pr-8",
                i > 0 ? "md:border-l md:pl-8" : "",
                i % 2 === 1 ? "border-l" : "",
              ].join(" ")}
            >
              <dt className="order-2 max-w-[22ch] text-[15px] leading-snug text-fg-muted">{s.label}</dt>
              <dd className="order-1 text-[clamp(44px,6vw,88px)] leading-none font-medium tracking-[-0.045em] text-fg">
                <Counter value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
