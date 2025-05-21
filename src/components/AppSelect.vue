<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  items: Array,
  loading: Boolean,
  class: {
    type: String,
    default: "",
  },
});

const model = defineModel();
</script>

<template>
  <div class="flex gap-6 items-center w-full justify-between">
    <p class="font-light text-black text-xl">
      {{ label }}
    </p>
    <USelect
      v-model="model"
      :items="items" class="w-full"
      :class="[props.class]"
      color="info"
      :ui="{
        base: 'ring-2 rounded-4xl ring-black px-3 bg-inherit text-black',
        content: 'z-50 bg-white',
        item: 'text-black hover:text-black',
      }"
      :loading="loading"
    />
  </div>
</template>
