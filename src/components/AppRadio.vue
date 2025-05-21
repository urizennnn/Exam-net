<script lang="ts" setup>
import type {
  RadioGroupItem,
  RadioGroupValue,
} from "@nuxt/ui";
import type {
  PropType,
} from "vue";

const props = defineProps({
  items: Array as PropType<RadioGroupItem[]>,
  class: String,
  disabled: Boolean,
});

const model = defineModel<RadioGroupValue>();
</script>

<template>
  <URadioGroup
    v-model="model"
    :items="items"
    color="info"
    :class="props.class"
    :disabled="disabled"
    :ui="{
      label: 'text-black',
      item: 'flex items-center gap-1 text-black text-xl cursor-pointer w-fit',
    }"
  />
</template>
