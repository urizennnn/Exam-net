<template>
  <UModal
    :title="title"
    v-model:open="open"
    :ui="{
      content: 'bg-white text-black w-full max-w-[600px] z-[500]',
      title: 'text-black! font-bold text-2xl',
      close: 'text-black! bg-white cursor-pointer! hover:bg-gray-100!',
      footer: 'flex items-center gap-3 justify-center',
    }"
  >
    <template #body>
      <slot name="body" />
    </template>
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
});
const open = defineModel<boolean>({ default: false });
</script>
