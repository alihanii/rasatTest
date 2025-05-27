<template>
  <button
      :class="[
      'base-button',
      `variant-${variant}`,
      size,
      { 'is-loading': loading },
    ]"
      :disabled="disabled || loading"
      @click="$emit('click', $event)"
  >
    <Loader v-if="loading"/>
    <slot v-else/>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: "primary" | "text" | "border";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
});

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  border: 2px solid transparent;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.small {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.medium {
  padding: 8px 16px;
  font-size: 1rem;
}

.large {
  padding: 12px 24px;
  font-size: 1.125rem;
}

.variant-primary {
  background-color: var(--color-avocado-600);
  color: white;
}

.variant-primary:hover:not(:disabled) {
  background-color: var(--color-op-avocado-600);
}

.variant-primary:active:not(:disabled) {
  background-color: var(--color-op-avocado-600);
}

.variant-text {
  background-color: transparent;
  color: var(--color-avocado-600);
  padding-left: 8px;
  padding-right: 8px;
}


.variant-border {
  background-color: transparent;
  border-color: var(--color-avocado-600);
  color: var(--color-avocado-600);
}

.variant-border:hover:not(:disabled) {
  background-color: var(--color-avocado-500);
}

.variant-border:active:not(:disabled) {
  background-color: var(--color-avocado-500);
}

.is-loading {
  position: relative;
  color: transparent !important;
}

.is-loading :deep(.loader-container) {
  background: transparent;
  backdrop-filter: none;
}

.is-loading :deep(.dot) {
  width: 8px;
  height: 8px;
  background-color: currentColor;
}
</style>
