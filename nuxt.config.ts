// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/content'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'manifest',
          type: 'application/manifest+json',
          href: '/site.webmanifest'
        }
      ]
    }
  },
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'only-multiline',
        braceStyle: '1tbs'
      }
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
})