<script lang="ts" setup>
import {
  ref,
} from "vue";

const tabs = ref([
  {
    label: "edit",
    class: "fa-regular fa-pen-to-square",
    active: true,
  },
]);
</script>

<template>
  <nav
    class="bg-gray-800 h-full w-full flex md:flex-col flex-row gap-4 md:w-fit md:pt-20 md:pb-10 px-10 pb-1 md:px-0"
  >
    <i
      v-for="(tab, index) in tabs"
      :key="index"
      role="button"
      :class="`${tab.class} ${tab.active ? 'border-solid md:border-l-3 border-t-3 md:border-t-0 px-2 py-2 border-amber-400 active' : ''} text-2xl md:text-3xl cursor-pointer text-gray-400 font-extralight`"
    />
  </nav>
</template>

<style scoped>
i.active {
  position: relative;
}

i.active:after {
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
  i.active:after {
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
