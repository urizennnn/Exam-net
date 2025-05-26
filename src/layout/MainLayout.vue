<script setup>
import {
  RouterView,
} from "vue-router";
</script>

<template>
  <section class="flex flex-col w-full bg-zinc-300 h-[100dvh] text-black pb-4">
    <NavBar />
    <section class="flex-1 bg-zinc-300">
      <RouterView />
    </section>
  </section>
</template>
