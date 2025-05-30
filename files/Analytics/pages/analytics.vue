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
      <ClientOnly>
        <WeekChart />
      </ClientOnly>
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
      <ClientOnly>
        <CountryChart />
      </ClientOnly>
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import WeekChart from '~/files/Analytics/component/WeekChart.vue'
import CountryChart from '~/files/Analytics/component/CountryChart.vue'
</script>

<style></style>
