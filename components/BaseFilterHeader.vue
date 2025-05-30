<!-- FilterSortInput.vue -->
<template>
  <div class="filter-sort">
    <button
      @click="
        () => {
          handleOrder()
        }
      "
      :class="[arrowClass, 'sort-toggle']"
    >
      <i class="ri-arrow-up-s-line sort-icon" />
    </button>

    <slot />
    <button @click="$emit('filterClick')">
      <i class="ri-filter-3-line filter-icon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  sortOrder?: 'asc' | 'desc' | ''
}>()

const emit = defineEmits<{
  (e: 'sortToggle'): 'asc' | 'desc' | ''
  (e: 'filterClick'): void
}>()

const arrowClass = computed(() => {
  return {
    'arrow-asc': props.sortOrder === 'asc',
    'arrow-desc': props.sortOrder === 'desc',
    'arrow-none': !props.sortOrder || props.sortOrder === '',
  }
})

function handleOrder() {
  const order = props.sortOrder === 'asc' ? 'desc' : props.sortOrder === 'desc' ? '' : 'asc'
  emit('sortToggle', order)
}
</script>

<style scoped>
.filter-sort {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sort-icon,
.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.filter-icon {
  font-size: 1.2rem;
}

.sort-icon {
  transition: all 0.2s ease;
  font-size: 1.5rem;
}

.arrow-asc i {
  transform: rotate(0deg);
  color: var(--color-avocado-600);
}

.arrow-desc i {
  transform: rotate(180deg);
  color: var(--color-avocado-600);
}

.arrow-none i {
  color: #a0a0a0;
}
</style>
