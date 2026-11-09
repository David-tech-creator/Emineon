import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "./fonts";

export const metadata: Metadata = { title: "404 · Emineon", robots: { index: false } };

/** Fallback 404 outside any locale (the proxy normally redirects to /{locale}/...). */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-dvh items-center bg-canvas text-fg">
        <main className="container-site">
          <p className="eyebrow text-fg-muted">[ 404 ]</p>
          <h1 className="mt-6 text-h1 font-medium">
            <span className="heading-quiet">Page not</span> found.
          </h1>
          <Link href="/" className="mt-10 inline-block text-ember-ink underline-offset-4 hover:underline">
            emineon.com →
          </Link>
        </main>
      </body>
    </html>
  );
}
