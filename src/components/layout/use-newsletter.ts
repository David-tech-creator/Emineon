"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/content/schema";

/**
 * Double opt-in newsletter sign-up, shared by the footer field and the insights band.
 * POST /api/newsletter sends a confirmation email; the link in it lands on
 * /{locale}/insights?subscribed=yes|expired|error#newsletter.
 */
export type NewsletterState = "idle" | "sending" | "sent" | "confirmed" | "invalid" | "failed" | "expired" | "rateLimited";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FROM_QUERY: Record<string, NewsletterState> = { yes: "confirmed", expired: "expired", error: "failed" };

export function useNewsletter(locale: Locale, { readConfirmation = false }: { readConfirmation?: boolean } = {}) {
  const [state, setState] = useState<NewsletterState>("idle");

  useEffect(() => {
    if (!readConfirmation) return;
    const q = new URLSearchParams(window.location.search).get("subscribed");
    const next = q ? FROM_QUERY[q] : undefined;
    if (!next) return;
    // Reflect the result of the confirmation link once, then tidy the address bar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(next);
    const url = new URL(window.location.href);
    url.searchParams.delete("subscribed");
    window.history.replaceState(null, "", url.toString());
  }, [readConfirmation]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!EMAIL_RE.test(email)) return setState("invalid");
    setState("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale, website: String(fd.get("website") ?? "") }),
      });
      setState(res.ok ? "sent" : res.status === 429 ? "rateLimited" : res.status === 400 || res.status === 422 ? "invalid" : "failed");
    } catch {
      setState("failed");
    }
  }

  const done = state === "sent" || state === "confirmed";
  return { state, onSubmit, done, busy: state === "sending" };
}
