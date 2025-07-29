<script setup lang="ts">
import { onMounted, computed } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import { useExamServerStore } from '@root/store/server/exam';

const examStore = useExamServerStore();
const exams = computed(() => examStore.exams);

onMounted(() => {
  examStore.getExams();
});
</script>

<template>
  <AdminLayout>
    <section class="w-full h-auto bg-white p-4">
      <h1 class="text-2xl font-bold mb-4 text-center">Exams</h1>
      <ul>
        <li v-for="e in exams" :key="e.examKey" class="border-b py-1">
          {{ e.examName }} - {{ e.access }}
        </li>
      </ul>
    </section>
  </AdminLayout>
</template>
