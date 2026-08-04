import XpBar from "@/components/xp-bar";
import type { QuestConfig } from "@/lib/quest";
import { getQuestView, type Stat } from "@/lib/quest-view";

function Corners() {
  return (
    <>
      <span className="quest-corner left-[-5px] top-[-5px]" />
      <span className="quest-corner right-[-5px] top-[-5px]" />
      <span className="quest-corner bottom-[-5px] left-[-5px]" />
      <span className="quest-corner bottom-[-5px] right-[-5px]" />
    </>
  );
}

function StatCell({ label, value }: Stat) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.65em] uppercase opacity-60">{label}</span>
      <span className="text-accent text-[1.1em]">{value}</span>
    </div>
  );
}

export default function LevelCard({ config }: { config: QuestConfig }) {
  const view = getQuestView(config);

  return (
    <section className="quest-panel">
      <Corners />

      <p className="quest-glow text-[0.8em] uppercase tracking-widest opacity-70">
        {view.statusLabel}
      </p>

      <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
        <span className="text-[0.7em] uppercase opacity-60">lv</span>
        <span className="text-accent quest-glow text-[3em] leading-none">
          {view.level}
        </span>
        <h1 className="text-[1.1em] leading-snug">{view.title}</h1>
      </div>

      {view.defeated && (
        <p className="mt-4 text-[0.8em] leading-relaxed opacity-75">
          run ended. press start to keep going.
        </p>
      )}

      <div className="mt-7">
        <div className="mb-2 flex justify-between text-[0.65em] uppercase opacity-60">
          <span>xp</span>
          <span>{view.percentLabel}</span>
        </div>
        <XpBar filled={view.filledSegments} percentLabel={view.percentLabel} />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {view.stats.map((stat) => (
          <StatCell key={stat.label} {...stat} />
        ))}
      </div>

      {view.nextLine && (
        <p className="mt-6 text-[0.75em] leading-relaxed opacity-70">
          {view.nextLine}
        </p>
      )}
    </section>
  );
}
