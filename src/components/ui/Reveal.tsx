"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "span" | "p" | "figure";

type RevealProps = {
  children?: ReactNode;
  as?: RevealTag;
  /** Seconds. Use index * 0.06 for staggered lists. */
  delay?: number;
  /** Rise distance in px (default 24). */
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

/**
 * Fade + rise on enter (motion whileInView). Reduced motion renders a static element.
 * [data-reveal] is forced visible by CSS for reduced-motion and no-JS.
 */
export function Reveal({ children, as = "div", delay = 0, y = 24, duration = 0.8, className, once = true }: RevealProps) {
  // Same element on server and client (the server cannot know the preference, so
  // branching to a plain tag here caused hydration error #418 for reduced-motion
  // users). Under reduced motion the animation is simply switched off; CSS also
  // forces [data-reveal] visible.
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      data-reveal=""
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ ...VIEWPORT_ONCE, once }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </M>
  );
}

/** A 1px hairline that draws in from the left when it enters the viewport. */
export function Hairline({ className, vertical = false, delay = 0 }: { className?: string; vertical?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  const cls = cn("bg-line-strong", vertical ? "w-px h-full origin-top" : "h-px w-full origin-left", className);
  return (
    <motion.div
      aria-hidden
      data-reveal=""
      className={cls}
      initial={reduce ? false : vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={reduce ? undefined : vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
    />
  );
}
