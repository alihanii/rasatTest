<template>
  <div class="dataList">
    <div class="dataListWrapper">
      <div>
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
        <slot v-if="data.length" name="pagination" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  ol?: boolean
  data: any[]
  rowClass?: (row: any) => string
  class?: string
  page?: number
  pageSize?: number
  isLoading?: boolean
  headerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  ol: false,
  rowClass: () => '',
  class: '',
  page: 1,
  pageSize: 10,
  isLoading: true,
  headerClass: '',
})

const internalPage = ref(props.page)
const pagedData = computed(() =>
  props.data.slice((internalPage.value - 1) * props.pageSize, internalPage.value * props.pageSize),
)
</script>
<style scoped>
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
