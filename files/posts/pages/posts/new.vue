<template>
  <BaseContainer class="flex flex-col gap-4">
    <p class="text-avocado-600 text-2xl font-bold">add new post</p>
    <div>
      <label for="title">title</label>
      <BaseInput
        errorText="don't write persian words"
        :isError="titleErrored"
        v-model="newPost.title"
        variant="default"
        :fieldAttrs="{ placeholder: 'add the title' }"
      />
    </div>
    <div>
      <label for="userId">userId</label>
      <BaseInput
        variant="default"
        v-model="newPost.userId"
        :fieldAttrs="{ placeholder: 'add the userId' }"
      />
    </div>
    <div>
      <label for="body">body</label>
      <BaseTextErea
        v-model="newPost.body"
        variant="default"
        :fieldAttrs="{ placeholder: 'add the body' }"
      />
    </div>
    <BaseButton
      @click="() => fetchData()"
      :loading="loading"
      :disabled="!disabled"
      variant="primary"
      type="submit"
      >add
    </BaseButton>
  </BaseContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createPost, type Post } from '~/files/posts/services'
import { useFetching } from '~/composables'
import { Toast } from '~/extention'

const persianRegEx = /[\u0600-\u06FF]/

const newPost = ref<Omit<Post, 'id'>>({ body: '', userId: '', title: '' })

const titleErrored = computed(() => {
  return persianRegEx.test(String(newPost.value.title))
})
const disabled = computed(() => {
  const allBlank = Object.values(newPost.value).some((v) => !v.trim())
  return !allBlank && !titleErrored.value
})

const { loading, fetchData } = useFetching(() => createPost(newPost.value), [], {
  immediate: false,
  onSuccess: () => {
    Toast('success', 'post created')
  },
  onError(errMsg) {
    console.log(errMsg)
    Toast('error', errMsg)
  },
})
</script>

<style scoped></style>
