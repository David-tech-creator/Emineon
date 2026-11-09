import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static marketing site: every route x locale is generated at build time.
  // cacheComponents is intentionally OFF (it would make data dynamic-by-default and
  // keep previous routes mounted via <Activity>, which fights menus/overlays).
  reactStrictMode: true,
  poweredByHeader: false,
  // The dev badge sat bottom-left, right under hero media, and read as a stray dot in review screenshots.
  devIndicators: false,

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
