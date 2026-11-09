"use client";

import { useEffect, useRef } from "react";

/**
 * Thin ember bar fixed under the nav that tracks progress through `targetId`.
 * Uses transform only (no layout), rAF-throttled. Kept under reduced motion: it is
 * informative and only moves with the user's own scrolling.
 */
export function ReadingProgress({ targetId, label }: { targetId: string; label: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || !bar.current || !wrap.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height - vh * 0.6;
      const p = total > 0 ? Math.min(1, Math.max(0, (vh * 0.4 - r.top) / total)) : 0;
      bar.current!.style.transform = `scaleX(${p})`;
      wrap.current!.setAttribute("aria-valuenow", String(Math.round(p * 100)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      ref={wrap}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      className="pointer-events-none fixed inset-x-0 top-[var(--nav-h)] z-40 h-[2px] bg-transparent"
    >
      <div ref={bar} style={{ transform: "scaleX(0)" }} className="h-full origin-left bg-ember shadow-[0_0_12px_var(--ember-glow)]" />
    </div>
  );
}
