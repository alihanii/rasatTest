<script setup lang="ts">
import { computed, defineProps, defineEmits, withDefaults } from 'vue'

interface Props {
  modelValue?: number
  totalPage: number
  perPage?: number
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  perPage: 10,
  limit: 5,
})

const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get: () => props.modelValue ?? 1,
  set: (val: number) => {
    if (val >= 1 && val <= 10) {
      emit('update:modelValue', val)
    }
  },
})

const pages = computed(() => {
  const pagesArr: number[] = []
  const half = Math.floor(props.limit / 2)
  let start = Math.max(1, currentPage.value - half)
  let end = start + props.limit! - 1
  if (end > props.totalPage) {
    end = props.totalPage
    start = Math.max(1, end - props.limit! + 1)
  }

  for (let i = start; i <= end; i++) {
    pagesArr.push(i)
  }
  return pagesArr
})

function goToPage(page: number) {
  if (page !== currentPage.value && page >= 1 && page <= props.totalPage) {
    currentPage.value = page
  }
}
</script>

<template>
  <nav aria-label="Pagination Navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <BaseButton
          size="small"
          class="page-link"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </BaseButton>
      </li>

      <li
        v-for="page in pages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <BaseButton size="tiny" class="page-link" @click="goToPage(page)">
          {{ page }}
        </BaseButton>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPage }">
        <BaseButton
          size="small"
          class="page-link"
          :disabled="currentPage === totalPage"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </BaseButton>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  gap: 0.25rem;
}

.page-item {
  user-select: none;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}

.page-item.active .page-link {
  background-color: var(--color-avocado-500);
}

.page-link {
}
</style>
