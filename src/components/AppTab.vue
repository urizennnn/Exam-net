<template>
  <ul class="w-full grid grid-cols-2">
    <li
      v-for="(tab, index) in tabsFromProps"
      :key="index"
      :class="`text-center p-4 capitalize cursor-pointer ${tab.isActive ? 'border-3 border-l-0 border-r-0 border-t-0 border-b-blue-500' : 'bg-gray-200'}`"
      @click="handleTabSwitch(index)"
    >
      {{ tab.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

const props = defineProps({
  tabs: {
    type: Array as PropType<
      {
        isActive: boolean;
        label: string;
        value: string;
      }[]
    >,
    default: () => [],
  },
});

const tabsFromProps = ref(props.tabs);
const emit = defineEmits(["update:modelValue"]);

const handleTabSwitch = (tabindex: number) => {
  tabsFromProps.value.map((tab, index) => {
    tab.isActive = tabindex === index;
  });
};
</script>
