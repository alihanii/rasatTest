// composables/useMetaTags.ts

import { useHead } from '#imports'

interface MetaTag {
  name?: string
  property?: string
  content: string
}

interface MetaOptions {
  title?: string
  description?: string
  keywords?: string
  additionalMeta?: MetaTag[]
}

export function useMetaTags(options: MetaOptions) {
  const metaTags: MetaTag[] = []

  if (options.description) {
    metaTags.push({ name: 'description', content: options.description })
    metaTags.push({ property: 'og:description', content: options.description })
  }

  if (options.keywords) {
    metaTags.push({ name: 'keywords', content: options.keywords })
  }

  if (options.additionalMeta) {
    metaTags.push(...options.additionalMeta)
  }

  useHead({
    title: options.title,
    meta: metaTags,
  })
}
