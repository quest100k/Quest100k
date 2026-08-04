const EMOJI = /\p{Extended_Pictographic}/u;
const CLAUDE_ATTRIBUTION = /co-authored-by:.*claude|generated with \[?claude/i;

/**
 * Conventional Commits, plus two project-specific hard rules.
 *
 * Enforced identically by the husky commit-msg hook (local) and the
 * commitlint workflow (CI, on every PR commit and on the PR title).
 */
export default {
  extends: ["@commitlint/config-conventional"],

  plugins: [
    {
      rules: {
        "no-emoji": ({ raw }) => [
          !EMOJI.test(raw),
          "no emoji in commits — the retro theme belongs in the product, not the git log",
        ],
        "no-claude-attribution": ({ raw }) => [
          !CLAUDE_ATTRIBUTION.test(raw),
          "no Co-Authored-By: Claude or 'Generated with Claude Code' attribution in this repo",
        ],
      },
    },
  ],

  rules: {
    "no-emoji": [2, "always"],
    "no-claude-attribution": [2, "always"],

    "type-enum": [
      2,
      "always",
      // No `style` or `test` — this project has neither a linter nor a suite.
      ["feat", "fix", "docs", "refactor", "perf", "chore", "build", "revert"],
    ],
    "scope-case": [2, "always", "kebab-case"],
    "subject-case": [2, "always", "lower-case"],
    "header-max-length": [2, "always", 72],
  },
};
