<template>
  <section class="w-full bg-zinc-300" id="section">
    <div class="section-container-width">
      <div
        class="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-neutral-400 px-4 bg-neutral-200 shadow-md gap-4"
      >
        <AppInput
          placeholder="Enter the Exam Name"
          baseClass="ring-2 ring-neutral-400 bg-white"
        />
        <div class="flex items-center md:gap-2 gap-4">
          <AppButton
            @click="decreaseCounter"
            v-if="newExamStore.counter > 1"
            class="border-none! text-lg! font-semibold! text-black"
            label="Back"
            leftIcon="i-lucide-arrow-left"
          />
          <div class="flex items-center gap-1">
            <template v-for="(_, index) in steps" :key="index">
              <i
                v-if="index + 1 < newExamStore.counter"
                class="text-center text-[#36a8d8] font-semibold rounded-full text-4xl fa-solid fa-circle-check"
              ></i>
              <p
                v-else
                :class="`border-2 ${index + 1 === newExamStore.counter ? 'border-[#36a8d8] text-[#36a8d8]' : 'border-[#37373758] text-[#37373758]'} text-center  font-semibold rounded-full w-8 h-8 text-xl`"
              >
                {{ index + 1 }}
              </p>
              <i
                :class="`fa-solid fa-minus ${index + 1 === newExamStore.counter ? 'text-[#36a8d8]' : 'text-[#37373758]'}`"
                v-if="index < steps.length - 1"
              ></i>
            </template>
          </div>
          <AppButton
            left-icon="i-lucide-binoculars"
            theme="primary"
            class="border-black border-2! rounded-4xl!"
            v-if="newExamStore.counter > 1"
          />
        </div>
        <div class="flex gap-1">
          <template v-if="newExamStore.counter != steps.length">
            <template v-for="(verifier, index) in formVerifier" :key="index">
              <AppButton
                v-if="index + 1 === newExamStore.counter"
                :disabled="verifier.validator"
                @click="increaseCounter"
                label="Next"
                theme="secondary"
                rightIcon="i-lucide-arrow-right"
              />
            </template>
          </template>
          <template v-else>
            <AppButton
              label="Save"
              theme="secondary"
              leftIcon="i-lucide-save"
              @click="toggleShowNameExamModal"
            />
          </template>
          <i class="fa-solid fa-circle-question" role="button"></i>
        </div>
      </div>
      <main>
        <RouterView />
      </main>
    </div>
  </section>
  <AppModal title="Give your exam a name" v-model="showNameExamModal">
    <template #body>
      <AppInput placeholder="Enter the name" v-model="newExamStore.examName" />
      <AppButton
        label="Save Exam"
        theme="secondary"
        leftIcon="fa-regular fa-floppy-disk"
        class="w-full! items-center justify-center p-3! mt-3"
        @click="submitExam"
        :disabled="
          !newExamStore.examName || examServerLoading || documentLoading
        "
        :loading="examServerLoading || documentLoading"
      />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import { useNewExamStore } from "../store/NewExamStore";
import { useExamServerStore } from "../store/server/exam";
import {
  clearNewExamData,
  getTrueKeys,
  questionFormatTeacher,
} from "../utils/functions";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../store/server/document";
import { onMounted } from "vue";

const router = useRouter();
const routes = useRoute();
const examId = computed(() => routes.params.id);
const newExamStore = useNewExamStore();
const { generateExamKey, updateExamStore } = useNewExamStore();
const { increaseCounter, decreaseCounter } = useNewExamStore();
const steps = new Array(3).fill("");
const firstStep = computed(() => newExamStore.form.examFormat);
const formVerifier = computed(() => [
  {
    validator: firstStep.value == "",
  },
  {
    validator: newExamStore.editorContent == "",
  },
]);
const showNameExamModal = ref(false);
const { createExam } = useExamServerStore();
const {
  loading: examServerLoading,
  success: examServerSuccess,
  exam,
} = storeToRefs(useExamServerStore());
const {
  uploadPdfToCloudinary,
  uploadDocument,
  generatePdfBlob,
  getPdfFromCloudinary,
} = useDocumentStore();
const { loading: documentLoading, result: documentResult } =
  storeToRefs(useDocumentStore());

function toggleShowNameExamModal() {
  showNameExamModal.value = !showNameExamModal.value;

  if (!showNameExamModal.value) {
    newExamStore.examName = "";
    newExamStore.examId = "";
  }
}

async function submitExam() {
  generateExamKey();
  examServerLoading.value = true;
  const file = await generatePdfBlob(newExamStore.editorContent);
  const { url } = await uploadPdfToCloudinary(file);
  if (!documentResult.value) {
    await uploadDocument(
      {
        file: file,
      },
      false,
    );
  }
  await createExam({
    examKey: newExamStore.examId,
    examName: newExamStore.examName,
    access: "open",
    question: url,
    format: getTrueKeys(newExamStore.formStepTwo),
    settings: {
      general: {
        anonymous: newExamStore.configOptions.anonymizeExam,
        timeLimit: newExamStore.configOptions.setTime,
      },
      examType: {
        hidePoints: newExamStore.configOptions.hidePoints,
        showResults: newExamStore.configOptions.showExamResult,
      },
    },
  });

  if (examServerSuccess.value) {
    clearNewExamData();
    localStorage.setItem("examPreview", JSON.stringify(documentResult.value));
    router.push(`/preview/${newExamStore.examId}`);
  }
}

watch(
  () => newExamStore.counter,
  (n) => {
    sessionStorage.setItem("counter", `${n}`);
    if (n === 1) {
      router.push("/new-exam");
    } else if (n === 2) {
      router.push("/new-question");
    } else if (n === 3 && examId.value) {
      router.push(`/exam-config/${examId.value}`);
    } else if (n === 3) {
      router.push(`/exam-config`);
    }
  },
);

watch(
  () => newExamStore.examName,
  (n) => {
    sessionStorage.setItem("examName", n);
  },
);

watch(
  () => newExamStore.examId,
  (n) => {
    sessionStorage.setItem("examId", n);
  },
);

onMounted(async () => {
  if (examId.value && exam.value) {
    const fileBlob = await getPdfFromCloudinary(exam.value.question);
    await uploadDocument({ file: fileBlob }, false);
    updateExamStore(exam.value, questionFormatTeacher(documentResult.value));
  }
});
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
