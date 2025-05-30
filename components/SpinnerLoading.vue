<template>
  <div
    class="spinner"
    role="status"
    aria-label="Loading"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <svg class="spinner-svg" viewBox="0 0 50 50" aria-hidden="true" focusable="false">
      <circle class="spinner-circle" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

withDefaults(defineProps<{ size?: number }>(), {
  size: 20,
})
</script>

<style scoped>
.spinner {
  display: inline-block;
}

.spinner-svg {
  animation: rotate 2s linear infinite;
  width: 100%;
  height: 100%;
}

.spinner-circle {
  stroke: var(--color-avocado-400);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
