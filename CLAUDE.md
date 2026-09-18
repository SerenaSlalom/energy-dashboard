# CLAUDE.md

Project context for AI agents (and future-you) working in this repo.

## What this is

Two Peaks, Four Seasons — a Protogen P302 (Interactive Data Story) case study
about seasonal electricity demand. Full product context (target user, key
features, design direction) lives in [BRIEF.md](./BRIEF.md); read that first.
Deeper notes on specific decisions live in [`.claude/context/`](./.claude/context/).

This is a portfolio project. Do not add real utility, city, or client data —
the whole point of the brief is that the dataset is invented and simplified.

## Tech stack & constraints

- Vue 3 + Vite + TypeScript + Vue Router. **No Pinia, no test framework, no
  JSX, no ESLint/Prettier** — this was a deliberate scaffold choice per the
  brief, not an oversight. Don't add them without checking with the user
  first.
- Chart.js + `vue-chartjs` for the load curves (chosen over D3 for
  lower ceremony given the chart needs — smooth area/line charts, click
  handling, no exotic visual encodings).
- State management is two module-level `ref`s in
  [`src/composables/useSeason.ts`](./src/composables/useSeason.ts) (season,
  sector, active insight point) — not a store library. This app has one
  screen and a handful of shared pieces of state; a composable is enough.

## Architecture

- `src/views/StoryView.vue` — the single page. Sections: intro, the
  interactive load curve (season selector + sector toggle + chart + insight
  panel), "why it's changing," and the trend/projection view.
- `src/composables/useSeason.ts` — shared reactive state + the energy
  dataset, imported wherever season/sector/insight state is needed.
- `src/components/LoadCurveChart.vue` — the centerpiece. Renders `netLoad`
  and `solar` from the active season, plus the selected sector's raw curve
  when isolated. Peak/dip markers are drawn with a custom Chart.js plugin
  (not `chartjs-plugin-annotation` — kept dependency-free) and clicking one
  resolves the nearest hour to a point-of-interest via the category scale.
- `src/components/TrendProjectionView.vue` — historical vs. projected trend
  lines, split at the last historical year via a `segment.borderDash`
  callback (see `historicalLength` in that file — don't hardcode the split
  index elsewhere).
- `src/data/energy-usage.json` — the static mock dataset. See
  [`.claude/context/data-model.md`](./.claude/context/data-model.md) before
  regenerating or reshaping it; the shape is load-bearing for the narrative.
- `src/data/season-colors.ts` — hex values for the season accent, **kept in
  sync by hand** with the `--season-*` custom properties in
  `src/assets/seasonal.css`. Canvas can't read CSS variables, so this
  duplication is intentional, not a bug. If you change one, change the
  other.

## Design system

The visual system is a ported design system (Verda Finance, a fintech dark
neo-bank system) adapted for this project — see
[`.claude/context/design-system.md`](./.claude/context/design-system.md) for
the full rationale, especially the accent-color reconciliation (there's a
"single accent" rule that this project honors in a specific way that isn't
obvious from the code alone).

## TypeScript notes

`noUncheckedIndexedAccess` is on. Array index access (`arr[i]`) is
`T | undefined`; known-key object access (`record[literalUnionKey]`) is not.
Handle the former with `?? fallback`, don't reach for non-null assertions.

## Commands

```sh
npm run dev      # local dev server (vite)
npm run build    # vue-tsc --build + vite build — run this before any push
```

## Deployment

Vercel project `serena-slalom/energy-dashboard`, connected to this GitHub
repo — pushes to `main` auto-deploy. Manual deploy: `vercel --prod --yes`
from the project root.
