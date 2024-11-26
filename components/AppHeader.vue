<template>
  <header class="relative">
    <nav class="relative flex flex-col md:flex-row md:justify-end lg:justify-center items-center gap-2 md:px-20 pt-12 md:pt-0 md:h-12 max-h-12 has-[:checked]:max-h-96 has-[:checked]:pb-4 md:pb-0 overflow-hidden transition-all bg-gradient-to-br from-fuchsia-50 to-sky-50 dark:from-fuchsia-900 dark:to-sky-900 shadow md:shadow-lg shadow-sky-50">
      <NuxtLink to="/" class="absolute top-3 left-4 md:left-6 text-pink-800 dark:text-pink-50 saturate-150 drop-shadow-sm font-bold">🎀没落大小姐的秘密茶会🍵</NuxtLink>
      <label class="absolute top-3 right-4 md:hidden">
        <input v-model="isChecked" type="checkbox" class="peer" hidden />
        <BarsArrowDownIcon class="text-indigo-800 dark:text-indigo-50 size-6 peer-checked:rotate-180 transition-transform" />
      </label>
      <NuxtLink v-for="link, index in links" :key="index" :to="link.to" class="text-indigo-800 dark:text-indigo-50 hover:text-emerald-800 dark:hover:text-emerald-50 border-b border-indigo-800 dark:border-indigo-50 hover:border-b-2 hover:border-emerald-800 dark:hover:border-emerald-50 hover:scale-110 transition-all hover:drop-shadow-sm" @click="isChecked = false">{{ link.label }}</NuxtLink>
      <div class="absolute top-3 right-20 md:right-12 cursor-pointer" @click="switchTheme">
        <SunIcon v-if="theme === 'light'" class="size-6 text-orange-800" />
        <MoonIcon v-if="theme === 'dark'" class="size-6 text-white" />
        <ComputerDesktopIcon v-if="theme === 'system'" class="size-6 text-current" />
      </div>
      <LanguageIcon ref="localeIcon" class="absolute top-3 right-12 md:right-4 size-6 cursor-pointer" @click="showLocales = !showLocales" />
    </nav>
    <div v-show="showLocales" class="flex flex-col items-stretch border border-indigo-800 rounded bg-white absolute top-10 right-12 md:right-4 z-10">
      <NuxtLink v-for="availableLocale in availableLocales" :key="availableLocale.code" :to="switchLocalePath(availableLocale.code)" class="px-2 text-center hover:bg-fuchsia-50">{{ availableLocale.name }}</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ComputerDesktopIcon, MoonIcon, SunIcon, LanguageIcon } from '@heroicons/vue/24/outline'
import { BarsArrowDownIcon } from '@heroicons/vue/24/solid'

const { locale, locales } = useI18n({ useScope: 'global' })
const { t } = useI18n({ useScope: 'local' })
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const isChecked = defineModel<boolean>()
const showLocales = ref<boolean>(false)
const theme = ref<'light' | 'dark' | 'system'>('system')

function switchTheme() {
  if (theme.value === 'light') {
    theme.value = 'dark'
    localStorage.theme = 'dark'
  } else if (theme.value === 'dark') {
    theme.value = 'system'
    localStorage.removeItem('theme')
  } else {
    theme.value = 'light'
    localStorage.theme = 'light'
  }
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

const links = computed(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('articles'), to: localePath('/articles') },
  { label: t('friends'), to: localePath('/friends') },
  { label: t('about'), to: localePath('/about') }
])

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const localeIcon = useTemplateRef('localeIcon')
onMounted(() => {
  document.addEventListener('click', function (e) {
    if (!localeIcon.value.contains(e.target)) {
      showLocales.value = false
    }
  })
})
</script>

<i18n lang="yaml">
zh:
  home: 首页
  articles: 文章
  friends: 好友
  about: 关于
en:
  home: Home
  articles: Articles
  friends: Friends
  about: About
ja:
  home: ホーム
  articles: 記事
  friends: 友人
  about: プロフィール
</i18n>