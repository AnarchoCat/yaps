<template>
  <header>
    <nav class="relative bg-gradient-to-br from-pink-200 to-cyan-200 shadow-lg shadow-cyan-200/50">
      <div class="flex justify-between items-center px-4 md:px-6 h-12 peer">
        <div class="text-purple-400 saturate-150 drop-shadow-sm font-bold">🎀没落大小姐的秘密茶会🍵</div>
        <label class="md:hidden">
          <input type="checkbox" hidden class="peer" />
          <BarsArrowDownIcon class="text-purple-600 size-6 peer-checked:rotate-180 transition-all" />
        </label>
      </div>
      <div class="md:absolute md:top-0 md:w-full md:h-12 flex flex-col md:flex-row md:justify-center items-center gap-2 max-h-0 overflow-hidden peer-has-[:checked]:max-h-96 md:peer-has-[:checked]:max-h-none peer-has-[:checked]:pb-4 md:pb-0 md:peer-has-[:checked]:pb-0 md:max-h-none transition-all">
        <NuxtLink v-for="link, index in links" :key="index" :to="link.to" class="text-indigo-600 hover:text-indigo-800 hover:drop-shadow-sm border-b border-b-indigo-400 hover:border-b-indigo-800">{{ link.label }}</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { BarsArrowDownIcon } from '@heroicons/vue/24/solid'

const links = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/articles/' },
]
</script>