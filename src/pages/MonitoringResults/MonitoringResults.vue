<template>
  <section class="bg-zinc-300 text-black" id="section">
    <div class="section-container-width">
      <p class="w-full text-right pt-4 flex gap-3 items-center justify-end cursor-pointer select-none"
        @click="toggleSystemNotification">
        <UIcon :name="`i-lucide-${systemNotification ? 'bell' : 'bell-off'}`" class="size-6" />
        System Notification: {{ systemNotification ? "On" : "Off" }}
      </p>
      <section class="mt-4 w-full flex gap-3">
        <aside class="w-full max-w-[300px]">
          <AppSelectMenu :items="allAvailableExams" v-model="examTitle" :loading="examServerLoading"
            baseClass="ring-0 text-2xl" />
          <h1 class="flex items-center gap-1 font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3">
            <UIcon name="i-lucide-house" class="size-5" />
            Overview
          </h1>
          <AppInput placeholder="Search name" class="mt-4" base-class="bg-white" />
          <AppToggleButton id="showName" label="Show names" class="mt-3" />
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
                  <div class="flex gap-6 items-center w-full justify-between text-black text-xl">
                    <p class="font-light">Exam key</p>
                    <USkeleton class="w-20 h-10" v-if="examServerLoading" />
                    <p v-else>{{ currentExam?.examKey }}</p>
                  </div>
                  <AppSelect label="Access" :loading="examServerLoading" :items="accessOptions" v-model="accessValue" />
                  <div class="flex gap-6 items-center font-light text-black text-xl justify-between">
                    <p>Teachers</p>
                    <div class="flex">
                      <i v-for="(teacher, index) in teachersList.slice(0, 3)" :key="index"
                        :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : ''} py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`">
                        {{ teacher.name[0].toUpperCase() }}
                      </i>
                      <AppButton
                        class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-3.5! rounded-full! bg-white"
                        icon="i-lucide-share-2" size="xl" theme="primary" />
                    </div>
                  </div>
                  <div class="mt-4">
                    <h4 class="font-bold">Student Status</h4>
                    <div class="flex gap-2 w-full mt-3">
                      <div v-for="(status, index) in studentStatus" :key="index"
                        :class="`${status.borderBottom} border-b-4 p-4 flex items-center justify-center flex-col gap-3 bg-gray-100 w-full`">
                        <p class="text-xl flex items-end">
                          <span class="font-bold text-2xl">
                            {{ status.done }}
                          </span>
                          /{{ status.total }}
                        </p>
                        <p class="capitalize text-xl tracking-wide">
                          {{ status.title }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full px-4 flex flex-col gap-4">
                  <AppButton v-for="(button, index) in buttonList" :key="index" :label="button.label"
                    :leftIcon="button.leftIcon" :loading="examServerLoading" theme="primary"
                    class="w-full! items-center justify-center rounded-3xl!" :to="button.to" @click="button.click" />
                </div>
              </section>
            </template>
            <template v-if="selectSelectedTab === 'results'">
              <div
                class="w-full max-w-[350px] my-8 flex gap-6 items-center font-light text-black text-xl justify-between">
                <p>Teachers</p>
                <div class="flex">
                  <i v-for="(teacher, index) in teachersList.slice(0, 3)" :key="index"
                    :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : ''} py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`">
                    {{ teacher.name[0].toUpperCase() }}
                  </i>
                  <AppButton class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-3.5! rounded-full! bg-white"
                    icon="i-lucide-share-2" size="xl" theme="primary" />
                </div>
              </div>
              <div class="w-full px-4 flex gap-4">
                <AppButton v-for="(button, index) in buttonListTwo" :key="index" :label="button.label"
                  :leftIcon="button.leftIcon" :rightIcon="button.rightIcon"
                  class="w-full! items-center justify-center rounded-3xl!" @click="button.clickAction"
                  theme="primary" />
              </div>
              <div class="mt-4">
                <AppTab :tabs="resultsTab" v-model="selectedResultTab" theme="variant"
                  class="py-1 tracking-wider hover:border-b-3 hover:border-zinc-800 mr-4 text-zinc-600 hover:text-zinc-800"
                  activeClass="border-b-3 border-zinc-800 text-zinc-800 cursor-pointer" />
              </div>
              <AppTable :columns="columns" :rows="rows" />
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
      <section class="">
        <div class="rounded-lg">
          <AppInput placeholder="Enter Students Email" v-model="studentEmail"
            @keyup.enter="addStudentEmail(studentEmail)" />
          <h1 class="p-2 bg-blue-500 text-white mt-4 font-bold rounded-t-lg">
            Students
          </h1>
          <ul class="h-full max-h-[250px] p-4 flex flex-col gap-3 w-full overflow-y-scroll overflow-x-hidden">
            <li v-for="student in studentsEmail" :key="student">
              {{ student }}
            </li>
          </ul>
        </div>
      </section>
    </template>
    <template #footer>
      <AppButton label="Send" @click="handleInviteStudent" :disabled="studentsEmail.length === 0"
        :loading="examServerLoading" class="w-fit! px-8" />
    </template>
  </AppModal>
  <AppModal title="Send exam back to student" v-model="sendModal">
    <template #body">
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
              <AppInput theme="secondary" v-model="sendExamTimeLimit.number" type="number" max="60" min="15" />
              <select value="hours" class="border-b border-b-gray-600 w-full" v-model="sendExamTimeLimit.type">
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
              <i :class="`cursor-pointer fa-solid ${!viewOptionShow ? 'fa-angle-down' : 'fa-angle-up'}`" role="button"
                @click="toggleViewOptionShow"></i>
            </div>
            <div v-show="viewOptionShow" v-for="(option, index) in sendModelViewOption" :key="index"
              class="flex flex-col gap-1">
              <label :for="`radio-${index}`" class="flex items-center gap-3 select-none cursor-pointer">
                <input type="radio" name="viewOptionRadio" v-model="option.value" :id="`radio-${index}`" />
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
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { TabsType } from "../../utils/types";
import { TableColumn } from "@nuxt/ui";
import { useExamServerStore } from "../../store/server/exam";
import { storeToRefs } from "pinia";

const { getExams, inviteStudentToExam } = useExamServerStore();
const {
  loading: examServerLoading,
  exams,
  success: examServerSuccess,
} = storeToRefs(useExamServerStore());

const systemNotification = ref(false);

const allAvailableExams = computed(() =>
  exams.value.map((exam) => exam.examName),
);

const examTitle = ref("");

const currentExam = computed(() =>
  exams.value.find((exam) => exam.examName === examTitle.value),
);

const tabs = ref<TabsType[]>([
  { label: "monitoring", isActive: true, value: "monitoring" },
  { label: "results", isActive: false, value: "results" },
]);

const selectSelectedTab = ref(tabs.value[0].value);

// ← UPDATED: studentStatus now computed so “ongoing.done” is invites.length
const studentStatus = computed(() => [
  {
    done: currentExam.value?.invites.length ?? 0,
    total: 0,
    title: "ongoing",
    borderBottom: "border-blue-300",
  },
  {
    done: 0,
    total: 0,
    title: "submitted",
    borderBottom: "border-green-300",
  },
]);

const buttonList = computed(() => [
  { label: "Send Exam to Student", leftIcon: "i-lucide-share-2", class: "bg-gray-400! hover:bg-gray-900! hover:text-white!", click: toggleShowInviteStudent },
  { label: "End the exam for students", leftIcon: "i-lucide-step-forward" },
  { label: "Set a timer for the students", leftIcon: "i-lucide-clock" },
  { label: "Preview exam", leftIcon: "i-lucide-binoculars", to: `/preview/${currentExam.value?._id}` },
  { label: "Anonymous identities", leftIcon: "i-lucide-eye-off" },
]);

const buttonListTwo = ref([
  { label: "Export", leftIcon: "i-lucide-file-down", rightIcon: "i-lucide-chevron-down" },
  { label: "Download", leftIcon: "i-lucide-arrow-down", rightIcon: "i-lucide-chevron-down" },
  { label: "Print", leftIcon: "i-lucide-printer", rightIcon: "i-lucide-chevron-down" },
  { label: "Send", leftIcon: "i-lucide-mail", rightIcon: "i-lucide-chevron-down", clickAction: toggleSendModal },
]);

const teachersList = ref([
  { name: "Damian" },
  { name: "Fisayo" },
  { name: "Victor" },
  { name: "Fara" },
]);

const resultsTab = ref<TabsType[]>([
  { isActive: true, label: "Student", value: "student" },
  { isActive: false, label: "Questions", value: "question" },
  { isActive: false, label: "Statistics", value: "statistics" },
]);

const selectedResultTab = ref(resultsTab.value[0].value);

const columns: TableColumn<any>[] = [
  { accessorKey: "student", header: "Student" },
  { id: "points", header: "Points" },
  { accessorKey: "submissionTime", header: "Submission Time" },
];

const rows = [];

const sendModal = ref(false);

const sendExamTimeLimit = reactive({
  number: 15,
  type: "hours",
});

const viewOptionShow = ref(true);

const sendModelViewOption = ref([
  { label: "Show all", value: true },
  { label: "Show points and feedback", value: false },
  { label: "Customize", value: false },
]);

const accessValue = ref("");

const accessOptions = ref([
  [
    { value: "open", label: "Open", chip: { color: "success" } },
    { value: "closed", label: "Closed", chip: { color: "error" } },
    { value: "discoverable", label: "Discoverable", chip: { color: "info" } },
  ],
  [
    { value: "scheduled", label: "Scheduled", icon: "i-lucide-calendar-days" },
  ],
]);

const showInviteStudent = ref(false);
const studentEmail = ref("");
const studentsEmail = ref<string[]>([]);

function toggleSystemNotification() {
  systemNotification.value = !systemNotification.value;
}

function toggleSendModal() {
  sendModal.value = !sendModal.value;
  if (!sendModal.value) viewOptionShow.value = false;
}

function toggleShowInviteStudent() {
  showInviteStudent.value = !showInviteStudent.value;
  if (!showInviteStudent.value) studentsEmail.value = [];
}

function toggleViewOptionShow() {
  viewOptionShow.value = !viewOptionShow.value;
}

function addStudentEmail(email: string) {
  studentsEmail.value.push(email);
  studentEmail.value = "";
}

async function handleInviteStudent() {
  await inviteStudentToExam(currentExam.value!._id, { emails: studentsEmail.value });
  if (examServerSuccess.value) toggleShowInviteStudent();
}

onMounted(async () => {
  await getExams();
  examTitle.value = allAvailableExams.value[0] || "";
});

watch(
  () => currentExam.value,
  (exam) => {
    if (exam) {
      accessValue.value = exam.access;
    }
  },
  { deep: true }
);
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
