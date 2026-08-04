import type {
  IsoDate,
  Milestone,
  QuestConfig,
  QuestStatus,
} from "@/lib/quest-types";
import rawConfig from "@/quest.config";

export type { IsoDate, Milestone, QuestConfig, QuestStatus };

/**
 * The single source of truth. Forkers edit quest.config.ts and nothing else.
 * Milestones are sorted here so the config file can be written in any order.
 */
export const config: QuestConfig = {
  ...rawConfig,
  milestones: [...rawConfig.milestones].sort((a, b) => a.mrr - b.mrr),
};

export function isMilestoneReached(m: Milestone, c: QuestConfig): boolean {
  return c.mrr >= m.mrr;
}

/** Highest milestone whose mrr threshold is met, or null if none met yet. */
export function getCurrentMilestone(c: QuestConfig): Milestone | null {
  return c.milestones.findLast((m) => isMilestoneReached(m, c)) ?? null;
}

/** Highest reached level, or 0 if no milestone met yet. */
export function getCurrentLevel(c: QuestConfig): number {
  return getCurrentMilestone(c)?.level ?? 0;
}

/** The next unmet milestone, or null if maxed out. */
export function getNextMilestone(c: QuestConfig): Milestone | null {
  return c.milestones.find((m) => !isMilestoneReached(m, c)) ?? null;
}

/**
 * Progress from the current milestone to the next, clamped to 0–1.
 * Before the first milestone, progress is measured from 0 MRR.
 * When maxed out, progress is 1.
 */
export function getProgress(c: QuestConfig): number {
  const next = getNextMilestone(c);
  if (!next) return 1;

  const floor = getCurrentMilestone(c)?.mrr ?? 0;
  const span = next.mrr - floor;
  if (span <= 0) return 1;

  return Math.min(1, Math.max(0, (c.mrr - floor) / span));
}

/** Whole days elapsed since startedAt (never negative). */
export function getDaysSinceStart(c: QuestConfig): number {
  const start = new Date(`${c.startedAt}T00:00:00Z`).getTime();
  if (Number.isNaN(start)) return 0;

  const today = new Date();
  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );

  return Math.max(0, Math.round((todayUtc - start) / 86_400_000));
}

/** Milestone title to display, including the pre-level-1 state. */
export function getCurrentTitle(c: QuestConfig): string {
  return getCurrentMilestone(c)?.title ?? "no xp yet";
}

export function isDefeated(c: QuestConfig): boolean {
  return c.status === "defeated";
}

export function formatMrr(mrr: number): string {
  return `$${mrr.toLocaleString("en-US")}`;
}
