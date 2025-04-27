<template>
  <USwitch
    size="xl"
    :label="label"
    v-model="model"
    :ui="{
      thumb: 'bg-gray-50',
      label: 'text-black',
    }"
  />
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
});

const model = defineModel<boolean>({ default: false });
</script>
