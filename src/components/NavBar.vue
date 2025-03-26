<template>
  <section
    class="flex items-center z-50 justify-between px-5 bg-gray-800 cursor-pointer"
  >
    <!-- Logo -->
    <img src="../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]" />

    <!-- Mobile Menu Button -->
    <button
      @click="toggleMenuOpen"
      class="lg:hidden cursor-pointer text-white text-2xl outline-none py-[0.85rem]"
    >
      <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>

    <!-- Links -->
    <nav class="hidden lg:flex items-center gap-4">
      <RouterLink
        v-for="(navLink, index) in navLinks"
        :key="index"
        :to="navLink.to"
        :class="`flex justify-center items-center h-full px-3 py-[1.30rem] text-white text-[14px] font-[500] hover:bg-gray-600 ${navLink.notification ? 'flex-row-reverse gap-2' : ''}`"
        active-class="bg-gray-600"
      >
        <p class="capitalize flex gap-2 items-center">
          <i :class="navLink.icon"></i> {{ navLink.label }}
        </p>
        <div v-if="navLink.notification" class="text-orange-500">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </RouterLink>
      <i class="fa-solid fa-right-from-bracket text-white"></i>
    </nav>

    <!-- Mobile Nav Bar -->
    <nav
      :class="`${menuOpen ? 'flex' : 'hidden'} lg:hidden z-50  flex-col items-center absolute top-13 left-0 w-full lg:w-auto bg-gray-800 shadow-md lg:shadow-none transition-all duration-300 ease-in-out`"
    >
      <RouterLink
        v-for="(navLink, index) in navLinks"
        :key="index"
        :to="navLink.to"
        :class="`flex justify-center items-center h-full w-full px-3 py-[1.22rem] text-white text-[14px] font-[500] hover:bg-gray-600 ${navLink.notification ? 'flex-row-reverse gap-2' : ''}`"
        active-class="bg-gray-600"
        @click="toggleMenuOpen"
      >
        <p class="capitalize flex gap-2 items-center">
          <i :class="navLink.icon"></i> {{ navLink.label }}
        </p>
        <div v-if="navLink.notification" class="text-orange-500">
          <i class="fa-solid fa-circle-exclamation"></i>
        </div>
      </RouterLink>
      <i
        class="fa-solid fa-right-from-bracket text-white px-3 py-[1.22rem]"
        @click="toggleMenuOpen"
      ></i>
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

function toggleMenuOpen() {
  menuOpen.value = !menuOpen.value;
}
</script>
