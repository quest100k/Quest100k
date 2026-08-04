import type { ThemeName } from "@/lib/themes";

/** "leveling" is normal; "defeated" triggers the game-over variant. */
export type QuestStatus = "leveling" | "defeated";

/** YYYY-MM-DD. Catches "Aug 4 2026" and "2026/08/04" at compile time. */
export type IsoDate = `${number}-${number}-${number}`;

export type Milestone = {
  /** Displayed level number. Arbitrary — they need not be contiguous. */
  level: number;
  /** MRR threshold that unlocks this level. */
  mrr: number;
  title: string;
};

export type QuestConfig = {
  name: string;
  handle: string;
  startedAt: IsoDate;
  mrr: number;
  theme: ThemeName;
  milestones: Milestone[];
  status: QuestStatus;
};
