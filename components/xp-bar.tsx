import { XP_SEGMENTS } from "@/lib/quest-view";

/**
 * Blocky segmented XP bar. The `continuous` xpStyle collapses the gaps via CSS
 * so the same markup renders as a thin bar — no layout shift.
 */
export default function XpBar({
  filled,
  percentLabel,
}: {
  filled: number;
  percentLabel: string;
}) {
  return (
    <div
      className="quest-xp-track quest-panel flex h-6 w-full gap-[3px] !p-[3px]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((filled / XP_SEGMENTS) * 100)}
      aria-valuetext={percentLabel}
      aria-label="XP progress to next milestone"
    >
      {Array.from({ length: XP_SEGMENTS }, (_, i) => (
        <div
          key={i}
          className={`quest-xp-cell h-full flex-1 ${
            i < filled ? "bg-accent" : "bg-accent-muted"
          }`}
        />
      ))}
    </div>
  );
}
