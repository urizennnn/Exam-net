<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '../AppButton.vue'
import StatusBadge from '@admin/components/StatusBadge.vue'
import { useMembersStore } from '../../store/members'
import { storeToRefs } from 'pinia'

const props = defineProps<{ members: any[]; loading?: boolean }>()
const emit = defineEmits(['delete'])
const store = useMembersStore()
const { search, status, page, pageSize } = storeToRefs(store)

const filtered = computed(() => {
  let data = props.members
  if (search.value)
    data = data.filter(m => m.name.toLowerCase().includes(search.value.toLowerCase()))
  if (status.value)
    data = data.filter(m => m.status === status.value)
  return data
})
const paged = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})
</script>
<template>
  <table class="w-full text-left border-collapse">
    <thead class="sticky top-0 bg-gray-100">
      <tr>
        <th scope="col" class="p-2">Name</th>
        <th scope="col" class="p-2">Email</th>
        <th scope="col" class="p-2">Role</th>
        <th scope="col" class="p-2">Invited</th>
        <th scope="col" class="p-2">Status</th>
        <th scope="col" class="p-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading" v-for="i in pageSize" :key="i" class="animate-pulse">
        <td class="p-2" colspan="6">
          <div class="h-4 bg-gray-200 rounded" />
        </td>
      </tr>
      <tr v-for="m in paged" :key="m.id" class="odd:bg-gray-50">
        <td class="p-2">{{ m.name }}</td>
        <td class="p-2">{{ m.email }}</td>
        <td class="p-2">{{ m.role }}</td>
        <td class="p-2">{{ new Date(m.invitedAt).toLocaleDateString() }}</td>
        <td class="p-2"><StatusBadge :status="m.status" /></td>
        <td class="p-2 text-center">
          <AppButton size="xs" variant="link" class="text-red-600" @click="emit('delete', m.id)">
            <UIcon name="i-tabler-trash" aria-label="Delete" />
          </AppButton>
        </td>
      </tr>
      <tr v-if="!loading && !paged.length">
        <td colspan="6" class="p-4 text-center text-gray-500">
          No members
        </td>
      </tr>
    </tbody>
  </table>
</template>
