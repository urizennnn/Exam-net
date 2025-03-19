<template>
  <section
    class="flex items-center z-50 justify-between px-5 bg-[#2d3541] cursor-pointer h-[60px]"
  >
    <!-- Logo -->
    <img src="../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]" />

    <!-- Mobile Menu Button -->
    <button
      @click="menuOpen = !menuOpen"
      class="lg:hidden cursor-pointer text-white text-2xl outline-none"
    >
      <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>

    <!-- Links -->
    <nav
      :class="menuOpen ? 'flex' : 'hidden'"
      class="z-50 lg:flex flex-col lg:flex-row gap-6 items-center absolute lg:static top-15 left-0 w-full lg:w-auto bg-[#2d3541] lg:bg-transparent p-5 lg:p-0 shadow-md lg:shadow-none transition-all duration-300 ease-in-out"
    >
      <RouterLink
        v-for="(navLink, index) in navLinks"
        :key="index"
        :to="navLink.to"
        :class="`flex justify-center items-center px-3 py-2 lg:h-full text-[#ffffff] text-[14px] font-[500] hover:bg-[#495057] ${navLink.notification ? 'flex-col-reverse' : ''}`"
        active-class="bg-[#495057]"
      >
        <p class="capitalize flex gap-2 items-center">
          <i :class="navLink.icon"></i> {{ navLink.label }}
        </p>
        <div
          v-if="navLink.notification"
          class="text-orange-500 left-[50%] top-0"
        >
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </RouterLink>
      <!-- Logout Icon -->
      <button class="text-[#ffffff]">
        <i class="fa-solid fa-right-from-bracket"></i>
      </button>
    </nav>
  </section>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);
const navLinks = [
  {
    label: "new exam",
    to: "/new-exam",
    icon: "fa-solid fa-pencil",
    notification: false,
  },
  {
    label: "Exam",
    to: "/exams",
    icon: "fa-solid fa-bars",
    notification: false,
  },
  {
    label: "Monitoring/Results",
    to: "/monitoring-results",
    icon: "fa-solid fa-desktop",
    notification: false,
  },
  {
    label: "School",
    to: "/",
    icon: "fa-solid fa-house",
    notification: true,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: "fa-solid fa-user",
    notification: false,
  },
  {
    label: "Training",
    to: "/training",
    icon: "fa-solid fa-circle-play",
    notification: false,
  },
  {
    label: "Support",
    to: "/support",
    icon: "fa-solid fa-circle-question",
    notification: false,
  },
];
</script>
