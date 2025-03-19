<template>
  <section class="bg-white w-full p-5">
    <h1
      class="text-2xl md:text-3xl text-center font-sans text-gray-800 font-medium tracking-wide"
    >
      Choose exam format
    </h1>
    <p
      class="italic text-[#818181] font-medium text-sm md:text-base text-center mt-10"
    >
      How will this look for students?
    </p>

    <div
      class="flex flex-col items-center md:flex-row gap-5 w-full mt-10 justify-center"
    >
      <AppCardRadio
        v-for="(radio, index) in radioOptions"
        :key="index"
        :id="`${index}`"
        :label="radio.label"
        :top="radio.top"
        :value="radio.value"
        v-model="newExamStore.form.examFormat"
      />
    </div>

    <div
      class="flex flex-col lg:flex-row justify-center mt-10 items-center gap-2 font-sans text-[#464646] font-medium text-sm md:text-base"
    >
      <p>Neither, skip digital questions</p>
      <i class="fa-solid fa-angles-right"></i>
    </div>
  </section>
</template>

<script setup>
import AppCardRadio from "../../components/NewExam/AppCardRadio.vue";
import { useNewExamStore } from "../../store/NewExamStore";
import { ref, onMounted } from "vue";

const newExamStore = useNewExamStore();
const radioOptions = [
  {
    label: "Use Question types",
    top: "Auto-marking available",
    value: "question",
  },
  {
    label: "Upload or Create a document",
    top: ["PDF", "T"],
    value: "upload",
  },
];

onMounted(() => {
  newExamStore.counter = 1;
});
</script>
