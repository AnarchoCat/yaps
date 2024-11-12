<template>
  <nav class="relative bg-gradient-to-br from-pink-200 to-cyan-200 shadow-lg shadow-cyan-200/50">
    <div class="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-purple-400 saturate-150 drop-shadow-sm font-bold">🎀没落大小姐的秘密茶会🍵</div>
    <div class="flex justify-center py-4 gap-2">
      <NuxtLink v-for="link, index in links" :key="index" :to="link.to" class="text-indigo-600 hover:text-indigo-800 hover:drop-shadow-sm border-b border-b-indigo-400 hover:border-b-indigo-800">{{ link.label }}</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const links = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/articles/' },
]
</script>