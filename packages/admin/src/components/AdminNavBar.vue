<script setup lang="ts">
import AppButton from "@root/components/AppButton.vue";
import Header from "@root/components/Header.vue";
import {
  ref,
} from "vue";

import {
  useAuthStore,
} from "@root/store/server/auth";

const {
  logout,
} = useAuthStore();
const menuOpen = ref(false);
const navLinks = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: "i-tabler-layout-grid",
  },
  {
    label: "Members",
    to: "/admin/members",
    icon: "i-tabler-users",
  },
  {
    label: "Complaints",
    to: "/admin/complaints",
    icon: "i-tabler-alert-circle",
  },
  {
    label: "Exams",
    to: "/admin/exams",
    icon: "i-tabler-book",
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: "i-tabler-settings",
  },
];

function toggleMenuOpen() {
  menuOpen.value = !menuOpen.value;
}
</script>

<template>
  <section class="fixed top-0 left-0 w-full flex flex-col z-50">
    <section class="flex items-center justify-between h-[70px] px-5 bg-gray-800">
      <img src="@root/assets/svg/Asset 11.svg" alt="logo" class="h-[30px]">
      <AppButton
        :left-icon="`${menuOpen ? 'i-lucide-x' : 'i-tabler-menu-2'}`"
        class="lg:hidden cursor-pointer text-white text-3xl py-[0.85rem]"
        @click="toggleMenuOpen"
      />
      <nav class="hidden lg:flex items-center gap-4">
        <RouterLink
          v-for="(navLink, index) in navLinks"
          :key="index"
          :to="navLink.to"
          class="flex items-center gap-2 h-full px-3 py-[1.21rem] text-white text-[14px] font-[500] hover:bg-gray-600"
          exact-active-class="bg-gray-600"
          exact
        >
          <UIcon :name="navLink.icon" class="text-xl" />
          <span>{{ navLink.label }}</span>
        </RouterLink>
        <AppButton left-icon="i-tabler-logout" class="text-white text-2xl" @click="logout" />
      </nav>
      <nav
        :class="`${menuOpen ? 'flex' : 'hidden'} lg:hidden flex-col items-center absolute top-[70px] left-0 w-full bg-gray-800 shadow-md transition-all duration-300`"
      >
        <RouterLink
          v-for="(navLink, index) in navLinks"
          :key="index"
          :to="navLink.to"
          class="flex items-center gap-2 w-full px-3 py-[1.22rem] text-white text-[14px] font-[500] hover:bg-gray-600"
          exact-active-class="bg-gray-600"
          exact
          @click="toggleMenuOpen"
        >
          <UIcon :name="navLink.icon" class="text-xl" />
          <span>{{ navLink.label }}</span>
        </RouterLink>
        <AppButton
          left-icon="i-tabler-logout"
          class="text-white px-3 py-[1.22rem] text-2xl"
          @click="() => { toggleMenuOpen(); logout(); }"
        />
      </nav>
    </section>
    <Header />
  </section>
</template>
