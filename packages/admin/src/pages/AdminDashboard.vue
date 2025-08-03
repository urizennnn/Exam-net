<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  onMounted,
} from "vue";

import {
  useExamServerStore,
} from "@root/store/server/exam";

import AdminLayout from "../components/AdminLayout.vue";
import DashboardSection from "../components/DashboardSection.vue";
import EmptyState from "../components/EmptyState.vue";
import InviteMemberForm from "../components/InviteMemberForm.vue";
import {
  useAdminStore,
} from "../store/admin";

const MembersTable = defineAsyncComponent(() => import("../components/MembersTable.vue"));

const adminStore = useAdminStore();
const examStore = useExamServerStore();

const members = computed(() => adminStore.members);
const exams = computed(() => examStore.exams);
const loading = computed(() => adminStore.loading);

function handleInvite(payload: { name: string; email: string; role: string }) {
  adminStore.inviteMember(payload);
}
function handleDelete(id: string) {
  adminStore.deleteMember(id);
}

onMounted(() => {
  adminStore.fetchMembers();
  examStore.getExams();
});
</script>

<template>
  <AdminLayout>
    <div class="container mx-auto p-4 space-y-6">
      <h1 class="mt-8 text-2xl font-bold text-center">
        Admin Dashboard
      </h1>
      <div class="grid grid-cols-12 gap-6">
        <DashboardSection title="Members" class="col-span-12 lg:col-span-8">
          <template #icon>
            <img src="@root/assets/svg/Asset 10.svg" alt="users" class="h-5 w-5">
          </template>
          <InviteMemberForm class="mb-6" @invited="handleInvite" />
          <Suspense>
            <MembersTable
              :members="members"
              :loading="loading"
              @delete="handleDelete"
            />
          </Suspense>
        </DashboardSection>
        <DashboardSection title="Exams" class="col-span-12 lg:col-span-4">
          <template #icon>
            <img src="@root/assets/svg/Asset 8.svg" alt="exams" class="h-5 w-5">
          </template>
          <ul v-if="exams.length" class="divide-y">
            <li
              v-for="e in exams"
              :key="e.examKey"
              class="py-2 flex items-center justify-between"
            >
              <span>{{ e.examName }}</span>
              <span class="badge badge-neutral">{{ e.access }}</span>
            </li>
          </ul>
          <EmptyState
            v-else
            icon="i-tabler-file"
            action-label="Create Exam"
          />
        </DashboardSection>
      </div>
    </div>
  </AdminLayout>
</template>
