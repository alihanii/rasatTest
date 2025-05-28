<template>
  <BaseContainer class="h-[900px]">
    <DataList
        :ol="false"
        rowHeight="70px"
        :data="data ? data : []"
        :rowClass="rowClass"
        class="!h-full"
        headerClass="data-list_header !mb-0"
        :pageSize="10"
        :page="pageNumber"
        :isLoading="loading"
    >
      <template #columns="{ item, isHeader }">
        <DataListColumn :width="200">
          <template v-if="isHeader" #header>
            <div>1</div>
          </template>
          <template v-else #default>
            <p class="truncate">{{ item.title }}</p>
          </template>
        </DataListColumn>

        <DataListColumn :width="200">
          <template v-if="isHeader" #header>
            <div>2</div>
          </template>
          <template v-else #default>
            <div>{{ item.subtitle }}</div>
          </template>
        </DataListColumn>

        <DataListColumn :width="250">
          <template v-if="isHeader" #header>
            <div>3</div>
          </template>
          <template v-else #default>
            <div>{{ item.extra }}</div>
          </template>
        </DataListColumn>
      </template>

      <template #pagination>
        <div class="">
          <Pagination
              v-model="pageNumber"
              :perPage="2"
              :totalPage="10"
          />
        </div>
      </template>
    </DataList>
  </BaseContainer>

</template>
<script setup lang="ts">
import {ref} from "vue";


import {Pagination} from "~/components/index.js";
import {getPosts} from "~/files/posts/services";
import {useFetching} from "~/composables/index.js";

const pageNumber = ref(1)
const {loading, data} = useFetching(
    () => getPosts({page: pageNumber.value, limit: 10}),
    [pageNumber],
    {immediate: true}
);

watch(() => data, (val) => console.log(val.value[0]), {deep: true});

const rowClass = () => 'bg-avocado-200';
</script>

