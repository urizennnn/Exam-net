<template>
  <AppToast
    text="This is a preview of how this exam will appear to the students."
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
            <AppButton
              label="Submit Exam"
              leftIcon="i-lucide-check"
              theme="variant"
              class="rounded-2xl! px-5! py-3! gap-4! m-auto"
              to="/monitoring-results"
              @click="handleSubmitExam"
            />
            <RouterLink
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
      </div>
      <section class="w-full overflow-auto">
        <div class="text-xl p-3 bg-white shadow-md flex flex-col gap-4">
          <div
            v-for="(q, idx) in documentResult"
            :key="idx"
            class="select-none flex flex-col gap-1"
          >
            <p class="font-semibold">{{ idx + 1 }}. {{ q.question }}</p>
            <AppRadio
              v-model="answers[idx]"
              :items="q.options"
              v-if="q.type === 'multiple-choice'"
              class="pl-5"
            />
            <AppTextarea
              v-else
              class="pl-5"
              v-model="answers[idx]"
              placeholder="Type your answer here…"
              baseClass="bg-gray-200 ring-0 inset-shadow-md"
              autoresize
              :rows="4"
            />
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";
import { clearNewExamData } from "../../utils/functions";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../../store/server/document";

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
const routes = useRoute();
const examID = computed(() => routes.params.id);
const timerValue = ref(newExamStore.configOptions.setTime);
const { result: documentResult } = storeToRefs(useDocumentStore());
const answers = ref<Array<string | null>>(
  documentResult.value?.map(() => null),
);

function toggleShowTimeLimit() {
  showTimeLimit.value = !showTimeLimit.value;
}

function handleSubmitExam() {
  clearNewExamData();
}

onMounted(() => {
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
</style>
