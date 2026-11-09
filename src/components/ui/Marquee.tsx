import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: ReactNode[];
  /** Seconds per full loop (default 40). */
  duration?: number;
  reverse?: boolean;
  /** Separator rendered between items (default: small ember node). */
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
  /** Fade the edges into the background. */
  fade?: boolean;
  "aria-label"?: string;
};

const defaultSep = <span aria-hidden className="mx-6 inline-block size-1 rounded-full bg-ember md:mx-10" />;

/**
 * Infinite CSS marquee / ticker. Content is duplicated once (second copy is
 * aria-hidden). Pauses on hover; stops under reduced motion (global CSS rule).
 */
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  separator = defaultSep,
  className,
  itemClassName,
  fade = true,
  ...aria
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className={cn("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          {separator}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      role="region"
      aria-label={aria["aria-label"]}
      className={cn(
        "group/marquee relative flex overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
