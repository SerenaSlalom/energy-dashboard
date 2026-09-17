<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const el = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="tp-reveal" :class="{ 'is-visible': visible }">
    <slot />
  </div>
</template>
