<template>
  <nav
    class="flex items-center justify-between px-5 bg-[#2d3541] cursor-pointer h-[60px]"
  >
    <!-- Logo -->
    <img src="../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]" />

    <!-- Mobile Menu Button -->
    <button @click="menuOpen = !menuOpen" class="md:hidden text-white text-2xl">
      <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>

    <!-- Links -->
    <div
      :class="menuOpen ? 'flex' : 'hidden'"
      class="h-[100%] md:flex flex-col md:flex-row gap-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-[#2d3541] md:bg-transparent p-5 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out"
    >
      <RouterLink
        to="/exam-format"
        class="flex gap-2 items-center px-3 py-2 h-full text-[#ffffff] text-[14px] font-[500] hover:bg-[#495057]"
        active-class="bg-[#495057]"
      >
        <i class="fa-solid fa-pencil"></i>
        <p>New exam</p>
      </RouterLink>

      <RouterLink
        to="/exams"
        class="flex gap-2 items-center px-3 py-2 h-full text-[#ffffff] text-[14px] font-[500] hover:bg-[#495057]"
        active-class="bg-[#495057]"
      >
        <i class="fa-solid fa-bars"></i>
        <p>Exams</p>
      </RouterLink>

      <div class="flex gap-2 items-center h-full">
        <i class="fa-solid fa-desktop text-[#ffffff] text-[14px]"></i>
        <p class="text-[#ffffff] text-[14px] font-[500]">Monitoring/Results</p>
      </div>

      <div class="relative">
        <div class="flex gap-2 items-center">
          <i class="fa-solid fa-house text-[#ffffff] text-[14px]"></i>
          <p class="text-[#ffffff] text-[14px] font-[500]">School</p>
        </div>
        <div class="absolute text-orange-500 left-8 bottom-4">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </div>

      <div class="flex gap-2 items-center h-full">
        <i class="fa-solid fa-user text-[#ffffff] text-[14px]"></i>
        <p class="text-[#ffffff] text-[14px] font-[500]">Profile</p>
      </div>

      <div class="flex gap-2 items-center h-full">
        <i class="fa-solid fa-circle-play text-[#ffffff] text-[14px]"></i>
        <p class="text-[#ffffff] text-[14px] font-[500]">Training</p>
      </div>

      <div class="flex gap-2 items-center h-full">
        <i class="fa-solid fa-circle-question text-[#ffffff] text-[14px]"></i>
        <p class="text-[#ffffff] text-[14px] font-[500]">Support</p>
      </div>

      <!-- Logout Icon -->
      <div class="text-[#ffffff]">
        <i class="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);
</script>
