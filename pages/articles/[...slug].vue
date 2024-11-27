<template>
  <article ref="article" :lang class="content-article container max-w-screen-lg p-4 md:px-6 md:py-8 mx-auto">
    <Head>
      <Title>{{ data?.title }}</Title>
    </Head>
    <ContentRenderer :value="data as any">
      <ContentRendererMarkdown :value="data as any" :data="mdcVars" />
    </ContentRenderer>
    <button class="fixed right-4 bottom-4 md:right-6 md:bottom-8 p-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 z-50 shadow hover:shadow-md transition-all opacity-70 hover:opacity-100" @click="toggleTocModal">
      <ListBulletIcon class="w-6 h-6" />
    </button>
    <dialog ref="toc-modal" autofocus class="fixed box-content left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 m-0 w-full h-full md:w-fit md:h-fit open:flex flex-col items-center px-4 pt-10 pb-4 md:rounded md:backdrop:bg-black/30 dark:md:backdrop:bg-white/30 dark:bg-gray-900 dark:text-white">
      <Toc :depth="3" :value="tocLinks" @jump="closeTocModal" />
      <XMarkIcon class="w-6 h-6 absolute top-4 right-4 cursor-pointer" @click="closeTocModal" />
      <div class="cursor-pointer flex gap-2" @click.prevent="scrollToTop">
        <ArrowUpCircleIcon class="w-6 h-6" />
        回到顶部
      </div>
    </dialog>
  </article>
</template>

<script lang="ts" setup>
import { ListBulletIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline'

// This is used to remove the locale prefix in the path
const switchLocalePath = useSwitchLocalePath()

const { defaultLocale, locale, locales, availableLocales } = useI18n()

// Query content data
const { data: dataList } = await useAsyncData('page-data', () => queryContent(switchLocalePath(defaultLocale)).find())
const dataLocale = dataList.value?.find(data => data.language === locale.value || data._path?.split('.').pop() === locale.value)
const data = dataLocale ? dataLocale : dataList.value?.find(data => !('language' in data) || data.language === defaultLocale)

// Set lang attribute of article element
const lang = ref<string>()
const contentLocale = availableLocales.find(value => data?._path?.endsWith(`.${value}`))
if (contentLocale) {
  lang.value = locales.value.find(value => value.code === contentLocale).language
} else if (data?.language) {
  lang.value = data.language
} else {
  lang.value = locales.value.find(value => value.code === defaultLocale).language
}

// Get toc links
const tocLinks = data?.body?.toc?.links

// Data passed to markdown. Can access with $doc.varname just like front matter.
const mdcVars = ref({ toc: tocLinks })

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeTocModal()
}

const tocModal = useTemplateRef('toc-modal')
const article = useTemplateRef('article')

function openTocModal() {
  tocModal.value?.classList.remove('open:animate-fade-out')
  tocModal.value?.classList.add('open:animate-fade-in')
  tocModal.value?.showModal()
}

function closeTocModal() {
  tocModal.value?.classList.remove('open:animate-fade-in')
  tocModal.value?.classList.add('open:animate-fade-out')
  setTimeout(() => {
    tocModal.value?.close()
  }, 190)
}

function toggleTocModal() {
  if (tocModal.value?.hasAttribute('open')) {
    closeTocModal()
  } else {
    openTocModal()
  }
}

onMounted(() => {
  article.value?.querySelectorAll('input[type=checkbox]:disabled').forEach((el) => {
    el.removeAttribute('disabled')
  })
  tocModal.value?.addEventListener('click', function (e) {
    const { top, left, width, height } = this.getBoundingClientRect()
    if (e.clientX < left || e.clientX > left + width || e.clientY < top || e.clientY > top + height) {
      closeTocModal()
    }
  })
})
</script>

<style lang="postcss">
.content-article {
  h1 {
    @apply text-3xl md:text-4xl font-bold border-b drop-shadow-sm mb-4 md:mb-6 pb-1;
  }
  h2 {
    @apply text-2xl md:text-3xl font-bold border-l-4 border-pink-800 dark:border-pink-200 bg-gradient-to-r from-fuchsia-50 to-white dark:from-fuchsia-900 dark:to-gray-900 pl-4 py-1 my-4;
  }
  h3 {
    @apply text-xl md:text-2xl font-bold my-4 border-l-8 border-pink-800 dark:border-pink-200 pl-2 md:pl-4;
  }
  h4 {
    @apply text-lg md:text-xl font-bold my-4 border-l-8 border-indigo-800 dark:border-indigo-200 pl-2 md:pl-4;
  }
  h5 {
    @apply text-base md:text-lg font-bold my-4 border-l-8 border-emerald-800 dark:border-emerald-200 pl-2 md:pl-4;
  }
  h6 {
    @apply text-base font-bold my-4;
  }
  pre {
    @apply max-w-full overflow-auto;
  }
}
</style>
