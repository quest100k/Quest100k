import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // app/layout.tsx emits these variables from lib/themes.ts, so components
      // use text-accent / bg-accent-muted and never name a color.
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        border: "var(--border)",
      },
      fontFamily: {
        quest: ["var(--font-quest)"],
      },
    },
  },
  plugins: [],
};

export default config;
