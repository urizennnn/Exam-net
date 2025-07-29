<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import StatusBadge from './StatusBadge.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import type { Member } from '../store/admin'

const props = defineProps<{ members: Member[]; loading?: boolean }>()
const emit = defineEmits<{ (e:'delete', id:string):void }>()

const search = ref('')
const role = ref('')
const sortKey = ref<'name'|'role'|'invitedAt'|'status'>('name')
const sortDir = ref<'asc'|'desc'>('asc')
const pageSize = ref(10)
const currentPage = ref(1)

const filtered = computed(() => {
  let data = props.members
  if (search.value) data = data.filter(m => m.name.toLowerCase().includes(search.value.toLowerCase()))
  if (role.value) data = data.filter(m => m.role === role.value)
  data = [...data].sort((a,b)=> {
    const A = a[sortKey.value] ?? ''
    const B = b[sortKey.value] ?? ''
    return sortDir.value==='asc'?String(A).localeCompare(String(B)):String(B).localeCompare(String(A))
  })
  return data
})
const paginated = computed(()=>{
  const start = (currentPage.value-1)*pageSize.value
  return filtered.value.slice(start,start+pageSize.value)
})
const showConfirm = ref(false)
const pendingId = ref('')
function askDelete(id:string){
  pendingId.value = id
  showConfirm.value = true
}
function confirmDelete(){
  emit('delete', pendingId.value)
  showConfirm.value = false
}
</script>
<template>
  <div class="flex flex-col gap-2 mb-4">
    <div class="flex flex-wrap gap-2 items-center">
      <UInput v-model="search" placeholder="Search" class="max-w-xs" />
      <USelect v-model="role" :options="['','member','admin']" class="max-w-[120px]" />
      <USelect v-model.number="pageSize" :options="[10,20,50]" class="ml-auto max-w-[90px]" />
    </div>
    <table class="w-full text-left border-collapse shadow-sm">
      <thead class="bg-gray-100 sticky top-0">
        <tr>
          <th class="p-2 cursor-pointer" @click="sortKey='name'; sortDir=sortDir==='asc'?'desc':'asc'">Full Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Role</th>
          <th class="p-2">Invited At</th>
          <th class="p-2">Status</th>
          <th class="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" v-for="i in pageSize" :key="i" class="animate-pulse">
          <td class="p-2" colspan="6">
            <div class="h-4 bg-gray-200 rounded" />
          </td>
        </tr>
        <tr v-for="m in paginated" :key="m.id" class="odd:bg-gray-50">
          <td class="p-2">{{ m.name }}</td>
          <td class="p-2">{{ m.email }}</td>
          <td class="p-2">{{ m.role }}</td>
          <td class="p-2">{{ new Date(m.invitedAt).toLocaleDateString() }}</td>
          <td class="p-2"><StatusBadge :status="m.isOnline ? 'Online':'Offline'" /></td>
          <td class="p-2 text-center">
            <AppButton class="text-red-600" size="xs" variant="link" @click="askDelete(m.id)">
              <UIcon name="i-tabler-trash" aria-label="Delete" />
            </AppButton>
          </td>
        </tr>
        <tr v-if="!loading && filtered.length===0">
          <td colspan="6" class="p-4 text-center text-gray-500">No members yet — invite a colleague!</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center" v-if="filtered.length">
      <div class="text-sm">Page {{ currentPage }} of {{ Math.ceil(filtered.length/pageSize) }}</div>
      <div class="flex gap-2">
        <AppButton size="xs" :disabled="currentPage===1" @click="currentPage--">Prev</AppButton>
        <AppButton size="xs" :disabled="currentPage*Math.max(1,pageSize)>=filtered.length" @click="currentPage++">Next</AppButton>
      </div>
    </div>
  </div>
  <ConfirmDialog v-model="showConfirm" message="Delete this member?" @confirm="confirmDelete" />
</template>
