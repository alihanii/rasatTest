export interface ICriterion {
  type: 'search' | 'filter' | 'sort'
  field: string
  value: string | number | (string | number[]) | 'asc' | 'desc'
}
