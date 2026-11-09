import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  /** Render as a 12-column grid with site gutters. */
  grid?: boolean;
};

/** Max-width 1440, side gutters 20/32. Optional 12-col grid. */
export function Container({ as: Tag = "div", className, children, grid }: ContainerProps) {
  return (
    <Tag className={cn("container-site", grid && "grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-8", className)}>
      {children}
    </Tag>
  );
}

/** Standalone 12-col grid (4 on mobile). Children use col-span-* utilities. */
export function Grid({ as: Tag = "div", className, children }: Omit<ContainerProps, "grid">) {
  return <Tag className={cn("grid grid-cols-4 gap-x-5 md:grid-cols-12 md:gap-x-8", className)}>{children}</Tag>;
}
