<template>
  <AppHeader />
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'in-out' }" />
  </NuxtLayout>
  <AppFooter />
</template>

<script setup lang="ts">
const siteTitle = '没落大小姐的秘密茶会'
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteTitle}` : siteTitle
  }
})
</script>

<style lang="postcss">
.page-enter-active,
.page-leave-active {
  @apply transition-all duration-300;
}
.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur rotate-12;
}
</style>