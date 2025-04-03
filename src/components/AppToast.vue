<template>
  <section
    v-show="showToast"
    class="bg-blue-100 text-blue-600 p-2 flex items-center justify-between gap-2 text-lg"
  >
    <h4 class="font-semibold">
      This is a preview of how this exam will appear to the students.
    </h4>
    <i class="fa-solid fa-xmark cursor-pointer text-2xl" role="button" @click="closeToast"></i>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const showToast = ref(true)

function closeToast() {
  showToast.value = false
}
</script>

