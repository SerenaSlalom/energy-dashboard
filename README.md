# Two Peaks, Four Seasons

**Live:** https://energy-dashboard-peach-delta.vercel.app

An interactive data story about citywide electricity demand — and the seasonal
shape-shifting behind it. Most people assume a city's grid has one predictable
peak. This story shows it actually splits into *two* during warm months (a
shrinking midday peak, thanks to solar, and a sharp new evening peak driven by
EV charging), and that the pattern is spreading beyond summer as solar and EV
adoption climb.

Built as a Protogen (P302 — Interactive Data Story) case study. It's a
project-only build with invented, simplified data — no real utility, city, or
client data is used anywhere in this project.

## What it does

- **Season selector** — the primary control. Reshapes the load curve live
  across Summer, Winter, Spring, and Fall.
- **Sector toggle** — isolates residential, commercial, or industrial load on
  top of total demand.
- **Clickable peak/dip markers** — surface an AI-style insight card breaking
  down what's driving that moment in the curve, in plain language.
- **Trend/projection view** — shows the two-peak "risk window" widening over
  time as solar and EV adoption grow.

Full context on the target user, key features, and design direction lives in
[BRIEF.md](./BRIEF.md).

## Tech stack

- Vue 3 + Vite + TypeScript + Vue Router
- [Chart.js](https://www.chartjs.org/) via `vue-chartjs` for the load curves
- A ported [Verda Finance](./.claude/context/design-system.md) design system,
  layered with a season-shifting accent for this project
- Static, generated mock dataset (`src/data/energy-usage.json`) — see
  [data model notes](./.claude/context/data-model.md) for how it's shaped
- Deployed to Vercel, connected to this repo for auto-deploy on push to `main`

## Getting started

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
```

## Project structure

```
src/
  assets/         # ported design system CSS + season theming layer
  components/     # chart, controls, insight panel, header, modal
  composables/    # shared season/sector state (no Pinia — see CLAUDE.md)
  data/           # mock dataset, narrative copy, season color constants
  types/          # shared TypeScript types for the dataset
  views/          # StoryView.vue — the single narrative page
```

## AI scaffolding

This repo was built with Claude Code. [`CLAUDE.md`](./CLAUDE.md) has the
project overview and conventions an AI agent (or a new contributor) needs;
[`.claude/context/`](./.claude/context/) has deeper notes on specific
decisions (the design system adaptation, the mock data model) that didn't
belong in `CLAUDE.md` itself.

## License

MIT — see [LICENSE](./LICENSE).
