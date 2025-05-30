import type { Ref } from 'vue'
import { ref, watch } from 'vue'

interface UseFetchingOptions<T> {
  immediate?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}

export function useFetching<T>(
  apiFunc: () => Promise<T>,
  keys: Ref<any>[],
  options?: UseFetchingOptions<T>,
) {
  const { immediate = true, onSuccess, onError } = options ?? {}

  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<T | null>(null)
  const isSuccess = ref(false)

  async function fetchData() {
    loading.value = true
    error.value = null
    isSuccess.value = false

    try {
      const result = await apiFunc()
      data.value = result
      isSuccess.value = true

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error'
      error.value = errorMessage
      data.value = null
      isSuccess.value = false

      if (onError) {
        onError(errorMessage)
      }
    } finally {
      loading.value = false
    }
  }

  watch(
    keys,
    () => {
      fetchData()
    },
    { immediate, deep: true },
  )

  return {
    loading,
    error,
    data,
    isSuccess,
    fetchData,
  }
}
