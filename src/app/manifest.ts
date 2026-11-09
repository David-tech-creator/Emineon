import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emineon — AI-native consulting",
    short_name: "Emineon",
    description: "AI-native consulting from Geneva: strategy, agentic systems and production AI for regulated industries.",
    start_url: "/",
    display: "standalone",
    background_color: "#F1EEE8",
    theme_color: "#F1EEE8",
    icons: [
      // Identity 08 symbol (e + ember node) on an ink tile; the symbol sits inside the maskable safe zone.
      { src: "/brand/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
