<script lang="ts" setup>
defineProps({
  id: Number,
  label: String,
  tag: String,
  icon: String,
  auto: {
    type: Boolean,
    required: false,
  },
});

const model = defineModel();
</script>

<template>
  <input :id="`checkbox-${id}`" v-model="model" type="checkbox" :name="tag">
  <label :for="`checkbox-${id}`" class="flex flex-col gap-2 text-center z-0">
    <div
      class="bg-white border border-gray-300 rounded-lg h-20 w-full max-w-[150px] flex items-center justify-center text-2xl mx-auto"
    >
      <template v-if="auto">
        <h1 class="text-white absolute top-1 left-1 text-sm">A</h1>
      </template>
      <UIcon :name="icon" class="text-5xl" />
    </div>
    <p class="text-sm text-gray-800 font-medium">{{ label }}</p>
  </label>
</template>

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
