<template>
  <UModal
    :title="title"
    v-model:open="open"
    :dismissible="dismissible"
    :variant="variant"
    :description="description"
    :ui="{
      content: `bg-white text-black w-full max-w-[600px] z-[500] ${props.class}`,
      title: `text-black! font-bold text-2xl ${titleClass} w-full!`,
      close: `text-black! bg-white! cursor-pointer! hover:bg-gray-100! ${closeClass}`,
      footer: 'flex items-center gap-3 justify-center',
    }"
  >
    <template #body v-if="$slots.body">
      <slot name="body" />
    </template>
    <template #content v-if="$slots.content">
      <slot name="content" />
    </template>
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  closeClass: String,
  titleClass: String,
  class: String,
  dismissible: {
    type: Boolean,
    default: true,
    required: false,
  },
  variant: String,
  description: String,
});
const open = defineModel<boolean>({ default: false });
</script>
