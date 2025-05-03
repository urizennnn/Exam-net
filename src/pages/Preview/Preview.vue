<template>
  <AppToast
    text="This is a preview of how this exam will appear to the students."
  />
  <section class="w-full h-[100dvh] flex overflow-auto text-black">
    <!-- Sidebar -->
    <aside class="h-full w-full max-w-[300px]">
      <div
        class="bg-orange-400 flex justify-center items-center gap-2 p-4 capitalize"
      >
        <UIcon name="i-lucide-lock" />
        Test Person
      </div>
      <div class="w-full bg-gray-900" id="SideBarMain">
        <ul class="w-full">
          <li
            class="text-white p-4 bg-gray-700 cursor-pointer border-l-2 border-orange-400"
          >
            Exam
          </li>
        </ul>
        <div
          class="bg-gray-800 h-full rounded-t-xl flex flex-col items-center justify-between py-4 px-2"
        >
          <div class="w-full grid gap-6">
            <AppButton
              label="Submit Exam"
              leftIcon="i-lucide-check"
              theme="variant"
              class="rounded-2xl! px-5! py-3! gap-4! m-auto"
              to="/monitoring-results"
              @click="handleSubmitExam"
            />
            <RouterLink
              :to="`/student/${examID}`"
              class="w-full flex items-center justify-between"
            >
              <div></div>
              <UIcon
                name="i-lucide-step-back"
                class="w-fit text-orange-400 text-4xl"
              />
            </RouterLink>
          </div>

          <div class="flex flex-col items-center gap-4 w-full">
            <p class="text-gray-400 text-2xl">{{ examID }}</p>
            <div class="flex gap-4 justify-between text-white">
              <p class="text-white text-2xl">
                <i class="fa-regular fa-clock"></i> {{ timerValue }}:00
              </p>
              <p class="text-white text-2xl">
                <i class="fa-solid fa-plug"></i> 100%
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Section -->
    <section class="w-full h-full bg-zinc-300">
      <div
        class="bg-gray-900 text-white p-3 font-extrabold text-2xl flex justify-between items-center"
      >
        <h1>Exam</h1>
        <div class="flex items-center gap-4">
          <AppButton
            :class="`${fileDirectionHorizontal ? 'hover:text-orange-400 text-orange-400' : 'text-white hover:text-white'}`"
            @click="fileDirectionHorizontal = true"
            icon="i-lucide-rows-2"
          />
          <AppButton
            :class="`${!fileDirectionHorizontal ? 'hover:text-orange-400 text-orange-400' : 'text-white hover:text-white'}`"
            @click="fileDirectionHorizontal = false"
            icon="i-lucide-columns-2"
          />
        </div>
      </div>
      <Splitpanes
        style="height: calc(100dvh - 57px)"
        class="default-theme splitpane"
        :horizontal="fileDirectionHorizontal"
      >
        <Pane
          :min-size="fileSize.min_size"
          :max-size="fileSize.max_size"
          :size="fileSize.min_size"
        >
          <section class="w-full h-full overflow-auto">
            <div
              class="text-xl p-3 bg-white shadow-md font-bold"
              ref="questionSection"
              id="questionSection"
            ></div>
          </section>
        </Pane>
        <Pane>
          <section class="w-full h-full overflow-auto">
            <AppEditor />
          </section>
        </Pane>
      </Splitpanes>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { useNewExamStore } from "../../store/NewExamStore";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { ref, onMounted, computed } from "vue";
import { fileSize } from "../../utils/variables";
import { clearNewExamData, questionFormatTeacher } from "../../utils/functions";
import { useRoute, RouterLink } from "vue-router";
import { useExamStore } from "../../store/ExamStore";
import AppButton from "../../components/AppButton.vue";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../../store/server/document";

const newExamStore = useNewExamStore();
const timerValue = ref(newExamStore.configOptions.setTime);
const fileDirectionHorizontal = ref(false);
const questionSection = ref(null);
const routes = useRoute();
const examID = computed(() => routes.params.id);
const { result: documentResult } = storeToRefs(useDocumentStore());

function handleSubmitExam() {
  clearNewExamData();
}

onMounted(() => {
  questionSection.value.innerHTML = questionFormatTeacher(documentResult.value);
});
</script>

<style scoped>
#SideBarMain {
  height: calc(100% - 112px);
  width: 100%;
}
</style>
