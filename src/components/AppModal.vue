<template>
  <section
    :class="[
      isVisible ? 'flex' : 'hidden',
      'fixed inset-0 w-full h-full overflow-hidden items-center justify-center p-5',
    ]"
  >
    <div
      v-if="loading"
      class="bg-white text-black w-full max-w-[800px] h-full max-h-[700px] rounded-lg overflow-x-hidden overflow-y-hidden p-3 flex flex-col gap-8 justify-center items-center"
    >
      <p class="text-2xl tracking-wide text-gray-500 block">
        This may take a few moments.
      </p>
      <AppLoader />
    </div>
    <div
      v-else
      class="bg-white text-black w-full max-w-[800px] h-full max-h-[700px] rounded-lg overflow-x-hidden overflow-y-hidden p-4"
    >
      <div class="flex justify-end">
        <i
          class="text-2xl fa-solid fa-xmark text-black cursor-pointer"
          @click="toggleShow"
          role="button"
        ></i>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { watch, computed, ref, onMounted } from "vue";
import AppLoader from "./AppLoader.vue";

const props = defineProps({
  isVisible: Boolean,
  loading: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["onClose"]);

function toggleShow() {
  emits("onClose");
}

onMounted(() => {
  document.body.style.overflow = "auto";
});

watch(
  () => props.isVisible,
  (n) => {
    document.body.style.overflow = n ? "hidden" : "auto";
  },
);
</script>

<style scoped>
section {
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
