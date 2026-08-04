import type { QuestConfig } from "@/lib/quest-types";

/**
 * The only file you need to edit.
 *
 * Bump `mrr`, commit, push — the level, XP bar, milestone list and the
 * /api/og share card all follow. Set `status: "defeated"` after a setback
 * for the game-over variant, then flip it back to "leveling".
 *
 * `satisfies QuestConfig` type-checks this on every build: an unknown theme
 * name, a bad status, or a malformed date fails `npm run build` instead of
 * shipping broken.
 */
const config = {
  name: "Player One",
  handle: "@quest100k",
  startedAt: "2026-08-04",
  mrr: 0,
  theme: "matrix",
  milestones: [
    { level: 1, mrr: 1, title: "first blood" },
    { level: 10, mrr: 500, title: "ramen mode" },
    { level: 20, mrr: 1000, title: "not a hobby anymore" },
    { level: 30, mrr: 2500, title: "side hustle, officially" },
    { level: 45, mrr: 5000, title: "quit-my-job math" },
    { level: 60, mrr: 10000, title: "hired someone" },
    { level: 75, mrr: 25000, title: "tax bracket regrets" },
    { level: 90, mrr: 50000, title: "offers in the dms" },
    { level: 100, mrr: 100000, title: "prestige" },
  ],
  status: "leveling",
} satisfies QuestConfig;

export default config;
