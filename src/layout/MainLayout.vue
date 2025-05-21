<script setup>
import NavBar from "../components/NavBar.vue";
import {
  RouterView,
} from "vue-router";
</script>

<template>
  <NavBar />
  <section>
    <RouterView />
  </section>
</template>
