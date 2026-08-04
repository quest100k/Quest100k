# quest100k

**quest100k** is a "level up" progress tracker for indie founders documenting a solo path to $100k MRR, styled as a retro pixel-game HUD. Your level, XP bar, days-in and milestone list are all derived from one file — `quest.config.ts` — and the shareable card at `/api/og` is generated on the fly, so posting an update on X is just pasting your site's link. No database, no admin UI, no image exports. Fork it, edit one number, push. Live example: [quest100k.vercel.app](https://quest100k.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquest100k%2Fquest100k&project-name=quest100k&repository-name=quest100k)

## How to update your progress

Edit `mrr` (and `status`, if you need it) in `quest.config.ts`, commit, push. Vercel redeploys automatically and the homepage, level, XP bar and share card all update. That's the whole workflow.

```ts
import type { QuestConfig } from "@/lib/quest-types";

const config = {
  name: "Player One",
  handle: "@quest100k",
  startedAt: "2026-08-04",   // day zero, used for "days in"
  mrr: 0,                    // <- the only number you normally touch
  theme: "pixelQuest",       // pixelQuest | matrix | modern | arcade
  milestones: [
    { level: 1, mrr: 1, title: "first blood" },
    // ...
  ],
  status: "leveling",        // "leveling" | "defeated"
} satisfies QuestConfig;

export default config;
```

- **`status: "defeated"`** swaps the "level up" banner for a deadpan "game over — continue?" on both the homepage and the share card. Set it after a setback, flip it back to `"leveling"` when you're back at it.
- **`milestones`** are yours to rewrite — any levels, any thresholds, any titles. They're sorted by MRR at load, so order in the file doesn't matter.

### Why it's TypeScript, not JSON

`satisfies QuestConfig` (types in `lib/quest-types.ts`) checks the config on every build, so mistakes fail `npm run build` instead of shipping a broken site:

```
theme: "neon"          → Type '"neon"' is not assignable to type
                         '"pixelQuest" | "matrix" | "modern" | "arcade"'
status: "winning"      → Type '"winning"' is not assignable to type 'QuestStatus'
startedAt: "Aug 4 2026" → not assignable to `${number}-${number}-${number}`
```

You also get autocomplete for theme names and milestone fields in any editor. `satisfies` (rather than a type annotation) keeps the literal types, so `config.theme` stays narrowed to the exact theme you picked.

Everything else is derived in `lib/quest.ts` (`getCurrentLevel`, `getProgress`, `getNextMilestone`, `getDaysSinceStart`). Pages and the OG route call those functions — the derivation logic lives in exactly one place.

## Sharing on X

Paste your site URL and the link preview renders the card, or link the image directly:

```
https://your-site.vercel.app/api/og
```

It's rendered at request time from the live config, so it's never stale and there's never a manual export step.

## Local development

```bash
npm install
npm run dev      # http://localhost:1337
npm run build    # type-checks and builds
```

## Adding a theme

Themes are visual only — colors, font, border treatment. They never change layout or copy.

`lib/themes.ts` is the only source of truth for a theme. `app/layout.tsx` emits every token onto `<html>` as a CSS variable, and the OG route reads the same object directly (Satori can't read CSS variables). **No file branches on a theme name**, so there's no `globals.css` block to write and no route to edit.

1. **Add the token set** to `lib/themes.ts`:

   ```ts
   export const themes = {
     // ...
     myTheme: {
       bg: "#101010",
       fg: "#f0f0f0",
       accent: "#ff8800",
       accentMuted: "#4a2a00",
       border: "#ff8800",
       fontFamily: "Space Mono",   // bare Google family name
       fontScale: 1,               // < 1 for chunky pixel faces
       panelRadius: 0,
       panelBorderWidth: 2,
       panelBorderStyle: "solid",  // "solid" | "dashed"
       xpStyle: "segmented",       // "segmented" (blocky) | "continuous" (thin pill)
       corners: false,             // item-slot squares at the panel corners
       backdrop: "none",           // "none" | "rain"
       textGlow: "none",           // any CSS text-shadow value
     },
   } as const satisfies Record<string, ThemeTokens>;
   ```

2. **Pick a typeface** in `lib/fonts.ts` — load it with `next/font/google` using `variable: "--font-quest"` and map your theme name to it. This second file exists only because `next/font` requires literal top-level calls; components never reference a font by name.

3. **Set `theme: "myTheme"`** in `quest.config.ts` — the `ThemeName` union widens automatically from the `themes` object, so no type needs updating by hand.

Shipped themes: `pixelQuest` (fantasy RPG pixel art, gold XP, item-slot corners), `matrix` (black/green terminal with a light animated digital rain behind the card), `modern` (clean sans-serif, thin rounded bar, no kitsch), `arcade` (neon magenta/cyan with glow).

Note on `/api/og`: it renders through Satori, which only supports static flexbox — no CSS animations, no canvas, and `borderStyle: "dashed"` renders solid. A `backdrop: "rain"` theme animates its falling characters on the homepage only; the share card renders a static equivalent (dim pre-placed glyphs) so it still reads as themed.

What the two renderers share is `lib/quest-view.ts`: `getQuestView(config)` returns the status label, level, title, XP fill and stat list, and both the homepage card and the OG image map over it. Neither decides *what* to display — only how to paint it.

## Leaderboard

`/leaderboard` lists every public repo carrying the **`quest100k`** GitHub topic. To show up on it, add the topic to your fork:

1. Open your fork on GitHub.
2. Click the ⚙️ next to **About** in the right sidebar.
3. Add `quest100k` under **Topics** and save.

It's a directory of players, not a ranking — no MRR is aggregated across forks (that would require every fork to expose an API, which is out of scope).

## Not in v1

No skill tree or multiple XP categories, no inventory/backlog grid, no quest log, no database, no auth, no admin UI, and no automatic posting to social — sharing is manual by design.

## License

MIT.
