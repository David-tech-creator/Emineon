import { notFound } from "next/navigation";

/** Any unknown path under a locale renders the localized [locale]/not-found.tsx (with nav + footer). */
export const dynamic = "force-dynamic";

export default function CatchAll() {
  notFound();
}
