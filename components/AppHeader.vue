<template>
  <header>
    <nav class="relative flex flex-col md:flex-row md:justify-end lg:justify-center items-center gap-2 md:px-12 pt-12 md:pt-0 md:h-12 max-h-12 has-[:checked]:max-h-96 has-[:checked]:pb-4 md:pb-0 overflow-hidden transition-all bg-gradient-to-br from-fuchsia-50 to-sky-50 dark:from-fuchsia-900 dark:to-sky-900 shadow md:shadow-lg shadow-sky-50">
      <NuxtLink to="/" class="absolute top-3 left-4 md:left-6 text-pink-800 dark:text-pink-50 saturate-150 drop-shadow-sm font-bold">🎀没落大小姐的秘密茶会🍵</NuxtLink>
      <label class="absolute top-3 right-4 md:hidden">
        <input v-model="isChecked" type="checkbox" class="peer" hidden />
        <BarsArrowDownIcon class="text-indigo-800 dark:text-indigo-50 size-6 peer-checked:rotate-180 transition-transform" />
      </label>
      <NuxtLink v-for="link, index in links" :key="index" :to="link.to" class="text-indigo-800 dark:text-indigo-50 hover:text-emerald-800 dark:hover:text-emerald-50 border-b border-indigo-800 dark:border-indigo-50 hover:border-b-2 hover:border-emerald-800 dark:hover:border-emerald-50 hover:scale-110 transition-all hover:drop-shadow-sm" @click="isChecked = false">{{ link.label }}</NuxtLink>
      <div class="absolute top-3 right-12 md:right-4 cursor-pointer" @click="switchTheme">
        <SunIcon v-if="theme === 'light'" class="size-6 text-orange-800" />
        <MoonIcon v-if="theme === 'dark'" class="size-6 text-white" />
        <ComputerDesktopIcon v-if="theme === 'system'" class="size-6 text-current" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { BarsArrowDownIcon } from '@heroicons/vue/24/solid'

const isChecked = defineModel<boolean>()
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

const links: {
  label: string
  to: string
}[] = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/articles' },
  { label: '好友', to: '/friends' },
  { label: '关于', to: '/about' }
]
</script>