<script setup lang="ts">
import {
  ref,
} from "vue";

defineProps({
  text: String,
});

const showToast = ref(true);

function closeToast() {
  showToast.value = false;
}
</script>

<template>
  <section
    v-show="showToast"
    class="bg-blue-100 text-blue-600 p-2 flex items-center justify-between gap-2 text-lg"
  >
    <h4 class="font-semibold">
      {{ text }}
    </h4>
    <i
      class="fa-solid fa-xmark cursor-pointer text-2xl"
      role="button"
      @click="closeToast"
    />
  </section>
</template>
