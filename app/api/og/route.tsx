import { ImageResponse } from "@vercel/og";

import { GLYPHS } from "@/components/matrix-rain";
import { config } from "@/lib/quest";
import { getQuestView, XP_SEGMENTS } from "@/lib/quest-view";
import { themes, type ThemeTokens } from "@/lib/themes";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;
/** The card is ~2× the page's content width, so borders scale with it. */
const BORDER_SCALE = 1.5;

/**
 * Satori needs raw font bytes, and the fetch sits on the render path — so the
 * promise is memoized at module scope. That survives across requests on a warm
 * instance and dedupes concurrent cold starts. On failure we fall back to the
 * bundled default font rather than failing the image.
 */
const fontCache = new Map<string, Promise<ArrayBuffer | null>>();

function getFont(family: string): Promise<ArrayBuffer | null> {
  let pending = fontCache.get(family);
  if (!pending) {
    pending = loadFont(family);
    fontCache.set(family, pending);
  }
  return pending;
}

async function loadFont(family: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}&text=${encodeURIComponent(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 $·—,.:%[]()/#*<>=\\'\"?!",
    )}`;

    const css = await fetch(cssUrl, {
      headers: {
        // Ancient UA string => Google serves ttf instead of woff2.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50",
      },
      next: { revalidate: 86_400 },
    }).then((r) => r.text());

    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
    if (!url) return null;

    return await fetch(url, { next: { revalidate: 86_400 } }).then((r) =>
      r.arrayBuffer(),
    );
  } catch {
    return null;
  }
}

/** Static stand-in for the homepage's animated rain — Satori has no animation. */
function RainBackdrop({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        justifyContent: "space-between",
        opacity: 0.1,
      }}
    >
      {Array.from({ length: 24 }, (_, col) => (
        <div
          key={col}
          style={{
            display: "flex",
            flexDirection: "column",
            color,
            fontSize: 20,
            marginTop: (col * 37) % 220,
          }}
        >
          {Array.from({ length: 14 }, (_, row) => (
            <span key={row}>
              {GLYPHS.charAt((col * 7 + row * 13) % GLYPHS.length)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** The XP track's own box; cells are identical either way. */
function xpTrackStyle(theme: ThemeTokens, borderWidth: number) {
  return theme.xpStyle === "continuous"
    ? { gap: 0, padding: 0, height: 16, borderWidth: 0, borderRadius: 999 }
    : {
        gap: 6,
        padding: 6,
        height: 44,
        borderWidth: borderWidth / 2,
        borderRadius: 0,
      };
}

export async function GET() {
  const theme = themes[config.theme];
  const view = getQuestView(config);

  // One scale drives every size on the card, so a pixel-font theme needs no
  // special case here — it just declares a smaller fontScale.
  const px = (base: number) => Math.round(base * theme.fontScale);
  const borderWidth = Math.round(theme.panelBorderWidth * BORDER_SCALE);

  const fontData = await getFont(theme.fontFamily);

  const label = (base: number) => ({
    fontSize: px(base),
    color: theme.fg,
    opacity: 0.65,
    textTransform: "uppercase" as const,
    letterSpacing: 2,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: "flex",
          position: "relative",
          background: theme.bg,
          color: theme.fg,
          padding: 56,
          fontFamily: theme.fontFamily,
        }}
      >
        {theme.backdrop === "rain" && <RainBackdrop color={theme.accent} />}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: 48,
            borderWidth,
            borderStyle: theme.panelBorderStyle,
            borderColor: theme.border,
            borderRadius: theme.panelRadius * BORDER_SCALE,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={label(24)}>{view.statusLabel}</span>
            <span style={label(24)}>
              {config.name} {config.handle}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginTop: 40,
            }}
          >
            <span style={{ fontSize: px(30), opacity: 0.6 }}>LV</span>
            <span
              style={{
                fontSize: px(128),
                color: theme.accent,
                lineHeight: 1,
              }}
            >
              {view.level}
            </span>
            <span style={{ fontSize: px(40), maxWidth: 620 }}>
              {view.title}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "auto",
              marginBottom: 14,
            }}
          >
            <span style={label(22)}>xp</span>
            <span style={label(22)}>{view.percentLabel}</span>
          </div>

          <div
            style={{
              display: "flex",
              borderStyle: "solid",
              borderColor: theme.border,
              overflow: "hidden",
              ...xpTrackStyle(theme, borderWidth),
            }}
          >
            {Array.from({ length: XP_SEGMENTS }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background:
                    i < view.filledSegments ? theme.accent : theme.accentMuted,
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            {view.stats.map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <span style={label(18)}>{stat.label}</span>
                <span style={{ fontSize: px(28), color: theme.accent }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: fontData
        ? [
            {
              name: theme.fontFamily,
              data: fontData,
              weight: 400,
              style: "normal",
            },
          ]
        : undefined,
      headers: {
        // Only the day counter moves; let the CDN absorb every re-scrape.
        "Cache-Control":
          "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
