"use client";

import { Component, type ReactNode } from "react";
import { OakGraphHero } from "@/components/three";
import Image from "next/image";
import { images } from "@/lib/media";

/** Static dot render of the oak on the grainy gradient (no video). */
function StaticFallback() {
  const img = images["hero-oak-panel"];
  return (
    <div className="panel-gradient absolute inset-0">
      <Image src={img.src} alt="" fill sizes="100vw" className="object-cover object-[72%_50%] md:object-right" />
    </div>
  );
}

/** If WebGL context creation throws (blocked GPU, lost context), show the static render instead of breaking the hero. */
class HeroBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticFallback /> : this.props.children;
  }
}

/**
 * Hero background: the 3D Oak Graph (hero3d). OakGraphHero lazy-loads its WebGL
 * canvas after hydration (headline stays LCP) and falls back to a static dot
 * render on the CSS grainy gradient (no/software WebGL, reduced motion) by itself.
 * Progress comes from its internal scroll hook (camera rises as the hero scrolls away).
 */
export function HeroVisual({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 -z-20" role="img" aria-label={label}>
      <HeroBoundary>
        <OakGraphHero align="right" />
      </HeroBoundary>
    </div>
  );
}
