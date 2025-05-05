<template>
  <UButton
    :label="label"
    :class="[
      'cursor-pointer',
      theme === 'primary'
        ? 'text-gray-700 py-2 gap-2 hover:text-gray-900 hover:border-gray-900 border border-gray-400 px-2 disable:bg-gray-200 rounded-lg'
        : '',
      props.class,
      theme === 'secondary'
        ? 'bg-black rounded-3xl hover:bg-neutral-800 text-white font-semibold py-1 px-3 disabled:bg-[#38383858]'
        : '',
      theme === 'variant'
        ? 'bg-white text-black! hover:bg-slate-200 disabled:bg-[#38383858]'
        : '',
    ]"
    :disabled="disabled"
    @click="handleClick"
    :to="to"
    :icon="leftIcon"
    :trailingIcon="rightIcon"
    loading-auto
    :loading="loading"
    :size="size"
    :variant="variant"
  >
    <slot />
  </UButton>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: String,
  class: {
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
    default: "",
  },
  to: {
    type: String,
    default: "",
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: "",
  },
  variant: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event: Event) => {
  emit("click", event);
};
</script>
