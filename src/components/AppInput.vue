<template>
  <div
    :class="`${label ? 'grid grid-cols-2 gap-4' : ''} w-full items-center m-0`"
  >
    <input
      v-if="type !== 'file'"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :class="[
        props.class,
        theme === 'primary'
          ? 'bg-white border-2 border-gray-300'
          : theme === 'secondary'
            ? 'bg-gray-100 border-1 border-gray-200'
            : '',
        'outline-none w-full p-2 rounded-md placeholder:text-gray-400 font-semibold m-0',
      ]"
      :max="max"
      :min="min"
    />
    <input
      v-else
      type="file"
      :class="[
        props.class,
        theme === 'primary'
          ? 'bg-white border-2 border-gray-300'
          : theme === 'secondary'
            ? 'bg-gray-100 border-1 border-gray-200'
            : '',
        'outline-none w-full p-2 rounded-md placeholder:text-gray-400 font-semibold m-0',
      ]"
      v-bind="props.accept ? { accept } : {}"
      @change="onFileChange"
    />
    <p class="text-sm">{{ label }}</p>
  </div>
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
});

const model = defineModel();
const emit = defineEmits(["update:modelValue"]);

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    emit("update:modelValue", files[0]);
  } else {
    emit("update:modelValue", null);
  }
}
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
