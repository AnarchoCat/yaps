<template>
  <figure ref="fig" class="flex flex-col items-center gap-2 my-4">
    <NuxtImg :src="refinedSrc" :alt :width :height class="max-w-full md:max-w-96 rounded shadow" loading="lazy" placeholder />
    <figcaption class="text-sm md:text-base text-center font-light">{{ title }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
const fig = useTemplateRef('fig')

const { src = '', alt = '' } = defineProps<{
  src: string
  alt: string
  width?: string | number
  height?: string | number
  title?: string
}>()

const refinedSrc = computed(() => {
  if (src.startsWith('/')) {
    return src
  }
  return `/img/content/${src}`
})
</script>