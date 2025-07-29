<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ status: 'Online' | 'Offline' }>()
const classes = computed(() => props.status === 'Online'
  ? 'bg-green-500 text-white'
  : 'bg-gray-400 text-white')
</script>
<template>
  <span class="px-2 py-1 rounded-full text-xs font-medium" :class="classes">
    {{ props.status }}
  </span>
</template>
