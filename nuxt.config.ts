// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  icon: {
    serverBundle: {
      collections: ['mdi'] 
    }
  },
  ignore: ['vite.lib.config.ts'] ,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})