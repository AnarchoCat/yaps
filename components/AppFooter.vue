<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <footer class="py-4 md:py-8 mt-4 border-t flex flex-col gap-4 items-center mx-auto md:w-fit md:px-16">
    <div class="flex gap-2 justify-center items-center">
      <NuxtLink to="mailto:d2717p@gmail.com">
        <EnvelopeIcon class="size-6" />
      </NuxtLink>
      <NuxtLink to="//x.com/lyhng_rika">
        <IconX class="size-5" />
      </NuxtLink>
      <NuxtLink to="//github.com/AnarchoCat/yaps">
        <IconGithub class="size-6" />
      </NuxtLink>
    </div>
    <p class="text-center">&copy; 2024 Rica the Botsuraku-Reijō. All rights reserved.</p>
  </footer>
</template>