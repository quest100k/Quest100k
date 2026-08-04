import { Press_Start_2P, Share_Tech_Mono, Inter } from "next/font/google";

import type { ThemeName } from "@/lib/themes";

/**
 * next/font/google requires literal top-level calls, so each family is
 * declared here and mapped to a theme. Every theme points its typeface at the
 * same --font-quest variable, so no component references a font by name.
 *
 * The family *names* live in lib/themes.ts (`fontFamily`) — the OG route needs
 * them too, and one map beats three.
 */

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-quest",
  display: "swap",
  preload: false,
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-quest",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-quest",
  display: "swap",
  preload: false,
});

const fontByTheme: Record<ThemeName, { variable: string }> = {
  pixelQuest: pressStart2P,
  matrix: shareTechMono,
  modern: inter,
  arcade: pressStart2P,
};

export function getFontClass(theme: ThemeName): string {
  return fontByTheme[theme].variable;
}
