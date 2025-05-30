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
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  extends: ['./files/posts', './files/analytics'],
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/ui', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'rasa test app',
      short_name: 'RasaTestApp',
      description: 'Description of your app',
      theme_color: '#C2D932FF',
      background_color: '#f3f4f6',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
  },
})
