<template>
  <div class="skeleton" :style="{ width: width, height: height }" />
</template>

<script setup lang="ts">
interface SkeletonProps {
  width?: string
  height?: string
  variant?: 'circular' | 'rectangular' | 'rounded'
}

withDefaults(defineProps<SkeletonProps>(), {
  width: '5rem',
  height: '5rem',
  variant: 'rectangular',
})
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 2s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
