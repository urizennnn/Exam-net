<template>
  <section
    class="bg-gray-800 w-screen h-screen text-white flex flex-col items-center justify-center gap-4"
  >
    <p class="text-[30vh]">404</p>
    <p class="text-5xl">Oops. Nothing here...</p>
    <AppButton
      to="/"
      label="Go Home"
      theme="variant"
      extraClass="py-4! px-10!"
    />
  </section>
</template>

<script setup lang="ts">
import AppButton from "../components/AppButton.vue";
</script>
