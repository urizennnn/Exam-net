<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
});

const model = defineModel<boolean>({
  default: false,
});
</script>

<template>
  <USwitch
    v-model="model"
    size="xl"
    :label="label"
    :ui="{
      thumb: 'bg-gray-50',
      label: 'text-black',
    }"
  />
</template>
