<template>
  <URadioGroup
    v-model="model"
    :items="items"
    color="info"
    :class="props.class"
    :ui="{
      label: 'text-black',
      item: 'flex items-center gap-1 text-black text-xl cursor-pointer w-fit',
    }"
  />
</template>

<script lang="ts" setup>
import { RadioGroupItem, RadioGroupValue } from "@nuxt/ui";
import { PropType } from "vue";

const props = defineProps({
  items: Array as PropType<RadioGroupItem[]>,
  class: String,
});


const model = defineModel<RadioGroupValue>();
</script>
