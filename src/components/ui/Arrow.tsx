import { cn } from "@/lib/cn";

/** Minimal 1.5px square-cap arrow used by buttons and links. */
export function Arrow({ className, diagonal = false }: { className?: string; diagonal?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      className={cn("size-[0.9em] shrink-0", diagonal && "-rotate-45", className)}
    >
      <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}
