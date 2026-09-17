# BRIEF.md — Two Peaks, Four Seasons

## Summary

**Two Peaks, Four Seasons** is an interactive data story about citywide electricity demand and the hidden seasonal shape-shifting behind it. Most people assume a city's grid has one predictable peak — a hot summer evening, everyone's AC running. This story reveals that the grid actually splits into *two* peaks during warm months (a shrinking midday peak, thanks to solar, and a sharp new evening peak driven by commuters returning home, EV charging, and lingering commercial cooling), and that this two-peak pattern isn't constant — it's largely a summer phenomenon that's spreading into spring and fall as solar adoption and EV ownership both climb. The narrative walks a viewer from "here's the pattern everyone expects" to "here's how it actually changes across the year" to "here's why, and here's what that means for grid planning." AI-generated insight panels sit alongside the charts, decomposing each peak into its contributing drivers in plain language rather than leaving the viewer to interpret raw curves. This is a project-only, portfolio case study built with invented/simplified data — no real utility, city, or client data is used.

## Target User

A city sustainability office lead or utility grid-planning manager who needs to explain *why* the grid is under stress — not just *that* it is — to non-technical stakeholders (city council members, ratepayers, executive leadership). This person doesn't want another static report; they want a narrative they can walk someone through in a meeting, that builds to a clear, defensible conclusion about where to invest (demand response programs, storage, or infrastructure upgrades).

## Key Features

- **Season selector** (primary control): toggle between Summer, Winter, Spring, and Fall to reshape the load curve in real time — this is the core interaction, not a filter bolted on afterward.
- **Typical-day load curve**: hourly citywide demand for the selected season, broken out by sector (residential, commercial, industrial), with a solar generation curve overlaid to show the midday dip (deep in summer, shallow-to-absent in winter).
- **AI insight panel**: clicking a peak (or the midday dip) on the curve surfaces a plain-language explainer — e.g., "This evening peak is ~40% EV charging, ~35% lingering commercial cooling, ~25% residential — up from ~15% EV three years ago" — plus a one-line implication for planners.
- **Sector toggle**: isolate residential, commercial, or industrial load to see who's actually driving each peak.
- **Trend/projection view**: a closing view showing the two-peak pattern's seasonal "spread" over recent years, with a simple forward projection of the risk window widening as solar and EV adoption grow.
- **Guided narrative flow**: the page is structured as a scroll- or step-based story (open on summer's dramatic two-peak day → contrast with winter's single elevated plateau → show spring/fall as transitional → land on the AI-driven "why" and the trend implication), not a dashboard the user has to self-navigate.

## Design System

- **Tone**: clean, editorial, data-journalism inspired (think a well-produced utility/climate explainer) — confident and a little urgent, not clinical or corporate-dashboard-flat.
- **Color**: a seasonal palette that shifts subtly with the season selector — warm amber/gold tones for summer, cool blue/slate for winter, and muted transitional tones for spring/fall — anchored by a consistent neutral background and a single accent color (e.g., a warning amber or red) reserved for peak-risk callouts and AI insight cards, so it reads as intentional, not decorative.
- **Typography**: a strong, readable sans-serif for headlines and narrative copy; a monospace or tabular numeral font for data labels/axis values to reinforce the "data" feel.
- **Charts**: smooth area/line charts for the load curves (not bar charts) so the "two peaks" shape is immediately legible; annotated peak/dip markers rather than relying on tooltips alone.
- **AI insight cards**: visually distinct from chart chrome — a bordered or shaded card that reads like a callout/quote, not another data label.

## Tech Stack

- Vue 3 + Vite + TypeScript + Vue Router (no Pinia, no testing framework, no JSX, no ESLint/Prettier — per standard scaffold)
- UIverse.io components (converted to Vue single-file components) for metric cards, nav/header, and buttons/toggles
- A charting library compatible with Vue (e.g., Chart.js or a lightweight D3 wrapper) for the load-curve visualizations
- Mock dataset as a static JSON file (`src/data/energy-usage.json`) containing invented, internally consistent hourly load data by season and sector, plus solar generation and EV charging estimates
- Deployed to Vercel, password-protected

## Nice to Haves

- Smooth animated transition between seasons when the selector changes (the curve reshaping in place, not just swapping charts)
- A "compare two seasons side by side" mode in addition to the single-season view
- Responsive layout so the story reads reasonably well on tablet/mobile, even though this isn't the mobile-first case study
- Empty/loading states handled gracefully if data is being fetched or filtered down to nothing
- A short "methodology" footnote or modal clarifying the data is invented/simplified for illustrative purposes
