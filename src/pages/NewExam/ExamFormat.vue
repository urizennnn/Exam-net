<template>
  <section class="bg-white w-full p-5 text-black">
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

    <!-- <div -->
    <!--   class="flex flex-row justify-center mt-10 items-center gap-1 font-sans text-[#464646] font-medium text-sm md:text-base" -->
    <!-- > -->
    <!--   <p>Neither, skip digital questions</p> -->
    <!--   <i class="fa-solid fa-angles-right"></i> -->
    <!-- </div> -->
  </section>
  <AppModal v-model="showUploadDocumentModal" title="Upload a Document">
    <template #body>
      <div class="flex flex-col gap-1">
        <label for="">Choose a File: </label>
        <AppInput
          type="file"
          accept=".pdf, application/pdf"
          v-model="fileUpload"
        />
      </div>
      <AppButton
        label="Submit File"
        class="mt-3 w-full py-4! font-semibold rounded-md flex justify-center! items-center! uppercase"
        theme="secondary"
        :disabled="!fileUpload"
        @click="submitUploadDocumentForm"
        :loading="documentLoading"
      />
    </template>
  </AppModal>
</template>

<script setup>
import { useNewExamStore } from "../../store/NewExamStore";
import { useDocumentStore } from "../../store/server/document";
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const newExamStore = useNewExamStore();
const documentStore = useDocumentStore();
const {
  loading: documentLoading,
  success: documentSuccess,
  result: documentResult,
} = storeToRefs(documentStore);
const { uploadDocument } = documentStore;
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
const fileUpload = ref(null);

function toggleShowUploadDocumentModal() {
  showUploadDocumentModal.value = !showUploadDocumentModal.value;

  if (!showUploadDocumentModal.value) {
    fileUpload.value = null;
  }
}

async function submitUploadDocumentForm() {
  await uploadDocument({
    file: fileUpload.value,
  });

  if (documentSuccess.value) {
    toggleShowUploadDocumentModal();
    router.push("/new-question");
  } else {
    fileUpload.value = null;
  }
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

watch(
  () => documentResult,
  (n) => {
    localStorage.setItem("examPreview", JSON.stringify(n.value));
  },
);
</script>
