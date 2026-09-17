<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useSeason } from '@/composables/useSeason'
import AppHeader from '@/components/AppHeader.vue'
import MethodologyModal from '@/components/MethodologyModal.vue'

const { season } = useSeason()
const methodologyOpen = ref(false)
</script>

<template>
  <div class="tp-app" :data-season="season">
    <AppHeader @open-methodology="methodologyOpen = true" />
    <RouterView />
    <MethodologyModal :open="methodologyOpen" @close="methodologyOpen = false" />
  </div>
</template>
