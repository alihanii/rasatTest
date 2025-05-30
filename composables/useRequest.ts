type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'

interface RequestOptions {
  method?: HttpMethod
  queryParams?: Record<string, string | number | boolean>
  body?: any
  headers?: HeadersInit
}

export async function useRequest<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', queryParams, body, headers } = options

  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(queryParams).map(([k, v]) => [k, String(v)]),
    ).toString()

    url += url.includes('?') ? '&' + queryString : '?' + queryString
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body && method !== 'GET' && method !== 'HEAD') {
    fetchOptions.body = JSON.stringify(body)
  }

  const res = await fetch(url, fetchOptions)

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status} ${res.statusText}`)
  }

  const contentType = res.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return res.json() as Promise<T>
  } else {
    return res.text() as unknown as Promise<T>
  }
}
