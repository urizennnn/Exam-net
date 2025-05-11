<template>
  <AppToast
    text="This is a preview of how this exam will appear to the students."
    v-if="mode !== 'student'"
  />
  <section class="w-full h-[100dvh] flex overflow-auto text-black bg-gray-800">
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
            <template v-if="!isDoneWithExam">
              <AppButton
                v-if="mode === 'student'"
                label="Submit Exam"
                leftIcon="i-lucide-check"
                theme="variant"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto"
                @click="toggleSubmitExamModal"
                :loading="examServerLoading || documentLoading"
              />
              <AppButton
                v-else
                label="Submit Exam"
                leftIcon="i-lucide-check"
                theme="variant"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto"
                to="/monitoring-results"
                @click="handleSubmitExam"
              />
            </template>
            <template v-else>
              <AppButton
                label="Show score"
                leftIcon="i-lucide-trophy"
                theme="primary"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto border-white! text-white! hover:text-slate-200! hover:border-slat-200"
                @click="toggleShowScoreModal"
                :loading="examServerLoading || documentLoading"
              />
              <AppButton
                label="Close the Exam"
                leftIcon="i-lucide-check"
                theme="variant"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto"
                :loading="examServerLoading || documentLoading"
              />
            </template>
            <RouterLink
              v-if="mode !== 'student'"
              :to="`/preview/${examID}`"
              class="w-full flex items-center justify-between"
            >
              <div></div>
              <UIcon
                name="i-lucide-step-back"
                class="w-fit text-orange-400 text-4xl"
              />
            </RouterLink>
          </div>

          <div class="flex flex-col items-center gap-4 w-full p-3">
            <AppButton
              leftIcon="i-lucide-settings"
              class="text-white text-2xl"
            />
            <div
              class="flex w-full items-center flex-wrap gap-4 justify-between pb-6 text-white border-b border-b-gray-500"
            >
              <time
                class="text-white text-xl flex gap-2 items-center"
                :datetime="isoTime"
              >
                <UIcon name="i-lucide-clock" />
                {{ formattedTime }}
              </time>
              <p class="text-white text-xl flex gap-1 items-center">
                <UIcon name="i-lucide-plug" />
                100%
              </p>
            </div>
            <div
              class="flex items-center justify-between w-full text-white font-bold text-xl"
            >
              <p>Time Limit</p>
              <AppButton
                :left-icon="`i-lucide-${showTimeLimit ? 'eye' : 'eye-off'}`"
                @click="toggleShowTimeLimit"
                class="size-7"
              />
            </div>
            <template v-if="showTimeLimit">
              <div
                v-if="mode === 'student'"
                class="flex gap-2 text-white font-bold items-center justify-center text-xl"
              >
                <template v-if="examServerLoading || documentLoading">
                  <USkeleton class="w-10 h-10" />
                </template>
                <p v-else class="border border-white rounded py-1 px-2">
                  {{ minutes }}
                </p>
                :
                <template v-if="examServerLoading || documentLoading">
                  <USkeleton class="w-10 h-10" />
                </template>
                <p v-else class="border border-white rounded py-1 px-2">
                  <template v-if="String(seconds).length == 2">
                    {{ seconds }}
                  </template>
                  <template v-else> 0{{ seconds }} </template>
                </p>
              </div>
              <div
                v-else
                class="flex gap-2 text-white font-bold items-center justify-center text-xl"
              >
                <USkeleton
                  v-if="examServerLoading || documentLoading"
                  class="w-10 h-10"
                />
                <p v-else class="border border-white rounded py-1 px-2">
                  {{ timeLimit / 60 }}
                </p>
                :
                <USkeleton
                  v-if="examServerLoading || documentLoading"
                  class="w-10 h-10"
                />
                <p v-else class="border border-white rounded py-1 px-2">00</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Section -->
    <section class="w-full h-full bg-zinc-300">
      <div
        class="bg-gray-900 text-white p-3 font-extrabold text-2xl flex justify-between items-center"
      >
        <div v-if="mode === 'student'">
          <USkeleton
            v-if="examServerLoading || documentLoading"
            class="w-[200px] h-10"
          />
          <h1 v-else>{{ exam?.examName }}</h1>
        </div>
        <h1 v-else>Preview</h1>
      </div>
      <section class="w-full overflow-auto">
        <div
          v-if="examServerLoading || documentLoading"
          class="bg-white flex flex-col shadow-md gap-4 p-3"
        >
          <USkeleton class="w-full h-10" />
          <USkeleton class="w-full h-10" />
          <USkeleton class="w-full h-10" />
          <USkeleton class="w-full h-10" />
        </div>
        <div v-else class="text-xl p-3 bg-white shadow-md flex flex-col gap-4">
          <div
            v-for="(q, idx) in documentResult"
            :key="idx"
            class="select-none flex flex-col gap-1"
          >
            <p class="font-semibold">{{ idx + 1 }}. {{ q.question }}</p>
            <AppRadio
              v-model="answers[idx]"
              :items="q.options.map((opt) => sanitize(opt))"
              v-if="q.type === 'multiple-choice'"
              class="pl-5"
              :disabled="isDoneWithExam"
            />
            <AppTextarea
              v-else
              class="pl-5"
              v-model="answers[idx]"
              placeholder="Type your answer here…"
              baseClass="bg-gray-200 ring-0 inset-shadow-md"
              autoresize
              :disabled="isDoneWithExam"
              :rows="4"
            />
          </div>
        </div>
      </section>
    </section>
    <AppModal
      title="Submit exam"
      v-model="submitExamModal"
      closeClass="hidden!"
      titleClass="font-light! text-center!"
      class="max-w-[300px]!"
      :dismissible="false"
    >
      <template #body>
        <h1 class="w-full text-center">
          Are you sure you want to finish and submit the exam?
        </h1>
      </template>
      <template #footer>
        <div class="flex flex-col gap-2 w-full items-center justify-between">
          <AppButton
            label="Submit exam"
            theme="secondary"
            class="px-6! py-3!"
            @click="handleExamSubmit"
          />
          <AppButton
            label="No"
            theme="primary"
            @click="toggleSubmitExamModal"
            class="px-6! rounded-4xl!"
          />
        </div>
      </template>
    </AppModal>
    <AppModal
      v-model="showScoreModal"
      :dismissible="false"
      class="max-w-[300px]"
      closeClass="hidden"
      variant="subtle"
    >
      <template #content>
        <div class="flex flex-col gap-3 items-center p-4">
          <h2 class="font-bold text-2xl">
            <span class="text-orange-400 text-3xl">{{
              documentResult.length
            }}</span
            >/{{ documentResult.length }}
          </h2>
          <UProgress
            :max="documentResult.length"
            v-model="documentResult.length"
            :ui="{
              indicator: 'bg-orange-400',
            }"
          />
          <p>
            You got
            <span class="font-bold"
              >{{ documentResult.length }} of {{ documentResult.length }}</span
            >
            points
          </p>
          <AppButton
            label="Show auto-marking"
            theme="primary"
            class="px-6! py-3! rounded-4xl!"
            @click="toggleShowScoreModal"
          />
          <AppButton
            label="Close the exam"
            variant="link"
            class="text-black!"
          />
        </div>
      </template>
    </AppModal>
  </section>
</template>

<script lang="ts" setup>
import {
  watch,
  ref,
  onMounted,
  onUnmounted,
  computed,
  onBeforeUnmount,
} from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../../store/server/document";
import { useExamServerStore } from "../../store/server/exam";
import { questionFormatTeacher, sanitize } from "../../utils/functions";

const now = ref(new Date());
let timer = null;
const formattedTime = computed(() => {
  const h = String(now.value.getHours()).padStart(2, "0");
  const m = String(now.value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
});
const isoTime = computed(() => now.value.toISOString().slice(0, 16));
const showTimeLimit = ref(true);
const routes = useRoute();
const examID = computed(() => routes.params.id);
const mode = computed(() => routes.query.mode);
const { result: documentResult, loading: documentLoading } =
  storeToRefs(useDocumentStore());
const {
  uploadDocument,
  getPdfFromCloudinary,
  generatePdfBlob,
  uploadPdfToCloudinary,
} = useDocumentStore();
const { getExam } = useExamServerStore();
const { exam, loading: examServerLoading } = storeToRefs(useExamServerStore());
const answers = ref<Array<string | null>>(
  documentResult.value?.map(() => null),
);
const timeLimit = computed(
  () => exam.value?.settings?.general.timeLimit * 60 || 0,
);
const remainingTime = ref(timeLimit.value);
let intervalId = null;
const minutes = computed(() => Math.floor(remainingTime.value / 60));
const seconds = computed(() => remainingTime.value % 60);
const startTimer = (pauseMode: boolean = false) => {
  if (intervalId) clearInterval(intervalId);
  if (!pauseMode) {
    remainingTime.value = timeLimit.value;
  }
  intervalId = setInterval(async () => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(intervalId);
      intervalId = null;
      alert("The time for this exam has passed");
      await handleExamSubmit();
    }
  }, 1000);
};
const submitExamModal = ref(false);
const isDoneWithExam = ref(false);
const showScoreModal = ref(false);

function toggleShowTimeLimit() {
  showTimeLimit.value = !showTimeLimit.value;
}

function handleSubmitExam() {
  localStorage.removeItem("examPreview");
  documentResult.value = [];
}

async function handleExamSubmit() {
  isDoneWithExam.value = true;
  documentResult.value.forEach((question, index) => {
    question.studentAnswer = answers.value[index];
  });
  clearInterval(intervalId);
  const content = questionFormatTeacher(documentResult.value);
  const file = await generatePdfBlob(content);
  const url = await uploadPdfToCloudinary(file);

  toggleSubmitExamModal();
  clearInterval(intervalId);
  intervalId = null;
}

function toggleSubmitExamModal() {
  submitExamModal.value = !submitExamModal.value;

  if (submitExamModal.value && !isDoneWithExam.value) {
    clearInterval(intervalId);
  } else {
    startTimer(true);
  }
}

function toggleShowScoreModal() {
  showScoreModal.value = !showScoreModal.value;
}

onMounted(async () => {
  if (mode.value === "student") {
    await getExam({
      id: examID.value,
    });
    const file = await getPdfFromCloudinary(exam.value?.question);
    await uploadDocument(
      {
        file,
      },
      false,
    );
  }
  if (timeLimit.value > 0) {
    startTimer();
  }
  const msUntilNextMinute = (60 - now.value.getSeconds()) * 1000;
  timer = setTimeout(() => {
    now.value = new Date();
    timer = setInterval(() => (now.value = new Date()), 60_000);
  }, msUntilNextMinute);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});

onUnmounted(() => clearTimeout(timer) || clearInterval(timer));

watch(timeLimit, (newTimeLimit) => {
  if (newTimeLimit > 0 || mode.value === "student") {
    startTimer();
  }
});
</script>

<style scoped>
#SideBarMain {
  height: calc(100% - 112px);
}
</style>
