import type { OakQuality } from "./oak";

export type RenderTier = OakQuality | "none";

export interface TierSettings {
  quality: OakQuality;
  /** [min, max] device pixel ratio for the canvas. */
  dpr: [number, number];
  bloom: boolean;
  grain: number;
}

export const TIERS: Record<OakQuality, TierSettings> = {
  high: { quality: "high", dpr: [1, 1.75], bloom: true, grain: 0.11 },
  mid: { quality: "mid", dpr: [1, 1.5], bloom: true, grain: 0.1 },
  low: { quality: "low", dpr: [1, 1.25], bloom: false, grain: 0.09 },
};

let cached: RenderTier | null = null;

/**
 * Picks a render tier from cheap signals: WebGL availability, the unmasked GPU
 * string, CPU cores, device memory, pointer type and screen size. Software
 * rasterisers (SwiftShader, llvmpipe) count as "none" so they get the video.
 * Client-only.
 */
export function detectTier(): RenderTier {
  if (cached) return cached;
  if (typeof window === "undefined") return "none";
  let gpu = "";
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return (cached = "none");
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    gpu = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)).toLowerCase();
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return (cached = "none");
  }
  if (/swiftshader|llvmpipe|software|basic render/.test(gpu)) return (cached = "none");

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency || 4;
  const mem = nav.deviceMemory ?? 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = Math.min(window.screen.width, window.screen.height) < 700;

  if (coarse || small || cores <= 4 || mem <= 4) {
    // recent phones/tablets with strong GPUs can take the mid tier
    if (/apple gpu|apple a1[5-9]|apple m\d|adreno \(tm\) (7[3-9]\d|8\d\d)/.test(gpu) && !small) return (cached = "mid");
    return (cached = "low");
  }
  if (/apple m\d|apple gpu|nvidia|geforce|rtx|radeon pro|radeon rx|arc a/.test(gpu)) return (cached = "high");
  return (cached = "mid");
}

export function lowerTier(t: OakQuality): OakQuality {
  return t === "high" ? "mid" : "low";
}
