<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
} from "vue";

import {
  useExamServerStore,
} from "../../../src/store/server/exam";
import AdminLayout from "../components/AdminLayout.vue";
import {
  useAdminStore,
} from "../store/admin";

const adminStore = useAdminStore();
const examStore = useExamServerStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
});

const users = computed(() => adminStore.users);
const exams = computed(() => examStore.exams);

function addUser() {
  adminStore.addUser(form);
  form.name = "";
  form.email = "";
  form.password = "";
}
function deleteUser(id: string) {
  adminStore.deleteUser(id);
}
function logoutUser(id: string) {
  adminStore.logoutUser(id);
}

onMounted(() => {
  adminStore.fetchUsers();
  examStore.getExams();
});
</script>

<template>
  <AdminLayout>
    <section class="w-full h-auto bg-white flex">
      <section class="w-full p-4">
        <div class="flex flex-col items-center mb-4">
          <img
            src="../../../src/assets/svg/Asset 7.svg"
            alt="logo"
            class="w-[100px] h-[100px]"
          >
          <h1 class="text-2xl font-bold mt-2">
            Admin Panel
          </h1>
        </div>
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
            <img src="../../../src/assets/svg/Asset 10.svg" alt="users" class="h-5 w-5">
            Users
          </h2>
          <form class="flex gap-2 mb-4" @submit.prevent="addUser">
            <input v-model="form.name" placeholder="Name" class="border p-1">
            <input v-model="form.email" placeholder="Email" class="border p-1">
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="border p-1"
            >
            <button type="submit" class="bg-green-500 text-white px-2 py-1">
              Add
            </button>
          </form>
          <table class="w-full border-collapse">
            <thead>
              <tr>
                <th class="border px-2 py-1 text-left">
                  Name
                </th>
                <th class="border px-2 py-1 text-left">
                  Email
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
              <tr v-for="u in users" :key="u._id">
                <td class="border px-2 py-1">
                  {{ u.name }}
                </td>
                <td class="border px-2 py-1">
                  {{ u.email }}
                </td>
                <td class="border px-2 py-1">
                  <span :class="u.online ? 'text-green-600' : 'text-gray-500'">
                    {{ u.online ? "Online" : "Offline" }}
                  </span>
                </td>
                <td class="border px-2 py-1">
                  <button class="text-red-600 mr-2" @click="deleteUser(u._id)">
                    Delete
                  </button>
                  <button class="text-yellow-600" @click="logoutUser(u._id)">
                    Force Logout
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <section>
        <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
          <img src="../../../src/assets/svg/Asset 8.svg" alt="exams" class="h-5 w-5">
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
