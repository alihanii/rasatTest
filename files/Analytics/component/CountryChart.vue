<script setup lang="ts">
const chartType = 'donut'

const chartSeries = [55, 25, 20, 18] // donation percentage per category

const chartOptions: ApexOptions = {
  labels: ['Iran', 'America', 'Iraq', 'Oman'],
  legend: {
    position: 'bottom',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}
</script>

<template>
  <BaseChart
    :type="chartType"
    :series="chartSeries"
    :options="chartOptions"
    width="100%"
    height="400"
  />
</template>
