<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure?'
  }
})
const emit = defineEmits(['update:modelValue','confirm'])
function close() {
  emit('update:modelValue', false)
}
function confirm() {
  emit('confirm')
  close()
}
</script>
<template>
  <AppModal v-model="props.modelValue" :title="props.title" @close="close">
    <template #content>
      <p class="py-4 text-center">{{ props.message }}</p>
    </template>
    <template #footer>
      <AppButton theme="secondary" @click="confirm">Confirm</AppButton>
      <AppButton theme="variant" @click="close">Cancel</AppButton>
    </template>
  </AppModal>
</template>
