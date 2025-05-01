<template>
  <UInput
    :type="type"
    v-model="model"
    :placeholder="placeholder"
    :class="[props.class]"
    :max="max"
    :min="min"
    v-bind="props.accept ? { accept } : {}"
    color="info"
    :ui="{
      trailing: 'pe-1',
      root: `w-full ${rootClass}`,
      base: `p-4 bg-inherit text-black ${baseClass}`,
    }"
  />
</template>

<script setup lang="ts">
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
  accept: {
    type: String,
  },
  baseClass: {
    type: String,
    default: "",
  },
  rootClass: {
    type: String,
    default: "",
  },
});

const model = defineModel<any>();
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
input[type="file"] {
  margin: 0;
  box-sizing: border-box;
}

input[type="file"]::-webkit-file-upload-button {
  background: black;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
