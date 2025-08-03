<script setup lang="ts">
type Props = {
  icon?: string;
  message?: string;
  actionLabel?: string;
};
const props = withDefaults(defineProps<Props>(), {
  message: "Nothing here yet",
});
const emit = defineEmits<{ (e: "action"): void }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-10">
    <UIcon v-if="icon" :name="icon" class="text-4xl text-gray-400" />
    <p class="text-gray-500">
      {{ props.message }}
    </p>
    <AppButton
      v-if="actionLabel"
      size="sm"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </AppButton>
  </div>
</template>
