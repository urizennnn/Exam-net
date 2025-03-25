<template>
  <section
    class="relative w-full bg-zinc-300 flex items-center justify-center"
    id="section"
  >
    <div class="section-container-width">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
        <div
          class="bg-blue-950 text-white p-3 rounded-t-lg flex justify-between items-center"
        >
          <div></div>
          <h1 class="text-[18px] md:text-[20px] tracking-wide">MBA</h1>
          <div class="flex gap-3 text-[18px] md:text-[20px] font-semibold">
            <i class="fa-solid fa-gears text-white"></i>
            <i class="fa-solid fa-angle-down text-white"></i>
            <i class="fa-solid fa-caret-down text-white"></i>
          </div>
        </div>
        <div
          class="w-full h-full flex gap-3 items-center justify-center bg-white flex-col px-4 py-8"
        >
          <i class="fa-solid fa-file text-5xl text-gray-700"></i>
          <p class="font-semibold text-gray-700 text-[16px]">
            No exams in this group yet
          </p>
          <AppButton
            leftIcon="fa-solid fa-plus text-white"
            label="New Exam"
            theme="secondary"
            extraClass="bg-gray-700 py-2 px-4"
          />
        </div>
      </div>
    </div>
    <i
      class="absolute left-4 bottom-4 fa-solid fa-magnifying-glass bg-white p-4 rounded-md shadow-lg"
    ></i>
    <i
      class="absolute right-4 bottom-4 fa-solid fa-question text-white bg-sky-400 rounded-full px-5 py-4"
    ></i>
  </section>
</template>

<script setup lang="ts">
import AppButton from "../../components/AppButton.vue";
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
