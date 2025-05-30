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

const mergedOpts = computed<ApexOptions>(() => ({
  chart: { id: 'base-chart', toolbar: { show: true } },
  ...props.options,
}))
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
