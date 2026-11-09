import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Tones (light-first). Legacy names kept so pages need no changes:
 * - "dark" (default) = paper canvas
 * - "carbon" = stone, the warm raised paper
 * - "bone" = the cool grey report-card gradient
 * - "night" = the rare dark moment (void + bone text)
 */
export type SectionTone = "dark" | "carbon" | "bone" | "night";

type SectionProps = {
  as?: ElementType;
  id?: string;
  tone?: SectionTone;
  /** Show faint 12-column lines as texture behind the content. */
  lines?: boolean;
  /** Vertical rhythm. default = 96/128px, tight = 64/96px, none = 0. */
  spacing?: "default" | "tight" | "none";
  /** Wrap children in <Container>. Default true. */
  contained?: boolean;
  /** Hairline at the top edge. */
  divider?: boolean;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

const toneClass: Record<SectionTone, string> = {
  dark: "bg-canvas text-fg",
  carbon: "tone-stone",
  bone: "tone-bone",
  night: "tone-night",
};

const spacingClass = {
  default: "py-24 md:py-32",
  tight: "py-16 md:py-24",
  none: "",
} as const;

/**
 * Page section. Tones set semantic tokens (--bg, --fg, --line, ...) for
 * descendants, so components using text-fg / text-fg-muted / border-line
 * work on both dark and light sections.
 */
export function Section({
  as: Tag = "section",
  id,
  tone = "dark",
  lines = false,
  spacing = "default",
  contained = true,
  divider = false,
  className,
  containerClassName,
  children,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={cn("relative isolate", toneClass[tone], spacingClass[spacing], divider && "hairline-t", className)}
      {...aria}
    >
      {lines && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="container-site h-full">
            <div className="grid-lines h-full border-r border-line" />
          </div>
        </div>
      )}
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </Tag>
  );
}
