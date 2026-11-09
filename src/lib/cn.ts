import { clsx, type ClassValue } from "clsx";

/** className combiner (no tailwind-merge: keep class lists intentional). */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
