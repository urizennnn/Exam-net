<template>
testing
</template>

<script lang="ts" setup>
import {onMounted} from 'vue'
import {useNewExamStore} from '../../store/NewExamStore'

const newExamStore = useNewExamStore()

onMounted(() => {
  newExamStore.counter = 3;
});
</script>
