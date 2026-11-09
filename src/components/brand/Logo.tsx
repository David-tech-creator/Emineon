import type { SVGProps } from "react";
import { SYMBOL, WORDMARK } from "./paths";

export type LogoVariant = "full" | "wordmark" | "symbol";

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /**
   * full / wordmark = "emineon" with the ember node on the i (in direction 08 the wordmark IS the lockup),
   * symbol = the e with its node (favicons, avatars, tight squares).
   */
  variant?: LogoVariant;
  /** Accessible name. Defaults to "Emineon". Pass "" to make it decorative. */
  title?: string;
  /** Node colour. Defaults to ember; pass "currentColor" for a one-colour mark. */
  nodeColor?: string;
}

const EMBER = "var(--ember, #FF5B1F)";

/**
 * Emineon logo (identity 08). Letterforms inherit currentColor, so colour it with text utilities
 * (`text-ink`, `text-paper`); the node stays ember. Size it by height with `w-auto`
 * (e.g. className="h-5 w-auto"): the aspect ratio comes from the viewBox.
 */
export function Logo({ variant = "full", title = "Emineon", nodeColor = EMBER, ...rest }: LogoProps) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  const sym = variant === "symbol";
  const { d, dot } = sym ? SYMBOL : WORDMARK;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={sym ? SYMBOL.box : `0 0 ${WORDMARK.width} ${WORDMARK.height}`}
      focusable="false"
      {...a11y}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={d} fill="currentColor" />
      <circle cx={dot.x} cy={dot.y} r={dot.r} fill={nodeColor} />
    </svg>
  );
}

/** Convenience alias for the wordmark. */
export function Wordmark(props: Omit<LogoProps, "variant">) {
  return <Logo variant="wordmark" {...props} />;
}

/** Convenience alias for the symbol (the e with its node). */
export function LogoSymbol(props: Omit<LogoProps, "variant">) {
  return <Logo variant="symbol" {...props} />;
}
