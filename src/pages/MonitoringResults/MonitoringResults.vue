<template>
  <section class="bg-zinc-300" id="section">
    <div class="section-container-width">
      <p class="w-full text-right pt-4 flex gap-3 items-center justify-end">
        <i class="fa-regular fa-bell text-2xl"></i>
        System Notification: Off
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
                    Teachers
                    <div>
                      <i
                      class="py-3 px-4 bg-gray-400 text-white rounded-full select-none"
                      >D</i
                    >
                    <i class="fa-solid fa-share-nodes border border-gray-400 text-gray-400 py-3 px-3 rounded-full"></i>
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
            <template v-if="selectSelectedTab === 'results'">
              <p
                class="flex gap-6 items-center font-light text-black my-8 max-w-[250px] w-full text-xl justify-between"
              >
                Teachers
                <i
                  class="py-2 px-4 bg-gray-400 text-white rounded-full select-none"
                  >D</i
                >
              </p>
              <div class="w-full px-4 flex gap-4">
                <AppButton
                  v-for="(button, index) in buttonListTwo"
                  :key="index"
                  :label="button.label"
                  :leftIcon="button.leftIcon"
                  :rightIcon="button.rightIcon"
                  class="w-full! items-center justify-center rounded-3xl!"
                />
              </div>
            </template>
          </main>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppInput from "../../components/AppInput.vue";
import AppToggleButton from "../../components/AppToggleButton.vue";
import AppSelect from "../../components/AppSelect.vue";
import AppButton from "../../components/AppButton.vue";
import AppTab from "../../components/AppTab.vue";

const allAvailableExams = ref([
  {
    title: "BIT 906- DIGITAL INNOVATION BUSINESS STRATEGY",
  },
  {
    title: "Intro AI (MBA)",
  },
]);
const examTitle = ref(allAvailableExams.value[0].title);
const tabs = ref([
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
  },
]);

const teachersList = ref([
  {
    name: 'Damian'
  },
  {
    name: 'Damian'
  },
  {
    name: 'Damian'
  },
])
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
