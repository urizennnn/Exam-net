<template>
  <button
    :disabled="disabled"
    @click="handleClick"
    :class="[
      theme === 'primary'
        ? 'w-fit flex items-center text-gray-500 py-2 gap-2 border border-gray-400  px-2 rounded-lg'
        : 'flex items-center gap-1 text-white font-semibold rounded-2xl py-1 px-3',
      disabled && theme === 'primary'
        ? 'cursor-not-allowed bg-gray-200'
        : !disabled && theme === 'primary'
          ? 'cursor-pointer hover:text-gray-800 hover:border-gray-800'
          : '',
      disabled && theme === 'secondary'
        ? 'cursor-not-allowed bg-[#38383858]'
        : !disabled && theme === 'secondary'
          ? 'cursor-pointer bg-[#211d1d]'
          : '',
      extraClass,
    ]"
  >
    <i v-if="leftIcon" :class="leftIcon"></i>
    <span v-if="label" class="text-sm font-medium">{{ label }}</span>
    <template v-else>
      <slot></slot>
    </template>
    <i v-if="rightIcon" :class="rightIcon"></i>
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
  leftIcon: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  theme: {
    type: String,
    default: "primary",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event: Event) => {
  emit("click", event);
};
</script>

<style scoped>
button {
  transition: 300ms ease-in-out;
}
</style>
