# Design system adaptation notes

The visual design is a ported design system called **Verda Finance** — a
dark-mode fintech/neo-banking system (deep ink-green surfaces, a single
"Mint Voltage" accent, oversized editorial type, pill controls, tilted stat
cards). It was supplied as a design-system asset, not built from scratch for
this project. The source lives outside this repo; the ported CSS is
[`src/assets/verda-design-system.css`](../../src/assets/verda-design-system.css),
copied in close to verbatim.

## Why a fintech system for an energy dashboard

The brief calls for "clean, editorial, data-journalism inspired... confident
and a little urgent, not clinical or corporate-dashboard-flat" — that's
close to what Verda Finance already is. The adaptation work was reconciling
Verda's rules with the brief's own color requirements, not picking a new
system.

## The accent-color reconciliation

This is the one decision in the whole build that isn't obvious from reading
the code, so it's written down here.

Verda Finance has one non-negotiable rule: **one accent color only** (Mint
Voltage, `#38F2A1`), used for every CTA, key numeral, and highlight. No
second accent hue, ever.

The brief, separately, asks for a **seasonal palette that shifts** (warm
amber for summer, cool blue for winter, etc.) *and* "a single accent color
... reserved for peak-risk callouts and AI insight cards."

These aren't actually in conflict — the brief's "single accent for
callouts" requirement and Verda's "one accent only" rule are the same
constraint. So:

- **Mint Voltage stays the only accent**, exactly as Verda specifies — it's
  used solely for the AI insight panel border/badge and the peak/dip
  markers on the chart. Nothing else uses it.
- **The season color** (`--season-accent` in
  [`seasonal.css`](../../src/assets/seasonal.css), mirrored in
  [`season-colors.ts`](../../src/data/season-colors.ts)) is a *second,
  narrower signal* — it only touches the chart's total-demand line, the
  active season tab, and a thin section-label dot. It never appears on a
  button, a callout, or body text.

If you're asked to add a new accent-colored element anywhere, ask which of
these two signals it actually is before picking a color. Don't invent a
third.

## Things intentionally not carried over from Verda

- The tilted hero stat cards (`.vf-card--stat`, `.vf-card--tilt-left/right`)
  — used in an earlier version of the hero section, removed when the hero
  was simplified. The CSS classes remain in the ported stylesheet (it's a
  straight port) but nothing in this app currently uses them.
- Verda's own logo mark — replaced with a small custom "two peaks" line-art
  mark in `AppHeader.vue`; Verda's interlock mark is fintech-specific
  branding, not relevant here.
