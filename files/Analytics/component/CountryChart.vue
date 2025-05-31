<script setup lang="ts">
import { ref } from 'vue'

const chartType = 'donut'
const chartRef = ref<any>()

const chartSeries = [55, 25, 20, 18] // donation percentage per category

const handleExport = async () => {
  const chart = chartRef.value?.chartRef?.chart
  if (chart) {
    await exportChartAsPDF(chart, { filename: 'بازدید-کشور.pdf', orientation: 'portrait' })
  }
}

const chartOptions: ApexOptions = {
  labels: ['ایران', 'هلند', 'عراق', 'ژاپن', 'عمان'],
  responsive: [
    {
      breakpoint: 222,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ],
}
</script>

<template>
  <div class="space-y-4 text-right">
    <div class="flex items-center justify-between">
      <span>نمودار بازدید براساس کشور</span>
      <BaseButton
        size="small"
        variant="text"
        class="cursor-pointer gap-3 md:gap-4"
        @click="handleExport"
      >
        pdf
        <i class="ri-upload-2-line" />
      </BaseButton>
    </div>
    <BaseChart
      ref="chartRef"
      :type="chartType"
      :series="chartSeries"
      :options="chartOptions"
      width="100%"
      height="400"
    />
  </div>
</template>
