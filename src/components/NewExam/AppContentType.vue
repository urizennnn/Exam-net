<template>
  <button
    @click="handleClick"
    class="cursor-pointer bg-white hover:bg-neutral-100 border-1 border-solid border-gray-100 w-full max-w-[250px] shadow-lg px-8 py-15 rounded-xl justify-center items-center"
  >
    <div class="text-center mb-5">
      <h1
        :class="`w-fit font-bold ${fileType === 'T' ? 'bg-blue-600 px-3 py-1' : 'bg-red-500 p-1'} text-white rounded mx-auto`"
      >
        {{ fileType }}
      </h1>
    </div>
    <p class="text-center text-lg text-gray-500">{{ label }}</p>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  fileType: String,
  label: String,
});

const emits = defineEmits(['click'])

function handleClick(event: Event) {
  emits('click', event)
}
</script>
