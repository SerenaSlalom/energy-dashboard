<script setup lang="ts">
type IconName = 'sun' | 'zap' | 'check' | 'x' | 'info' | 'chevron-down' | 'trending-up' | 'plus-circle'

withDefaults(
  defineProps<{
    name: IconName
    size?: number
  }>(),
  { size: 20 },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </template>
    <template v-else-if="name === 'zap'">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </template>
    <template v-else-if="name === 'check'">
      <path d="M20 6 9 17l-5-5" />
    </template>
    <template v-else-if="name === 'x'">
      <path d="M18 6 6 18M6 6l12 12" />
    </template>
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="8" r="0.25" fill="currentColor" stroke="none" />
    </template>
    <template v-else-if="name === 'chevron-down'">
      <path d="m6 9 6 6 6-6" />
    </template>
    <template v-else-if="name === 'trending-up'">
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </template>
    <template v-else-if="name === 'plus-circle'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </template>
  </svg>
</template>
