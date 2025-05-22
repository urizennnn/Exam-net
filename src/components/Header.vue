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
  <div class="bg-gray-500 px-5 py-1">
    <p class="text-white lg:text-[14px] text-[12px]">
      Hello {{ username || 'there' }}!
    </p>
  </div>
</template>
