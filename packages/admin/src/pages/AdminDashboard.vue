<script setup lang="ts">
import { onMounted, computed, defineAsyncComponent } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import InviteMemberForm from '../components/InviteMemberForm.vue'
const MembersTable = defineAsyncComponent(() => import('../components/MembersTable.vue'))
import { useAdminStore } from '../store/admin'
import { useExamServerStore } from '@root/store/server/exam'

const adminStore = useAdminStore()
const examStore = useExamServerStore()

const members = computed(() => adminStore.members)
const exams = computed(() => examStore.exams)
const loading = computed(() => adminStore.loading)

function handleInvite(payload:{name:string;email:string;role:string}) {
  adminStore.inviteMember(payload)
}
function handleDelete(id:string){
  adminStore.deleteMember(id)
}

onMounted(() => {
  adminStore.fetchMembers()
  examStore.getExams()
})
</script>
<template>
  <AdminLayout>
    <section class="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <section class="flex-1">
        <h1 class="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
        <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
          <img src="@root/assets/svg/Asset 10.svg" alt="users" class="h-5 w-5" />
          Invite Member
        </h2>
        <InviteMemberForm class="mb-6" @invited="handleInvite" />
        <Suspense>
          <MembersTable :members="members" :loading="loading" @delete="handleDelete" />
        </Suspense>
      </section>
      <section class="lg:w-1/3">
        <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
          <img src="@root/assets/svg/Asset 8.svg" alt="exams" class="h-5 w-5" />
          Exams
        </h2>
        <ul>
          <li v-for="e in exams" :key="e.examKey" class="border-b py-1">
            {{ e.examName }} - {{ e.access }}
          </li>
        </ul>
      </section>
    </section>
  </AdminLayout>
</template>
