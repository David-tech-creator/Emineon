"use client";

import { Fragment, useLayoutEffect, useRef, type CSSProperties, type ElementType } from "react";
import type { Headline } from "@/content/schema";
import { cn } from "@/lib/cn";

export type HeadingSize = "hero" | "h1" | "h2" | "h3";

type HeadingProps = {
  /**
   * A plain string or a { pre, accent, post } Headline. Two-tone emphasis, one
   * grotesk: the accent (key phrase) is full fg, pre/post are fg-quiet.
   */
  title: Headline | string;
  as?: ElementType;
  size?: HeadingSize;
  /**
   * "ember" (default) = two-tone (key phrase full fg, the rest quiet grey).
   * "inherit" = one tone (no emphasis). The name is kept for API stability.
   */
  accent?: "ember" | "inherit";
  /** Masked line-by-line reveal when scrolled into view (default true). */
  reveal?: boolean;
  /** Extra delay before the first line, in ms. */
  delay?: number;
  className?: string;
  id?: string;
};

const sizeClass: Record<HeadingSize, string> = {
  hero: "text-hero font-medium",
  h1: "text-h1 font-medium",
  h2: "text-h2 font-medium",
  h3: "text-h3 font-medium",
};

const defaultTag: Record<HeadingSize, ElementType> = { hero: "h1", h1: "h1", h2: "h2", h3: "h3" };

function toText(t: Headline | string) {
  return typeof t === "string" ? t : [t.pre, t.accent, t.post ?? ""].join("").replace(/\s+/g, " ").trim();
}

/** Split a string into words while remembering whether a space followed. */
function words(s: string) {
  return s.split(/(\s+)/).filter(Boolean);
}

/**
 * Display heading with a masked, line-by-line reveal. Lines are measured after
 * layout (words sharing an offsetTop share a line) and staggered via a CSS var.
 * Hidden state only applies with JS and without prefers-reduced-motion (see
 * globals.css [data-reveal-mask]), so SSR/no-JS/reduced-motion all show text.
 */
export function Heading({
  title,
  as,
  size = "h2",
  accent = "ember",
  reveal = true,
  delay = 0,
  className,
  id,
}: HeadingProps) {
  const Tag = as ?? defaultTag[size];
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!reveal || !root) return;
    const measure = () => {
      const masks = Array.from(root.querySelectorAll<HTMLElement>("[data-mask]"));
      let line = -1;
      let lastTop = -Infinity;
      for (const m of masks) {
        const top = m.offsetTop;
        if (top > lastTop + 2) {
          line += 1;
          lastTop = top;
        }
        (m.firstElementChild as HTMLElement | null)?.style.setProperty("--line", String(line));
      }
    };
    measure();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          root.setAttribute("data-inview", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    const ro = new ResizeObserver(() => {
      if (!root.hasAttribute("data-inview")) measure();
    });
    ro.observe(root);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, [reveal, title]);

  const segments: { text: string; accent: boolean }[] =
    typeof title === "string"
      ? [{ text: title, accent: false }]
      : [
          { text: title.pre, accent: false },
          { text: title.accent, accent: true },
          // The heading "resolves" into full tone: pre is quiet, the key
          // phrase and whatever follows it are full fg.
          { text: title.post ?? "", accent: true },
        ];

  const twoTone = accent === "ember" && typeof title !== "string";
  const renderWord = (w: string, isAccent: boolean, key: string) => {
    const inner = twoTone ? <span className={isAccent ? "text-fg" : "heading-quiet"}>{w}</span> : w;
    if (!reveal) return <Fragment key={key}>{inner}</Fragment>;
    return (
      <span key={key} data-mask className="relative inline-block overflow-hidden pr-[0.06em] -mr-[0.06em] pb-[0.12em] -mb-[0.12em] align-top">
        <span className="mask-inner inline-block">{inner}</span>
      </span>
    );
  };

  return (
    <Tag id={id} className={cn(sizeClass[size], "text-fg", className)} aria-label={reveal ? toText(title) : undefined}>
      <span
        ref={ref}
        aria-hidden={reveal || undefined}
        data-reveal-mask={reveal ? "" : undefined}
        style={{ "--delay": `${delay}ms` } as CSSProperties}
      >
        {segments.map((seg, si) =>
          words(seg.text).map((w, wi) =>
            /^\s+$/.test(w) ? <Fragment key={`${si}-${wi}`}> </Fragment> : renderWord(w, seg.accent, `${si}-${wi}`),
          ),
        )}
      </span>
    </Tag>
  );
}
