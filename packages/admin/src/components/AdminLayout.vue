<script setup lang="ts">
import AdminNavBar from './AdminNavBar.vue';
</script>

<template>
  <section class="flex flex-col w-full bg-zinc-300 min-h-[100dvh] text-black pb-4">
    <AdminNavBar />
    <section class="flex-1 bg-zinc-300">
      <slot />
    </section>
  </section>
</template>
