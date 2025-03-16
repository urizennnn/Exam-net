<template>
  <section class="bg-white w-full flex">
    <AppNewExamSideBar />
    <div class="p-5"></div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";
import AppNewExamSideBar from "../../components/NewExam/AppNewExamSideBar.vue";

const newExamStore = useNewExamStore();

onMounted(() => {
  newExamStore.counter = 2;
});
</script>
