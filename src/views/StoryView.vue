<script setup lang="ts">
import { computed } from 'vue'
import { useSeason } from '@/composables/useSeason'
import { SEASON_NARRATIVE } from '@/data/narrative'
import SeasonSelector from '@/components/SeasonSelector.vue'
import SectorToggle from '@/components/SectorToggle.vue'
import LoadCurveChart from '@/components/LoadCurveChart.vue'
import InsightPanel from '@/components/InsightPanel.vue'
import StatCard from '@/components/StatCard.vue'
import TrendProjectionView from '@/components/TrendProjectionView.vue'
import RevealSection from '@/components/RevealSection.vue'
import { SEASON_COLORS } from '@/data/season-colors'

const { season, energy } = useSeason()

const narrative = computed(() => SEASON_NARRATIVE[season.value])
const seasonColor = computed(() => SEASON_COLORS[season.value])

const trend = energy.trend
const lastHistorical = trend.years.length - 1
const currentRiskWindow = trend.historical.riskWindowMonths[lastHistorical] ?? 0
const currentSolarPct = trend.historical.solarAdoptionPct[lastHistorical] ?? 0
const currentEvPct = trend.historical.evAdoptionPct[lastHistorical] ?? 0
const projectedRiskWindow =
  trend.projection.riskWindowMonths[trend.projection.riskWindowMonths.length - 1] ?? 0
const projected2030Solar =
  trend.projection.solarAdoptionPct[trend.projection.solarAdoptionPct.length - 1] ?? 0
</script>

<template>
  <main id="top">
    <!-- Hero -->
    <section class="vf-section vf-hero" style="position: relative">
      <StatCard
        class="tp-hero__stat-left"
        label="In a typical summer day"
        value="2 Peaks"
        tilt="left"
      />
      <StatCard
        class="tp-hero__stat-right"
        label="Solar adoption since 2019"
        :value="`+${currentSolarPct - (trend.historical.solarAdoptionPct[0] ?? 0)}pp`"
        tilt="right"
      />

      <div class="vf-container">
        <h1 class="vf-display-xl vf-hero__title">
          Every grid has one obvious peak.
          <span class="vf-highlight">This one has two.</span>
        </h1>
        <p class="vf-body-md vf-hero__body">
          Two Peaks, Four Seasons is a data story about citywide electricity demand — and the
          seasonal shape-shifting hiding behind the number everyone quotes. Solar is shrinking the
          midday peak. EV charging is building a sharper one after dark. And the pattern is
          spreading beyond summer.
        </p>
        <div class="vf-hero__actions">
          <a href="#explore" class="vf-btn vf-btn--primary">Explore the load curve</a>
          <a href="#trend" class="vf-btn vf-btn--secondary">Skip to the trend</a>
        </div>
      </div>
    </section>

    <!-- Explore / primary interaction -->
    <RevealSection>
      <section id="explore" class="vf-section" :data-season="season">
        <div class="vf-container vf-stack" style="gap: var(--vf-space-xl)">
          <div class="tp-section-label">
            <span class="tp-section-label__dot" />
            <span class="tp-eyebrow">The core interaction</span>
          </div>

          <div class="vf-row" style="justify-content: space-between; flex-wrap: wrap; gap: var(--vf-space-lg)">
            <h2 class="vf-display-lg" style="max-width: 20ch">
              Reshape the day, season by season
            </h2>
            <SeasonSelector />
          </div>

          <transition name="fade" mode="out-in">
            <div :key="season" class="tp-narrative" :style="{ borderLeftColor: seasonColor }">
              <p class="tp-eyebrow" style="margin-bottom: 6px">{{ narrative.kicker }}</p>
              <h3 class="vf-headline-md" style="margin-bottom: 8px">{{ narrative.heading }}</h3>
              <p class="vf-body-md" style="color: var(--vf-muted); max-width: 70ch">
                {{ narrative.body }}
              </p>
            </div>
          </transition>

          <div class="explore-grid">
            <div class="vf-card tp-chart-card">
              <div class="vf-row" style="justify-content: space-between; flex-wrap: wrap; gap: var(--vf-space-sm)">
                <h4 class="vf-headline-md" style="font-size: 1.1rem">
                  {{ energy.seasons[season].label }} — typical day, {{ energy.seasons[season].months }}
                </h4>
                <SectorToggle />
              </div>
              <LoadCurveChart />
              <div class="tp-chart-legend">
                <span class="tp-chart-legend__item">
                  <span class="tp-chart-legend__swatch" :style="{ backgroundColor: seasonColor }" />
                  Total grid demand
                </span>
                <span class="tp-chart-legend__item">
                  <span class="tp-chart-legend__swatch tp-chart-legend__swatch--dashed" />
                  Solar generation
                </span>
                <span class="tp-chart-legend__item">
                  <span class="tp-chart-legend__swatch" style="background-color: var(--vf-mint)" />
                  Peak / dip — click to inspect
                </span>
              </div>
            </div>

            <InsightPanel />
          </div>
        </div>
      </section>
    </RevealSection>

    <!-- Why -->
    <RevealSection>
      <section id="why" class="vf-section">
        <div class="vf-container vf-stack" style="gap: var(--vf-space-xl)">
          <div class="tp-section-label">
            <span class="tp-section-label__dot" />
            <span class="tp-eyebrow">The drivers</span>
          </div>
          <h2 class="vf-display-lg" style="max-width: 22ch">Why the pattern is spreading</h2>
          <p class="vf-body-md" style="color: var(--vf-muted); max-width: 70ch">
            Two forces are moving in the same direction at the same time — and together they are
            reshaping the load curve faster than either would alone.
          </p>

          <div class="why-grid">
            <div class="vf-card">
              <div class="vf-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
              </div>
              <h3 class="vf-card__title">Solar is eating the midday peak</h3>
              <p class="vf-card__body">
                Rooftop and utility-scale solar now offset a growing share of midday commercial
                cooling load at the meter. That is good news for the old peak — it shrinks — but it
                also deepens the afternoon dip, and it does nothing for demand after sunset.
              </p>
            </div>
            <div class="vf-card">
              <div class="vf-card__icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>
              </div>
              <h3 class="vf-card__title">EVs are building a new one</h3>
              <p class="vf-card__body">
                Commuters plug in when they get home — right as solar goes to zero and cooling
                systems are still winding down. That overlap is what turns an ordinary evening
                ramp into a sharp, solar-free peak.
              </p>
            </div>
          </div>
        </div>
      </section>
    </RevealSection>

    <!-- Trend -->
    <RevealSection>
      <section id="trend" class="vf-section" style="background-color: var(--vf-surface-raised)">
        <div class="vf-container vf-stack" style="gap: var(--vf-space-xl)">
          <div class="tp-section-label">
            <span class="tp-section-label__dot" />
            <span class="tp-eyebrow">Where this is headed</span>
          </div>
          <h2 class="vf-display-lg" style="max-width: 24ch">
            The risk window is <span class="vf-highlight">widening</span>
          </h2>

          <div class="vf-stats">
            <div class="vf-stat">
              <span class="vf-stat__numeral">{{ currentRiskWindow }} mo</span>
              <span class="vf-stat__label">Risk window today</span>
            </div>
            <div class="vf-divider vf-divider--vertical" />
            <div class="vf-stat">
              <span class="vf-stat__numeral">{{ projectedRiskWindow }} mo</span>
              <span class="vf-stat__label">Projected by 2030</span>
            </div>
            <div class="vf-divider vf-divider--vertical" />
            <div class="vf-stat">
              <span class="vf-stat__numeral">{{ currentSolarPct }}%</span>
              <span class="vf-stat__label">Solar adoption, 2026</span>
            </div>
            <div class="vf-divider vf-divider--vertical" />
            <div class="vf-stat">
              <span class="vf-stat__numeral">{{ currentEvPct }}%</span>
              <span class="vf-stat__label">EV adoption, 2026</span>
            </div>
          </div>

          <div class="vf-card">
            <TrendProjectionView />
          </div>

          <p class="vf-body-md" style="color: var(--vf-muted); max-width: 70ch">
            {{ trend.narrative }}
          </p>

          <div class="tp-insight" style="max-width: 70ch">
            <span class="vf-badge vf-badge--accent tp-insight__badge">What this means for planners</span>
            <p class="tp-insight__summary">
              A demand-response program timed to summer evenings solves today's problem. A
              storage or flexible-load strategy sized for a six-to-nine-month risk window solves
              the one that's coming — and buys time before the two-peak pattern stops being a
              season and starts being the baseline.
            </p>
          </div>
        </div>
      </section>
    </RevealSection>

    <footer class="tp-footer vf-section" style="padding-block: var(--vf-space-xl)">
      <div class="vf-container vf-row" style="justify-content: space-between; flex-wrap: wrap; gap: var(--vf-space-md)">
        <p class="vf-body-sm">
          Two Peaks, Four Seasons — a portfolio case study. Data is invented for illustrative
          purposes; no real utility or city data is used.
        </p>
        <a href="#top" class="vf-btn vf-btn--ghost">Back to top</a>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.explore-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);
  gap: var(--vf-space-lg);
  align-items: stretch;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--vf-space-lg);
}

@media (max-width: 900px) {
  .explore-grid,
  .why-grid {
    grid-template-columns: 1fr;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms var(--vf-ease);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
