<template>
  <div class="max-w-screen-lg mx-auto p-4 md:py-8 md:px-6">
    <h1 class="text-2xl md:text-3xl text-center mb-4 md:mb-6">文章目录</h1>
    <ContentList v-slot="{ list }">
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path" class="w-full h-full flex flex-col gap-2 p-4 rounded bg-sky-50 hover:bg-fuchsia-50 transition-colors">
            <h2 class="font-bold">{{ article.title }}</h2>
            <p>{{ article.description }}</p>
          </NuxtLink>
        </li>
      </ul>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
</script>