<script setup lang="ts">
import {
  storeToRefs,
} from "pinia";
import {
  computed,
  ref,
  watch,
} from "vue";
import {
  RouterView,
  useRoute,
  useRouter,
} from "vue-router";

import AppButton from "../components/AppButton.vue";
import {
  useNewExamStore,
} from "../store/NewExamStore";
import {
  useDocumentStore,
} from "../store/server/document";
import {
  useExamServerStore,
} from "../store/server/exam";
import {
  clearNewExamData,
  getTrueKeys,
} from "../utils/functions";

const router = useRouter();
const route = useRoute();

const newExamStore = useNewExamStore();
const {
  generateExamKey,
} = useNewExamStore();
const {
  increaseCounter,
  decreaseCounter,
} = useNewExamStore();
const steps = Array.from({
  length: 3,
}).fill("");
const firstStep = computed(() => newExamStore.form.examFormat);
const formVerifier = computed(() => [
  {
    validator: firstStep.value === "",
  },
  {
    validator: newExamStore.editorContent === "",
  },
]);
const showNameExamModal = ref(false);
const {
  createExam,
  examUpdate,
} = useExamServerStore();
const {
  loading: examServerLoading,
  success: examServerSuccess,
}
  = storeToRefs(useExamServerStore());
const {
  uploadPdfToCloudinary,
  uploadDocument,
  generatePdfBlob,
}
  = useDocumentStore();
const {
  loading: documentLoading,
  result: documentResult,
}
  = storeToRefs(useDocumentStore());

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
  const {
    url,
  } = await uploadPdfToCloudinary(file);
  if (!documentResult.value) {
    await uploadDocument({
      file,
    }, false);
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

async function handleQuestionUpdate() {
  const file = await generatePdfBlob(newExamStore.editorContent);
  const {
    url,
  } = await uploadPdfToCloudinary(file);
  if (!documentResult.value) {
    await uploadDocument({
      file,
    }, false);
  }
  await examUpdate(route.params.id, {
    question: url,
  });

  if (examServerSuccess.value) {
    router.push("/exams");
  }
}

watch(() => newExamStore.counter, (n) => {
  sessionStorage.setItem("counter", `${n}`);
  if (n === 1) {
    router.push("/new-exam");
  }
  else if (n === 2) {
    router.push("/new-exam/new-question");
  }
  else if (n === 3) {
    router.push(`/new-exam/exam-config`);
  }
});

watch(() => newExamStore.examName, (n) => {
  sessionStorage.setItem("examName", n);
});

watch(() => newExamStore.examId, (n) => {
  sessionStorage.setItem("examId", n);
});
</script>

<template>
  <section id="section" class="w-full bg-zinc-300">
    <div class="container m-auto pb-8 px-8">
      <div
        class="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-neutral-400 px-4 bg-neutral-200 shadow-md gap-4"
      >
        <AppButton
          v-if="route.params.id"
          class="border-none! text-lg! font-semibold! text-black"
          label="Back"
          left-icon="i-lucide-arrow-left"
          to="/exams"
        />
        <AppButton
          v-else-if="newExamStore.counter > 1"
          class="border-none! text-lg! font-semibold! text-black"
          label="Back"
          left-icon="i-lucide-arrow-left"
          @click="decreaseCounter"
        />
        <div class="flex items-center gap-1">
          <template v-if="route.params.id" />
          <template v-for="(_, index) in steps" v-else :key="index">
            <UIcon
              v-if="index + 1 < newExamStore.counter"
              name="i-tabler-check"
              class="text-center text-neutral-200 font-semibold rounded-full text-4xl p-1 bg-blue-400"
            />
            <p
              v-else
              :class="`border-2 ${index + 1 === newExamStore.counter ? 'border-blue-400 text-blue-400' : 'border-neutral-400 text-neutral-400'} text-center  font-semibold rounded-full w-8 h-8 text-xl`"
            >
              {{ index + 1 }}
            </p>
            <UIcon
              v-if="index < steps.length - 1"
              name="i-tabler-minus"
              :class="`${index + 1 === newExamStore.counter ? 'text-blue-400' : 'text-neutral-400'}`"
            />
          </template>
        </div>
        <template v-if="route.params.id">
          <AppButton
            label="Save"
            theme="secondary"
            left-icon="i-lucide-save"
            class="flex gap-1 items-center"
            :loading="examServerLoading || documentLoading"
            @click="handleQuestionUpdate"
          />
        </template>
        <template v-else-if="newExamStore.counter !== steps.length">
          <template v-for="(verifier, index) in formVerifier" :key="index">
            <AppButton
              v-if="index + 1 === newExamStore.counter"
              :disabled="verifier.validator"
              label="Next"
              theme="secondary"
              right-icon="i-lucide-arrow-right"
              @click="increaseCounter"
            />
          </template>
        </template>
        <template v-else>
          <AppButton
            label="Save"
            theme="secondary"
            left-icon="i-lucide-save"
            @click="toggleShowNameExamModal"
          />
        </template>
      </div>
      <main>
        <RouterView />
      </main>
    </div>
  </section>
  <AppModal
    v-model="showNameExamModal"
    :dismissible="false"
    title="Give your exam a name"
  >
    <template #body>
      <AppInput v-model="newExamStore.examName" placeholder="Enter the name" />
      <AppButton
        label="Save Exam"
        theme="secondary"
        left-icon="fa-regular fa-floppy-disk"
        class="w-full! items-center justify-center p-3! mt-3"
        :disabled="
          !newExamStore.examName || examServerLoading || documentLoading
        "
        :loading="examServerLoading || documentLoading"
        @click="submitExam"
      />
    </template>
  </AppModal>
</template>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
