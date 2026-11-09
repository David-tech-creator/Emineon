import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static marketing site: every route x locale is generated at build time.
  // cacheComponents is intentionally OFF (it would make data dynamic-by-default and
  // keep previous routes mounted via <Activity>, which fights menus/overlays).
  reactStrictMode: true,
  poweredByHeader: false,
  // The dev badge sat bottom-left, right under hero media, and read as a stray dot in review screenshots.
  devIndicators: false,

  // Old emineon.com URLs (SaaS + talent site, retired Nov 2026) -> nearest new page, permanently.
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      r("/blog", "/en/insights"),
      r("/blog/:path*", "/en/insights"),
      r("/fr/blog", "/fr/insights"),
      r("/fr/blog/:path*", "/fr/insights"),
      r("/de/blog", "/de/insights"),
      r("/de/blog/:path*", "/de/insights"),
      r("/product", "/en/services"),
      r("/product/:path*", "/en/services"),
      r("/fr/product", "/fr/services"),
      r("/fr/product/:path*", "/fr/services"),
      r("/find-talent", "/en/contact"),
      r("/find-talent/:path*", "/en/contact"),
      r("/fr/find-talent", "/fr/contact"),
      r("/fr/find-talent/:path*", "/fr/contact"),
      r("/ch", "/en/ai-consulting-switzerland"),
      r("/ch/:path*", "/en/ai-consulting-switzerland"),
      r("/be", "/en"),
      r("/be/:path*", "/en"),
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      // Tailwind for global CSS only. CSS modules must keep their default
      // css-module pipeline, otherwise `styles.x` resolves to undefined.
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        condition: { not: { path: /\.module\.css$/ } },
      },
    },
  },
};

export default nextConfig;
