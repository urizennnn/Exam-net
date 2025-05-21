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
const open = defineModel<boolean>({
  default: false,
});
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
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
    <template v-if="$slots.body" #body>
      <slot name="body" />
    </template>
    <template v-if="$slots.content" #content>
      <slot name="content" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UModal>
</template>
