<template>
  <NavBar />
  <section class="section-width">
    <RouterView />
  </section>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { RouterView } from "vue-router";
</script>

<style scoped>
.section-width {
  height: calc(100dvh - 100px);
  /* min-height: calc(100dvh - 100px); */
}
</style>
