<template>
  <AppHeader />
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'in-out' }" />
  </NuxtLayout>
  <AppFooter />
</template>

<script setup lang="ts">
const siteTitle = '没落大小姐的秘密茶会'
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${siteTitle}` : siteTitle
  }
}))

onMounted(() => {
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
})
</script>

<style lang="postcss">
:root {
  @apply scroll-smooth;
}
.page-enter-active,
.page-leave-active {
  @apply transition-all duration-300;
}
.page-enter-from,
.page-leave-to {
  @apply opacity-0 blur rotate-12;
}
</style>