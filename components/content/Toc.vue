<template>
  <ul class="text-indigo-800 border border-indigo-300 w-fit p-4 rounded my-4">
    <li v-for="section in toc" :key="section.text">
      <div class="flex justify-between items-center gap-4 peer">
        <NuxtLink :to="section.href">{{ section.text }}</NuxtLink>
        <label><input type="checkbox" hidden class="peer" :checked="depth > 1" /><ChevronDownIcon class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
      </div>
      <ul class="ml-4 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
        <li v-for="subsection in section.children" :key="subsection.text">
          <div class="flex justify-between items-center gap-4 peer">
            <NuxtLink :to="subsection.href">{{ subsection.text }}</NuxtLink>
            <label><input type="checkbox" hidden class="peer" :checked="depth > 2" /><ChevronDownIcon class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
          </div>
          <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
            <li v-for="subsubsection in subsection.children" :key="subsubsection.text">
              <div class="flex justify-between items-center gap-4 peer">
                <NuxtLink :to="subsubsection.href">{{ subsubsection.text }}</NuxtLink>
                <label><input type="checkbox" hidden class="peer" :checked="depth > 3" /><ChevronDownIcon class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
              </div>
              <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
                <li v-for="subsubsubsection in subsubsection.children" :key="subsubsubsection.text">
                  <div class="flex justify-between items-center gap-4 peer">
                    <NuxtLink :to="subsubsubsection.href">{{ subsubsubsection.text }}</NuxtLink>
                    <label><input type="checkbox" hidden class="peer" :checked="depth > 4" /><ChevronDownIcon class="w-4 h-4 peer-checked:rotate-180 transition-transform" /></label>
                  </div>
                  <ul class="ml-8 max-h-0 peer-has-[:checked]:max-h-96 overflow-hidden transition-all">
                    <li v-for="subsubsubsubsection in subsubsubsection.children" :key="subsubsubsubsection.text">
                      <NuxtLink :to="subsubsubsubsection.href">{{ subsubsubsubsection.text }}</NuxtLink>
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

interface Props {
  depth: number
}

withDefaults(defineProps<Props>(), {
  depth: () => 3
})

const toc = ref()
interface Section {
  text: string | null
  href: string | null
  children: Section[]
}
function getAllSections(startLevel = 2, endLevel = 6) {
  const list: Section[] = []
  if (startLevel <= endLevel) {
    document.querySelectorAll(`h${startLevel}`).forEach((el) => {
      list.push({
        text: el.textContent,
        href: `#${el.id}`,
        children: getAllSections(startLevel + 1, endLevel)
      })
    })
  }
  return list
}
onMounted(
  () => {
    toc.value = getAllSections()
  }
)
</script>