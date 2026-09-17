<script setup lang="ts">
import { SECTOR_LABELS } from '@/types/energy'
import type { SectorFilter } from '@/types/energy'
import { useSeason } from '@/composables/useSeason'

const { sector, setSector } = useSeason()

const options: { key: SectorFilter; label: string }[] = [
  { key: 'all', label: 'All sectors' },
  ...(Object.entries(SECTOR_LABELS) as [SectorFilter, string][]).map(([key, label]) => ({
    key,
    label,
  })),
]
</script>

<template>
  <div class="vf-tabs tp-sector-toggle" role="tablist" aria-label="Isolate a sector">
    <button
      v-for="opt in options"
      :key="opt.key"
      type="button"
      class="vf-tabs__tab"
      :class="{ 'is-active': sector === opt.key }"
      role="tab"
      :aria-selected="sector === opt.key"
      @click="setSector(opt.key)"
    >
      {{ opt.label }}
    </button>
  </div>
</template>
