<template>
  <BaseContainer class="h-[716px]">
    <DataList
        :ol="false"
        :data="data ? data : []"
        :rowClass="rowClass"
        class="!h-full"
        headerClass="data-list_header !mb-0"
        :pageSize="10"
        :page="pageNumber"
        :isLoading="loading"
    >
      <template #columns="{ item, isHeader }">
        <DataListColumn :width="250">
          <template v-if="isHeader" #header>
            <p>title</p>
          </template>
          <template v-else #default>
            <p class="truncate">{{ item.title }}</p>
          </template>
        </DataListColumn>

        <DataListColumn :width="350">
          <template v-if="isHeader" #header>
            <p>body</p>
          </template>
          <template v-else #default>
            <p class="truncate">{{ item.body }}</p>
          </template>
        </DataListColumn>

        <DataListColumn :width="50">
          <template v-if="isHeader" #header>
            <p>userId</p>
          </template>
          <template v-else #default>
            <p>{{ item.id }}</p>
          </template>
        </DataListColumn>
        <DataListColumn sticky width="1">
          <template v-if="isHeader" #header/>
          <template v-else #default>
            <div class="flex items-center justify-end space-x-2 bg-avocado-200 rounded-md w-full h-full px-4 text-xl">
              <BaseButton size="tiny" class="text-gray-600 hover:text-primary h-8">
                <i class="ri-message-3-line "/>
              </BaseButton>
              <BaseButton
                  size="tiny"
                  class="text-gray-600 hover:text-primary h-8"
                  @click="()=>{
                    selectedDelete = item
                  }"
              >
                <i   class="ri-edit-line"/>
              </BaseButton>
              <BaseButton
                  class="text-gray-600 hover:text-red-500 h-8"
                  size="tiny"
                  @click="()=>{
                    selectedDelete = item
                  }"
              >
                <i class="ri-delete-bin-line"/>
              </BaseButton>
            </div>
          </template>
        </DataListColumn>
      </template>

      <template #pagination>
        <div class="">
          <Pagination
              v-model="pageNumber"
              :perPage="2"
              :totalPage=" 10 "
          />
        </div>
      </template>
    </DataList>
  </BaseContainer>

  <BaseModal v-model:visible="selectedDelete" class="">
    <template #header>
      <h2 class="w-full text-center">do you want to delete post with userId {{ selectedDelete.id }}</h2>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <BaseButton :loading="deleteLoading" @click="fetchData">delete</BaseButton>
      </div>
    </template>
  </BaseModal>
  <BaseModal v-model:visible="selectedEdit" class="">
    <template #header>
      <h2 class="w-full text-center">post userId: {{ selectedDelete.id }}</h2>
    </template>
    <template #body>
      <div>
        <div>
          <span>userId :</span>
        </div>
        <div></div>
        <div></div>
      </div>

    </template>
    <template #footer>
      <div class="flex justify-center">
        <BaseButton :loading="deleteLoading" @click="fetchData">delete</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import {ref} from "vue";


import {Pagination} from "~/components";
import {deletePost, getPosts, type Post} from "~/files/posts/services";
import {useFetching} from "~/composables";
import {sleep, Toast} from "~/extention";

const rowClass = () => 'bg-avocado-200 !h-[55px]';

const selectedDelete = ref<Post | null>(null)
const selectedEdit = ref<Post | null>(null)
const data = ref<Post []>([])


const pageNumber = ref(1)
const {loading} = useFetching(
    () => getPosts({page: pageNumber.value, limit: 10}),
    [pageNumber],
    {
      immediate: true,
      onSuccess: (posts) => {
        data.value = posts
      }
    },
);

const {loading: deleteLoading, fetchData} = useFetching(
    () => deletePost(selectedDelete.value?.userId),
    [], {
      immediate: false,
      onSuccess: () => {
        Toast('success', `post deleted`)
        data.value = data.value.filter(item => item.id !== selectedDelete.value.id)
        sleep().then(() => selectedDelete.value = null)
      },
      onError(errMsg) {
        Toast('error', errMsg)
        sleep().then(() => selectedDelete.value = null)
      },
    }
);
</script>

