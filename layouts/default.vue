<template>
  <main>
    <slot />
  </main>
</template>

<style lang="postcss">
:root {
  @apply dark:bg-gray-900 dark:text-white transition-colors;
}
</style>