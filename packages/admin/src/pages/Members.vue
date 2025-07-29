<script setup lang="ts">
import { onMounted } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import InviteMemberForm from '@root/components/admin/InviteMemberForm.vue'
import MembersToolbar from '@root/components/admin/MembersToolbar.vue'
import MembersTable from '@root/components/admin/MembersTable.vue'
import { useMembersStore } from '@root/store/members'

const store = useMembersStore()

onMounted(() => {
  store.load()
})
</script>
<template>
  <AdminLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 fade-in">
      <div class="card p-4 mb-6">
        <InviteMemberForm @members:list:refresh="store.load" />
      </div>
      <div class="card p-4">
        <MembersToolbar
          v-model:search="store.search"
          v-model:status="store.status"
        />
        <MembersTable
          :members="store.members"
          :loading="store.loading"
          @delete="store.remove"
        />
      </div>
    </div>
  </AdminLayout>
</template>
