<template>
  <button
    @click="handleClick"
    :class="[
      extraClass,
      'w-fit flex items-center text-gray-500 cursor-pointer py-2 gap-2 border border-gray-400 px-2 rounded-lg',
    ]"
  >
    <i v-if="rightIcon" :class="rightIcon"></i>
    <span class="text-sm font-medium">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  extraClass: {
    type: String,
    required: false,
  },
  rightIcon: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event: Event) => {
  emit("click", event);
};
</script>
