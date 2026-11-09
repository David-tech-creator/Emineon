import type { ReactNode } from "react";
import { Eyebrow, Reveal, Section } from "@/components/ui";

/** Editorial narrative block: sticky mono label left, prose right. */
export function NarrativeSection({ id, index, label, children, aside }: { id: string; index: string; label: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <Section id={id} divider spacing="tight" className="scroll-mt-[calc(var(--nav-h)+64px)]">
      <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-12">
        <div className="col-span-4 md:col-span-3">
          <div className="md:sticky md:top-[calc(var(--nav-h)+84px)]">
            <Reveal y={8}>
              <Eyebrow index={index} as="h2">
                {label}
              </Eyebrow>
            </Reveal>
            {aside && <div className="mt-8 hidden md:block">{aside}</div>}
          </div>
        </div>
        <div className="col-span-4 md:col-span-8 md:col-start-5">{children}</div>
      </div>
    </Section>
  );
}

/** First paragraph large, the rest body-sized. */
export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex max-w-[64ch] flex-col gap-6">
      {items.map((p, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <p className={i === 0 ? "text-lead text-fg" : "text-fg-muted"}>{p}</p>
        </Reveal>
      ))}
    </div>
  );
}
