<script lang="ts" setup>
const props = defineProps({
  placeholder: String,
  rows: Number,
  autoresize: Boolean,
  baseClass: String,
  class: String,
  disabled: Boolean,
});

const model = defineModel<any>();
</script>

<template>
  <UTextarea
    v-model="model"
    :placeholder="placeholder"
    :autoresize="autoresize"
    :rows="rows"
    :class="`w-full ${props.class}`"
    color="info"
    :disabled="disabled"
    :ui="{
      base: `bg-inherit text-black p-3 ${baseClass}`,
    }"
  />
</template>
