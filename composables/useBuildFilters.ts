import type { ICriterion } from '~/type'

export function useBuildFilters(
  list: ICriterion[],
): Record<string, string | number | (string | number)[]> {
  const out: Record<string, string | number | (string | number)[]> = {}

  const filterItems = list.filter((item) => item.type === 'filter')

  const expanded = filterItems.flatMap(({ type, field, value }) =>
    value.map((v) => ({ type, field, value: v })),
  )

  const filterList = [...list.filter((item) => item.type !== 'filter'), ...expanded]
  for (const c of filterList) {
    if (c.value === '' || c.value == null) continue

    switch (c.type) {
      case 'filter':
        out[c.field as string] = c.value
        break
      case 'search':
        out[`${String(c.field)}_like`] = String(c.value)
        break
      case 'sort':
        out._sort = c.field as string
        out._order = c.value as 'asc' | 'desc'
        break
    }
  }
  return out
}
