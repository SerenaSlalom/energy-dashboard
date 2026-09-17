<script setup lang="ts">
defineEmits<{ 'open-methodology': [] }>()
</script>

<template>
  <header class="tp-header">
    <div class="vf-container vf-nav">
      <a class="vf-nav__logo" href="#top">
        <svg class="tp-header__mark" viewBox="0 0 32 20" fill="none" aria-hidden="true">
          <path d="M1 18 9 4l5 8 3-5 5 6 4-11" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Two Peaks, Four Seasons
      </a>
      <ul class="vf-nav__links">
        <li><a class="vf-nav__link" href="#explore">The Load Curve</a></li>
        <li><a class="vf-nav__link" href="#why">Why It's Changing</a></li>
        <li><a class="vf-nav__link" href="#trend">Trend &amp; Risk</a></li>
      </ul>
      <div class="vf-nav__cluster">
        <button type="button" class="vf-btn vf-btn--ghost" @click="$emit('open-methodology')">
          Methodology
        </button>
      </div>
    </div>
  </header>
</template>
