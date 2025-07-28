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
            Student Complaints
          </h1>
        </div>
        <section class="mb-6">
          <h2 class="text-xl font-semibold mb-2 flex items-center gap-2">
            <img src="../../../src/assets/svg/Asset 10.svg" alt="complaints" class="h-5 w-5">
            Complaints
          </h2>
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
                  Complaint
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(c, index) in complaints" :key="index">
                <td class="border px-2 py-1">
                  {{ c.name }}
                </td>
                <td class="border px-2 py-1">
                  {{ c.email }}
                </td>
                <td class="border px-2 py-1">
                  {{ c.complaint }}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    </section>
  </AdminLayout>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
} from "vue";
import AdminLayout from "../components/AdminLayout.vue";

// Dummy data for complaints
const complaints = reactive([
  {
    name: "John Doe",
    email: "john.doe@example.com",
    complaint: "Exam was too difficult.",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    complaint: "Technical issues during the exam.",
  },
]);

onMounted(() => {
  // Fetch complaints from backend here
});
</script>

