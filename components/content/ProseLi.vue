<template>
  <li>
    <label v-if="(attrs.class as string)?.includes('task-list-item')">
      <slot />
    </label>
    <slot v-else />
  </li>
</template>

<script setup lang="ts">
const attrs = useAttrs()
</script>

<style lang="postcss">
li.task-list-item {
  input[type='checkbox'] {
    @apply appearance-none w-4 h-4 text-pink-800 border border-gray-400 rounded-sm align-text-bottom transition-all;
    &:checked {
      @apply bg-current border-none;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
  }
}
</style>