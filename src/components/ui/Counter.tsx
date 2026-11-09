"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/cn";

type CounterProps = {
  /** A display value like "130+", "200+", "-38%", "CHF 2.4M", "30 days". The first number animates. */
  value: string;
  duration?: number;
  className?: string;
};

function parse(value: string) {
  const m = value.match(/-?\d[\d'’,]*(?:\.\d+)?/);
  if (!m || m.index === undefined) return null;
  const raw = m[0];
  const sep = raw.match(/['’,]/)?.[0] ?? "";
  const num = Number(raw.replace(/['’,]/g, ""));
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: value.slice(0, m.index), suffix: value.slice(m.index + raw.length), num, decimals, sep };
}

function format(n: number, decimals: number, sep: string) {
  const fixed = n.toFixed(decimals);
  if (!sep) return fixed;
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return dec ? `${grouped}.${dec}` : grouped;
}

/**
 * Animated number. SSR renders the final value (SEO, no-JS); on mount it counts
 * up from 0 once in view. Reduced motion shows the final value.
 */
export function Counter({ value, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const out = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const el = out.current;
    const parsed = parse(value);
    if (!el || !parsed || reduce || started.current) return;
    const render = (v: number) => {
      el.textContent = `${parsed.prefix}${format(v, parsed.decimals, parsed.sep)}${parsed.suffix}`;
    };
    if (!inView) {
      render(0);
      return;
    }
    started.current = true;
    const controls = animate(0, parsed.num, { duration, ease: EASE_OUT_EXPO, onUpdate: render });
    return () => {
      // Interrupted (e.g. StrictMode re-run): allow a restart and never leave a partial number.
      controls.stop();
      started.current = false;
      render(parsed.num);
    };
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      <span ref={out} aria-hidden>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
