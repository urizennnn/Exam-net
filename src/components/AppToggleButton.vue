<template>
  <div
    :class="`${props.class} select-none flex gap-4 capitalize items-center cursor-pointer`"
  >
    <input type="checkbox" :id="id" v-model="model" class="sr-only peer" />
    <label
      :for="id"
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
    ></label>
    <label :for="id">
      <p>{{ label }}</p>
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  id: String,
  class: {
    type: String,
    default: "",
  },
});

const model = defineModel();
</script>
