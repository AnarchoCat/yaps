<template>
  <article class="container mx-auto p-4 md:py-8">
    <Head>
      <Title>{{ t('title') }}</Title>
    </Head>
    <h1 class="text-center font-bold text-2xl md:text-3xl mb-8">没落大小姐的友人帐</h1>
    <div class="flex flex-col items-center gap-8 text-center">
      <section>
        <NuxtLink to="//observatoryx.vercel.app" class="text-[#00baa2] font-bold">ObservatoryX - 天文觀測站</NuxtLink>
        <p>汐（Simon）的个人博客</p>
      </section>
      <section>
        <NuxtLink to="//sirkku-igloo.com" class="text-[#6f9fc7] font-bold">Bella的小屋</NuxtLink>
        <p>Bella🦊的个人博客</p>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="yaml">
zh:
  title: 友人帐
en:
  title: Friends
ja:
  title: 友人帳
</i18n>