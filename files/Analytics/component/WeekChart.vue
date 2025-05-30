<script setup lang="ts">
import { ref } from 'vue'

const chartRef = ref()

function exportChart() {
  if (chartRef.value?.chartRef?.chart) {
    chartRef.value.chartRef.chart.dataURI().then(({ imgURI, blob }) => {
      const a = document.createElement('a')
      a.href = imgURI
      a.download = 'visits_chart.png'
      a.click()
    })
  }
}
</script>

<template>
  <div class="space-y-4">
    <BaseChart
      ref="chartRef"
      type="line"
      :series="[{ name: 'Visits', data: [120, 200, 150, 170, 240, 300, 180] }]"
      :options="{
        chart: { id: 'visits-chart', toolbar: { show: true } },
        xaxis: { categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
        dataLabels: { enabled: true },
      }"
    />
    <button @click="exportChart" class="rounded bg-blue-500 px-4 py-2 text-white">
      Export Chart
    </button>
  </div>
</template>
