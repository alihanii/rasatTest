<template>
  <div class=" h-[30px] md:text-xl mb-4 w-full flex items-center justify-end">
    <BaseButton
        size="large"
        variant="text"
        class="md:gap-4 gap-3 cursor-pointer"
        @click="()=>route.name !== 'index' ? router.back() :''"
    >
      {{ route.name == 'index' ? 'home' : route.name }}
      <i class="ri-arrow-right-line  pt-1"/>
    </BaseButton>
  </div>

</template>
<script setup lang="ts">

const route = useRoute();
const router = useRouter();
</script>

<style scoped>

</style>