<script setup lang="ts">
import type {
  TableColumn,
} from "@nuxt/ui";

import {
  storeToRefs,
} from "pinia";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import {
  useRoute,
  useRouter,
} from "vue-router";

import type {
  TabsType,
} from "../../utils/types";

import {
  useDocumentStore,
} from "../../store/server/document";
import {
  useExamServerStore,
} from "../../store/server/exam";
import {
  downloadFile,
} from "../../utils/functions";

const {
  getExams,
  inviteStudentToExam,
  getExam,
  dropInviteStudent,
  inviteStudentInBulk,
}
  = useExamServerStore();

const {
  loading: examServerLoading,
  exams,
  success: examServerSuccess,
  exam,
} = storeToRefs(useExamServerStore());

const {
  loading: documentLoading,
} = storeToRefs(useDocumentStore());

const {
  getPdfFromCloudinary,
} = useDocumentStore();

const routes = useRoute();
const router = useRouter();

const allAvailableExams = computed(() =>
  exams.value.map(exam => exam.examName));
const examTitle = ref("");
const currentExam = computed(() => exam.value);
const currentId = ref(null);

const tabs = ref<TabsType[]>([
  {
    label: "monitoring",
    isActive: true,
    value: "monitoring",
  },
  {
    label: "results",
    isActive: false,
    value: "results",
  },
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
  {
    label: "End the exam for students",
    leftIcon: "i-lucide-step-forward",
  },
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

const columns: TableColumn<any>[] = [
  {
    accessorKey: "name",
    header: "Student",
  },
  {
    accessorKey: "score",
    header: "Points",
  },
  {
    accessorKey: "submissionTime",
    header: "Submission Time",
  },
  {
    id: "action",
  },
];

const rows = computed(() =>
  exam.value?.submissions?.map((sub: any) => ({
    id: sub.email,
    name: sub.email,
    score: sub.score,
    submissionTime: new Date(sub.timeSubmitted).toLocaleString(),
    transcript: sub.transcript,
  })) ?? []);

const studentEmail = ref("");
const studentsEmail = ref<string[]>([]);

const showInviteStudent = ref(false);
const showInvitesModal = ref(false);
const sendModal = ref(false);

const bulkStudentUploadModal = ref(false);
const bulkFile = ref(null);

function toggleShowInviteStudent() {
  showInviteStudent.value = !showInviteStudent.value;
  if (!showInviteStudent.value)
    studentsEmail.value = [];
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
    await getExam({
      id: currentExam.value!._id,
    });
  }
}

async function handleBulkUpload() {
  await inviteStudentInBulk(routes.params.id, {
    file: bulkFile.value,
  });

  if (examServerSuccess.value) {
    toggleBulkStudentUploadModal();
  }
}

async function handleDropInvite(email: string) {
  await dropInviteStudent(currentExam.value!._id, email);
  if (examServerSuccess.value) {
    await getExam({
      id: currentExam.value!._id,
    });
  }
}

function openTranscript(url: string) {
  if (url) {
    window.open(url, "_blank");
  }
}

const accessValue = ref("");
const sendExamTimeLimit = reactive({
  number: 15,
  type: "hours",
});
const viewOptionShow = ref(true);
const sendModelViewOption = ref([
  {
    label: "Show all",
    value: true,
  },
  {
    label: "Show points and feedback",
    value: false,
  },
  {
    label: "Customize",
    value: false,
  },
]);

const transcriptModal = ref(false);
const studentsTransciptUrl = ref<any>(null);

function toggleSendModal() {
  sendModal.value = !sendModal.value;
  if (!sendModal.value)
    viewOptionShow.value = false;
}

function toggleViewOptionShow() {
  viewOptionShow.value = !viewOptionShow.value;
}

async function toggleTranscriptModal(transcriptUrl: string) {
  if (!transcriptUrl)
    return;

  const file = await getPdfFromCloudinary(transcriptUrl);
  if (!file)
    return;

  studentsTransciptUrl.value = URL.createObjectURL(file);
  transcriptModal.value = true;
}

watch(() => examTitle.value, async (newTitle) => {
  currentId.value = exams.value.find(e => e.examName === newTitle)._id;
  await getExam({
    id: currentId.value,
  });
  router.push(`/monitoring-results/${currentId.value}`);
});

watch(() => currentExam.value, (exam) => {
  if (exam)
    accessValue.value = exam.access;
});

onMounted(async () => {
  await getExams();
  if (routes.params.id) {
    exam.value = exams.value.find(exam => exam._id === routes.params.id);
    examTitle.value = currentExam.value.examName;
  }
  else {
    examTitle.value = exams.value[0].examName || "";
  }
});
</script>

<template>
  <section id="section" class="bg-zinc-300 text-black">
    <div class="section-container-width">
      <section class="pt-4 w-full flex gap-3">
        <aside class="w-full max-w-[300px]">
          <AppSelectMenu
            v-model="examTitle"
            :items="allAvailableExams"
            :loading="examServerLoading"
            base-class="ring-0 text-2xl"
          />
          <h1
            class="flex items-center gap-1 font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3"
          >
            <UIcon name="i-lucide-house" class="size-5" />
            Overview
          </h1>
        </aside>

        <div class="bg-white rounded-md w-full">
          <AppTab v-model="selectSelectedTab" :tabs="tabs" />
          <main class="py-8 px-4">
            <USkeleton v-if="examServerLoading" class="w-[350px] h-12" />
            <h1 v-else class="text-black text-5xl font-bold">
              {{ examTitle }}
            </h1>

            <template v-if="selectSelectedTab === 'monitoring'">
              <section class="flex gap-6 mt-4">
                <div class="flex flex-col gap-3 w-full max-w-[350px]">
                  <div
                    class="flex gap-6 items-center w-full justify-between text-black text-xl"
                  >
                    <p class="font-light">
                      Exam key
                    </p>
                    <USkeleton v-if="examServerLoading" class="w-20 h-10" />
                    <p v-else>
                      {{ currentExam?.examKey }}
                    </p>
                  </div>
                  <div
                    class="flex gap-6 items-center w-full justify-between text-black text-xl"
                  >
                    <p class="font-light">
                      Access
                    </p>
                    <USkeleton v-if="examServerLoading" class="w-20 h-10" />
                    <p v-else>
                      {{ currentExam?.access }}
                    </p>
                  </div>
                  <div class="mt-4">
                    <h4 class="font-bold">
                      Student Status
                    </h4>
                    <div class="flex gap-2 w-full mt-3">
                      <div
                        v-if="examServerLoading"
                        class="w-full h-full flex items-center justify-between"
                      >
                        <USkeleton class="w-full h-[100px]" />
                      </div>
                      <div
                        v-for="(status, index) in studentStatus"
                        v-else
                        :key="index"
                        :class="`${status.borderBottom} border-b-4 p-4 flex items-center justify-center flex-col gap-3 bg-gray-100 w-full`"
                      >
                        <p class="text-xl flex items-end">
                          <span class="font-bold text-2xl">{{
                            status.done
                          }}</span>/{{ status.total }}
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
                      v-if="button?.children"
                      :items="button.children"
                      :ui="{
                        content: 'bg-white shadow cursor-pointer',
                        item: 'cursor-pointer text-black hover:bg-black rounded',
                      }"
                      :disabled="examServerLoading"
                    >
                      <AppButton
                        :label="button.label"
                        :left-icon="button.leftIcon"
                        :loading="examServerLoading"
                        theme="primary"
                        class="w-full! items-center justify-center rounded-3xl!"
                      />
                    </UDropdownMenu>
                    <AppButton
                      v-else
                      :label="button.label"
                      :left-icon="button.leftIcon"
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
              <div class="my-8 w-full px-4 flex gap-4">
                <AppButton
                  v-for="(button, index) in buttonListTwo"
                  :key="index"
                  :label="button.label"
                  :left-icon="button.leftIcon"
                  :right-icon="button.rightIcon"
                  class="w-full! items-center justify-center rounded-3xl!"
                  :loading="examServerLoading || documentLoading"
                  theme="primary"
                  @click="button.clickAction"
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
                      left-icon="i-lucide-file-badge"
                      theme="primary"
                      class="border-black border-2! rounded-4xl!"
                      title="View Transcript"
                      :loading="documentLoading"
                      @click="toggleTranscriptModal(row.original.transcript)"
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

  <AppModal v-model="showInviteStudent" title="Invite Student to Take Exam">
    <template #body>
      <p class="text-center mb-3 text-gray-600">
        This will send a link to the student which can be used take the exam.
      </p>
      <section>
        <div class="rounded-lg">
          <AppInput
            v-model="studentEmail"
            placeholder="Enter Students Email"
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
        :disabled="studentsEmail.length === 0"
        :loading="examServerLoading"
        class="w-fit! px-8"
        @click="handleInviteStudent"
      />
    </template>
  </AppModal>

  <AppModal v-model="showInvitesModal" title="Invited Students">
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
            :loading="examServerLoading"
            @click="handleDropInvite(email)"
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

  <AppModal v-model="sendModal" title="Send exam back to student">
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
              <i class="fa-regular fa-clock" />
              Time Limit
            </h2>
            <p>Select how long this link is valid</p>
            <div class="flex gap-3">
              <AppInput
                v-model="sendExamTimeLimit.number"
                theme="secondary"
                type="number"
                max="60"
                min="15"
              />
              <select
                v-model="sendExamTimeLimit.type"
                value="hours"
                class="border-b border-b-gray-600 w-full"
              >
                <option value="hours">
                  hours
                </option>
                <option value="minutes">
                  minutes
                </option>
              </select>
            </div>
          </div>
          <div class="text-gray-600 flex flex-col gap-4 mt-4">
            <div class="flex items-center justify-between">
              <h1>
                <i class="fa-solid fa-eye-slash" />
                View options
              </h1>
              <i
                :class="`cursor-pointer fa-solid ${
                  !viewOptionShow ? 'fa-angle-down' : 'fa-angle-up'
                }`"
                role="button"
                @click="toggleViewOptionShow"
              />
            </div>
            <div
              v-for="(option, index) in sendModelViewOption"
              v-show="viewOptionShow"
              :key="index"
              class="flex flex-col gap-1"
            >
              <label
                :for="`radio-${index}`"
                class="flex items-center gap-3 select-none cursor-pointer"
              >
                <input
                  :id="`radio-${index}`"
                  v-model="option.value"
                  type="radio"
                  name="viewOptionRadio"
                >
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
      <AppButton label="Send" class="w-fit! px-8" @click="toggleSendModal" />
    </template>
  </AppModal>

  <AppModal v-model="transcriptModal" class="max-w-[85%]! h-[85dvh]">
    <template #content>
      <iframe :src="studentsTransciptUrl" width="100%" height="100%" />
    </template>
  </AppModal>

  <AppModal
    v-model="bulkStudentUploadModal"
    title="Invite students to Take Exam"
  >
    <template #body>
      <div class="flex gap-2">
        <AppInput v-model="bulkFile" type="file" accept=".csv" />
        <AppButton
          label="Download Template"
          class="rounded-xl! px-8"
          theme="secondary"
          @click="downloadFile('emails_and_names.csv')"
        />
      </div>
    </template>
    <template #footer>
      <AppButton
        label="Invite"
        class="w-fit! px-8"
        :disabled="!bulkFile"
        theme="secondary"
        :loading="examServerLoading"
        @click="handleBulkUpload"
      />
    </template>
  </AppModal>
</template>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
