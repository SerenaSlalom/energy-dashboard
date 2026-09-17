<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import { useSeason } from '@/composables/useSeason'
import { MINT, MOSS, SOLAR_COLOR } from '@/data/season-colors'

const { energy } = useSeason()
const trend = energy.trend

const allYears = [...trend.years, ...trend.projection.years.slice(1)]
const historicalLength = trend.years.length

function withGap(historical: number[], projected: number[]): (number | null)[] {
  const gapLength = allYears.length - historical.length - (projected.length - 1)
  return [...historical, ...Array(gapLength).fill(null), ...projected]
}

const chartData = computed<ChartData<'line'>>(() => ({
  labels: allYears,
  datasets: [
    {
      label: 'Risk window (months/year)',
      data: withGap(trend.historical.riskWindowMonths, trend.projection.riskWindowMonths),
      borderColor: MINT,
      backgroundColor: MINT + '26',
      borderWidth: 2.5,
      pointRadius: 2,
      tension: 0.35,
      fill: true,
      segment: {
        borderDash: (ctx) => (ctx.p0DataIndex >= historicalLength - 1 ? [6, 4] : undefined),
      },
    },
    {
      label: 'Solar adoption (%)',
      data: withGap(trend.historical.solarAdoptionPct, trend.projection.solarAdoptionPct),
      borderColor: SOLAR_COLOR,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.35,
      fill: false,
      yAxisID: 'y1',
      segment: {
        borderDash: (ctx) => (ctx.p0DataIndex >= historicalLength - 1 ? [4, 4] : undefined),
      },
    },
    {
      label: 'EV adoption (%)',
      data: withGap(trend.historical.evAdoptionPct, trend.projection.evAdoptionPct),
      borderColor: '#A6F7CF',
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.35,
      fill: false,
      yAxisID: 'y1',
      segment: {
        borderDash: (ctx) => (ctx.p0DataIndex >= historicalLength - 1 ? [4, 4] : undefined),
      },
    },
  ],
}))

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 420 },
  interaction: { mode: 'index', intersect: false },
  scales: {
    x: { grid: { color: MOSS }, ticks: { font: { family: 'ui-monospace, monospace', size: 11 } } },
    y: {
      grid: { color: MOSS },
      ticks: { font: { family: 'ui-monospace, monospace', size: 11 } },
      title: { display: true, text: 'Months/year', color: '#8AA39A' },
    },
    y1: {
      position: 'right',
      grid: { display: false },
      ticks: { font: { family: 'ui-monospace, monospace', size: 11 } },
      title: { display: true, text: 'Adoption %', color: '#8AA39A' },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#8AA39A', font: { family: 'Inter, sans-serif', size: 12 }, boxWidth: 16 },
    },
    tooltip: {
      backgroundColor: '#13201A',
      borderColor: MOSS,
      borderWidth: 1,
      titleColor: '#E8F2EC',
      bodyColor: '#E8F2EC',
      padding: 10,
    },
  },
}
</script>

<template>
  <div class="tp-trend-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
