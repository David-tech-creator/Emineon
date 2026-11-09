"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/content/schema";
import { LOCALE_COOKIE, locales, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/cn";

type LocaleSwitcherProps = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
  short: Record<Locale, string>;
  className?: string;
};

/**
 * EN / FR / DE switcher that keeps the current path. Uses plain anchors because
 * [locale] is the root layout (switching re-renders the whole document anyway).
 */
export function LocaleSwitcher({ current, label, names, short, className }: LocaleSwitcherProps) {
  const pathname = usePathname() || `/${current}`;
  return (
    <nav aria-label={label} className={cn("flex items-center font-mono text-[11.5px] tracking-[0.14em] uppercase", className)}>
      {locales.map((l, i) => {
        const active = l === current;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span aria-hidden className="mx-1.5 text-fg-dim">/</span>}
            <a
              href={switchLocalePath(pathname, l)}
              hrefLang={l}
              lang={l}
              aria-current={active ? "true" : undefined}
              aria-label={`${short[l]} · ${names[l]}`}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              }}
              className={cn(
                "py-1 transition-colors duration-200",
                active ? "text-fg" : "text-fg-dim hover:text-fg",
              )}
            >
              {short[l]}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
