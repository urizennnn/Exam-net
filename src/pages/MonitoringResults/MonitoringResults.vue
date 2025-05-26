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

const examStore = useExamServerStore();
const {
  getExams,
  inviteStudentToExam,
  getExam,
  dropInviteStudent,
  inviteStudentInBulk,
  sendExamBackToStudent,
} = examStore;
const {
  loading: examServerLoading,
  exams,
  success: examServerSuccess,
  exam,
} = storeToRefs(examStore);

const documentStore = useDocumentStore();
const {
  loading: documentLoading,
  getPdfFromCloudinary,
} = documentStore;

const route = useRoute();
const router = useRouter();

const allAvailableExams = computed(() => exams.value.map(e => e.examName));
const hasExams = computed(() => exams.value.length > 0);
const examTitle = ref("");
const currentExam = computed(() => exam.value);
const currentId = ref<string | null>(null);

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
const selectedTab = ref(tabs.value[0].value);

const studentStatus = computed(() => {
  const invites = inviteEmails.value.length;
  const submissions = currentExam.value?.submissions?.length ?? 0;
  const ongoing = currentExam.value?.ongoing ?? 0;
  return [
    {
      done: ongoing,
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
    click: () => (showInvitesModal.value = !showInvitesModal.value),
  },
  {
    label: "Send Exam to Student",
    leftIcon: "i-lucide-share-2",
    children: [
      {
        label: "Single",
        onSelect: () => (showInviteStudent.value = !showInviteStudent.value),
        icon: "i-tabler-multiplier-1x",
      },
      {
        label: "Bulk",
        onSelect: () => (bulkStudentUploadModal.value = !bulkStudentUploadModal.value),
        icon: "i-tabler-multiplier-2x",
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
    label: "Export as CSV",
    leftIcon: "i-lucide-file-down",
    clickAction: exportCsv,
  },
  {
    label: "Send",
    leftIcon: "i-lucide-mail",
    clickAction: () => (sendModal.value = !sendModal.value),
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
const studentName = ref("");
const studentsData = ref<{ name: string; email: string }[]>([]);
const showInviteStudent = ref(false);
const showInvitesModal = ref(false);
const sendModal = ref(false);
const filterEmail = ref("");
const inviteEmails = computed(() => currentExam.value?.invites?.map(extractEmail) ?? []);
const filteredInviteEmails = computed(() => {
  const term = filterEmail.value.trim().toLowerCase();
  return term ? inviteEmails.value.filter(e => e.toLowerCase().includes(term)) : inviteEmails.value;
});
const bulkStudentUploadModal = ref(false);
const bulkFile = ref<File | null>(null);
const transcriptModal = ref(false);
const studentsTransciptUrl = ref<string | null>(null);
const resultsTab = ref<TabsType[]>([
  {
    isActive: true,
    label: "Student",
    value: "student",
  },
  {
    isActive: false,
    label: "Statistics",
    value: "statistics",
  },
]);
const selectedResultTab = ref(resultsTab.value[0].value);

function extractEmail(invite: any): string {
  if (!invite)
    return "";
  if (typeof invite === "string") {
    try {
      const p = JSON.parse(invite);
      return p?.email ?? invite;
    }
    catch {
      return invite;
    }
  }
  if (typeof invite === "object" && "email" in invite)
    return invite.email;
  return "";
}

function addStudentData() {
  if (studentEmail.value && studentName.value) {
    studentsData.value.push({
      name: studentName.value,
      email: studentEmail.value,
    });
    studentEmail.value = "";
    studentName.value = "";
  }
}

async function handleInviteStudent() {
  await inviteStudentToExam(currentExam.value!._id, {
    emails: studentsData.value.map(student => student.email),
    names: studentsData.value.map(student => student.name),
  });
  if (examServerSuccess.value) {
    showInviteStudent.value = false;
    studentsData.value = [];
    await getExam({
      id: currentExam.value!._id,
    });
  }
}

async function handleBulkUpload() {
  await inviteStudentInBulk(route.params.id as string, {
    file: bulkFile.value!,
  });
  if (examServerSuccess.value)
    bulkStudentUploadModal.value = false;
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
  if (url)
    window.open(url, "_blank");
}

function exportCsv() {
  const header = ["Student", "Points", "Submission Time"];
  const data = [header, ...rows.value.map(r => [r.name, String(r.score), r.submissionTime])];
  const csv = data.map(r => `"${r.map(cell => cell.replace(/"/g, "\"\"")).join("\",\"")}"`).join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "exam-results.csv";
  link.click();
  URL.revokeObjectURL(link.href);
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

function removeStudent(index: number) {
  studentsData.value.splice(index, 1);
}

watch(examTitle, async (newTitle) => {
  const found = exams.value.find(e => e.examName === newTitle);
  if (found) {
    currentId.value = found._id;
    await getExam({
      id: found._id,
    });
    router.push(`/monitoring-results/${found._id}`);
  }
});

onMounted(async () => {
  await getExams();
  if (route.params.id) {
    const found = exams.value.find(e => e._id === route.params.id);
    if (found) {
      exam.value = found;
      examTitle.value = found.examName;
    }
  }
  else {
    examTitle.value = exams.value[0]?.examName ?? "";
  }
});

async function handleSendToStudent(email: string) {
  await sendExamBackToStudent(currentExam.value!._id, email);
  if (examServerSuccess.value) {
    // Optionally refresh exam data or show success message
    await getExam({
      id: currentExam.value!._id,
    });
  }
}

async function handleSendToAll() {
  await sendExamBackToStudent(currentExam.value!._id, filteredInviteEmails.value);
  if (examServerSuccess.value) {
    sendModal.value = false;
    await getExam({
      id: currentExam.value!._id,
    });
  }
}
</script>

<template>
  <Header />
  <section id="section" class="bg-zinc-300 text-black">
    <div class="section-container-width">
      <template v-if="!hasExams">
        <div class="text-center py-20 text-gray-500 text-xl">
          No exams created at this time
        </div>
      </template>
      <template v-else>
        <section class="pt-4 w-full flex gap-3">
          <aside class="w-full max-w-[300px]">
            <AppSelectMenu
              v-model="examTitle"
              :items="allAvailableExams"
              :loading="examServerLoading"
              base-class="ring-0 text-2xl"
            />
            <h1 class="flex items-center gap-1 font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3">
              <UIcon name="i-lucide-house" class="size-5" /> Overview
            </h1>
          </aside>
          <div class="bg-white rounded-md w-full">
            <AppTab v-model="selectedTab" :tabs="tabs" />
            <main class="py-8 px-4">
              <USkeleton v-if="examServerLoading" class="w-[350px] h-12" />
              <h1 v-else class="text-black text-5xl font-bold">
                {{ examTitle }}
              </h1>

              <template v-if="selectedTab === 'monitoring'">
                <section class="flex gap-6 mt-4">
                  <div class="flex flex-col gap-3 w-full max-w-[350px]">
                    <div class="flex gap-6 items-center w-full justify-between text-black text-xl">
                      <p class="font-light">
                        Exam key
                      </p>
                      <USkeleton v-if="examServerLoading" class="w-20 h-10" />
                      <p v-else>
                        {{ currentExam?.examKey }}
                      </p>
                    </div>
                    <div class="flex gap-6 items-center w-full justify-between text-black text-xl">
                      <p class="font-light">
                        Access
                      </p>
                      <USkeleton v-if="examServerLoading" class="w-20 h-10" />
                      <p v-else class="capitalize">
                        {{ currentExam?.access }}
                      </p>
                    </div>
                    <div class="mt-4">
                      <h4 class="font-bold">
                        Student Status
                      </h4>
                      <div class="flex gap-2 w-full mt-3">
                        <div v-if="examServerLoading" class="w-full h-full flex items-center justify-between">
                          <USkeleton class="w-full h-[100px]" />
                        </div>
                        <div
                          v-for="(status, index) in studentStatus"
                          :key="index"
                          :class="`${status.borderBottom} border-b-4 p-4 flex items-center justify-center flex-col gap-3 bg-gray-100 w-full`"
                        >
                          <p class="text-xl flex items-end">
                            <span class="font-bold text-2xl">{{ status.done }}</span>/{{ status.total }}
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
                        v-if="button.children"
                        :items="button.children"
                        :ui="{ content: 'bg-white shadow cursor-pointer', item: 'cursor-pointer text-black hover:bg-black rounded' }"
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

              <template v-if="selectedTab === 'results'">
                <div class="my-8 w-full px-4 flex gap-4">
                  <AppButton
                    v-for="(button, index) in buttonListTwo"
                    :key="index"
                    :label="button.label"
                    :left-icon="button.leftIcon"
                    :loading="examServerLoading || documentLoading"
                    theme="primary"
                    class="w-full! items-center justify-center rounded-3xl!"
                    @click="button.clickAction"
                  />
                </div>
                <div class="mt-4">
                  <AppTab
                    v-model="selectedResultTab"
                    :tabs="resultsTab"
                    theme="variant"
                    class="py-1 tracking-wider hover:border-b-3 hover:border-zinc-800 mr-4 text-zinc-600 hover:text-zinc-800"
                    active-class="border-b-3 border-zinc-800 text-zinc-800 cursor-pointer"
                  />
                </div>
                <AppTable
                  v-if="selectedResultTab === 'student'"
                  :columns="columns"
                  :rows="rows"
                  :loading="examServerLoading || documentLoading"
                >
                  <template #name-cell="{ row }">
                    <p class="cursor-pointer text-blue-600 underline" @click="openTranscript(row.original.transcript)">
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
                <div v-if="selectedResultTab === 'statistics'">
                  <AppPieChart :rows="rows" />
                </div>
              </template>
            </main>
          </div>
        </section>
      </template>
    </div>

    <AppModal v-model="showInviteStudent" title="Invite Student to Take Exam">
      <template #body>
        <div class="rounded-lg">
          <div class="flex gap-2 mb-4">
            <AppInput v-model="studentName" placeholder="Enter Student Name" class="flex-1" />
            <AppInput v-model="studentEmail" placeholder="Enter Student Email" class="flex-1" />
            <AppButton
              label="Add"
              theme="secondary"
              class="px-4"
              :disabled="!studentName || !studentEmail"
              @click="addStudentData"
            />
          </div>
          <h1 class="p-2 bg-blue-500 text-white mt-4 font-bold rounded-t-lg">
            Students
          </h1>
          <ul class="h-full max-h-[250px] p-4 flex flex-col gap-3 w-full overflow-y-scroll overflow-x-hidden">
            <li v-for="(student, index) in studentsData" :key="index" class="flex justify-between items-center border-b pb-2">
              <div>
                <p class="font-semibold">{{ student.name }}</p>
                <p class="text-sm text-gray-600">{{ student.email }}</p>
              </div>
              <AppButton
                icon="i-lucide-trash"
                class="text-red-600"
                @click="removeStudent(index)"
              />
            </li>
            <li v-if="studentsData.length === 0" class="text-center italic text-gray-500">
              No students added yet
            </li>
          </ul>
        </div>
      </template>
      <template #footer>
        <AppButton
          label="Send"
          :disabled="studentsData.length === 0"
          :loading="examServerLoading"
          class="w-fit! px-8"
          @click="handleInviteStudent"
        />
      </template>
    </AppModal>

    <AppModal v-model="showInvitesModal" title="Invited Students">
      <template #body>
        <ul class="flex flex-col gap-3 max-h-[300px] overflow-y-auto w-full">
          <li v-for="email in inviteEmails" :key="email" class="flex justify-between items-center border-b pb-1">
            <span>{{ email }}</span>
            <AppButton
              icon="i-lucide-trash"
              class="text-2xl text-red-600"
              :loading="examServerLoading"
              @click="handleDropInvite(email)"
            />
          </li>
          <li v-if="inviteEmails.length === 0" class="text-center italic text-gray-500">
            No invites yet
          </li>
        </ul>
      </template>
    </AppModal>

    <AppModal v-model="sendModal" title="Send exam back to student">
      <template #body>
        <AppInput v-model="filterEmail" placeholder="Filter email..." />
        <div class="rounded-lg overflow-scroll max-h-[500px] h-auto w-full mt-2">
          <h1 class="p-2 bg-blue-500 text-white font-bold rounded-t-lg">
            Students
          </h1>
          <p
            v-for="invitee in filteredInviteEmails"
            :key="invitee"
            class="flex items-center justify-between p-2 border-b-1"
          >
            {{ invitee }}
            <AppButton
              label="Send"
              theme="secondary"
              :loading="examServerLoading"
              @click="handleSendToStudent(invitee)"
            />
          </p>
        </div>
      </template>
      <template #footer>
        <AppButton
          label="Send to All"
          class="w-fit! px-8"
          theme="secondary"
          :loading="examServerLoading"
          @click="handleSendToAll"
        />
      </template>
    </AppModal>

    <AppModal v-model="transcriptModal" class="max-w-[85%]! h-[85dvh]">
      <template #content>
        <iframe :src="studentsTransciptUrl" width="100%" height="100%" />
      </template>
    </AppModal>

    <AppModal v-model="bulkStudentUploadModal" title="Invite students to Take Exam">
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
  </section>
</template>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>

