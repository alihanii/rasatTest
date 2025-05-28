<template>
  <div
      class="base-container"
  >
    <slot/>
  </div>
</template>

<style scoped>
.base-container {
  position: relative;
  width: 100%;
  padding: .8rem 1.5rem;
  border: 1px solid var(--color-avocado-200);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 0.75rem;
  background-color: white;

}</style>
