<template>

</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";

const newExamStore = useNewExamStore();
const configOptions = ref([
  {
    label: 'Gemeral',
    isActive: true
  },
  {
    label: 'Exam Type Settings',
    isActive: false
  },
])

onMounted(() => {
  newExamStore.counter = 3;
});
</script>
