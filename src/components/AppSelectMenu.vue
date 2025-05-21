<script lang="ts" setup>
defineProps({
  items: Array,
  loading: Boolean,
  baseClass: String,
  itemClass: String,
});

const model = defineModel();
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="items"
    class="w-full"
    :ui="{
      base: `bg-inherit text-black! p-3 ${baseClass}`,
      item: `bg-white text-black! hover:text-black! cursor-pointer ${itemClass}`,
      content: 'bg-white',
    }"
    :search-input="{
      ui: {
        base: 'text-black!',
      },
    }"
    :loading="loading"
    color="info"
  />
</template>
