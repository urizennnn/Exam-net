<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppInput from '../AppInput.vue'
import AppSelect from '../AppSelect.vue'

const emit = defineEmits(['update:search', 'update:status'])
const route = useRoute()
const router = useRouter()

const search = ref((route.query.search as string) || '')
const status = ref((route.query.status as string) || '')

watch(search, (val) => {
  emit('update:search', val)
  const q = { ...route.query, search: val || undefined }
  router.replace({ query: q })
}, { flush: 'post' })
watch(status, (val) => {
  emit('update:status', val)
  const q = { ...route.query, status: val || undefined }
  router.replace({ query: q })
})
</script>
<template>
  <div class="flex flex-wrap gap-2 md:grid md:grid-cols-2 mb-4">
    <AppInput v-model="search" placeholder="Search" class="h-10 text-sm flex-1" />
    <AppSelect v-model="status" :items="['','active','invited']" class="h-10 text-sm w-32" />
  </div>
</template>
