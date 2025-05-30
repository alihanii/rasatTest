<template>
  <div class="flex gap-4 max-lg:flex-col">
    <BaseContainer>
      <WeekChart />
    </BaseContainer>
    <BaseContainer class="px-0">
      <CountryChart />
    </BaseContainer>
  </div>
</template>

<script setup lang="ts">
import WeekChart from '~/files/Analytics/component/WeekChart.vue'
import CountryChart from '~/files/Analytics/component/CountryChart.vue'

useMetaTags({
  title: 'Analysis & Reports',
  description: 'Deep insights and analytics on various topics.',
  keywords: 'analysis, insights, reports, nuxt',
})
</script>

<style></style>
