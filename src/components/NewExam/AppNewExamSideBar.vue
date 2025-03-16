<template>
  <nav
    class="gap-10 bg-[#2d3541] h-full w-fit pt-20 pb-10"
  >
    <ul class="flex flex-col gap-4">
      <li>
        <i
          role="button"
          v-for="(tab, index) in tabs"
          :key="index"
          :class="`${tab.class} ${tab.active ? 'border-solid border-l-5 px-4 py-2 border-amber-400 active': ''} text-3xl md:text-4xl cursor-pointer text-[#ffffff] font-extralight`"
        ></i>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const tabs = ref([
  {
    label: 'edit',
    class: 'fa-regular fa-pen-to-square',
    active: true
  }
])
</script>

<style scoped>
i.active {
  position: relative;
}

i.active:after {
  content: '';
  position: absolute;
  top: 50%;
  right: -10px; /* adjust this value as needed */
  transform: translateY(-50%);
  border-width: 10px 0 10px 10px; /* top, right, bottom, left */
  border-style: solid;
  border-color: transparent transparent transparent #2d3541;
}

</style>
