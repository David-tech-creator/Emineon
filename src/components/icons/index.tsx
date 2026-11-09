import type { SVGProps } from "react";
import { ICONS, ICON_KEYS, type IconKey } from "./data";

export { ICONS, ICON_KEYS };
export type { IconKey };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children" | "name"> {
  /** Rendered width and height in px (or any CSS length). Default 24. */
  size?: number | string;
  /** Stroke width on the 24px grid. Default 1.5. */
  strokeWidth?: number;
  /** Accessible label. Without it the icon is decorative (aria-hidden). */
  title?: string;
  /** Light the nodes in ember (var(--ember)) instead of currentColor. */
  accent?: boolean;
}

function IconSvg({ name, size = 24, strokeWidth = 1.5, title, accent = false, ...rest }: IconProps & { name: IconKey }) {
  const def = ICONS[name];
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      data-icon={name}
      focusable="false"
      {...a11y}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter" strokeMiterlimit={10}>
        {def.strokes.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill={accent ? "var(--ember, #FF5B1F)" : "currentColor"}>
        {def.nodes.map(([cx, cy, r = 1.5], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </svg>
  );
}

/** Map component: <Icon name="agents" size={20} accent /> */
export function Icon(props: IconProps & { name: IconKey }) {
  return <IconSvg {...props} />;
}

function createIcon(name: IconKey, displayName: string) {
  const C = (props: IconProps) => <IconSvg {...props} name={name} />;
  C.displayName = displayName;
  return C;
}

export const StrategyIcon = createIcon("strategy", "StrategyIcon");
export const AgentsIcon = createIcon("agents", "AgentsIcon");
export const PlatformIcon = createIcon("platform", "PlatformIcon");
export const OperationsIcon = createIcon("operations", "OperationsIcon");
export const AdoptionIcon = createIcon("adoption", "AdoptionIcon");
export const TradingIcon = createIcon("trading", "TradingIcon");
export const BankingIcon = createIcon("banking", "BankingIcon");
export const IntlOrgsIcon = createIcon("intl-orgs", "IntlOrgsIcon");
export const LifeSciencesIcon = createIcon("life-sciences", "LifeSciencesIcon");
export const FragranceIcon = createIcon("fragrance", "FragranceIcon");
export const ManufacturingIcon = createIcon("manufacturing", "ManufacturingIcon");
export const TrustIcon = createIcon("trust", "TrustIcon");
export const ResidencyIcon = createIcon("residency", "ResidencyIcon");
export const FdeIcon = createIcon("fde", "FdeIcon");
export const SprintIcon = createIcon("sprint", "SprintIcon");
export const EvalsIcon = createIcon("evals", "EvalsIcon");
export const OutcomeIcon = createIcon("outcome", "OutcomeIcon");
export const GlobeIcon = createIcon("globe", "GlobeIcon");
export const RootsIcon = createIcon("roots", "RootsIcon");
export const BranchIcon = createIcon("branch", "BranchIcon");
export const ShieldIcon = createIcon("shield", "ShieldIcon");
export const SparkIcon = createIcon("spark", "SparkIcon");
export const ArrowRightIcon = createIcon("arrow-right", "ArrowRightIcon");
export const ArrowUpRightIcon = createIcon("arrow-up-right", "ArrowUpRightIcon");

/** Convenience lookups for content-driven pages (slugs from BRIEF §3). */
export const SERVICE_ICONS: Record<string, IconKey> = {
  "ai-strategy": "strategy",
  "agentic-systems": "agents",
  "data-ai-platforms": "platform",
  "ai-operations": "operations",
  "adoption-enablement": "adoption",
};

export const INDUSTRY_ICONS: Record<string, IconKey> = {
  "commodities-trading": "trading",
  "banking-wealth": "banking",
  "international-organisations": "intl-orgs",
  "life-sciences": "life-sciences",
  "fragrance-flavour-chemicals": "fragrance",
  "industry-manufacturing": "manufacturing",
};
