"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Scroll progress of an element through the top of the viewport, in a ref
 * (no re-renders): 0 while its top is at/below the viewport top, 1 once it has
 * scrolled up by its own height. Works with Lenis (it drives native scroll).
 */
export function useScrollProgress(target: RefObject<HTMLElement | null>, enabled = true) {
  const ref = useRef(0);
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = Math.max(1, r.height);
      ref.current = Math.min(1, Math.max(0, -r.top / h));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, enabled]);
  return ref;
}

/** Window pointer position normalised to -1..1 (y up), in a ref. Fine pointers only. */
export function usePointer() {
  const ref = useRef<[number, number]>([0, 0]);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      ref.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current[1] = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      ref.current[0] = 0;
      ref.current[1] = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

/** false while the tab is hidden. */
export function usePageVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const on = () => setVisible(document.visibilityState !== "hidden");
    on();
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

/** true while the element is within (or near) the viewport. */
export function useInView(target: RefObject<Element | null>, rootMargin = "80px 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [target, rootMargin]);
  return inView;
}
