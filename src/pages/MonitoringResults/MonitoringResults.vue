<template>
  <section class="bg-zinc-300" id="section">
    <div class="section-container-width">
      <p class="w-full text-right pt-4 flex gap-3 items-center justify-end">
        <i class="fa-regular fa-bell text-2xl"></i>
        System Notification: Off
      </p>
      <!-- Side tab -->
      <section class="mt-4 w-full flex gap-3">
        <aside class="w-full max-w-[300px]">
          <select
            class="outline-none p-3 font-bold tracking-wider w-full"
            v-model="examTitle"
          >
            <option
              v-for="(exam, index) in allAvailableExams"
              :key="index"
              :value="exam.title"
            >
              {{ exam.title }}
            </option>
          </select>
          <h1 class="font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3">
            <i class="fa-solid fa-house"></i>
            Overview
          </h1>
          <AppInput placeholder="Search name" class="mt-4" />
          <AppToggleButton id="showName" label="Show names" class="mt-3" />
        </aside>
        <div class="bg-white rounded-md w-full">
          <!-- Tab section -->
          <ul class="w-full grid grid-cols-2">
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              :class="`text-center p-4 capitalize cursor-pointer ${tab.isActive ? 'border-3 border-l-0 border-r-0 border-t-0 border-b-blue-500' : 'bg-gray-200'}`"
              @click="handleTabSwitch(index)"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppInput from "../../components/AppInput.vue";
import AppToggleButton from "../../components/AppToggleButton.vue";

const allAvailableExams = ref([
  {
    title: "MATHS101",
  },
  {
    title: "COSC303",
  },
]);
const examTitle = ref(allAvailableExams.value[0].title);
const tabs = ref([
  {
    label: "monitoring",
    isActive: true,
  },
  {
    label: "results",
    isActive: false,
  },
]);

const handleTabSwitch = (tabindex: number) => {
  tabs.value.map((tab, index) => {
    tab.isActive = tabindex === index;
  });
};
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
