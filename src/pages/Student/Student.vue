<template>
  <AppToast
    text="This is a preview of how this exam will appear to the students."
  />
  <section class="w-full h-[100dvh] flex overflow-auto">
    <!-- Sidebar -->
    <aside class="h-full w-full max-w-[300px]">
      <div
        class="bg-orange-400 flex justify-center items-center gap-2 p-4 capitalize"
      >
        Student
        <i class="fa-solid fa-user-secret"></i>
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
              leftIcon="fa-solid fa-check text-green-600"
              theme="variant"
              class="rounded-2xl! px-5! py-3! gap-4! m-auto"
              to="/monitoring-results"
              @click="handleSubmitExam"
            />
            <RouterLink :to="`/preview/${examID}`" class="w-full">
              <i
                class="fa-solid fa-angle-left w-full text-orange-400 text-4xl text-right"
              ></i>
            </RouterLink>
          </div>

          <div class="flex flex-col items-center gap-4 w-full p-3">
            <i
              class="fa-solid fa-gear cursor-pointer text-lg shadow-white shadow-sm text-white bg-gray-500 p-1 rounded"
            ></i>
            <div
              class="flex w-full items-center flex-wrap gap-4 justify-between pb-6 text-white border-b border-b-gray-500"
            >
              <time class="text-white text-xl" :datetime="isoTime">
                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                {{ formattedTime }}
              </time>
              <p class="text-white text-xl">
                <i class="fa-solid fa-plug"></i> 100%
              </p>
            </div>
            <div
              class="flex items-center justify-between w-full text-white font-bold text-xl"
            >
              <p>Time Limit</p>
              <i
                :class="`cursor-pointer fa-solid ${showTimeLimit ? 'fa-eye-slash' : 'fa-eye'}`"
                role="button"
                @click="toggleShowTimeLimit"
              ></i>
            </div>
            <div
              v-if="showTimeLimit"
              class="flex gap-2 text-white font-bold items-center justify-center text-xl"
            >
              <p class="border border-white rounded py-1 px-2">
                {{ timerValue }}
              </p>
              :
              <p class="border border-white rounded py-1 px-2">00</p>
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
        <h1>Preview</h1>
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
import AppButton from "../../components/AppButton.vue";
import AppToast from "../../components/AppToast.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { fileSize } from "../../utils/variables";
import AppEditor from "../../components/AppEditor.vue";
import { clearNewExamData } from "../../utils/functions";
import { useExamStore } from "../../store/ExamStore";
import { useRoute, RouterLink } from "vue-router";

const now = ref(new Date());
let timer = null;
const formattedTime = computed(() => {
  const h = String(now.value.getHours()).padStart(2, "0");
  const m = String(now.value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
});
const isoTime = computed(() => now.value.toISOString().slice(0, 16));
const showTimeLimit = ref(true);
const newExamStore = useNewExamStore();
const fileDirectionHorizontal = ref(false);
const questionSection = ref(null);
const examStore = useExamStore();
const routes = useRoute();
const examID = computed(() => routes.params.id);
const timerValue = ref(newExamStore.configOptions.setTime);

function toggleShowTimeLimit() {
  showTimeLimit.value = !showTimeLimit.value;
}

function handleSubmitExam() {
  examStore.exams.push({
    examName: newExamStore.examName,
    examKey: newExamStore.examId,
    createdAt: new Date().toLocaleDateString(),
    access: "open",
  });
  localStorage.setItem("exams", JSON.stringify(examStore.exams));
  clearNewExamData();
}

onMounted(() => {
  questionSection.value.innerHTML = `${newExamStore.editorContent}`;
  const msUntilNextMinute = (60 - now.value.getSeconds()) * 1000;
  timer = setTimeout(() => {
    now.value = new Date();
    timer = setInterval(() => (now.value = new Date()), 60_000);
  }, msUntilNextMinute);
});

onUnmounted(() => clearTimeout(timer) || clearInterval(timer));
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
