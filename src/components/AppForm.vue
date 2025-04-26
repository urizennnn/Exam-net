<template>
  <UForm
    :state="stateComputed"
    @submit="handleSubmit"
    class="space-y-4 w-full p-6 max-w-[450px]"
  >
    <h1 class="text-black font-bold text-4xl text-center">{{ title }}</h1>
    <slot />
  </UForm>
</template>

<script lang="ts" setup>
import { FormSubmitEvent } from "@nuxt/ui/.";
import { computed } from "vue";

const props = defineProps({
  state: Object,
  title: String,
});

const emits = defineEmits(["submit"]);
const stateComputed = computed(() => props.state);

async function handleSubmit(event: FormSubmitEvent<typeof props.state>) {
  emits("submit", event);
}
</script>
