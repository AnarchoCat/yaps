<template>
  <header>
    <nav class="relative flex flex-col md:flex-row md:justify-end lg:justify-center items-center gap-2 md:px-6 pt-12 md:pt-0 md:h-12 max-h-12 has-[:checked]:max-h-96 has-[:checked]:pb-4 md:pb-0 overflow-hidden transition-all bg-gradient-to-br from-fuchsia-50 to-sky-50 shadow md:shadow-lg shadow-sky-50">
      <NuxtLink to="/" class="absolute top-3 left-4 md:left-6 text-pink-800 saturate-150 drop-shadow-sm font-bold">🎀没落大小姐的秘密茶会🍵</NuxtLink>
      <label class="absolute top-3 right-4 md:hidden">
        <input v-model="isChecked" type="checkbox" class="peer" hidden />
        <BarsArrowDownIcon class="text-indigo-800 size-6 peer-checked:rotate-180 transition-transform" />
      </label>
      <NuxtLink v-for="link, index in links" :key="index" :to="link.to" class="text-indigo-800 hover:text-emerald-800 border-b border-indigo-800 hover:border-b-2 hover:border-emerald-800 hover:scale-110 transition-all hover:drop-shadow-sm" @click="isChecked = false">{{ link.label }}</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { BarsArrowDownIcon } from '@heroicons/vue/24/solid'

const isChecked = defineModel<boolean>()

const links = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/articles/' },
]
</script>