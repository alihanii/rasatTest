<template>
  <div class="loader-container">
    <div class="loader">
      <div class="spinner">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
      </div>
      <p v-if="text" class="loading-text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string;
}>();
</script>

<script lang="ts">
export default {
  name: "Loader",
};
</script>

<style scoped>
.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  z-index: 10;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-avocado-600);
  animation: bounce 0.5s ease-in-out infinite;
}

.dot2 {
  animation-delay: 0.1s;
}

.dot3 {
  animation-delay: 0.2s;
}

.loading-text {
  color: var(--color-avocado-600);
  font-size: 0.9rem;
  margin: 0;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
