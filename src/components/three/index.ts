/**
 * Three / canvas visuals. Import from "@/components/three".
 * - OakGraphHero: the home hero's 3D oak graph (lazy WebGL, with fallbacks).
 * - GraphField: cheap 2D-canvas dot field for section backgrounds.
 * The heavy WebGL module (OakGraphCanvas) is only reached through OakGraphHero's
 * next/dynamic import, so importing this barrel does not pull three.js.
 */
export { OakGraphHero, type OakGraphHeroProps } from "./OakGraphHero";
export { GraphField, type GraphFieldProps, type GraphFieldVariant } from "./GraphField";
export type { OakQuality } from "./oak";
