<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
} from "vue";
import {
  useRouter,
} from "vue-router";

const router = useRouter();

function preventBack() {
  window.history.pushState(null, "", window.location.href);
}

onMounted(() => {
  preventBack();
  window.addEventListener("popstate", preventBack);
  setTimeout(() => {
    sessionStorage.setItem("no-back", "1");
    router.replace("/student-login");
  }, 5000);
});

onUnmounted(() => {
  window.removeEventListener("popstate", preventBack);
});
</script>

<template>
  <section
    class="bg-gray-800 w-screen h-screen text-white flex flex-col items-center justify-center gap-4 p-4"
  >
    <p class="text-5xl text-center text-wrap">
      You have completed this exam. Your results will be sent by instructor in
      due time.
    </p>
  </section>
</template>
