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
            <p
              class="text-gray-400 text-2xl w-[200px] text-center text-ellipsis text-nowrap overflow-hidden"
            >
              {{ examID }}
            </p>
            <div class="flex gap-4 justify-between text-white">
              <USkeleton
                v-if="examServerLoading || documentLoading"
                class="w-10 h-10"
              />
              <p v-else class="text-white text-2xl flex gap-1 items-center">
                <UIcon name="i-lucide-clock" /> {{ timeLimit / 60 }}:00
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
              v-if="examServerLoading || documentLoading"
              class="bg-white flex flex-col shadow-md gap-4 p-3"
            >
              <USkeleton class="w-full h-10" />
              <USkeleton class="w-full h-10" />
              <USkeleton class="w-full h-10" />
              <USkeleton class="w-full h-10" />
            </div>
            <div
              v-else
              class="text-xl p-3 bg-white shadow-md flex flex-col gap-4"
              ref="questionSection"
              id="questionSection"
            >
              <div v-for="(q, idx) in documentResult" :key="idx">
                <p class="font-semibold">{{ idx + 1 }}. {{ q.question }}</p>
                <ul class="list-disc list-inside pl-6">
                  <li v-for="opt in q.options" :key="opt">{{ opt }}</li>
                </ul>
              </div>
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
import { ref, computed } from "vue";
import { fileSize } from "../../utils/variables";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../../store/server/document";
import { onMounted } from "vue";
import { useExamServerStore } from "../../store/server/exam";

const fileDirectionHorizontal = ref(false);
const questionSection = ref(null);
const routes = useRoute();
const examID = computed(() => routes.params.id);
const { result: documentResult, loading: documentLoading } =
  storeToRefs(useDocumentStore());
const { getPdfFromCloudinary, uploadDocument } = useDocumentStore();
const { getExam } = useExamServerStore();
const { loading: examServerLoading, exam } = storeToRefs(useExamServerStore());
const timeLimit = computed(
  () => exam.value?.settings?.general.timeLimit * 60 || 0,
);

function handleSubmitExam() {
  localStorage.removeItem("examPreview");
  documentResult.value = [];
}

onMounted(async () => {
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
});
</script>

<style scoped>
#SideBarMain {
  height: calc(100% - 112px);
  width: 100%;
}
</style>
