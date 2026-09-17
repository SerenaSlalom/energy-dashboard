<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string
    tilt?: 'left' | 'right' | 'none'
  }>(),
  { tilt: 'none' },
)
</script>

<template>
  <div
    class="vf-card--stat"
    :class="{ 'vf-card--tilt-left': tilt === 'left', 'vf-card--tilt-right': tilt === 'right' }"
  >
    <span class="vf-card__stat-label">{{ label }}</span>
    <span class="vf-card__stat-numeral">{{ value }}</span>
    <div class="vf-card__spark" aria-hidden="true" />
  </div>
</template>
