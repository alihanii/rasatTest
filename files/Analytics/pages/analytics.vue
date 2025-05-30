<template>
  <div class="flex gap-4 max-lg:flex-col">
    <BaseContainer>
      <div class="flex items-center justify-between">
        <span>Visits by Country</span>
        <BaseButton
          size="small"
          variant="text"
          class="cursor-pointer gap-3 md:gap-4"
          @click="() => console.log('')"
        >
          export
          <i class="ri-upload-2-line pt-1" />
        </BaseButton>
      </div>
    </BaseContainer>
    <BaseContainer>
      <div class="flex items-center justify-between">
        <span>Visits by Day of Week</span>
        <BaseButton
          size="small"
          variant="text"
          class="cursor-pointer gap-3 md:gap-4"
          @click="() => console.log('')"
        >
          export
          <i class="ri-upload-2-line pt-1" />
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
