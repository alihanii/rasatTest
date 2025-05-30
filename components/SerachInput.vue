<template>
  <div class="data-list-search-header !py-1">
    <!-- Search icon (decorative) -->
    <i class="ri-search-line search-icon pt-0.5" />

    <input
      v-bind="fieldAttrs"
      ref="inputRef"
      class="data-list-search-header-input"
      :value="modelValue"
      :placeholder="title"
      @input="handleInputChange"
    />

    <i @click="handleClear" class="ri-close-fill clear-icon" :class="{ show: modelValue }" />
  </div>
</template>

<script setup lang="ts">
import { ref, type InputHTMLAttributes } from 'vue'

interface Props {
  title: string
  modelValue?: string
  fieldAttrs?: InputHTMLAttributes
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function handleInputChange(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleClear() {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>

<style scoped>
.data-list-search-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  width: 100%;
}

.data-list-search-header-input {
  flex: 1;
  height: 100%;
  padding-right: 30px;
  border: 1px solid transparent;
  border-radius: 15px;
  background: transparent;
  transition: all 0.5s;
  caret-color: var(--color-avocado-500);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-list-search-header-input:focus {
  background: var(--color-white, #fff);
  border-color: var(--color-avocado-200);
}

.data-list-search-header-input::placeholder {
  color: var(--color-avocado-600);
  transition: color 0.5s;
}

.data-list-search-header-input:focus::placeholder {
  color: var(--color-avocado-600);
  outline: 1px solid transparent;
}

.data-list-search-header-input:focus-visible {
  color: var(--color-avocado-600);
  outline: none;
  border: 1px solid var(--color-avocado-600);
}

/* Search icon */
.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-gray-400, #bfbfbf);
}

/* Clear icon */
.clear-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
  transition: opacity 0.3s;
  color: var(--color-avocado-600, #6b6b6b);
}

.clear-icon.show {
  opacity: 1;
  pointer-events: all;
}
</style>
