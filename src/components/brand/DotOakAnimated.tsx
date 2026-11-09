"use client";

import { useEffect, useRef, useState, type CSSProperties, type SVGProps } from "react";
import { DOT_OAK } from "./paths";
import styles from "./DotOakAnimated.module.css";

export interface DotOakAnimatedProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Accessible name. Decorative by default. */
  title?: string;
  heartColor?: string;
  /**
   * once (default): scattered noise resolves into the tree the first time it scrolls into view.
   * loop: resolve, hold, dissolve, repeat (loader).
   */
  mode?: "once" | "loop";
}

type Phase = "rest" | "idle" | "play";

/**
 * Dot Oak in motion: a field of loose dots resolves, trunk first, into the oak, then the
 * ember heart lights. Renders the finished tree on the server and without JS; under
 * prefers-reduced-motion it never moves.
 */
export function DotOakAnimated({ title, heartColor = "var(--ember, #FF5B1F)", mode = "once", className, ...rest }: DotOakAnimatedProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<Phase>("rest");

  useEffect(() => {
    const el = ref.current;
    if (!el || mode === "loop") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- scatter once on mount, before first paint of the motion
    setPhase("idle");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => setPhase("play"))));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  const cls = [styles.root, mode === "loop" ? styles.loop : "", className].filter(Boolean).join(" ");

  return (
    <svg ref={ref} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" focusable="false" overflow="visible" data-phase={phase} className={cls} {...a11y} {...rest}>
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">
        {DOT_OAK.map(([x, y, r, kind, dx, dy, delay], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            className={kind === 0 ? styles.noise : kind === 2 ? styles.heart : styles.dot}
            fill={kind === 2 ? heartColor : undefined}
            style={{ "--dx": dx, "--dy": dy, "--d": delay } as CSSProperties}
          />
        ))}
      </g>
      {DOT_OAK.filter((c) => c[3] === 2).map(([x, y, r]) => (
        <circle key="halo" cx={x} cy={y} r={r * 2.4} fill={heartColor} className={styles.halo} />
      ))}
    </svg>
  );
}
