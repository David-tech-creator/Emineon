import type { HomeDict } from "@/content/schema";
import { Counter, Eyebrow, Heading, Reveal } from "@/components/ui";

/** The gap: decided to use AI, no path to make it real. Text + an "ordinary Tuesday" queue mock + one verified stat. */
export function GapSection({ gap }: { gap: HomeDict["gap"] }) {
  return (
    <section aria-labelledby="home-gap-title" className="relative isolate bg-canvas py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-site h-full">
          <div className="grid-lines h-full border-r border-line opacity-60" />
        </div>
      </div>
      <div className="container-site grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-7">
          <Eyebrow>{gap.eyebrow}</Eyebrow>
          <Heading id="home-gap-title" title={gap.title} className="mt-6 max-w-[17ch]" />
          <div className="mt-10 max-w-[60ch] space-y-5 md:mt-14">
            {gap.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === gap.paragraphs.length - 1 ? "text-lead text-fg" : "text-fg-muted"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8 md:col-span-5 md:col-start-8 md:pt-16">
          {/* Queue mock: work that waits */}
          <Reveal className="border border-line-strong bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-mono text-[12px] tracking-[0.08em] text-fg">{gap.mock.title}</p>
              <span className="inline-flex items-center gap-2 rounded-[2px] border border-line-strong px-2 py-1 font-mono text-[10.5px] tracking-[0.12em] text-fg-muted uppercase">
                <span aria-hidden className="size-1.5 rounded-full border border-fg-dim" />
                {gap.mock.status}
              </span>
            </div>
            <ul className="divide-y divide-line">
              {gap.mock.items.map((it, i) => (
                <li key={it.task} className="grid grid-cols-[auto_1fr] gap-x-4 px-5 py-4">
                  <span aria-hidden className="mt-1.5 font-mono text-[11px] text-fg-dim tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[15px] leading-snug text-fg">{it.task}</p>
                    <p className="mt-1 font-mono text-[11.5px] tracking-[0.04em] text-fg-dim">
                      <span aria-hidden className="mr-2 inline-block h-px w-3 translate-y-[-3px] bg-fg-dim" />
                      {it.state}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div aria-hidden className="h-1 w-full bg-[repeating-linear-gradient(90deg,var(--line-strong)_0_6px,transparent_6px_12px)]" />
          </Reveal>

          {/* Verified stat */}
          <Reveal delay={0.1} className="border-t border-line pt-6">
            <p className="text-[clamp(40px,5vw,68px)] leading-none font-medium tracking-[-0.04em] text-fg">
              <Counter value={gap.stat.value} />
            </p>
            <p className="mt-4 max-w-[40ch] text-[15px] leading-snug text-fg-muted">{gap.stat.label}</p>
            {gap.stat.source && (
              <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-fg-dim uppercase">{gap.stat.source}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
