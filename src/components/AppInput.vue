<template>
  <div
    :class="`${label ? 'grid grid-cols-2' : 'flex'} gap-4 w-full items-center`"
  >
    <input
      :type="type"
      v-model="internalValue"
      :placeholder="placeholder"
      :class="[
        props.class,
        theme === 'primary'
          ? 'bg-white border-2 border-gray-300'
          : theme === 'secondary'
            ? 'bg-gray-100 border-1 border-gray-200'
            : '',
        'outline-none w-full p-2 rounded-md placeholder:text-gray-400 font-semibold',
      ]"
      :max="max"
      :min="min"
    />
    <p class="text-sm">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  theme: {
    type: String,
    default: "primary",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: [String, Number],
  class: {
    type: String,
    default: "",
  },
  max: {
    type: String,
    default: "",
  },
  min: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val: string | number) => emit("update:modelValue", val),
});
</script>
