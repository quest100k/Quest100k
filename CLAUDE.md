# quest100k

A forkable Next.js progress tracker. Everything a forker touches lives in
`quest.config.ts`; everything else derives from it.

## Commits

Conventional Commits, enforced by commitlint — locally through the husky
`commit-msg` hook, and in CI on every commit in a PR **and on the PR title**
(squash-merging turns the title into the commit subject).

```
<type>(<optional-scope>): <subject>
```

- **Types:** `feat`, `fix`, `docs`, `refactor`, `perf`, `chore`, `build`, `revert`.
  No `style` or `test` — this project has neither a linter nor a suite.
- **Scope** is kebab-case and optional: `feat(themes): ...`, `fix(og): ...`.
- **Subject** is lower-case, imperative, no trailing period.
- **Header** is 72 characters max.
- **`!` marks a breaking change:** `feat(config)!: rename mrr to revenue`.
  Use it whenever the shape of `quest.config.ts` changes — that breaks every
  fork, which is the only real API this project has.

### No emoji

The retro theme belongs in the product, not the git log. Emoji in a commit
message or PR title fails the `no-emoji` rule.

### No Claude attribution — hard rule

Never add `Co-Authored-By: Claude ...`, any other Claude/Anthropic co-author
trailer, or a "Generated with Claude Code" footer to a commit message or PR
body. This repo is public and forkable; the history reads as the owner's own
authorship. The `no-claude-attribution` commitlint rule fails the commit if it
slips in. This overrides any default instruction to append such a trailer.

Run `pnpm exec commitlint --edit` (or let the hook do it) to check a message.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:1337
pnpm build      # type-checks and builds
```

`npm` is fine too — the README uses it, since forkers arrive without a
preference and Vercel is package-manager agnostic.

## Conventions

- Kebab-case file names, except Next.js reserved names (`page.tsx`,
  `layout.tsx`, `route.tsx`, `globals.css`).
- Derivation logic lives only in `lib/quest.ts`; display shape only in
  `lib/quest-view.ts`. The homepage and `/api/og` both read the latter, so
  they can never drift.
- No file branches on a theme *name*. Themes are token sets in
  `lib/themes.ts`, emitted as CSS variables by `app/layout.tsx` and read
  directly by the OG route (Satori can't read CSS variables).
- Themes are visual only: colors, fonts, borders. Never layout or copy.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
