<template>
  <div class="flex gap-4 max-lg:flex-col">
    <BaseContainer>
      <div class="flex justify-between items-center ">

        <span>Visits by Country</span>
        <BaseButton
            size="small"
            variant="text"
            class="md:gap-4 gap-3 cursor-pointer"
            @click="()=>console.log('')"
        >
          export
          <i class="ri-upload-2-line pt-1"/>
        </BaseButton>
      </div>
    </BaseContainer>
    <BaseContainer>
      <div class="flex justify-between items-center ">

        <span>Visits by Day of Week</span>
        <BaseButton
            size="small"
            variant="text"
            class="md:gap-4 gap-3 cursor-pointer"
            @click="()=>console.log('')"
        >
          export
          <i class="ri-upload-2-line pt-1"/>
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
