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
        @click="radio.actionOnClick"
      />
    </div>

    <div
      class="flex flex-row justify-center mt-10 items-center gap-1 font-sans text-[#464646] font-medium text-sm md:text-base"
    >
      <p>Neither, skip digital questions</p>
      <i class="fa-solid fa-angles-right"></i>
    </div>
  </section>
  <AppModal
    :isVisible="showUploadDocumentModal"
    @onClose="toggleShowUploadDocumentModal"
    title="Upload a Document"
  >
  </AppModal>
</template>

<script setup>
import AppCardRadio from "../../components/NewExam/AppCardRadio.vue";
import { useNewExamStore } from "../../store/NewExamStore";
import { ref, onMounted, watch } from "vue";
import AppModal from "../../components/AppModal.vue";

const newExamStore = useNewExamStore();
const showUploadDocumentModal = ref(false);
const radioOptions = [
  {
    label: "Use Question types",
    top: "Auto-marking available",
    value: "question",
  },
  {
    label: "Upload or Create a document",
    top: ["PDF", "T"],
    value: "",
    actionOnClick: toggleShowUploadDocumentModal,
  },
];

function toggleShowUploadDocumentModal() {
  showUploadDocumentModal.value = !showUploadDocumentModal.value;
}

onMounted(() => {
  newExamStore.counter = 1;
});

watch(
  () => newExamStore.form.examFormat,
  (n) => {
    sessionStorage.setItem("examFormat", n);
  },
);
</script>
