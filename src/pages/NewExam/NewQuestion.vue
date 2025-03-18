<template>
  <section class="bg-white w-full flex">
    <AppNewExamSideBar />
    <section class="p-10 w-full">
      <div class="m-auto w-full rounded-t-lg bg-gray-50">
        <h1
          class="w-full bg-gray-100 m-0 rounded-t-lg border-solid border-1 border-gray-300 px-6 py-4 text-gray-800 text-sm font-medium"
        >
          New Question
        </h1>
        <div
          class="border-solid border-l-1 border-r-1 border-b-1 border-gray-300 m-0 pb-10"
        >
          <p class="text-sm bg-white py-2 md:py-4 px-6 flex gap-2 items-center">
            <span class="bg-gray-900 py-1 px-2 text-white rounded">A</span>
            = Auto marked
          </p>
          <div
            class="grid grid-cols-2 bg-white sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            <div v-for="(answerType, index) in answerTypeList" :key="index">
              <AppAnswerType
                :id="index"
                :label="answerType.label"
                :tag="answerType.tag"
                :value="answerType.value"
                :icon="answerType.icon"
                :auto="answerType.auto"
                v-model="answerType.value"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <AppButton
          label="Import questions"
          rightIcon="fa-solid fa-circle-arrow-down"
        />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";
import AppNewExamSideBar from "../../components/NewExam/AppNewExamSideBar.vue";
import AppAnswerType from "../../components/NewExam/AppAnswerType.vue";
import AppButton from "../../components/AppButton.vue";

const newExamStore = useNewExamStore();
const answerTypeList = ref([
  {
    label: "information block",
    value: newExamStore.formStepTwo.informationBlock,
    tag: "informationBlock",
    icon: "fa-solid fa-circle-info",
  },
  {
    label: "Multiple choice",
    value: newExamStore.formStepTwo.multipleChoice,
    tag: "multipleChoice",
    icon: "fa-solid fa-list-ul",
    auto: true,
  },
  {
    label: "Simple Answer",
    value: newExamStore.formStepTwo.simpleAnswer,
    tag: "simpleAnswer",
    icon: "fa-regular fa-equals",
    auto: true,
  },
  {
    label: "Fill the gaps",
    value: newExamStore.formStepTwo.fillTheGaps,
    tag: "fillTheGaps",
    icon: "fa-solid fa-link-slash",
    auto: true,
  },
  {
    label: "Match answers",
    value: newExamStore.formStepTwo.matchAnswer,
    tag: "matchAnswer",
    icon: "fa-solid fa-diagram-predecessor",
    auto: true,
  },
  {
    label: "Grid",
    value: newExamStore.formStepTwo.grid,
    tag: "grid",
    icon: "fa-solid fa-grip",
    auto: true,
  },
  {
    label: "Free text",
    value: newExamStore.formStepTwo.freeText,
    tag: "freeText",
    icon: "fa-solid fa-align-left",
  },
  {
    label: "Student answers with attachment",
    value: newExamStore.formStepTwo.attachment,
    tag: "attachment",
    icon: "fa-solid fa-paperclip",
  },
]);

onMounted(() => {
  newExamStore.counter = 2;
});

watch(
  () => answerTypeList.value,
  (n, o) => {
    console.log({ n, o });
  },
);
</script>
