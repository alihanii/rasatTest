// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  build: { transpile: ['vue3-apexcharts', 'apexcharts'] },
  app: {
    head: {
      htmlAttrs: { dir: 'rtl', lang: 'fa' },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css',
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/icon-192x192.png',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#C2D932' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  extends: ['./files/posts', './files/analytics'],
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@vite-pwa/nuxt'],
})
