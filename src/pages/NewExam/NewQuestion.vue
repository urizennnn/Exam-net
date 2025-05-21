<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import {
  useNewExamStore,
} from "../../store/NewExamStore";
import {
  useDocumentStore,
} from "../../store/server/document";
import {
  hasTrueValue,
  questionFormatTeacher,
} from "../../utils/functions";
import {
  storeToRefs,
} from "pinia";
import {
  useRoute,
} from "vue-router";
import {
  useExamServerStore,
} from "../../store/server/exam";

const newExamStore = useNewExamStore();
const documentStore = useDocumentStore();
const {
  uploadDocument,
  getPdfFromCloudinary,
} = useDocumentStore();
const {
  increaseFormStepTwoCounter,
} = useNewExamStore();
const {
  loading: documentLoading,
  success: documentSuccess,
  result: documentResult,
} = storeToRefs(useDocumentStore());
const {
  getExam,
} = useExamServerStore();
const {
  loading: examServerLoading,
  exam,
} = storeToRefs(useExamServerStore());
const fileUpload = ref(null);
const route = useRoute();
const answerTypeList = ref<
  {
    label: string;
    value: boolean;
    tag: string;
    icon: string;
    auto?: boolean;
  }[]
>([
  {
    label: "information block",
    value: newExamStore.formStepTwo.informationBlock,
    tag: "informationBlock",
    icon: "i-tabler-info-circle-filled",
  },
  {
    label: "Multiple choice",
    value: newExamStore.formStepTwo.multipleChoice,
    tag: "multipleChoice",
    icon: "i-tabler-list",
    auto: true,
  },
  {
    label: "Simple Answer",
    value: newExamStore.formStepTwo.simpleAnswer,
    tag: "simpleAnswer",
    icon: "i-tabler-menu",
    auto: true,
  },
  {
    label: "Fill the gaps",
    value: newExamStore.formStepTwo.fillTheGaps,
    tag: "fillTheGaps",
    icon: "i-tabler-plug-connected",
    auto: true,
  },
  {
    label: "Match answers",
    value: newExamStore.formStepTwo.matchAnswer,
    tag: "matchAnswer",
    icon: "i-tabler-git-compare",
    auto: true,
  },
  {
    label: "Grid",
    value: newExamStore.formStepTwo.grid,
    tag: "grid",
    icon: "i-tabler-layout-grid-filled",
    auto: true,
  },
  {
    label: "Free text",
    value: newExamStore.formStepTwo.freeText,
    tag: "freeText",
    icon: "i-tabler-align-left",
  },
  {
    label: "Student answers with attachment",
    value: newExamStore.formStepTwo.attachment,
    tag: "attachment",
    icon: "i-tabler-paperclip",
  },
]);
const contentTypes = [
  {
    fileType: "PDF",
    label: "Upload exam questions as PDF",
    actionOnClick: toggleUploadExamQuestionsModal,
  },
  {
    fileType: "T",
    label: "Write or paste in exam questions",
    actionOnClick: increaseFormStepTwoCounter,
  },
];
const uploadExamQuestionsModal = ref(false);

function toggleUploadExamQuestionsModal() {
  uploadExamQuestionsModal.value = !uploadExamQuestionsModal.value;

  if (!uploadExamQuestionsModal.value) {
    fileUpload.value = null;
  }
}

async function submitUploadDocumentForm() {
  await uploadDocument({
    file: fileUpload.value,
  }, true);

  if (documentSuccess.value) {
    toggleUploadExamQuestionsModal();
    newExamStore.increaseFormStepTwoCounter();
    newExamStore.editorContent = questionFormatTeacher(documentResult.value);
  }
  else {
    fileUpload.value = null;
  }
}

function saveAnswerType() {
  increaseFormStepTwoCounter();
  answerTypeList.value.map((items) => {
    newExamStore.formStepTwo[items.tag] = items.value;
    sessionStorage.setItem(items.tag, `${items.value}`);
  });
}

onMounted(async () => {
  newExamStore.counter = 2;
  if (route.params.id) {
    newExamStore.formStepTwoCounter = 3;
    await getExam({
      id: route.params.id as string,
    });
    const file = await getPdfFromCloudinary(exam.value.question);
    await uploadDocument({
      file,
    }, false);
    if (documentSuccess.value) {
      newExamStore.editorContent = questionFormatTeacher(documentResult.value);
    }
    return;
  }
  if (
    newExamStore.counter === 2
    && newExamStore.form.examFormat != "question"
  ) {
    newExamStore.formStepTwoCounter = 3;
    const content = questionFormatTeacher(documentStore.result);
    if (content) {
      newExamStore.editorContent = content;
      sessionStorage.setItem("editorContent", `${content}`);
    }
    return;
  }
  newExamStore.formStepTwoCounter === 1;
});

onUnmounted(() => {
  if (newExamStore.counter == 1 && newExamStore.form.examFormat === "") {
    newExamStore.formStepTwoCounter = 1;
    newExamStore.editorContent = "";
    sessionStorage.setItem("editorContent", "");
  }
});

watch(() => answerTypeList, (n) => {
  n.value.map((items) => {
    newExamStore.formStepTwo[items.tag] = items.value;
    sessionStorage.setItem(items.tag, `${items.value}`);
  });
}, {
  deep: true,
});

watch(() => newExamStore.formStepTwoCounter, (n) => {
  sessionStorage.setItem("formStepTwoCounter", JSON.stringify(n));
});

watch(() => newExamStore.editorContent, (n) => {
  localStorage.setItem("editorContent", JSON.stringify(n));
});

watch(() => documentResult, (n) => {
  localStorage.setItem("examPreview", JSON.stringify(n.value));
});
</script>

<template>
  <section class="bg-white w-full flex text-black">
    <div
      v-if="newExamStore.formStepTwoCounter === 1"
      class="flex md:flex-row flex-col"
    >
      <AppNewExamSideBar />
      <section class="p-10 w-full">
        <div class="m-auto w-full rounded-t-lg bg-white">
          <h1
            class="w-full bg-gray-100 m-0 rounded-t-lg border-solid border-1 border-gray-300 px-6 py-4 text-gray-800 text-sm font-medium"
          >
            New Question
          </h1>
          <div
            class="border-solid border-l-1 border-r-1 border-b-1 border-gray-300 m-0 pb-10"
          >
            <p
              class="text-sm bg-white py-2 md:py-4 px-6 flex gap-2 items-center"
            >
              <span class="bg-gray-900 py-1 px-2 text-white rounded">A</span>
              = Auto marked
            </p>
            <div
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-6"
            >
              <div v-for="(answerType, index) in answerTypeList" :key="index">
                <AppAnswerType
                  :id="index"
                  v-model="answerType.value"
                  :label="answerType.label"
                  :tag="answerType.tag"
                  :value="answerType.value"
                  :icon="answerType.icon"
                  :auto="answerType.auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-4 mt-4">
          <AppButton
            :disabled="!hasTrueValue(newExamStore.formStepTwo)"
            label="Import questions"
            theme="primary"
            left-icon="i-lucide-circle-arrow-down"
            @click="saveAnswerType"
          />
        </div>
      </section>
    </div>
    <div v-if="newExamStore.formStepTwoCounter === 2" class="w-full">
      <section class="mx-auto pt-20 px-10">
        <h1 class="text-center text-2xl text-gray-600 tracking-wide">
          Select how to add content
        </h1>
        <div
          class="my-10 flex md:flex-row flex-col gap-5 items-center justify-center"
        >
          <AppContentType
            v-for="contentType in contentTypes"
            :key="contentType.fileType"
            :file-type="contentType.fileType"
            :label="contentType.label"
            @click="contentType.actionOnClick"
          />
        </div>
      </section>
    </div>
    <div
      v-if="newExamStore.formStepTwoCounter === 3"
      class="w-full h-fit overflow-auto"
    >
      <div
        v-if="documentLoading || examServerLoading"
        class="p-8 w-full flex items-center justify-center"
      >
        <AppButton
          left-icon="i-tabler-loader-2"
          :loading="documentLoading || examServerLoading"
          class="text-center text-5xl w-fit!"
        />
      </div>
      <AppEditor v-else v-model="newExamStore.editorContent" />
    </div>
  </section>
  <AppModal v-model="uploadExamQuestionsModal" title="Upload PDF file">
    <template #body>
      <div class="flex flex-col gap-1">
        <label for="">Choose a File: </label>
        <AppInput
          v-model="fileUpload"
          type="file"
          accept=".pdf, application/pdf"
        />
      </div>
      <AppButton
        label="Submit File"
        class="mt-3 w-full py-4! font-semibold rounded-md flex justify-center! items-center! uppercase"
        theme="secondary"
        :disabled="!fileUpload"
        :loading="documentLoading"
        @click="submitUploadDocumentForm"
      />
    </template>
  </AppModal>
</template>
