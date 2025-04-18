<template>
  <AppToast
    text="This is a preview of how this exam will appear to the students."
  />
  <section class="w-full h-[100dvh] flex">
    <!-- Sidebar -->
    <aside class="h-full w-full max-w-[300px]">
      <div
        class="bg-orange-400 flex justify-center items-center gap-2 p-4 capitalize"
      >
        <i class="fa-solid fa-lock"></i>
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
          <AppButton
            label="Submit Exam"
            leftIcon="fa-solid fa-check text-green-600"
            theme="variant"
            class="rounded-2xl! px-5! py-3! gap-4!"
            to="/monitoring-results"
            @click="handleSubmitExam"
          />
          <div class="flex flex-col items-center gap-4">
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
          <i
            :class="`${fileDirectionHorizontal ? 'text-orange-400' : ''} fa-solid fa-table-columns cursor-pointer rotate-270`"
            role="button"
            @click="fileDirectionHorizontal = true"
          ></i>
          <i
            :class="`${!fileDirectionHorizontal ? 'text-orange-400' : ''} fa-solid fa-table-columns cursor-pointer`"
            role="button"
            @click="fileDirectionHorizontal = false"
          ></i>
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
            >
              {{ newExamStore.editorContent }}
            </div>
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
import { ref, onMounted, computed, watch } from "vue";
import { fileSize } from "../../utils/variables";
import AppEditor from "../../components/AppEditor.vue";
import AppButton from "../../components/AppButton.vue";
import AppToast from "../../components/AppToast.vue";
import { clearNewExamData } from "../../utils/functions";
import { useRoute } from "vue-router";
import { useExamStore } from "../../store/ExamStore";

const newExamStore = useNewExamStore();
const timerValue = ref(newExamStore.configOptions.setTime);
const fileDirectionHorizontal = ref(false);
const questionSection = ref(null);
const routes = useRoute();
const examID = computed(() => routes.params.id);
const examStore = useExamStore();

function handleSubmitExam() {
  examStore.exams.push({
    examName: newExamStore.examName,
    examKey: newExamStore.examId,
    createdAt: new Date().toLocaleDateString(),
    access: "open",
  });
  clearNewExamData();
}

onMounted(() => {
  questionSection.value.innerHTML = `${newExamStore.editorContent}`;
});

watch(
  () => examStore.exams,
  (n) => {
    localStorage.setItem("exams", `${n}`);
  },
);
</script>

<style scoped>
#SideBarMain {
  height: calc(100% - 112px);
}

#questionSection * {
  list-style: auto;
  list-style-position: inside;
}

#questionSection *:not(:last-of-type) {
  margin-bottom: 2rem;
}
</style>
