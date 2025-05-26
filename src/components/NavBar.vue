<script setup>
import {
  ref,
} from "vue";

import {
  useAuthStore,
} from "../store/server/auth";

const {
  logout,
} = useAuthStore();
const menuOpen = ref(false);
const navLinks = [
  {
    label: "new exam",
    to: "/new-exam",
    icon: "i-tabler-pencil",
    notification: false,
  },
  {
    label: "Exam",
    to: "/exams",
    icon: "i-tabler-menu-2",
    notification: false,
  },
  {
    label: "Monitoring/Results",
    to: "/monitoring-results",
    icon: "i-tabler-device-desktop-check",
    notification: false,
  },
  {
    label: "Training",
    to: "/license",
    icon: "i-tabler-school",
    notification: true,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: "i-tabler-user",
    notification: false,
  },
  {
    label: "Support",
    to: "/support",
    icon: "i-tabler-help-circle-filled",
    notification: false,
  },
];

function toggleMenuOpen() {
  menuOpen.value = !menuOpen.value;
}
</script>

<template>
  <section
    class="flex items-center z-50 justify-between px-5 bg-gray-800 cursor-pointer"
  >
    <!-- Logo -->
    <img src="../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]">

    <!-- Mobile Menu Button -->
    <AppButton
      :left-icon="`${menuOpen ? 'i-lucide-x' : 'i-tabler-menu-2'}`"
      class="lg:hidden cursor-pointer text-white text-3xl outline-none py-[0.85rem]"
      @click="toggleMenuOpen"
    />

    <!-- Links -->
    <nav class="hidden lg:flex items-center gap-4">
      <RouterLink
        v-for="(navLink, index) in navLinks"
        :key="index"
        :to="navLink.to"
        :class="`flex justify-center items-center h-full px-3 py-[1.21rem] text-white text-[14px] font-[500] hover:bg-gray-600 ${navLink.notification ? 'flex-row-reverse gap-2' : ''}`"
        exact-active-class="bg-gray-600"
        exact
      >
        <p class="capitalize flex gap-2 items-center">
          <UIcon class="text-xl" :name="navLink.icon" /> {{ navLink.label }}
        </p>
        <UIcon
          v-if="navLink.notification"
          name="i-tabler-exclamation-circle-filled"
          class="text-orange-500 text-xl"
        />
      </RouterLink>
      <AppButton
        left-icon="i-tabler-logout"
        class="text-white text-2xl"
        @click="logout"
      />
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
        exact-active-class="bg-gray-600"
        exact
        @click="toggleMenuOpen"
      >
        <p class="capitalize flex gap-2 items-center">
          <UIcon class="text-xl" :name="navLink.icon" /> {{ navLink.label }}
        </p>
        <UIcon
          v-if="navLink.notification"
          name="i-tabler-exclamation-circle-filled"
          class="text-orange-500 text-xl"
        />
      </RouterLink>
      <AppButton
        left-icon="i-tabler-logout"
        class="text-white px-3 py-[1.22rem] text-2xl"
        @click="
          () => {
            toggleMenuOpen();
            logout();
          }
        "
      />
    </nav>
  </section>
</template>
