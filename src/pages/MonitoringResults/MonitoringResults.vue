<template>
  <section class="bg-zinc-300 text-black" id="section">
    <div class="section-container-width">
      <section class="pt-4 w-full flex gap-3">
        <aside class="w-full max-w-[300px]">
          <AppSelectMenu
            :items="allAvailableExams"
            v-model="examTitle"
            :loading="examServerLoading"
            baseClass="ring-0 text-2xl"
          />
          <h1
            class="flex items-center gap-1 font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3"
          >
            <UIcon name="i-lucide-house" class="size-5" />
            Overview
          </h1>
        </aside>

        <div class="bg-white rounded-md w-full">
          <AppTab :tabs="tabs" v-model="selectSelectedTab" />
          <main class="py-8 px-4">
            <USkeleton v-if="examServerLoading" class="w-[350px] h-12" />
            <h1 class="text-black text-5xl font-bold" v-else>
              {{ examTitle }}
            </h1>

            <template v-if="selectSelectedTab === 'monitoring'">
              <section class="flex gap-6 mt-4">
                <div class="flex flex-col gap-3 w-full max-w-[350px]">
                  <div
                    class="flex gap-6 items-center w-full justify-between text-black text-xl"
                  >
                    <p class="font-light">Exam key</p>
                    <USkeleton class="w-20 h-10" v-if="examServerLoading" />
                    <p v-else>{{ currentExam?.examKey }}</p>
                  </div>
                  <AppSelect
                    label="Access"
                    :loading="examServerLoading"
                    :items="accessOptions"
                    v-model="accessValue"
                  />
                  <!-- <div class="flex gap-6 items-center font-light text-black text-xl justify-between"> -->
                  <!--   <p>Teachers</p> -->
                  <!--   <div class="flex"> -->
                  <!--     <i v-for="(teacher, index) in teachersList.slice(0, 3)" :key="index" :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : '' -->
                  <!--       } py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`"> -->
                  <!--       {{ teacher.name[0].toUpperCase() }} -->
                  <!--     </i> -->
                  <!--     <AppButton -->
                  <!--       class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-3.5! rounded-full! bg-white" -->
                  <!--       icon="i-lucide-share-2" size="xl" theme="primary" /> -->
                  <!--   </div> -->
                  <!-- </div> -->

                  <div class="mt-4">
                    <h4 class="font-bold">Student Status</h4>
                    <div class="flex gap-2 w-full mt-3">
                      <div
                        v-if="examServerLoading"
                        class="w-full h-full flex items-center justify-between"
                      >
                        <USkeleton class="w-full h-[100px]" />
                      </div>
                      <div
                        v-else
                        v-for="(status, index) in studentStatus"
                        :key="index"
                        :class="`${status.borderBottom} border-b-4 p-4 flex items-center justify-center flex-col gap-3 bg-gray-100 w-full`"
                      >
                        <p class="text-xl flex items-end">
                          <span class="font-bold text-2xl">{{
                            status.done
                          }}</span
                          >/{{ status.total }}
                        </p>
                        <p class="capitalize text-xl tracking-wide">
                          {{ status.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-full px-4 flex flex-col gap-4">
                  <template v-for="(button, index) in buttonList" :key="index">
                    <UDropdownMenu
                      :items="button.children"
                      v-if="button?.children"
                      :ui="{
                        content: 'bg-white shadow cursor-pointer',
                        item: 'cursor-pointer text-black hover:bg-black rounded',
                      }"
                      :disabled="examServerLoading"
                    >
                      <AppButton
                        :label="button.label"
                        :leftIcon="button.leftIcon"
                        :loading="examServerLoading"
                        theme="primary"
                        class="w-full! items-center justify-center rounded-3xl!"
                      />
                    </UDropdownMenu>
                    <AppButton
                      v-else
                      :label="button.label"
                      :leftIcon="button.leftIcon"
                      :loading="examServerLoading"
                      theme="primary"
                      class="w-full! items-center justify-center rounded-3xl!"
                      :to="button.to"
                      @click="button.click"
                    />
                  </template>
                </div>
              </section>
            </template>

            <template v-if="selectSelectedTab === 'results'">
              <!-- <div -->
              <!--   class="w-full max-w-[350px] my-8 flex gap-6 items-center font-light text-black text-xl justify-between"> -->
              <!--   <p>Teachers</p> -->
              <!--   <div class="flex"> -->
              <!--     <i v-for="(teacher, index) in teachersList.slice(0, 3)" :key="index" :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : '' -->
              <!--       } py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`"> -->
              <!--       {{ teacher.name[0].toUpperCase() }} -->
              <!--     </i> -->
              <!--     <AppButton class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-3.5! rounded-full! bg-white" -->
              <!--       icon="i-lucide-share-2" size="xl" theme="primary" /> -->
              <!--   </div> -->
              <!-- </div> -->

              <div class="my-8 w-full px-4 flex gap-4">
                <AppButton
                  v-for="(button, index) in buttonListTwo"
                  :key="index"
                  :label="button.label"
                  :leftIcon="button.leftIcon"
                  :rightIcon="button.rightIcon"
                  class="w-full! items-center justify-center rounded-3xl!"
                  @click="button.clickAction"
                  :loading="examServerLoading || documentLoading"
                  theme="primary"
                />
              </div>

              <AppTable
                :columns="columns"
                :rows="rows"
                :loading="examServerLoading || documentLoading"
              >
                <template #name-cell="{ row }">
                  <p
                    class="cursor-pointer text-blue-600 underline"
                    @click="openTranscript(row.original.transcript)"
                  >
                    {{ row.original.name }}
                  </p>
                </template>
                <template #action-cell="{ row }">
                  <div class="flex gap-2 items-center">
                    <AppButton
                      leftIcon="i-lucide-file-badge"
                      theme="primary"
                      class="border-black border-2! rounded-4xl!"
                      title="View Transcript"
                      @click="toggleTranscriptModal(row.original.transcript)"
                      :loading="documentLoading"
                    />
                  </div>
                </template>
              </AppTable>
            </template>
          </main>
        </div>
      </section>
    </div>
  </section>

  <AppModal title="Invite Student to Take Exam" v-model="showInviteStudent">
    <template #body>
      <p class="text-center mb-3 text-gray-600">
        This will send a link to the student which can be used take the exam.
      </p>
      <section>
        <div class="rounded-lg">
          <AppInput
            placeholder="Enter Students Email"
            v-model="studentEmail"
            @keyup.enter="addStudentEmail(studentEmail)"
          />
          <h1 class="p-2 bg-blue-500 text-white mt-4 font-bold rounded-t-lg">
            Students
          </h1>
          <ul
            class="h-full max-h-[250px] p-4 flex flex-col gap-3 w-full overflow-y-scroll overflow-x-hidden"
          >
            <li v-for="student in studentsEmail" :key="student">
              {{ student }}
            </li>
          </ul>
        </div>
      </section>
    </template>
    <template #footer>
      <AppButton
        label="Send"
        @click="handleInviteStudent"
        :disabled="studentsEmail.length === 0"
        :loading="examServerLoading"
        class="w-fit! px-8"
      />
    </template>
  </AppModal>

  <AppModal title="Invited Students" v-model="showInvitesModal">
    <template #body>
      <ul class="flex flex-col gap-3 max-h-[300px] overflow-y-auto w-full">
        <li
          v-for="email in currentExam?.invites || []"
          :key="email"
          class="flex justify-between items-center border-b pb-1"
        >
          <span>{{ email }}</span>
          <AppButton
            icon="i-lucide-trash"
            class="text-2xl text-red-600"
            @click="handleDropInvite(email)"
            :loading="examServerLoading"
          />
        </li>
        <li
          v-if="(currentExam?.invites || []).length === 0"
          class="text-center italic text-gray-500"
        >
          No invites yet
        </li>
      </ul>
    </template>
  </AppModal>

  <AppModal title="Send exam back to student" v-model="sendModal">
    <template #body>
      <p class="text-center mb-3 text-gray-600">
        This will send a link to the student which can be used to see the
        answers and the marking.
      </p>
      <section class="grid gap-6 grid-cols-2">
        <div>
          <h1 class="p-2 bg-blue-100 text-blue-500 font-bold rounded-t-lg">
            Settings
          </h1>
          <div class="text-gray-600 flex flex-col gap-4 mt-3">
            <h2>
              <i class="fa-regular fa-clock"></i>
              Time Limit
            </h2>
            <p>Select how long this link is valid</p>
            <div class="flex gap-3">
              <AppInput
                theme="secondary"
                v-model="sendExamTimeLimit.number"
                type="number"
                max="60"
                min="15"
              />
              <select
                value="hours"
                class="border-b border-b-gray-600 w-full"
                v-model="sendExamTimeLimit.type"
              >
                <option value="hours">hours</option>
                <option value="minutes">minutes</option>
              </select>
            </div>
          </div>
          <div class="text-gray-600 flex flex-col gap-4 mt-4">
            <div class="flex items-center justify-between">
              <h1>
                <i class="fa-solid fa-eye-slash"></i>
                View options
              </h1>
              <i
                :class="`cursor-pointer fa-solid ${
                  !viewOptionShow ? 'fa-angle-down' : 'fa-angle-up'
                }`"
                role="button"
                @click="toggleViewOptionShow"
              ></i>
            </div>
            <div
              v-show="viewOptionShow"
              v-for="(option, index) in sendModelViewOption"
              :key="index"
              class="flex flex-col gap-1"
            >
              <label
                :for="`radio-${index}`"
                class="flex items-center gap-3 select-none cursor-pointer"
              >
                <input
                  type="radio"
                  name="viewOptionRadio"
                  v-model="option.value"
                  :id="`radio-${index}`"
                />
                <p>{{ option.label }}</p>
              </label>
            </div>
            <AppButton label="Preview settings" class="rounded-4xl! px-5!" />
          </div>
        </div>
        <div class="rounded-lg">
          <h1 class="p-2 bg-blue-500 text-white font-bold rounded-t-lg">
            Students
          </h1>
        </div>
      </section>
    </template>
    <template #footer>
      <AppButton label="Send" @click="toggleSendModal" class="w-fit! px-8" />
    </template>
  </AppModal>

  <AppModal v-model="transcriptModal" class="max-w-[85%]! h-[85dvh]">
    <template #content>
      <iframe :src="studentsTransciptUrl" width="100%" height="100%"></iframe>
    </template>
  </AppModal>

  <AppModal
    v-model="bulkStudentUploadModal"
    title="Invite students to Take Exam"
  >
    <template #body>
      <div class="flex gap-2">
        <AppInput type="file" v-model="bulkFile" />
        <AppButton
          label="Download Template"
          @click="downloadFile('emails_and_names.csv')"
          class="rounded-xl! px-8"
          theme="secondary"
        />
      </div>
    </template>
    <template #footer>
      <AppButton
        label="Invite"
        @click="toggleBulkStudentUploadModal"
        class="w-fit! px-8"
        :disabled="!bulkFile"
        theme="secondary"
      />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { TabsType } from "../../utils/types";
import { TableColumn } from "@nuxt/ui";
import { useExamServerStore } from "../../store/server/exam";
import { storeToRefs } from "pinia";
import { useDocumentStore } from "../../store/server/document";
import { useRoute, useRouter } from "vue-router";
import { downloadFile } from "../../utils/functions";

const { getExams, inviteStudentToExam, getExam, dropInviteStudent } =
  useExamServerStore();

const {
  loading: examServerLoading,
  exams,
  success: examServerSuccess,
  exam,
} = storeToRefs(useExamServerStore());

const { loading: documentLoading } = storeToRefs(useDocumentStore());

const { getPdfFromCloudinary } = useDocumentStore();

const routes = useRoute();
const router = useRouter();

const allAvailableExams = computed(() =>
  exams.value.map((exam) => exam.examName),
);
const examTitle = ref("");
const currentExam = computed(() => exam.value);
const currentId = ref(null);

const tabs = ref<TabsType[]>([
  { label: "monitoring", isActive: true, value: "monitoring" },
  { label: "results", isActive: false, value: "results" },
]);
const selectSelectedTab = ref(tabs.value[0].value);

const studentStatus = computed(() => {
  const invites = currentExam.value?.invites?.length ?? 0;
  const submissions = currentExam.value?.submissions?.length ?? 0;
  return [
    {
      done: invites,
      total: invites,
      title: "ongoing",
      borderBottom: "border-blue-300",
    },
    {
      done: submissions,
      total: invites,
      title: "submitted",
      borderBottom: "border-green-300",
    },
  ];
});

const buttonList = computed(() => [
  {
    label: "Invited Students",
    leftIcon: "i-lucide-list",
    click: toggleShowInvitesModal,
  },
  {
    label: "Send Exam to Student",
    leftIcon: "i-lucide-share-2",
    children: [
      {
        label: "Single",
        onSelect: () => toggleShowInviteStudent(),
        icon: "i-tabler-multiplier-1x",
      },
      {
        label: "Bulk",
        icon: "i-tabler-multiplier-2x",
        onSelect: () => toggleBulkStudentUploadModal(),
      },
    ],
  },
  { label: "End the exam for students", leftIcon: "i-lucide-step-forward" },
  { label: "Set a timer for the students", leftIcon: "i-lucide-clock" },
  {
    label: "Preview exam",
    leftIcon: "i-lucide-binoculars",
    to: `/preview/${currentExam.value?._id}`,
  },
]);

const buttonListTwo = ref([
  {
    label: "Export",
    leftIcon: "i-lucide-file-down",
    rightIcon: "i-lucide-chevron-down",
  },
  {
    label: "Download",
    leftIcon: "i-lucide-arrow-down",
    rightIcon: "i-lucide-chevron-down",
  },
  {
    label: "Print",
    leftIcon: "i-lucide-printer",
    rightIcon: "i-lucide-chevron-down",
  },
  {
    label: "Send",
    leftIcon: "i-lucide-mail",
    rightIcon: "i-lucide-chevron-down",
    clickAction: toggleSendModal,
  },
]);

// const teachersList = ref([
//   { name: "Damian" },
//   { name: "Fisayo" },
//   { name: "Victor" },
//   { name: "Fara" },
// ]);


const columns: TableColumn<any>[] = [
  { accessorKey: "name", header: "Student" },
  { accessorKey: "score", header: "Points" },
  { accessorKey: "submissionTime", header: "Submission Time" },
  {
    id: "action",
  },
];

const rows = computed(
  () =>
    exam.value?.submissions?.map((sub: any) => ({
      id: sub.email,
      name: sub.email,
      score: sub.score,
      submissionTime: new Date(sub.timeSubmitted).toLocaleString(),
      transcript: sub.transcript,
    })) ?? [],
);

const showInviteStudent = ref(false);
const showInvitesModal = ref(false);
const sendModal = ref(false);

const bulkStudentUploadModal = ref(false);
const bulkFile = ref(null);

function toggleShowInviteStudent() {
  showInviteStudent.value = !showInviteStudent.value;
  if (!showInviteStudent.value) studentsEmail.value = [];
}

function toggleBulkStudentUploadModal() {
  bulkStudentUploadModal.value = !bulkStudentUploadModal.value;

  if (!bulkStudentUploadModal.value) {
    bulkFile.value = null;
  }
}

function toggleShowInvitesModal() {
  showInvitesModal.value = !showInvitesModal.value;
}

function toggleSendModal() {
  sendModal.value = !sendModal.value;
  if (!sendModal.value) viewOptionShow.value = false;
}

function toggleViewOptionShow() {
  viewOptionShow.value = !viewOptionShow.value;
}

const studentEmail = ref("");
const studentsEmail = ref<string[]>([]);

function addStudentEmail(email: string) {
  studentsEmail.value.push(email);
  studentEmail.value = "";
}

async function handleInviteStudent() {
  await inviteStudentToExam(currentExam.value!._id, {
    emails: studentsEmail.value,
  });
  if (examServerSuccess.value) {
    toggleShowInviteStudent();
    await getExam({ id: currentExam.value!._id });
  }
}

async function handleDropInvite(email: string) {
  await dropInviteStudent(currentExam.value!._id, email);
  if (examServerSuccess.value) {
    await getExam({ id: currentExam.value!._id });
  }
}

function openTranscript(url: string) {
  if (url) window.open(url, "_blank");
}

const accessValue = ref("");
const accessOptions = ref([
  [
    { value: "open", label: "Open", chip: { color: "success" } },
    { value: "closed", label: "Closed", chip: { color: "error" } },
    { value: "discoverable", label: "Discoverable", chip: { color: "info" } },
  ],
  [{ value: "scheduled", label: "Scheduled", icon: "i-lucide-calendar-days" }],
]);

const sendExamTimeLimit = reactive({ number: 15, type: "hours" });
const viewOptionShow = ref(true);
const sendModelViewOption = ref([
  { label: "Show all", value: true },
  { label: "Show points and feedback", value: false },
  { label: "Customize", value: false },
]);

const transcriptModal = ref(false);
const studentsTransciptUrl = ref<any>(null);
async function toggleTranscriptModal(transcriptUrl: string) {
  if (!transcriptUrl) return;

  const file = await getPdfFromCloudinary(transcriptUrl);
  if (!file) return;

  studentsTransciptUrl.value = URL.createObjectURL(file);
  transcriptModal.value = true;
}

watch(
  () => examTitle.value,
  async (newTitle) => {
    currentId.value = exams.value.find((e) => e.examName === newTitle)._id;
    await getExam({ id: currentId.value });
    router.push(`/monitoring-results/${currentId.value}`);
  },
);

watch(
  () => currentExam.value,
  (exam) => {
    if (exam) accessValue.value = exam.access;
  },
);

onMounted(async () => {
  await getExams();
  if (routes.params.id) {
    exam.value = exams.value.find((exam) => exam._id === routes.params.id);
    examTitle.value = currentExam.value.examName;
  } else {
    examTitle.value = exams.value[0].examName || "";
  }
});
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
