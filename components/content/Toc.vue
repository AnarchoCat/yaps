<template>
  <ul v-if="value !== undefined" class="text-indigo-800 dark:text-indigo-50 border border-indigo-300 dark:border-indigo-600 w-fit p-4 rounded my-4">
    <li v-for="link in value" :key="link.id">
      <div class="flex justify-between items-center gap-4 peer">
        <NuxtLink :to="`#${link.id}`" @click="$emit('jump')">{{ link.text }}</NuxtLink>
        <label><input type="checkbox" hidden class="peer" :checked="depth > 1" /><ChevronDownIcon v-if="link.children" class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
      </div>
      <ul class="ml-4 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
        <li v-for="link1 in link.children" :key="link1.id">
          <div class="flex justify-between items-center gap-4 peer">
            <NuxtLink :to="`#${link1.id}`" @click="$emit('jump')">{{ link1.text }}</NuxtLink>
            <label><input type="checkbox" hidden class="peer" :checked="depth > 2" /><ChevronDownIcon v-if="link1.children" class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
          </div>
          <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
            <li v-for="link2 in link1.children" :key="link2.id">
              <div class="flex justify-between items-center gap-4 peer">
                <NuxtLink :to="`#${link2.id}`" @click="$emit('jump')">{{ link2.text }}</NuxtLink>
                <label><input type="checkbox" hidden class="peer" :checked="depth > 3" /><ChevronDownIcon v-if="link2.children" class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
              </div>
              <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
                <li v-for="link3 in link2.children" :key="link3.id">
                  <div class="flex justify-between items-center gap-4 peer">
                    <NuxtLink :to="`#${link3.id}`" @click="$emit('jump')">{{ link3.text }}</NuxtLink>
                    <label><input type="checkbox" hidden class="peer" :checked="depth > 4" /><ChevronDownIcon v-if="link3.children" class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
                  </div>
                  <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
                    <li v-for="link4 in link3.children" :key="link4.id">
                      <NuxtLink :to="`#${link4.id}`" @click="$emit('jump')">{{ link4.text }}</NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/16/solid'
import type { TocLink } from '@nuxt/content'

interface Props {
  depth?: number
  value?: TocLink[]
}

const { depth = 3, value = undefined } = defineProps<Props>()

defineEmits<{
  (e: 'jump'): void
}>()
</script>