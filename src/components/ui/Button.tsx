"use client";

import Link from "next/link";
import { useRef, type ComponentPropsWithoutRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { isExternalHref } from "@/lib/i18n";
import { Arrow } from "./Arrow";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "ink";

type BaseProps = {
  variant?: ButtonVariant;
  size?: "md" | "lg";
  /** Show the arrow (default: true for ghost, false otherwise). */
  arrow?: boolean;
  /** Magnetic pull towards the cursor (default: true for primary). */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps & {
  /** Already-localized href (use localizedHref). External/mailto links open as <a>. */
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
};

type NativeButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-[color,background-color,border-color,box-shadow] duration-200 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-[2px] bg-ember text-ink hover:bg-[#ff6d36] hover:shadow-[0_10px_30px_-12px_var(--ember-glow)] active:bg-ember-deep active:text-paper",
  secondary:
    "rounded-[2px] border border-line-strong text-fg hover:border-fg/60 hover:bg-fg/[0.04]",
  ghost: "text-fg hover:text-ember-ink",
  ink: "rounded-[2px] bg-fg text-[var(--bg)] hover:bg-ember hover:text-ink",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
} as const;

/**
 * Button / link-button.
 * - primary: ember fill, magnetic.
 * - secondary: hairline outline.
 * - ghost: text link with sliding arrow, underline draws in.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", arrow, magnetic, className, children } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const isMagnetic = (magnetic ?? variant === "primary") && !reduce;
  const showArrow = arrow ?? variant === "ghost";

  const onMove = (e: MouseEvent) => {
    if (!isMagnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <>
      <span className={cn("relative", variant === "ghost" && "pb-0.5")}>
        {children}
        {variant === "ghost" && (
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:scale-x-100"
          />
        )}
      </span>
      {showArrow && (
        <Arrow className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
      )}
    </>
  );

  const cls = cn(base, variants[variant], variant !== "ghost" && sizes[size], variant === "ghost" && "text-[15px]", className);

  let el: ReactNode;
  if (props.href !== undefined) {
    const { href, target, rel, onClick } = props;
    const external = isExternalHref(href) && !href.startsWith("#");
    el = external ? (
      <a href={href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} onClick={onClick} aria-label={props["aria-label"]} className={cls}>
        {content}
      </a>
    ) : (
      <Link href={href} target={target} rel={rel} onClick={onClick} aria-label={props["aria-label"]} className={cls}>
        {content}
      </Link>
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, arrow: _a, magnetic: _m, className: _c, children: _ch, href: _h, ...rest } = props;
    el = (
      <button type="button" {...rest} className={cls}>
        {content}
      </button>
    );
  }

  // Magnetic buttons keep the same wrapper on server and client: the server cannot
  // know prefers-reduced-motion, so dropping the span under reduced motion caused
  // hydration error #418. onMove already no-ops when the effect is off.
  if (!(magnetic ?? variant === "primary")) return el;

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-flex"
    >
      {el}
    </motion.span>
  );
}
