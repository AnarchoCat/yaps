<template>
  {{ formattedString }}
</template>

<script setup lang="ts">
const props = defineProps<{
  iso: string
}>()
const date = new Date(props.iso)
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const hour = date.getHours()
const minute = date.getMinutes()
const formattedString = `${year}/${month}/${day} ${hour}:${minute}`
</script>