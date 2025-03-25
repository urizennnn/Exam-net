<template>
  <NavBar />
  <section>
    <RouterView />
  </section>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { RouterView } from "vue-router";
</script>
