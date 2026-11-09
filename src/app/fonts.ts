import { Geist, Geist_Mono } from "next/font/google";

export const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const fontVariables = `${geist.variable} ${geistMono.variable}`;
