"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { type MotionValue } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { images } from "@/lib/media";
import { detectTier, type RenderTier } from "./quality";
import type { OakQuality } from "./oak";
import { usePageVisible, usePointer, useScrollProgress } from "./hooks";
import { CanvasBoundary } from "./CanvasBoundary";

const OakGraphCanvas = dynamic(() => import("./OakGraphCanvas"), { ssr: false });

export interface OakGraphHeroProps {
  /**
   * Scroll progress 0..1 (camera rises roots -> canopy, tree dissolves into a
   * constellation). A number or a motion `MotionValue` (read per frame, no
   * re-renders). Omit to use the built-in hook: progress = how far this
   * element has scrolled past the top of the viewport.
   */
  progress?: number | MotionValue<number>;
  /** "right" shifts the tree right on wide screens to leave room for a headline. */
  align?: "center" | "right";
  /** Darken the left/bottom edge behind headline copy (default true). */
  scrim?: boolean;
  /** Force a quality tier (skips detection; also forces WebGL on software GPUs). */
  quality?: OakQuality;
  seed?: number;
  /** Lab only: console fps log + window.__oakGraph. */
  debug?: boolean;
  className?: string;
}

/**
 * "The Oak Graph": the home hero's living 3D oak. Fills its positioned parent
 * (absolute inset-0) and is decorative (aria-hidden). Server-renders an empty
 * grainy-gradient layer (CSS); the canvas loads lazily after hydration and
 * fades in, so the headline stays the LCP element. Reduced motion, no or
 * software-only WebGL -> a static dot render of the oak on the same gradient.
 */
export function OakGraphHero({ progress, align = "right", scrim = true, quality, seed, debug, className }: OakGraphHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const [tier, setTier] = useState<RenderTier | null>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const pageVisible = usePageVisible();
  const internal = useScrollProgress(rootRef, progress === undefined);
  const pointerRef = usePointer();

  // external progress (number or MotionValue) -> ref read per frame
  const progressRef = useRef(0);
  useEffect(() => {
    if (progress === undefined) return;
    if (typeof progress === "number") {
      progressRef.current = progress;
      return;
    }
    progressRef.current = progress.get();
    return progress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [progress]);
  const activeProgress = progress === undefined ? internal : progressRef;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only capability probe
    setTier(quality ?? detectTier());
  }, [quality]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "80px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [failed, setFailed] = useState(false);
  // Reduced motion, no WebGL or a failed context: a static dot render of the
  // oak (bone dots on the same grainy gradient), no video.
  const fallback = reduce || tier === "none" || failed;
  const poster = images["hero-oak-panel"];

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn("panel-gradient pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Static CSS grainy gradient: visible before the canvas fades in, and the
          backdrop of the static fallback (reduced motion / no WebGL). */}
      <div className="panel-grain absolute inset-0" />
      {fallback ? (
        <Image
          src={poster.src}
          alt=""
          fill
          sizes="100vw"
          className={cn("object-cover", align === "right" ? "object-[72%_50%] md:object-right" : "object-center")}
        />
      ) : tier ? (
        <div
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <CanvasBoundary fallback={null} onError={() => setFailed(true)}>
          <OakGraphCanvas
            quality={tier as OakQuality}
            progressRef={activeProgress}
            pointerRef={pointerRef}
            active={inView && pageVisible}
            align={align}
            seed={seed}
            debug={debug}
            onReady={() => setReady(true)}
          />
          </CanvasBoundary>
        </div>
      ) : null}
      {scrim && (
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,11,13,.62),rgba(10,11,13,0)_30%),linear-gradient(to_right,rgba(10,11,13,.58),rgba(10,11,13,.22)_45%,rgba(10,11,13,0)_68%)] max-md:bg-[linear-gradient(to_top,rgba(10,11,13,.88),rgba(10,11,13,.6)_45%,rgba(10,11,13,.15)_60%,rgba(10,11,13,0)_70%)]" />
      )}
    </div>
  );
}

export default OakGraphHero;
