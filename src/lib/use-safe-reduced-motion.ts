"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * prefers-reduced-motion that is `false` until after hydration. Use it wherever
 * the value changes the rendered *structure*: the server cannot know the
 * preference, and a different tree on the first client render throws React
 * hydration error #418 for reduced-motion users.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setHydrated(true), []);
  return hydrated && !!reduce;
}
