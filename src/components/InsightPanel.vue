<script setup lang="ts">
import { useSeason } from '@/composables/useSeason'
import AppIcon from './AppIcon.vue'

const { activePoint } = useSeason()
</script>

<template>
  <div class="tp-insight">
    <template v-if="activePoint">
      <span class="vf-badge vf-badge--accent tp-insight__badge">
        <AppIcon name="zap" :size="12" />
        AI Insight
      </span>
      <h3 class="tp-insight__title">{{ activePoint.title }}</h3>
      <p class="tp-insight__summary">{{ activePoint.summary }}</p>

      <div class="tp-insight__breakdown">
        <div v-for="item in activePoint.breakdown" :key="item.driver" class="tp-insight__bar-row">
          <div class="tp-insight__bar-label">
            <span>{{ item.driver }}</span>
            <span>{{ item.pct }}%</span>
          </div>
          <div class="tp-insight__bar-track">
            <div class="tp-insight__bar-fill" :style="{ width: item.pct + '%' }" />
          </div>
        </div>
      </div>

      <p class="tp-insight__implication">{{ activePoint.implication }}</p>

      <span class="vf-badge tp-insight__delta">{{ activePoint.deltaNote }}</span>
    </template>

    <div v-else class="tp-insight__empty">
      <span class="vf-badge vf-badge--accent tp-insight__badge">
        <AppIcon name="zap" :size="12" />
        AI Insight
      </span>
      <p class="vf-body-md" style="color: var(--vf-muted); margin: 0">
        Click a peak or dip marker on the load curve to see what's driving it — and what's
        changed about it over the last few years.
      </p>
    </div>
  </div>
</template>
