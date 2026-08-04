import { formatMrr, isMilestoneReached, type QuestConfig } from "@/lib/quest";

export default function MilestoneList({ config }: { config: QuestConfig }) {
  return (
    <section className="quest-panel">
      <h2 className="text-[0.8em] uppercase tracking-widest opacity-70">
        milestones
      </h2>

      <ul className="mt-5 flex flex-col gap-3">
        {config.milestones.map((m) => {
          const done = isMilestoneReached(m, config);

          return (
            <li
              key={m.level}
              className={`flex items-baseline gap-3 text-[0.8em] ${
                done ? "text-accent" : "text-fg opacity-40"
              }`}
            >
              <span aria-hidden>{done ? "[x]" : "[ ]"}</span>
              <span className="w-[3.5em] shrink-0">lv {m.level}</span>
              <span className="flex-1">{m.title}</span>
              <span className="shrink-0 tabular-nums">{formatMrr(m.mrr)}</span>
              <span className="sr-only">{done ? "completed" : "locked"}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
