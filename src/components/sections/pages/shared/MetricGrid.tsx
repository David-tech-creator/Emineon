import { cn } from "@/lib/cn";
import { Counter, Reveal } from "@/components/ui";

type MetricGridProps = {
  items: { value: string; label: string; source?: string }[];
  /** Optional mono footnote under the grid (e.g. "Representative ranges"). */
  note?: string;
  /** Desktop columns (default: items.length, max 4). */
  columns?: 2 | 3 | 4;
  className?: string;
};

const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" } as const;

/** Big display numbers (Geist, tabular) in a bordered grid with animated counters. Works on dark and bone sections. */
export function MetricGrid({ items, note, columns, className }: MetricGridProps) {
  const cols = columns ?? (Math.min(Math.max(items.length, 2), 4) as 2 | 3 | 4);
  return (
    <div className={className}>
      <dl className={cn("grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2", colClass[cols])}>
        {items.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.06} className="flex flex-col justify-between gap-6 bg-[var(--bg)] p-5 sm:gap-10 sm:p-6 md:p-8">
            <dd
              className={cn(
                "leading-none font-medium tracking-[-0.045em] text-fg tabular",
                // long values ("3 days → same day") get a smaller size so they don't wrap to 3 lines
                m.value.length > 8 ? "text-[clamp(30px,3.2vw,48px)] leading-[1.05] tracking-[-0.035em] text-balance" : "text-[clamp(40px,5vw,72px)]",
              )}
            >
              <Counter value={m.value} />
            </dd>
            <dt className="max-w-[28ch] text-[15px] leading-snug text-fg-muted">
              {m.label}
              {m.source && <span className="eyebrow mt-3 block text-fg-dim">{m.source}</span>}
            </dt>
          </Reveal>
        ))}
      </dl>
      {note && <p className="eyebrow mt-5 normal-case tracking-[0.04em] text-fg-dim">{note}</p>}
    </div>
  );
}
