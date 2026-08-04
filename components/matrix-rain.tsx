/** Shared with the OG route's static backdrop so both render the same set. */
export const GLYPHS = "アイウエオカキクケコサシスセソ0123456789<>=/\\$#*";

const COLUMNS = 28;
const COLUMN_LENGTH = 26;

/**
 * Deterministic pseudo-random so server and client markup match — no
 * hydration mismatch and no need for a client component.
 *
 * Integer-only (mulberry32): Math.sin is not bit-identical across JS engines,
 * so seeding with it can render a different float on the server than in the
 * browser and trip a hydration error. Emitted values are rounded for the same
 * reason — no engine-dependent digits reach the markup.
 */
function rand(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return Math.round((((t ^ (t >>> 14)) >>> 0) / 4294967296) * 1000) / 1000;
}

/** Fully deterministic, so it's built once per process rather than per render. */
const RAIN = Array.from({ length: COLUMNS }, (_, i) => ({
  text: Array.from({ length: COLUMN_LENGTH }, (_, row) =>
    GLYPHS.charAt(Math.floor(rand(i * 100 + row) * GLYPHS.length)),
  ).join("\n"),
  style: {
    left: `${Math.round((i / COLUMNS) * 1000) / 10}%`,
    animationDuration: `${6 + rand(i) * 10}s`,
    animationDelay: `-${rand(i + 500) * 12}s`,
    opacity: 0.4 + rand(i + 900) * 0.6,
  },
}));

/** Decorative backdrop for themes with `backdrop: "rain"`. Homepage only. */
export default function MatrixRain() {
  return (
    <div className="matrix-rain" aria-hidden>
      {RAIN.map((col, i) => (
        <span key={i} className="matrix-rain-column" style={col.style}>
          {col.text}
        </span>
      ))}
    </div>
  );
}
