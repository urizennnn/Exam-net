<script setup lang="ts">
import {
  onMounted,
  ref,
} from "vue";

const username = ref("");

function refreshName() {
  const raw = localStorage.getItem("name");
  if (raw) {
    try {
      username.value = JSON.parse(raw);
    }
    catch {
      username.value = raw;
    }
  }
}

onMounted(() => {
  refreshName();
  window.addEventListener("storage", (e) => {
    if (e.key === "name")
      refreshName();
  });
});
</script>

<template>
  <div class="w-full h-10 flex items-center bg-primary-700 px-6">
    <p class="font-medium text-sm tracking-wide text-white">
      Hello {{ username || "there!" }}
    </p>
  </div>
</template>
