<script setup lang="ts">
import { ref } from 'vue'
import type { ApexOptions } from 'apexcharts'

const chartRef = ref<any>()

const handleExport = async () => {
  const chart = chartRef.value?.chartRef?.chart
  if (chart) {
    await exportChartAsPDF(chart, { filename: 'بازدید-هفتگی.pdf', orientation: 'landscape' })
  }
}

const op: ApexOptions = {
  chart: { id: 'visits-chart', toolbar: { show: false } },
  xaxis: {
    categories: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
  },
  dataLabels: { enabled: false },
}
</script>

<template>
  <div class="space-y-4 text-right">
    <div class="flex items-center justify-between">
      <span>نمودار بازدید براساس هفته</span>
      <BaseButton
        size="small"
        variant="text"
        class="cursor-pointer gap-3 md:gap-4"
        @click="handleExport"
      >
        pdf
        <i class="ri-upload-2-line pt-1" />
      </BaseButton>
    </div>
    <BaseChart
      ref="chartRef"
      type="line"
      :series="[{ name: 'بازدید', data: [120, 200, 150, 170, 240, 300, 180] }]"
      :options="op"
    />
  </div>
</template>
