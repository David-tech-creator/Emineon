import { Logo } from "@/components/brand";
import { cn } from "@/lib/cn";

/**
 * Nav/Footer lockup: the 08 wordmark "emineon" (ink via currentColor, ember node on the i).
 * ~22px tall from node to baseline; nudged up so the x-height band, not the node, centres on the nav row.
 */
export function BrandMark({ className }: { className?: string }) {
  return <Logo className={cn("block h-[21px] w-auto -translate-y-[2px] text-fg md:h-[22px]", className)} />;
}
