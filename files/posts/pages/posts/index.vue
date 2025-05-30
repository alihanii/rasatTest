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
          <template v-if="isHeader" #header />
          <template v-else #default>
            <div
              class="bg-avocado-200 flex h-full w-full items-center justify-end space-x-2 rounded-md px-4 text-xl"
            >
              <BaseButton
                size="tiny"
                class="hover:text-primary h-8 text-gray-600"
                @click="
                  () => {
                    selectedSeeComment = item
                    CommentsFetch()
                  }
                "
              >
                <i class="ri-message-3-line" />
              </BaseButton>
              <BaseButton
                size="tiny"
                class="hover:text-primary h-8 text-gray-600"
                @click="() => (selectedEdit = deepClone(item))"
              >
                <i class="ri-edit-line" />
              </BaseButton>
              <BaseButton
                class="h-8 text-gray-600 hover:text-red-500"
                size="tiny"
                @click="() => (selectedDelete = item)"
              >
                <i class="ri-delete-bin-line" />
              </BaseButton>
            </div>
          </template>
        </DataListColumn>
      </template>

      <template #pagination>
        <div class="">
          <Pagination v-model="pageNumber" :perPage="2" :totalPage="10" />
        </div>
      </template>
    </DataList>
  </BaseContainer>

  <BaseModal v-model:visible="selectedDelete">
    <template #header>
      <h2 class="w-full text-center">do you want to delete post with Id {{ selectedDelete.id }}</h2>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <BaseButton :loading="deleteLoading" @click="deleteFetch">delete</BaseButton>
      </div>
    </template>
  </BaseModal>
  <BaseModal v-model:visible="selectedEdit">
    <template #header>
      <h2 class="w-full text-center">post Id: {{ selectedEdit.id }}</h2>
    </template>
    <template #body>
      <div class="flex flex-col gap-4">
        <div>
          <label>id :</label>
          <BaseInput variant="default" v-model="selectedEdit.userId" readonly />
        </div>
        <div>
          <label>title :</label>
          <BaseInput
            :isError="titleErrored"
            errorText="don't write persian words"
            variant="default"
            v-model="selectedEdit.title"
            class="truncate"
          />
        </div>
        <div>
          <label>body :</label>
          <BaseTextErea
            :isError="bodyErrored"
            errorText="don't write persian words"
            variant="default"
            v-model="selectedEdit.body"
            class="truncate"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center">
        <BaseButton
          :disabled="disabled || bodyErrored || titleErrored"
          :loading="updateLoading"
          @click="updateFetch"
        >
          save
        </BaseButton>
      </div>
    </template>
  </BaseModal>
  <BaseModal v-model:visible="selectedSeeComment">
    <template #header>
      <h2 class="w-full text-center">post Id: {{ selectedSeeComment.id }}</h2>
    </template>
    <template #body>
      <div class="relative min-h-20">
        <Loader v-if="CommentsLoading" />
        <div v-else class="scrollbar-hide flex max-h-[500px] flex-col gap-4 overflow-y-auto pb-4">
          <BaseContainer :key="item.id" v-for="item in commentData" class="flex flex-col gap-2">
            <div>
              <label>name</label>
              <BaseInput variant="default" :model-value="item.name" class="truncate" />
            </div>
            <div>
              <label>body</label>
              <BaseTextErea variant="default" :model-value="item.body" class="truncate" />
            </div>
            <div>
              <label>email</label>
              <BaseInput variant="default" :model-value="item.email" class="truncate" />
            </div>
          </BaseContainer>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { Pagination } from '~/components'
import { deletePost, getComments, getPosts, type Post, updatePost } from '~/files/posts/services'
import { useFetching } from '~/composables'
import { deepClone, sleep, Toast } from '~/extention'

const persianRegEx = /[\u0600-\u06FF]/

const rowClass = () => 'bg-avocado-200 !h-[55px]'

const selectedDelete = ref<Post | null>(null)
const selectedEdit = ref<Post | null>(null)
const selectedSeeComment = ref<Post | null>(null)
const data = ref<Post[]>([])
const pageNumber = ref(1)

// ===================================================================================================

const disabled = computed(() => {
  const selected = data.value.find((item) => item.id === selectedEdit.value.id)
  return (
    selectedEdit.value?.title === selected?.title && selectedEdit.value?.body === selected?.body
  )
})
const bodyErrored = computed(() => {
  return persianRegEx.test(String(selectedEdit.value.body))
})
const titleErrored = computed(() => {
  return persianRegEx.test(String(selectedEdit.value.title))
})

// ===================================================================================================

const { loading } = useFetching(
  () => getPosts({ page: pageNumber.value, limit: 10 }),
  [pageNumber],
  {
    immediate: true,
    onSuccess: (posts) => {
      data.value = posts
    },
  },
)

const { loading: deleteLoading, fetchData: deleteFetch } = useFetching(
  () => deletePost(selectedDelete.value?.userId),
  [],
  {
    immediate: false,
    onSuccess: () => {
      Toast('success', `post deleted`)
      data.value = data.value.filter((item) => item.id !== selectedDelete.value.id)
    },
    onError(errMsg) {
      Toast('error', errMsg)
    },
    onFinally() {
      sleep().then(() => (selectedDelete.value = null))
    },
  },
)

const { loading: updateLoading, fetchData: updateFetch } = useFetching(
  () => updatePost(selectedEdit.value?.id, selectedEdit.value),
  [],
  {
    immediate: false,
    onSuccess: () => {
      Toast('success', `post updated`)
      const selected = data.value.findIndex((item) => item.id === selectedEdit.value.id)
      if (selected !== -1) data.value[selected] = selectedEdit.value
    },
    onError(errMsg) {
      Toast('error', errMsg)
    },
    onFinally() {
      sleep().then(() => (selectedEdit.value = null))
    },
  },
)

const {
  loading: CommentsLoading,
  fetchData: CommentsFetch,
  data: commentData,
} = useFetching(() => getComments({ postId: selectedSeeComment.value?.id }), {
  immediate: false,
})
</script>
