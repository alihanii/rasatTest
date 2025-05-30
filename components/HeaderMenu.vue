<template>
  <baseContainer class="mb-4">
    <div class="flex h-[30px] w-full items-center justify-end md:text-xl">
      <BaseButton
        size="large"
        variant="text"
        class="!m-0 cursor-pointer gap-3 !p-0 md:gap-4"
        @click="() => (route.name !== 'index' ? router.back() : '')"
      >
        {{ route.name == 'index' ? 'home' : route.name }}
        <i class="ri-arrow-right-line pt-1" />
      </BaseButton>
    </div>
  </baseContainer>
</template>
<script setup lang="ts">
const route = useRoute()
const router = useRouter()
</script>

<style scoped></style>
