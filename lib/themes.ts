/**
 * Themes are visual only: colors, type, border treatment. They never change
 * layout or copy.
 *
 * This file is the single source of truth. The DOM gets these values as CSS
 * variables (emitted by app/layout.tsx), and the Satori-rendered OG image
 * reads them directly — Satori can't read CSS variables. Nothing else in the
 * project branches on a theme *name*: adding a theme means adding one entry
 * here plus a font in lib/fonts.ts.
 */

export type ThemeTokens = {
  bg: string;
  fg: string;
  accent: string;
  accentMuted: string;
  border: string;
  /** Bare Google font family; lib/fonts.ts and the OG route both read this. */
  fontFamily: string;
  /** Multiplier on the base type scale — pixel faces need shrinking. */
  fontScale: number;
  panelRadius: number;
  panelBorderWidth: number;
  panelBorderStyle: "solid" | "dashed";
  /** "segmented" = blocky XP cells; "continuous" = one thin pill. */
  xpStyle: "segmented" | "continuous";
  /** Decorative item-slot squares at the panel corners. */
  corners: boolean;
  backdrop: "none" | "rain";
  /** CSS text-shadow value. */
  textGlow: string;
};

export const themes = {
  pixelQuest: {
    bg: "#1b1424",
    fg: "#efe6d5",
    accent: "#f5c542",
    accentMuted: "#6b5a2e",
    border: "#8a7355",
    fontFamily: "Press Start 2P",
    fontScale: 0.75,
    panelRadius: 0,
    panelBorderWidth: 4,
    panelBorderStyle: "solid",
    xpStyle: "segmented",
    corners: true,
    backdrop: "none",
    textGlow: "none",
  },
  matrix: {
    bg: "#000000",
    fg: "#8affa0",
    accent: "#00ff6a",
    accentMuted: "#0a4021",
    border: "#127a3c",
    fontFamily: "Share Tech Mono",
    fontScale: 1,
    panelRadius: 0,
    panelBorderWidth: 1,
    panelBorderStyle: "solid",
    xpStyle: "segmented",
    corners: false,
    backdrop: "rain",
    textGlow: "0 0 6px rgba(0, 255, 106, 0.55)",
  },
  modern: {
    bg: "#fbfbfd",
    fg: "#16171a",
    accent: "#3b5bfd",
    accentMuted: "#dfe3f7",
    border: "#e2e4ec",
    fontFamily: "Inter",
    fontScale: 1,
    panelRadius: 16,
    panelBorderWidth: 1,
    panelBorderStyle: "solid",
    xpStyle: "continuous",
    corners: false,
    backdrop: "none",
    textGlow: "none",
  },
  arcade: {
    bg: "#0b0118",
    fg: "#e9d5ff",
    accent: "#ff2fd0",
    accentMuted: "#4a0f52",
    border: "#22e0ff",
    fontFamily: "Press Start 2P",
    fontScale: 0.75,
    panelRadius: 0,
    panelBorderWidth: 3,
    panelBorderStyle: "dashed",
    xpStyle: "segmented",
    corners: false,
    backdrop: "none",
    textGlow:
      "0 0 8px rgba(255, 47, 208, 0.7), 0 0 18px rgba(34, 224, 255, 0.35)",
  },
} as const satisfies Record<string, ThemeTokens>;

export type ThemeName = keyof typeof themes;

/** The CSS variables app/layout.tsx puts on <html>. */
export function themeCssVars(t: ThemeTokens): Record<string, string> {
  return {
    "--bg": t.bg,
    "--fg": t.fg,
    "--accent": t.accent,
    "--accent-muted": t.accentMuted,
    "--border": t.border,
    "--font-scale": String(t.fontScale),
    "--panel-radius": `${t.panelRadius}px`,
    "--panel-border-width": `${t.panelBorderWidth}px`,
    "--panel-border-style": t.panelBorderStyle,
    "--xp-radius": t.xpStyle === "continuous" ? "999px" : "0px",
    "--corner-display": t.corners ? "block" : "none",
    "--text-glow": t.textGlow,
  };
}
