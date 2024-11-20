<template>
  <figure ref="fig" class="flex flex-col items-center gap-2 my-4">
    <NuxtImg :src="refinedSrc" :alt :width :height class="max-w-full md:max-w-96 rounded shadow" loading="lazy" placeholder @load="loadTitle" />
    <figcaption class="text-sm md:text-base text-center font-light">{{ title }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
const title = ref<string>()

const fig = useTemplateRef('fig')

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  return `/img/content/${props.src}`
})

function loadTitle() {
  title.value = fig.value?.title
}
</script>