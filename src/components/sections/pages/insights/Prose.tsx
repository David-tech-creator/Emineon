import type { ReactNode } from "react";
import type { Block } from "@/content";
import { cn } from "@/lib/cn";
import { parseInline, type Inline } from "@/lib/markdown";
import { headingIds } from "./blocks";

/** Inline Markdown (bold, italic, code, links) as React nodes. Text is escaped by React. */
function renderInline(nodes: Inline[]): ReactNode[] {
  return nodes.map((n, i) => {
    switch (n.t) {
      case "text":
        return n.v;
      case "code":
        return (
          <code key={i} className="rounded-[2px] bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
            {n.v}
          </code>
        );
      case "strong":
        return (
          <strong key={i} className="font-medium text-fg">
            {renderInline(n.c)}
          </strong>
        );
      case "em":
        return <em key={i}>{renderInline(n.c)}</em>;
      case "link": {
        const external = /^https?:\/\//i.test(n.href);
        return (
          <a
            key={i}
            href={n.href}
            className="text-fg underline decoration-line-strong underline-offset-[3px] transition-colors hover:text-ember-ink hover:decoration-ember"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {renderInline(n.c)}
          </a>
        );
      }
    }
  });
}

const Rich = ({ text }: { text: string }) => <>{renderInline(parseInline(text))}</>;

type ProseProps = {
  blocks: Block[];
  /** Larger first paragraph with an ember drop-rule (articles). */
  lede?: boolean;
  className?: string;
};

/**
 * Long-form typography for Block[] content (insights, legal). Measure ~68ch,
 * generous rhythm, mono-numbered lists, serif-italic pull quotes with an ember rule.
 * h2s get stable ids for the table of contents.
 */
export function Prose({ blocks, lede = false, className }: ProseProps) {
  const ids = headingIds(blocks);
  const firstP = blocks.findIndex((b) => b.type === "p");
  return (
    <div className={cn("max-w-[68ch] text-[17px] leading-[1.75] text-fg-muted md:text-[18px]", className)}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p": {
            const isLede = lede && i === firstP;
            return (
              <p key={i} className={cn("mt-6 first:mt-0", isLede && "text-[20px] leading-[1.6] text-fg md:text-[23px]")}>
                <Rich text={b.text} />
              </p>
            );
          }
          case "h2":
            return (
              <h2
                key={i}
                id={ids.get(i)}
                className="mt-16 scroll-mt-[calc(var(--nav-h)+32px)] border-t border-line pt-8 text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-balance text-fg first:mt-0 md:text-[32px]"
              >
                <Rich text={b.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-10 text-[20px] font-medium leading-snug tracking-[-0.01em] text-fg md:text-[22px]">
                <Rich text={b.text} />
              </h3>
            );
          case "quote":
            return (
              <figure key={i} className="my-12 border-l border-ember pl-6 md:-ml-6 md:pl-10">
                <blockquote className="text-[28px] font-medium leading-[1.15] tracking-[-0.025em] text-fg md:text-[36px]">
                  <Rich text={b.text} />
                </blockquote>
                {b.cite && <figcaption className="eyebrow mt-5 text-fg-dim">{b.cite}</figcaption>}
              </figure>
            );
          case "code":
            return (
              <pre key={i} className="mt-8 overflow-x-auto border border-line bg-surface p-5 font-mono text-[14px] leading-relaxed text-fg">
                <code>{b.text}</code>
              </pre>
            );
          case "list": {
            const Tag = b.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className="mt-8 border-t border-line">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-5 border-b border-line py-4">
                    <span aria-hidden className="mt-[0.35em] shrink-0 font-mono text-[12px] leading-none text-fg-dim tabular">
                      {b.ordered ? String(j + 1).padStart(2, "0") : "—"}
                    </span>
                    <span className="text-fg">
                      <Rich text={it} />
                    </span>
                  </li>
                ))}
              </Tag>
            );
          }
        }
      })}
    </div>
  );
}
