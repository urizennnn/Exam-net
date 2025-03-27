<template>
  <section class="bg-white w-full flex">
    <!-- SideBar For Config -->
    <section class="text-white bg-gray-800">
      <h1 class="font-bold text-center tracking-wider px-4 pt-8">
        Configurations
      </h1>
      <ul class="mt-4">
        <li
          v-for="(option, index) in configOptions"
          :key="index"
          :class="`${option.isActive ? 'border-solid md:border-l-3 border-t-3 md:border-t-0 border-amber-400 active relative' : ''} cursor-pointer px-4 py-4 hover:bg-gray-700 capitalize`"
        >
          {{ option.label }}
        </li>
      </ul>
    </section>

    <!-- Main page -->
    <main class="px-8 pt-12 pb-6">
      <h1 id="general" class="font-bold tracking-wide text-2xl">General</h1>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";

const newExamStore = useNewExamStore();
const configOptions = ref([
  {
    label: "general",
    isActive: true,
  },
  {
    label: "exam type settings",
    isActive: false,
  },
]);

onMounted(() => {
  newExamStore.counter = 3;
});
</script>

<style scoped>
li.active {
  position: relative;
}

li.active:after {
  content: "";
  position: absolute;
  top: 120%;
  left: 38%;
  transform: translateY(-50%) rotate(90deg);
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent #2d3541;
}

@media (min-width: 48rem) {
  li.active:after {
    content: "";
    position: absolute;
    top: 50%;
    right: -10px;
    left: 100%;
    transform: translateY(-50%);
    border-width: 10px 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent transparent #2d3541;
  }
}
</style>
