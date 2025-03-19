<template>
  <input
    type="checkbox"
    :id="`checkbox-${id}`"
    :name="tag"
    v-model="internalValue"
  />
  <label :for="`checkbox-${id}`" class="flex flex-col gap-2 text-center z-0">
    <div
      class="bg-white border border-gray-300 rounded-lg h-20 w-full max-w-[150px] flex items-center justify-center text-2xl mx-auto"
    >
      <template v-if="auto">
        <h1 class="text-white absolute top-1 left-1 text-sm">A</h1>
      </template>
      <i :class="icon"></i>
    </div>
    <p class="text-sm text-gray-800 font-medium">{{ label }}</p>
  </label>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  id: Number,
  label: String,
  tag: String,
  modelValue: Boolean,
  icon: String,
  auto: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});
</script>

<style scoped>
input {
  display: none;
}

label {
  cursor: pointer;
}

label div {
  position: relative;
  overflow: hidden;
  transition: 500ms ease-in-out;
}

label div::before {
  transition: 500ms ease-in-out;
}

input:checked + label div::before {
  transition: 500ms ease-in-out;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  width: 35px;
  height: 40px;
  color: white;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}
</style>
