import Link from "next/link";

import LevelCard from "@/components/level-card";
import MilestoneList from "@/components/milestone-list";
import QuestShell from "@/components/quest-shell";
import { config } from "@/lib/quest";

// The config is a build constant; only "days in" moves, and only at midnight.
// Revalidating beats force-dynamic — the CDN serves the HTML between renders.
export const revalidate = 3600;

const REPO_URL = "https://github.com/quest100k/quest100k";

export default function Page() {
  return (
    <QuestShell
      header={
        <>
          <span>quest100k</span>
          <span>
            {config.name} · {config.handle}
          </span>
        </>
      }
    >
      <LevelCard config={config} />
      <MilestoneList config={config} />

      <footer className="flex flex-wrap items-center justify-between gap-3 text-[0.7em] uppercase tracking-widest opacity-60">
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4"
        >
          fork this on github
        </a>
        <Link href="/leaderboard" className="underline underline-offset-4">
          leaderboard
        </Link>
        <span>theme: {config.theme}</span>
      </footer>
    </QuestShell>
  );
}
