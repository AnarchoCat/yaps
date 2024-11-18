<template>
  <AppHeader />
  <NuxtLayout>
    <NuxtPage :transition="{ name: 'page', mode: 'in-out' }" />
  </NuxtLayout>
  <AppFooter />
</template>

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