/**
 * Locale routing (Next 16 "proxy", formerly middleware.ts).
 * - Paths that already carry a locale pass through (and refresh the NEXT_LOCALE cookie).
 * - Locale-less paths ("/", "/services/x") redirect to the best locale:
 *   NEXT_LOCALE cookie > Accept-Language > default (en).
 */
import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, isLocale, matchAcceptLanguage } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (isLocale(first)) {
    const res = NextResponse.next();
    if (request.cookies.get(LOCALE_COOKIE)?.value !== first) {
      res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return res;
  }

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookie) ? cookie : matchAcceptLanguage(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, metadata files and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|media|brand|.*\\..*).*)"],
};
