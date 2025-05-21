<script setup lang="ts">
import type {
  PropType,

} from "vue";

import {
  onMounted,
  ref,
} from "vue";

import type {
  TabsType,
} from "../utils/types";

const props = defineProps({
  tabs: {
    type: Array as PropType<TabsType[]>,
    default: () => [],
  },
  class: {
    type: String,
    default: "",
    required: false,
  },
  theme: {
    type: String as PropType<"primary" | "variant">,
    default: "primary",
    required: false,
  },
  activeClass: {
    type: String,
    default: "",
    required: false,
  },
});

const tabsFromProps = ref(props.tabs);
const model = defineModel({
  default: "",
});

function handleTabSwitch(tabindex: number) {
  tabsFromProps.value.forEach((tab, index) => {
    if (tabindex === index) {
      tab.isActive = true;
      model.value = tab.value;
    }
    else {
      tab.isActive = false;
    }
  });
}

onMounted(() => {
  tabsFromProps.value = props.tabs;
  model.value = tabsFromProps.value[0].value;
});
</script>

<template>
  <ul class="w-full flex overflow-y-hidden overflow-x-hidden select-none">
    <li
      v-for="(tab, index) in tabsFromProps"
      :key="index"
      :class="[
        theme === 'primary'
          ? `${props.class} ${index < tabsFromProps.length - 1 ? 'relative after:w-[20px]' : ''} text-center w-full p-4 capitalize cursor-pointer ${tab.isActive ? 'border-b-3 border-b-blue-500' : 'bg-gray-200'}`
          : '',
        theme === 'variant'
          ? `${props.class} ${tab.isActive ? activeClass : ''}`
          : '',
      ]"
      @click="handleTabSwitch(index)"
    >
      {{ tab.label }}
    </li>
  </ul>
</template>
