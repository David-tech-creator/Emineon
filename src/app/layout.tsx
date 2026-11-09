import "./globals.css";
import type { ReactNode } from "react";

/**
 * Pass-through root layout. The real document (<html lang>, <body>) lives in
 * src/app/[locale]/layout.tsx so the lang attribute matches the route locale.
 * src/app/not-found.tsx renders its own document for non-locale 404s.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
