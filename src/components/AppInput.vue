<template>
  <UInput
    v-if="type === 'file'"
    type="file"
    :accept="accept"
    @change="onFileChange"
    color="info"
    :ui="{
      trailing: 'pe-1',
      root: `w-full ${rootClass}`,
      base: `p-4 bg-inherit text-black ${baseClass}`,
    }"
  />

  <UInput
    v-else
    :type="type"
    v-model="model"
    :placeholder="placeholder"
    :class="[props.class]"
    :max="max"
    :min="min"
    color="info"
    :ui="{
      trailing: 'pe-1',
      root: `w-full ${rootClass}`,
      base: `p-4 bg-inherit text-black ${baseClass}`,
    }"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: File,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  class: String,
  max: String,
  min: String,
  accept: String,
  baseClass: String,
  rootClass: String,
});

const emit = defineEmits(["update:modelValue"]);

const model = ref<any>(props.modelValue);

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0] ?? null;
  emit("update:modelValue", file);
}
</script>
