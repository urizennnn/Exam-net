<template>
<select v-model='internalValue'>

</select>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: Boolean,
  class: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const internalValue = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});
</script>

