<template>
  <component :is="tag" ref="list" class="relative">
    <slot />
    <button v-if="(attrs.class as string)?.includes('contains-task-list')" type="button" class="absolute top-0 right-0" @click="clear"><ArrowPathIcon class="size-4" /></button>
  </component>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/16/solid'

const { tag = 'ul' } = defineProps<{
  tag?: string
}>()

const attrs = useAttrs()
const list = useTemplateRef('list')

function clear() {
  list.value?.querySelectorAll('input[type=checkbox]:checked').forEach((el: HTMLInputElement) => {
    el.checked = false
  })
}
</script>