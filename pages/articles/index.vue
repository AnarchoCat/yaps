<template>
  <div class="max-w-screen-lg mx-auto p-4 md:py-8 md:px-6">
    <Head>
      <Title>{{ t('title') }}</Title>
    </Head>
    <h1 class="text-2xl md:text-3xl text-center mb-4 md:mb-6">{{ t('h1') }}</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="article in contentList" :key="article._path">
        <NuxtLink :to="article._path?.endsWith(`.${locale}`) ? localePath(article._path.replace(`.${locale}`, '')) : article._path" class="w-full h-full flex flex-col gap-2 p-4 rounded bg-sky-50 dark:bg-sky-900 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900 transition-colors relative">
          <h2 class="font-bold">{{ article.title }}</h2>
          <p>{{ article.description }}</p>
          <MapPinIcon v-if="article._path?.endsWith(`.${locale}`) || (article.language !== defaultLocale && article.language === locale)" class="size-6 text-red-800 absolute right-4 top-4" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { MapPinIcon } from '@heroicons/vue/24/solid'

const { locale, defaultLocale, availableLocales } = useI18n({ useScope: 'global' })
const localePath = useLocalePath()

const { data: defaultLocaleContentList } = await useAsyncData('default-locale-content-list', () => queryContent('article').where({
  _path: {
    $not: {
      $containsAny: availableLocales.map(value => `.${value}`)
    }
  }
}).find())

const { data: currentLocaleContentList1 } = await useAsyncData('current-locale-content-list-1', () => queryContent('article').where({
  language: {
    $eq: locale.value
  }
}).find())

const { data: currentLocaleContentList2 } = await useAsyncData('current-locale-content-list-2', () => queryContent('article').where({
  _path: {
    $contains: `.${locale.value}`
  }
}).find())

const currentLocaleContentList = currentLocaleContentList1.value?.concat(currentLocaleContentList2.value ?? [])

const contentList = currentLocaleContentList ? currentLocaleContentList.filter(article => article._path).concat(defaultLocaleContentList.value ? defaultLocaleContentList.value?.filter(article => article._path) : []) : defaultLocaleContentList.value?.filter(article => article._path)

const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="yaml">
zh:
  title: 文章
  h1: 文章目录
en:
  title: Articles
  h1: Article List
ja:
  title: 記事
  h1: 記事一覧
</i18n>