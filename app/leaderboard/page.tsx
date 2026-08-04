import Link from "next/link";

import QuestShell from "@/components/quest-shell";

// GitHub's search API is rate-limited for unauthenticated callers, so cache.
export const revalidate = 3600;

type Repo = {
  id: number;
  full_name: string;
  html_url: string;
  stargazers_count: number;
};

async function getRepos(): Promise<Repo[] | null> {
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=topic:quest100k&sort=updated&per_page=50",
      { headers: { Accept: "application/vnd.github+json" } },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as { items?: Repo[] };
    return data.items ?? [];
  } catch {
    return null;
  }
}

export default async function LeaderboardPage() {
  const repos = await getRepos();

  return (
    <QuestShell
      header={
        <>
          <Link href="/" className="underline underline-offset-4">
            ← back
          </Link>
          <span>quest100k</span>
        </>
      }
    >
      <section className="quest-panel">
        <h1 className="text-[0.9em] uppercase tracking-widest">
          other players
        </h1>
        <p className="mt-3 text-[0.7em] leading-relaxed opacity-60">
          every public repo tagged with the <code>quest100k</code> github topic.
          no MRR is aggregated across forks — each player&apos;s numbers live in
          their own config.
        </p>

        {repos === null && (
          <p className="mt-6 text-[0.8em] opacity-70">
            github search unavailable right now — try again later.
          </p>
        )}

        {repos?.length === 0 && (
          <p className="mt-6 text-[0.8em] opacity-70">
            nobody tagged yet. be first: add the <code>quest100k</code> topic to
            your fork.
          </p>
        )}

        {repos && repos.length > 0 && (
          <ul className="mt-6 flex flex-col gap-3">
            {repos.map((repo) => (
              <li
                key={repo.id}
                className="flex items-baseline gap-3 text-[0.8em]"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent flex-1 underline underline-offset-4"
                >
                  {repo.full_name}
                </a>
                <span className="shrink-0 tabular-nums opacity-60">
                  ★ {repo.stargazers_count}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </QuestShell>
  );
}
