<template>
  <article class="content-article container max-w-screen-lg p-4 md:px-6 md:py-8 mx-auto">
    <ContentDoc />
  </article>
</template>

<script lang="ts" setup>
onMounted(() => {
  const article = document.querySelector('.content-article')
  article?.querySelectorAll('input[type=checkbox]:disabled').forEach((el) => {
    el.removeAttribute('disabled')
  })
  article?.querySelectorAll('li.task-list-item').forEach((el) => {
    const label = document.createElement('label')
    label.innerHTML = el.innerHTML
    el.innerHTML = ''
    el.appendChild(label)
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
}
</style>
