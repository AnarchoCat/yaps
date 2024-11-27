<template>
  <div class="max-w-screen-lg mx-auto p-4 md:py-8 md:px-6">
    <Head>
      <Title>{{ t('title') }}</Title>
    </Head>
    <h1 class="text-2xl md:text-3xl text-center mb-4 md:mb-6">{{ t('h1') }}</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li v-for="article in contentList?.filter(item => item._path)" :key="article._path">
        <NuxtLink :lang="locale === defaultLocale || article._path!.endsWith(`.${locale}`) ? null : defaultLanguage" :to="article._path!.endsWith(`.${locale}`) ? localePath(article._path!.replace(`.${locale}`, '')) : localePath(article._path!)" class="w-full h-full flex flex-col gap-2 p-4 rounded bg-sky-50 dark:bg-sky-900 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900 transition-colors relative">
          <h2 class="font-bold">{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { locale, availableLocales, defaultLocale, locales } = useI18n({ useScope: 'global' })
const localePath = useLocalePath()
const defaultLanguage = locales.value.find(loc => loc.code === defaultLocale).language

const { data: defaultLocaleContentList } = await useAsyncData('default-locale-content-list', () => queryContent('article').where({
  _path: {
    $not: {
      $containsAny: availableLocales.map(value => `.${value}`)
    }
  }
}).find())

const { data: currentLocaleContentList } = await useAsyncData('current-locale-content-list-2', () => queryContent('article').where({
  _path: {
    $contains: `.${locale.value}`
  }
}).find())

const noLocalizationContentList = defaultLocaleContentList.value?.filter(content => currentLocaleContentList.value?.find(item => item._path == `${content._path}.${locale.value}`) === undefined)
const contentList = currentLocaleContentList.value?.concat(noLocalizationContentList ?? [])

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