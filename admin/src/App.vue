<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Panel</h1>
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Users</h2>
      <form @submit.prevent="addUser" class="flex gap-2 mb-4">
        <input v-model="form.name" placeholder="Name" class="border p-1" />
        <input v-model="form.email" placeholder="Email" class="border p-1" />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="border p-1"
        />
        <button type="submit" class="bg-green-500 text-white px-2 py-1">
          Add
        </button>
      </form>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border px-2 py-1 text-left">Name</th>
            <th class="border px-2 py-1 text-left">Email</th>
            <th class="border px-2 py-1 text-left">Status</th>
            <th class="border px-2 py-1 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u._id">
            <td class="border px-2 py-1">{{ u.name }}</td>
            <td class="border px-2 py-1">{{ u.email }}</td>
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
    <section>
      <h2 class="text-xl font-semibold mb-2">Exams</h2>
      <ul>
        <li v-for="e in exams" :key="e.examKey" class="border-b py-1">
          {{ e.examName }} - {{ e.access }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useAdminStore } from "./store/admin";
import { useExamServerStore } from "../../src/store/server/exam";

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
