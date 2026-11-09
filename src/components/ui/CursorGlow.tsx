"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type CursorGlowProps = {
  /** Glow diameter in px (default 640). */
  size?: number;
  /** 0–1 strength (default 0.5). */
  intensity?: number;
  className?: string;
};

/**
 * Ember radial glow that follows the pointer inside its positioned parent.
 * Place as the first child of a `relative overflow-hidden` hero/CTA section.
 * Disabled on touch (coarse pointer) and with reduced motion.
 */
export function CursorGlow({ size = 640, intensity = 0.5, className }: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    let raf = 0;
    let tx = 0.5;
    let ty = 0.35;
    let cx = tx;
    let cy = ty;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--gx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--gy", `${(cy * 100).toFixed(2)}%`);
      if (Math.abs(tx - cx) > 0.0005 || Math.abs(ty - cy) > 0.0005) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      if (!active) {
        active = true;
        el.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      active = false;
      el.style.opacity = "0";
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700", className)}
      style={{
        background: `radial-gradient(${size}px circle at var(--gx, 50%) var(--gy, 35%), rgba(255,91,31,${0.35 * intensity}), rgba(255,91,31,${0.08 * intensity}) 40%, transparent 70%)`,
      }}
    />
  );
}
