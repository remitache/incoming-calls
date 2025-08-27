export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  app: {
    baseURL: '/incoming-calls/',
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      meta: [
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ]
    }
  }
})