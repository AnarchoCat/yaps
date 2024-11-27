<template>
  <article class="container mx-auto p-4 md:px-6 md:py-8">
    <Head>
      <Title>{{ t('title') }}</Title>
    </Head>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'local' })
</script>

<i18n lang="yaml">
zh:
  title: 关于
en:
  title: About
ja:
  title: プロフィール
</i18n>