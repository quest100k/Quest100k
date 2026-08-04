import {
  formatMrr,
  getCurrentLevel,
  getCurrentTitle,
  getDaysSinceStart,
  getNextMilestone,
  getProgress,
  isDefeated,
  type QuestConfig,
} from "@/lib/quest";

/** Number of cells in the XP bar, on the page and on the share card alike. */
export const XP_SEGMENTS = 20;

export type Stat = { label: string; value: string };

export type QuestView = {
  statusLabel: string;
  level: number;
  title: string;
  progress: number;
  percentLabel: string;
  filledSegments: number;
  stats: Stat[];
  /** One-line teaser for the next milestone, or null when maxed out. */
  nextLine: string | null;
  defeated: boolean;
};

/**
 * Everything the level card displays, derived once.
 *
 * The homepage and the /api/og share card both render from this — neither
 * re-derives what to show, they only decide how to paint it. That is what
 * keeps the two in sync when the config changes.
 */
export function getQuestView(c: QuestConfig): QuestView {
  const next = getNextMilestone(c);
  const progress = getProgress(c);
  const defeated = isDefeated(c);

  return {
    statusLabel: defeated ? "game over — continue?" : "level up",
    level: getCurrentLevel(c),
    title: getCurrentTitle(c),
    progress,
    percentLabel: `${Math.round(progress * 100)}%`,
    filledSegments: Math.round(progress * XP_SEGMENTS),
    stats: [
      { label: "mrr", value: formatMrr(c.mrr) },
      { label: "days in", value: String(getDaysSinceStart(c)) },
      {
        label: "next",
        value: next ? `${formatMrr(next.mrr)} · lv ${next.level}` : "maxed out",
      },
    ],
    nextLine: next
      ? `next up: ${next.title} — ${formatMrr(next.mrr - c.mrr)} to go`
      : null,
    defeated,
  };
}
