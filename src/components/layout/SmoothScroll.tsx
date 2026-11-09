"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance (null when disabled: reduced motion, touch-only, SSR). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scroll for the whole document. Disabled under prefers-reduced-motion.
 * Exposes the instance via useLenis() (e.g. lenis.stop() while a menu is open).
 * Add data-lenis-prevent to scrollable overlays.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -88 },
      autoRaf: true,
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);
    const onChange = () => {
      if (mq.matches) instance.destroy();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Reset to top on route change (Next's own scroll restoration fights Lenis' virtual scroll).
  useEffect(() => {
    if (lenis && !window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
