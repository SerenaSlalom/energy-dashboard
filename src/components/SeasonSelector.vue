<script setup lang="ts">
import { SEASON_ORDER } from '@/types/energy'
import type { SeasonKey } from '@/types/energy'
import { useSeason } from '@/composables/useSeason'

const { season, energy, setSeason } = useSeason()
</script>

<template>
  <div class="vf-tabs tp-season-tabs" role="tablist" aria-label="Select a season">
    <button
      v-for="key in SEASON_ORDER"
      :key="key"
      type="button"
      class="vf-tabs__tab"
      :class="{ 'is-active': season === key }"
      role="tab"
      :aria-selected="season === key"
      :data-season="key"
      @click="setSeason(key as SeasonKey)"
    >
      <span class="tp-season-tabs__swatch" :style="{ color: `var(--season-${key})` }" />
      {{ energy.seasons[key].label }}
    </button>
  </div>
</template>
