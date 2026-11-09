import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Reveal, Hairline } from "@/components/ui";

export type TimelineStep = {
  /** Small mono label above the title, e.g. "Week 1" or "Weeks 2–4". */
  label: string;
  title: string;
  text: string;
  /** Optional list of outputs under the text. */
  outputs?: string[];
};

type PhaseTimelineProps = {
  steps: TimelineStep[];
  /** Label above the outputs list, e.g. "Outputs". */
  outputsLabel?: string;
  className?: string;
};

/**
 * Horizontal node-and-line timeline on desktop, vertical on mobile.
 * The rail echoes the oak graph: hairline + filled ember nodes.
 */
export function PhaseTimeline({ steps, outputsLabel, className }: PhaseTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* desktop rail */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[5px] hidden md:block">
        <Hairline />
      </div>
      {/* mobile rail */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-[5px] top-0 md:hidden">
        <Hairline vertical />
      </div>
      <ol
        className="relative grid grid-cols-1 gap-y-12 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] md:gap-x-[var(--gutter)]"
        style={{ "--cols": steps.length } as CSSProperties}
      >
        {steps.map((s, i) => (
          <Reveal as="li" key={`${s.label}-${i}`} delay={0.1 + i * 0.08} className="relative pl-9 md:pl-0">
            <span aria-hidden className="absolute left-0 top-0 flex size-[11px] items-center justify-center md:relative md:mb-8">
              <span
                className={
                  i === steps.length - 1
                    ? "size-[11px] rounded-full bg-ember shadow-[0_0_18px_var(--ember-glow)]"
                    : "size-[11px] rounded-full border border-fg bg-[var(--bg)]"
                }
              />
            </span>
            <p className="eyebrow text-fg-dim">
              <span className="text-fg tabular">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden> — </span>
              {s.label}
            </p>
            <h3 className="mt-4 text-h3 font-medium text-fg">{s.title}</h3>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-fg-muted">{s.text}</p>
            {s.outputs && s.outputs.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                {outputsLabel && <p className="eyebrow mb-3 text-fg-dim">{outputsLabel}</p>}
                <ul className="space-y-2">
                  {s.outputs.map((o) => (
                    <li key={o} className="flex gap-3 text-[14px] leading-snug text-fg">
                      <span aria-hidden className="mt-[7px] size-[5px] shrink-0 rounded-full bg-fg-dim" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
