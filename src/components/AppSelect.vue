<template>
  <div :class="`${props.class} flex gap-6 items-center w-full justify-between`">
    <p class="font-light text-black text-xl">{{ label }}</p>
    <select v-model="model" class="border-2 rounded-4xl border-black p-2">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
interface OptionType {
  title: string;
  value: string;
}

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
  options: {
    type: Array<OptionType>,
    default: () => [],
  },
});

const model = defineModel();
</script>
