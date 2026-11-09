import type { SVGProps } from "react";
import { DOT_OAK } from "./paths";

export interface DotOakProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Accessible name. Decorative by default. */
  title?: string;
  /** Colour of the ember heart. Dots inherit currentColor. */
  heartColor?: string;
}

/**
 * Dot Oak (identity 04): the oak sampled on an 11 x 11 dot lattice with one ember dot at its heart.
 * Illustration and motion layer only, never the logo. Static; see <DotOakAnimated/> for the
 * resolve-from-noise motion.
 */
export function DotOak({ title, heartColor = "var(--ember, #FF5B1F)", ...rest }: DotOakProps) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" focusable="false" {...a11y} {...rest}>
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">
        {DOT_OAK.map(([x, y, r, kind], i) =>
          kind === 0 ? null : <circle key={i} cx={x} cy={y} r={r} fill={kind === 2 ? heartColor : undefined} />,
        )}
      </g>
    </svg>
  );
}
