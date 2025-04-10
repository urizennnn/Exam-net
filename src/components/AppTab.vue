<template>
  <ul class="w-full flex overflow-y-hidden overflow-x-hidden">
    <li
      v-for="(tab, index) in tabsFromProps"
      :key="index"
      :class="`${props.class} text-center w-full p-4 capitalize cursor-pointer ${tab.isActive ? 'border-3 border-l-0 border-r-0 border-t-0 border-b-blue-500' : 'bg-gray-200'}`"
      @click="handleTabSwitch(index)"
    >
      {{ tab.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from "vue";

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
  class: {
    type: String,
    default: "",
    required: false,
  },
});

const tabsFromProps = ref(props.tabs);
const model = defineModel({ default: "" });

const handleTabSwitch = (tabindex: number) => {
  tabsFromProps.value.map((tab, index) => {
    if (tabindex === index) {
      tab.isActive = true;
      model.value = tab.value;
    } else {
      tab.isActive = false;
    }
  });
};

onMounted(() => {
  model.value = tabsFromProps.value[0].value;
});
</script>
