<template>
  <section
    :class="[
      isVisible ? 'flex' : 'hidden',
      'fixed inset-0 w-full h-full overflow-hidden items-center justify-center p-5',
    ]"
  >
    <div
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

const props = defineProps({
  isVisible: Boolean,
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
