<template>
  <textarea
    :class="[
      'base-textarea',
      `variant-${variant}`,
      { 'is-disabled': disabled },
      { 'is-readonly': readonly },
      { 'is-borderless': variant === 'none' },
    ]"
    v-bind="{ ...fieldAttrs }"
    :disabled="disabled"
    :readonly="readonly"
    :value="modelValue"
    @input="handleInput"
  />
  <div v-if="isError" class="flex items-center gap-1 text-sm text-red-500">
    <i class="ri-information-line pt-1"></i>
    <p>{{ errorText }}</p>
  </div>
</template>

<script setup lang="ts">
import type { TextareaHTMLAttributes } from 'vue'

interface Props {
  fieldAttrs?: TextareaHTMLAttributes
  modelValue?: string | number
  disabled?: boolean
  readonly?: boolean
  variant?: 'default' | 'none'
  errorText?: string
  isError?: boolean
}

withDefaults(defineProps<Props>(), {
  isError: false,
})
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.base-textarea {
  width: 100%;
  min-height: 5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;
  background-color: white;
  color: #333;
  resize: vertical;
}

.variant-default {
  border: 1px solid var(--color-avocado-500);
}

.variant-none,
.variant-transparent {
  border: none;
  background-color: transparent;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #e7e7e7;
}

.is-readonly {
  background-color: #e7e7e7;
  cursor: default;
}

.base-textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-avocado-200);
}

.is-borderless:focus {
  box-shadow: none;
}
</style>
