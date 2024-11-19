<template>
  <article ref="article" class="content-article container max-w-screen-lg p-4 md:px-6 md:py-8 mx-auto">
    <ContentRenderer :value="data as any">
      <ContentRendererMarkdown :value="data as any" :data="mdcVars" />
    </ContentRenderer>
    <button class="fixed right-4 bottom-4 md:right-6 md:bottom-8 p-2 rounded-full border border-gray-300 bg-white z-50 shadow" @click="toggleTocModal">
      <ListBulletIcon class="w-6 h-6" />
    </button>
    <dialog ref="toc-modal" autofocus class="fixed box-content left-0 md:left-1/2 top-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 m-0 w-full h-full md:w-fit md:h-fit open:flex flex-col items-center px-4 pt-10 pb-4 md:rounded md:backdrop:bg-black/30">
      <Toc :depth="3" :value="tocLinks" @jump="closeTocModal" />
      <XMarkIcon class="w-6 h-6 absolute top-4 right-4 cursor-pointer" @click="closeTocModal" />
      <div class="cursor-pointer flex gap-2" @click.prevent="scrollToTop">
        <ArrowUpCircleIcon class="w-6 h-6" />
        回到顶部
      </div>
    </dialog>
  </article>
</template>

<script lang="ts" setup>
import { ListBulletIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { data } = await useAsyncData('page-data', () => queryContent(route.path).findOne())
const tocLinks = data.value?.body?.toc?.links
// Data passed to markdown. Can access with $doc.varname just like front matter.
const mdcVars = ref({ toc: tocLinks })

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  closeTocModal()
}

const tocModal = useTemplateRef('toc-modal')
const article = useTemplateRef('article')

function openTocModal() {
  tocModal.value?.classList.remove('open:animate-fade-out')
  tocModal.value?.classList.add('open:animate-fade-in')
  tocModal.value?.showModal()
}

function closeTocModal() {
  tocModal.value?.classList.remove('open:animate-fade-in')
  tocModal.value?.classList.add('open:animate-fade-out')
  setTimeout(() => {
    tocModal.value?.close()
  }, 190)
}

function toggleTocModal() {
  if (tocModal.value?.hasAttribute('open')) {
    closeTocModal()
  } else {
    openTocModal()
  }
}

onMounted(() => {
  article.value?.querySelectorAll('input[type=checkbox]:disabled').forEach((el) => {
    el.removeAttribute('disabled')
  })
  article.value?.querySelectorAll('li.task-list-item').forEach((el) => {
    if (el.querySelectorAll('label').length < 1) {
      const label = document.createElement('label')
      label.innerHTML = el.innerHTML
      el.innerHTML = ''
      el.appendChild(label)
    }
  })
  tocModal.value?.addEventListener('click', function (e) {
    const { top, left, width, height } = this.getBoundingClientRect()
    if (e.clientX < left || e.clientX > left + width || e.clientY < top || e.clientY > top + height) {
      closeTocModal()
    }
  })
})
</script>

<style lang="postcss">
.content-article {
  h1 {
    @apply text-3xl md:text-4xl font-bold border-b drop-shadow-sm mb-4 md:mb-6 pb-1;
  }
  h2 {
    @apply text-2xl md:text-3xl font-bold border-l-4 border-pink-800 bg-gradient-to-r from-fuchsia-50 to-white pl-4 py-1 my-4;
  }
  h3 {
    @apply text-xl md:text-2xl font-bold my-4 border-l-8 border-pink-800 pl-2 md:pl-4;
  }
  h4 {
    @apply text-lg md:text-xl font-bold my-4 border-l-8 border-indigo-800 pl-2 md:pl-4;
  }
  h5 {
    @apply text-base md:text-lg font-bold my-4 border-l-8 border-emerald-800 pl-2 md:pl-4;
  }
  h6 {
    @apply text-base font-bold my-4;
  }
  input[type='checkbox'] {
    @apply appearance-none w-4 h-4 text-pink-800 border border-gray-400 rounded-sm align-text-bottom transition-all;
    &:checked {
      @apply bg-current border-none;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
  }
  pre {
    @apply max-w-full overflow-auto;
  }
}
</style>
