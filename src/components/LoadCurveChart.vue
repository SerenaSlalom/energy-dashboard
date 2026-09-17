<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartData, ChartOptions, Plugin } from 'chart.js'
import { useSeason } from '@/composables/useSeason'
import { SECTOR_LABELS } from '@/types/energy'
import type { SectorKey } from '@/types/energy'
import { SEASON_COLORS, SOLAR_COLOR, MINT, CHARCOAL_INK, MOSS } from '@/data/season-colors'

const { season, sector, seasonData, activePoint, selectPoint } = useSeason()

function formatHour(h: number): string {
  if (h === 0) return '12a'
  if (h === 12) return '12p'
  return h > 12 ? `${h - 12}p` : `${h}a`
}

const labels = Array.from({ length: 24 }, (_, h) => formatHour(h))

const seasonColor = computed(() => SEASON_COLORS[season.value])

const chartData = computed<ChartData<'line'>>(() => {
  const s = seasonData.value
  const color = seasonColor.value
  const datasets: ChartData<'line'>['datasets'] = [
    {
      label: 'Total grid demand',
      data: s.netLoad,
      borderColor: color,
      backgroundColor: color + '33',
      pointRadius: 0,
      pointHitRadius: 14,
      borderWidth: 2.5,
      tension: 0.4,
      fill: true,
      order: 2,
    },
    {
      label: 'Solar generation',
      data: s.solar,
      borderColor: SOLAR_COLOR,
      backgroundColor: 'transparent',
      pointRadius: 0,
      pointHitRadius: 14,
      borderWidth: 1.75,
      borderDash: [5, 4],
      tension: 0.4,
      fill: false,
      order: 1,
    },
  ]

  if (sector.value !== 'all') {
    datasets.push({
      label: `${SECTOR_LABELS[sector.value as SectorKey]} load (raw)`,
      data: s[sector.value as SectorKey],
      borderColor: '#A6F7CF',
      backgroundColor: 'transparent',
      pointRadius: 0,
      pointHitRadius: 14,
      borderWidth: 1.75,
      tension: 0.4,
      fill: false,
      order: 0,
    })
  }

  return { labels, datasets }
})

const markerPoints = computed(() =>
  seasonData.value.pointsOfInterest.map((p) => ({
    x: p.hour,
    y: seasonData.value.netLoad[p.hour] ?? 0,
    type: p.type,
    active: activePoint.value?.id === p.id,
  })),
)

const poiMarkerPlugin: Plugin<'line'> = {
  id: 'poiMarkers',
  afterDatasetsDraw(chart) {
    const points = markerPoints.value
    if (!points.length) return
    const xScale = chart.scales.x
    const yScale = chart.scales.y
    if (!xScale || !yScale) return
    const { ctx } = chart
    ctx.save()
    for (const p of points) {
      const px = xScale.getPixelForValue(p.x)
      const py = yScale.getPixelForValue(p.y)
      const radius = p.active ? 7 : 5.5

      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fillStyle = MINT
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = CHARCOAL_INK
      ctx.stroke()

      if (p.active) {
        ctx.beginPath()
        ctx.arc(px, py, radius + 5, 0, Math.PI * 2)
        ctx.strokeStyle = MINT
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }
    ctx.restore()
  },
}

const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 420, easing: 'easeOutQuart' },
  interaction: { mode: 'index', intersect: false },
  onClick(evt, _elements, chart) {
    if (evt.x == null) return
    const xScale = chart.scales.x
    if (!xScale) return
    const hourIndex = Math.round(xScale.getValueForPixel(evt.x) ?? -1)
    const match = seasonData.value.pointsOfInterest.find((p) => p.hour === hourIndex)
    if (match) selectPoint(match.id)
  },
  scales: {
    x: {
      grid: { color: MOSS },
      ticks: { font: { family: "'JetBrains Mono', ui-monospace, monospace", size: 11 } },
    },
    y: {
      grid: { color: MOSS },
      ticks: { font: { family: "'JetBrains Mono', ui-monospace, monospace", size: 11 } },
      title: { display: true, text: 'MW (illustrative)', color: '#8AA39A' },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#13201A',
      borderColor: MOSS,
      borderWidth: 1,
      titleColor: '#E8F2EC',
      bodyColor: '#E8F2EC',
      padding: 10,
      titleFont: { family: "'Manrope', sans-serif", weight: 700 },
      bodyFont: { family: "'JetBrains Mono', ui-monospace, monospace" },
    },
  },
}))
</script>

<template>
  <div class="tp-chart-card__canvas-wrap">
    <Line :data="chartData" :options="chartOptions" :plugins="[poiMarkerPlugin]" />
  </div>
</template>
