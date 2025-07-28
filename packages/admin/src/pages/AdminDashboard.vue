<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
} from "vue";

import {
  useExamServerStore,
} from "@root/store/server/exam";

import AdminLayout from "../components/AdminLayout.vue";
import {
  useAdminStore,
} from "../store/admin";

const adminStore = useAdminStore();
const examStore = useExamServerStore();

const form = reactive({
  name: "",
  email: "",
  role: "member",
});

const members = computed(() => adminStore.members);
const exams = computed(() => examStore.exams);

function invite() {
  adminStore.inviteMember(form);
  form.name = "";
  form.email = "";
}
function removeMember(id: string) {
  // eslint-disable-next-line no-alert
  if (confirm("Delete this member?")) {
    adminStore.deleteMember(id);
  }
}

onMounted(() => {
  adminStore.fetchMembers();
  examStore.getExams();
});
</script>

<template>
  <AdminLayout>
    <section class="w-full h-auto bg-white flex">
      <section class="w-full p-4">
        <div class="flex flex-col items-center mb-4">
          <img
            src="@root/assets/svg/Asset 7.svg"
            alt="logo"
            class="w-[100px] h-[100px]"
          >
          <h1 class="text-2xl font-bold mt-2">
            Admin Panel
          </h1>
        </div>
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
            <img src="@root/assets/svg/Asset 10.svg" alt="users" class="h-5 w-5">
            Invite Member
          </h2>
          <form class="flex gap-2 mb-4" @submit.prevent="invite">
            <input v-model="form.name" placeholder="Name" class="border p-1">
            <input v-model="form.email" placeholder="Email" class="border p-1">
            <select v-model="form.role" class="border p-1">
              <option value="member">
                Member
              </option>
              <option value="admin">
                Admin
              </option>
            </select>
            <button type="submit" class="bg-green-500 text-white px-2 py-1">
              Invite
            </button>
          </form>
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border px-2 py-1 text-left">
                  Full Name
                </th>
                <th class="border px-2 py-1 text-left">
                  Email
                </th>
                <th class="border px-2 py-1 text-left">
                  Role
                </th>
                <th class="border px-2 py-1 text-left">
                  Invited At
                </th>
                <th class="border px-2 py-1 text-left">
                  Status
                </th>
                <th class="border px-2 py-1 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in members" :key="m.id">
                <td class="border px-2 py-1">
                  {{ m.name }}
                </td>
                <td class="border px-2 py-1">
                  {{ m.email }}
                </td>
                <td class="border px-2 py-1">
                  {{ m.role }}
                </td>
                <td class="border px-2 py-1">
                  {{ m.invitedAt }}
                </td>
                <td class="border px-2 py-1">
                  <span
                    :class="m.isOnline ? 'text-green-600' : 'text-gray-500'"
                    class="flex items-center gap-1"
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="m.isOnline ? 'bg-green-600' : 'bg-gray-500'"
                    />
                    {{ m.isOnline ? 'Online' : 'Offline' }}
                  </span>
                </td>
                <td class="border px-2 py-1 text-center">
                  <button class="text-red-600" @click="removeMember(m.id)">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <section>
        <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
          <img src="@root/assets/svg/Asset 8.svg" alt="exams" class="h-5 w-5">
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
