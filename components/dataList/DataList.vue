<template>
  <div class="dataList">
    <div class="dataListWrapper">
      <div class="dataListHeader">
        <h2>{{ label }}</h2>
        <BaseButton
          v-if="data.length && hasExel"
          class="exportBtn"
          @click="exportExcel"
          size="medium"
          title="Download visible columns as .xlsx"
        >
          Export Excel
        </BaseButton>
      </div>

      <div class="flex-1">
        <div :class="[headerClass, 'header']">
          <div class="olHeader">
            <span>ID</span>
          </div>

          <slot name="columns" :isHeader="true" />
        </div>
        <div>
          <div v-if="isLoading" class="rowList">
            <div
              v-for="(item, index) in pageSize"
              :key="index"
              :class="[rowClass(item, index), 'row']"
            >
              <BaseSkeleton height="100%" width="100%" class="rounded" />
            </div>
          </div>
          <div v-else-if="!data.length" class="notFound">not found any things</div>
          <div v-else class="rowList">
            <div
              v-for="(item, index) in pagedData"
              :key="index"
              :class="[rowClass(item, index), 'row']"
              @click="emit('rowClick', item)"
            >
              <div class="olColumn">
                {{ (page - 1) * pageSize + index + 1 }}
              </div>

              <slot name="columns" :item="item" :index="index" :isHeader="false" />
            </div>
          </div>
        </div>
      </div>
      <div class="right-0 bottom-[-60px]">
        <slot name="pagination" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'
import * as XLSX from 'xlsx'

interface Props {
  ol?: boolean
  data: any[]
  rowClass?: (row: any) => string
  class?: string
  page?: number
  pageSize?: number
  isLoading?: boolean
  headerClass?: string
  hasExel?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  ol: false,
  rowClass: () => '',
  class: '',
  page: 1,
  hasExel: true,
  pageSize: 10,
  isLoading: true,
  headerClass: '',
  label: '',
})

const emit = defineEmits<{
  (e: 'rowClick'): any
}>()

const internalPage = ref(props.page)
const pagedData = computed(() =>
  props.data.slice((internalPage.value - 1) * props.pageSize, internalPage.value * props.pageSize),
)

function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(props.data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Data')
  XLSX.writeFile(wb, 'data-list.xlsx')
}
</script>
<style scoped>
.dataListHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-avocado-600);
}

.notFound {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataList {
  position: relative;
  height: 100%;
  width: 100%;
}

.dataListWrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  position: absolute;
}

.header {
  gap: 20px;
  margin-top: 10px;
  height: 40px;
  display: flex;
  align-items: center;
}

.olHeader {
  color: var(--color-avocado-600);
  flex: 0 0 60px;
}

.olHeader span {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rowList {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: max-content;
}

.row {
  display: flex;
  align-items: center;
  border-radius: 12px;
  gap: 20px;
}

.olColumn {
  color: var(--color-avocado-600);
  flex: 0 0 60px;
  padding: 0 10px;
  box-sizing: border-box;
  text-align: center;
}
</style>
