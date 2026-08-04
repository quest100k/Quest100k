import type { Metadata } from "next";

import "./globals.css";
import { getFontClass } from "@/lib/fonts";
import { config } from "@/lib/quest";
import { getQuestView } from "@/lib/quest-view";
import { themeCssVars, themes } from "@/lib/themes";

const theme = themes[config.theme];
const view = getQuestView(config);

const title = `${config.name} — lv ${view.level} · ${view.title}`;
const description = `${config.handle} is leveling up to $100k MRR. quest100k.`;

// Vercel sets these automatically, so absolute OG URLs work with no setup.
const siteUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ? `https://${siteUrl}` : "http://localhost:1337"),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: title }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // data-theme is a styling hook only — no CSS branches on its value.
      data-theme={config.theme}
      data-xp-style={theme.xpStyle}
      className={getFontClass(config.theme)}
      style={themeCssVars(theme) as React.CSSProperties}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
