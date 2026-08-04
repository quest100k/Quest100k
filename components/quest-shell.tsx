import MatrixRain from "@/components/matrix-rain";
import { config } from "@/lib/quest";
import { themes } from "@/lib/themes";

/** Page frame shared by every route: width, padding, header treatment, backdrop. */
export default function QuestShell({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {themes[config.theme].backdrop === "rain" && <MatrixRain />}

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
        <header className="flex flex-wrap items-baseline justify-between gap-2 text-[0.75em] uppercase tracking-widest opacity-70">
          {header}
        </header>

        {children}
      </main>
    </>
  );
}
