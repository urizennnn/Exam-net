<template>
  <section class="bg-zinc-300" id="section">
    <div class="section-container-width">
      <p
        class="w-full text-right pt-4 flex gap-3 items-center justify-end cursor-pointer"
        @click="toggleSystemNotification"
      >
        <i
          :class="`${systemNotification ? 'fa-solid' : 'fa-regular'} fa-bell text-2xl`"
        ></i>
        System Notification: {{ systemNotification ? "On" : "Off" }}
      </p>
      <!-- Side tab -->
      <section class="mt-4 w-full flex gap-3">
        <aside class="w-full max-w-[300px]">
          <select
            class="outline-none p-3 font-bold tracking-wider w-full"
            v-model="examTitle"
          >
            <option
              v-for="(exam, index) in allAvailableExams"
              :key="index"
              :value="exam.title"
              class="w-full text-wrap"
            >
              {{ exam.title }}
            </option>
          </select>
          <h1 class="font-bold py-2 px-3 w-full bg-zinc-400 rounded-md mt-3">
            <i class="fa-solid fa-house"></i>
            Overview
          </h1>
          <AppInput placeholder="Search name" class="mt-4" />
          <AppToggleButton id="showName" label="Show names" class="mt-3" />
        </aside>
        <div class="bg-white rounded-md w-full">
          <!-- Tab section -->
          <AppTab :tabs="tabs" v-model="selectSelectedTab" />
          <!-- main section -->
          <main class="py-8 px-4">
            <h1 class="text-black text-5xl font-bold">{{ examTitle }}</h1>
            <!-- Monitoring section -->
            <template v-if="selectSelectedTab === 'monitoring'">
              <section class="flex gap-6 mt-4">
                <div class="flex flex-col gap-2 w-full max-w-[350px]">
                  <template
                    v-for="(details, index) in examDetails"
                    :key="index"
                  >
                    <AppSelect
                      :label="details.label"
                      :options="details.options"
                      v-model="details.value"
                    />
                  </template>
                  <div
                    class="flex gap-6 items-center font-light text-black text-xl justify-between"
                  >
                    <p>Teachers</p>
                    <div class="flex">
                      <i
                        v-for="(teacher, index) in teachersList.slice(0, 3)"
                        :key="index"
                        :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : ''} py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`"
                        >{{ teacher.name[0].toUpperCase() }}</i
                      >
                      <AppButton
                        class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-4 rounded-full! bg-white"
                      >
                        <i class="fa-solid fa-share-nodes"></i>
                      </AppButton>
                    </div>
                  </div>
                  <div class="mt-4">
                    <h4 class="font-bold">Student Status</h4>
                    <div class="flex gap-2 w-full mt-3">
                      <div
                        v-for="(status, index) in studentStatus"
                        :key="index"
                        :class="`${status.borderBottom} border-b-4 p-4 flex items-center justify-center flex-col gap-3 bg-gray-100 w-full`"
                      >
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
                  <AppButton
                    v-for="(button, index) in buttonList"
                    :key="index"
                    :label="button.label"
                    :leftIcon="button.leftIcon"
                    class="w-full! items-center justify-center rounded-3xl!"
                  />
                </div>
              </section>
            </template>
            <!-- Results section -->
            <template v-if="selectSelectedTab === 'results'">
              <div
                class="w-full max-w-[350px] my-8 flex gap-6 items-center font-light text-black text-xl justify-between"
              >
                <p>Teachers</p>
                <div class="flex">
                  <i
                    v-for="(teacher, index) in teachersList.slice(0, 3)"
                    :key="index"
                    :class="`z-[${index}] ${index > 0 ? 'ml-[-20px]' : ''} py-3 px-5 bg-gray-400 border border-white text-white rounded-full select-none`"
                    >{{ teacher.name[0].toUpperCase() }}</i
                  >
                  <AppButton
                    class="border-gray-500 text-gray-400 py-3 ml-[-20px] z-[5] px-4 rounded-full! bg-white"
                  >
                    <i class="fa-solid fa-share-nodes"></i>
                  </AppButton>
                </div>
              </div>
              <div class="w-full px-4 flex gap-4">
                <AppButton
                  v-for="(button, index) in buttonListTwo"
                  :key="index"
                  :label="button.label"
                  :leftIcon="button.leftIcon"
                  :rightIcon="button.rightIcon"
                  class="w-full! items-center justify-center rounded-3xl!"
                  @click="button.clickAction"
                />
              </div>
              <div class="mt-4">
                <AppTab
                  :tabs="resultsTab"
                  v-model="selectedResultTab"
                  theme="variant"
                  class="py-1 tracking-wider hover:border-b-3 hover:border-zinc-800 mr-4 text-zinc-600 hover:text-zinc-800"
                  activeClass="border-b-3 border-zinc-800 text-zinc-800 cursor-pointer"
                />
              </div>
              <AppTable :columns="columns" :rows="rows"></AppTable>
            </template>
          </main>
        </div>
      </section>
    </div>
  </section>
  <AppModal
    title="Send exam back to student"
    :isVisible="sendModal"
    @onClose="toggleSendModal"
    theme="secondary"
  >
    <template #body>
      <p class="text-center my-3 text-gray-600">
        This will send a link to the student which can be used to see the
        answers and the marking. For Students that don't have an email address
        set you can copy the link and send it manually
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
                :class="`cursor-pointer fa-solid ${!viewOptionShow ? 'fa-angle-down' : 'fa-angle-up'}`"
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
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import AppInput from "../../components/AppInput.vue";
import AppToggleButton from "../../components/AppToggleButton.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppButton from "../../components/AppButton.vue";
import AppTab from "../../components/AppTab.vue";
import { TabsType } from "../../utils/types";
import AppTable from "../../components/AppTable.vue";
import AppModal from "../../components/AppModal.vue";

const systemNotification = ref(false);
const allAvailableExams = ref([
  {
    title: "BIT 906- DIGITAL INNOVATION BUSINESS STRATEGY",
  },
  {
    title: "Intro AI (MBA)",
  },
]);
const examTitle = ref(allAvailableExams.value[0].title);
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
const examDetails = ref([
  {
    label: "Exam key",
    options: [{ title: "PZp2oh", value: "PZp2oh" }],
    value: "PZp2oh",
  },
  {
    label: "Access",
    value: "open",
    options: [
      { title: "Open", value: "open" },
      { title: "Closed", value: "closed" },
      { title: "Discoverable", value: "discoverable" },
      { title: "Scheduled", value: "scheduled" },
    ],
  },
]);

const studentStatus = ref([
  {
    done: 0,
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

const buttonList = ref([
  {
    label: "End the exam for students",
    leftIcon: "fa-solid fa-right-from-bracket",
  },
  {
    label: "Set a timer for the students",
    leftIcon: "fa-regular fa-clock",
  },
  {
    label: "Individual exam keys",
    leftIcon: "fa-solid fa-key",
  },
  {
    label: "Preview exam",
    leftIcon: "fa-solid fa-binoculars",
  },
  {
    label: "Anonymous identities",
    leftIcon: "fa-regular fa-eye-slash",
  },
]);

const buttonListTwo = ref([
  {
    label: "Export",
    leftIcon: "fa-solid fa-file-export",
    rightIcon: "fa-solid fa-caret-down text-md",
  },
  {
    label: "Download",
    leftIcon: "fa-solid fa-file-arrow-down",
    rightIcon: "fa-solid fa-caret-down text-md",
  },
  {
    label: "Print",
    leftIcon: "fa-solid fa-print",
    rightIcon: "fa-solid fa-caret-down text-md",
  },
  {
    label: "Send",
    leftIcon: "fa-solid fa-envelope",
    rightIcon: "fa-solid fa-caret-down text-md",
    clickAction: toggleSendModal,
  },
]);

const teachersList = ref([
  {
    name: "Damian",
  },
  {
    name: "Fisayo",
  },
  {
    name: "Victor",
  },
  {
    name: "Fara",
  },
]);

const resultsTab = ref<TabsType[]>([
  {
    isActive: true,
    label: "Student",
    value: "student",
  },
  {
    isActive: false,
    label: "Questions",
    value: "question",
  },
  {
    isActive: false,
    label: "Statistics",
    value: "statistics",
  },
]);
const selectedResultTab = ref(resultsTab.value[0].value);
const columns = [
  {
    label: "Student",
    field: "student",
    sortable: true,
  },
  {
    label: "Points",
    field: "points",
    sortable: true,
  },
  {
    label: "Submission Time",
    field: "submissionTime",
    sortable: true,
  },
];
const rows = [];
const sendModal = ref(false);
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

function toggleSystemNotification() {
  systemNotification.value = !systemNotification.value;
}

function toggleSendModal() {
  sendModal.value = !sendModal.value;

  if (!sendModal.value) {
    viewOptionShow.value = false;
  }
}

function toggleViewOptionShow() {
  viewOptionShow.value = !viewOptionShow.value;
}
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
