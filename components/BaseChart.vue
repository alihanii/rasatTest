<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'
import { computed, ref } from 'vue'

interface Props {
  type: keyof ApexChart['type'] extends infer T ? T & string : never
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
  options?: ApexOptions
  width?: number | string
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: 350,
  options: () => ({}),
})

const chartRef = ref()

defineExpose({ chartRef })

const mergedOpts = computed<ApexOptions>(() => {
  return {
    ...props.options,
    chart: { id: 'base-chart', toolbar: { show: false }, fontFamily: 'Estedad, sans-serif' },
    xaxis: {
      ...(props.options?.xaxis || {}),
      reversed: true,
    },
    style: {
      fontFamily: 'Estedad, sans-serif',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  }
})
</script>

<template>
  <ClientOnly>
    <apexchart
      ref="chartRef"
      :type="props.type"
      :series="props.series"
      :options="mergedOpts"
      :width="props.width"
      :height="props.height"
    />
  </ClientOnly>
</template>

<style scoped></style>
