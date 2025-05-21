<script lang="ts" setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";
import {
  storeToRefs,
} from "pinia";
import {
  useDocumentStore,
} from "../../store/server/document";
import {
  useExamServerStore,
} from "../../store/server/exam";
import {
  questionFormatTeacher,
  sanitize,
} from "../../utils/functions";
import {
  axiosInstance,
} from "../../utils/axiosConfig";

const now = ref(new Date());
let timer: number | null = null;

const formattedTime = computed(() => {
  const h = String(now.value.getHours()).padStart(2, "0");
  const m = String(now.value.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
});
const isoTime = computed(() => now.value.toISOString().slice(0, 16));

const showTimeLimit = ref(true);

const route = useRoute();
const router = useRouter();
const examID = computed(() => route.params.id as string);
const mode = computed(() => route.query.mode as string);

const documentStore = useDocumentStore();
const {
  result: documentResult,
  loading: documentLoading,
}
  = storeToRefs(documentStore);
const {
  uploadDocument,
  getPdfFromCloudinary,
  generatePdfBlob,
  uploadPdfToCloudinary,
} = documentStore;

const {
  getExam,
} = useExamServerStore();
const {
  exam,
  loading: examServerLoading,
} = storeToRefs(useExamServerStore());

const answers = ref<string[]>([]);

const timeLimit = computed(() => (exam.value?.settings?.general.timeLimit || 0) * 60);
const remainingTime = ref(0);
let intervalId: number | null = null;

const minutes = computed(() => Math.floor(remainingTime.value / 60));
const seconds = computed(() => remainingTime.value % 60);

const submitExamModal = ref(false);
const isDoneWithExam = ref(false);
const showScoreModal = ref(false);

function toggleShowTimeLimit() {
  showTimeLimit.value = !showTimeLimit.value;
}

function toggleSubmitExamModal() {
  submitExamModal.value = !submitExamModal.value;
  if (submitExamModal.value && !isDoneWithExam.value) {
    clearInterval(intervalId!);
  }
  else {
    startTimer();
  }
}

async function handleExamSubmit() {
  isDoneWithExam.value = true;
  clearInterval(intervalId!);
  documentResult.value.forEach((q, i) => (q.studentAnswer = answers.value[i]));
  const html = questionFormatTeacher(documentResult.value);
  const pdfBlob = await generatePdfBlob(html);
  const {
    url: secureUrl,
  } = await uploadPdfToCloudinary(pdfBlob);
  if (!secureUrl) {
    toggleSubmitExamModal();
    return;
  }
  const cookie = document.cookie
    .split("; ")
    .find(c => c.startsWith("student="))!;
  const token = cookie.split("=")[1];
  const payload = JSON.parse(atob(token.split(".")[1]));
  const email = payload.email as string;
  const examKey = localStorage.getItem("examKey") as string;
  const formData = new FormData();
  formData.append("file", pdfBlob, "submission.pdf");
  await axiosInstance.post(`/process/mark/${examKey}?email=${encodeURIComponent(email)}&studentAnswer=${encodeURIComponent(secureUrl)}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  router.push(`/student/${examID.value}/done`);
  toggleSubmitExamModal();
}

function startTimer(reset = false) {
  if (intervalId) {
    clearInterval(intervalId);
  }
  if (reset)
    remainingTime.value = timeLimit.value;
  intervalId = window.setInterval(async () => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    }
    else {
      clearInterval(intervalId!);
      await handleExamSubmit();
    }
  }, 1000);
}

onMounted(async () => {
  await getExam({
    id: examID.value,
  });
  const file = await getPdfFromCloudinary(exam.value!.question);
  await uploadDocument({
    file,
  }, false);
  answers.value = documentResult.value.map(() => "");
  remainingTime.value = timeLimit.value;
  if (timeLimit.value > 0 && mode.value === "student") {
    startTimer(true);
  }
  const ms = (60 - now.value.getSeconds()) * 1000;
  timer = window.setTimeout(() => {
    now.value = new Date();
    timer = window.setInterval(() => (now.value = new Date()), 60000);
  }, ms);
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
  if (intervalId) {
    clearInterval(intervalId);
  }
});

watch(timeLimit, (lim) => {
  remainingTime.value = lim;
  if (lim > 0 && mode.value === "student") {
    startTimer(true);
  }
});
</script>

<template>
  <AppToast
    v-if="mode !== 'student'"
    text="This is a preview of how this exam will appear to the students."
  />
  <section class="w-full h-[100dvh] flex overflow-auto text-black bg-gray-800">
    <aside class="h-full w-full max-w-[300px]">
      <div
        class="bg-orange-400 flex justify-center items-center gap-2 p-4 capitalize"
      >
        Student
        <i class="fa-solid fa-user-secret" />
      </div>
      <div id="SideBarMain" class="w-full bg-gray-900">
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
                left-icon="i-lucide-check"
                theme="variant"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto"
                :loading="examServerLoading || documentLoading"
                @click="toggleSubmitExamModal"
              />
              <AppButton
                v-else
                label="Submit Exam"
                left-icon="i-lucide-check"
                theme="variant"
                class="rounded-2xl! px-5! py-3! gap-4! m-auto"
                to="/monitoring-results"
                @click="handleExamSubmit"
              />
            </template>
            <template v-else>
              <!-- <AppButton -->
              <!--   label="Show score" -->
              <!--   leftIcon="i-lucide-trophy" -->
              <!--   theme="primary" -->
              <!--   class="rounded-2xl! px-5! py-3! gap-4! m-auto border-white! text-white! hover:text-slate-200! hover:border-slate-200" -->
              <!--   @click="toggleShowScoreModal" -->
              <!--   :loading="examServerLoading || documentLoading" -->
              <!-- /> -->
              <AppButton
                label="Close the Exam"
                left-icon="i-lucide-check"
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
              <div />
              <UIcon
                name="i-lucide-step-back"
                class="w-fit text-orange-400 text-4xl"
              />
            </RouterLink>
          </div>

          <div class="flex flex-col items-center gap-4 w-full p-3">
            <AppButton
              left-icon="i-lucide-settings"
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
                class="size-7"
                @click="toggleShowTimeLimit"
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
                <span>:</span>
                <template v-if="examServerLoading || documentLoading">
                  <USkeleton class="w-10 h-10" />
                </template>
                <p v-else class="border border-white rounded py-1 px-2">
                  {{ seconds < 10 ? `0${seconds}` : seconds }}
                </p>
              </div>
              <div
                v-else
                class="flex gap-2 text-white font-bold items-center justify-center text-xl"
              >
                <template v-if="examServerLoading || documentLoading">
                  <USkeleton class="w-10 h-10" />
                </template>
                <p v-else class="border border-white rounded py-1 px-2">
                  {{ timeLimit / 60 }}
                </p>
                <span>:</span>
                <template v-if="examServerLoading || documentLoading">
                  <USkeleton class="w-10 h-10" />
                </template>
                <p v-else class="border border-white rounded py-1 px-2">
                  00
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </aside>

    <section class="w-full h-full bg-zinc-300">
      <div
        class="bg-gray-900 text-white p-3 font-extrabold text-2xl flex justify-between items-center"
      >
        <div v-if="mode === 'student'">
          <USkeleton
            v-if="examServerLoading || documentLoading"
            class="w-[200px] h-10"
          />
          <h1 v-else>
            {{ exam?.examName }}
          </h1>
        </div>
        <h1 v-else>
          Preview
        </h1>
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
            <p class="font-semibold">
              {{ idx + 1 }}. {{ q.question }}
            </p>
            <AppRadio
              v-if="q.type === 'multiple-choice'"
              v-model="answers[idx]"
              :items="q.options.map((opt) => sanitize(opt))"
              class="pl-5"
              :disabled="isDoneWithExam"
            />
            <AppTextarea
              v-else
              v-model="answers[idx]"
              class="pl-5"
              placeholder="Type your answer here…"
              base-class="bg-gray-200 ring-0 inset-shadow-md"
              autoresize
              :disabled="isDoneWithExam"
              :rows="4"
            />
          </div>
        </div>
      </section>
    </section>

    <AppModal
      v-model="submitExamModal"
      title="Submit exam"
      close-class="hidden!"
      title-class="font-light! text-center!"
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
            class="px-6! rounded-4xl!"
            @click="toggleSubmitExamModal"
          />
        </div>
      </template>
    </AppModal>

    <AppModal
      v-model="showScoreModal"
      :dismissible="false"
      class="max-w-[300px]"
      close-class="hidden"
      variant="subtle"
    >
      <template #content>
        <div class="flex flex-col gap-3 items-center p-4">
          <h2 class="font-bold text-2xl">
            <span class="text-orange-400 text-3xl">{{
              documentResult.length
            }}</span>/{{ documentResult.length }}
          </h2>
          <UProgress
            v-model="documentResult.length"
            :max="documentResult.length"
            :ui="{ indicator: 'bg-orange-400' }"
          />
          <p>
            You got
            <span class="font-bold">{{ documentResult.length }} of {{ documentResult.length }}</span>
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

<style scoped>
#SideBarMain {
  height: calc(100% - 112px);
}
</style>
