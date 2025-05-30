import type { ApexCharts } from 'apexcharts'

export async function exportChartAsPDF(
  chartInstance: ApexCharts,
  options?: {
    orientation: 'portrait' | 'landscape'
    filename?: string
  },
) {
  if (!chartInstance) return

  const { jsPDF } = await import('jspdf')
  const { imgURI } = await chartInstance.dataURI()

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4',
  })

  const width = pdf.internal.pageSize.getWidth()
  const height = (width / 16) * 9

  pdf.addImage(imgURI, 'PNG', 40, 40, width - 40, height)
  pdf.save(options?.filename ?? 'chart-report.pdf')
}
