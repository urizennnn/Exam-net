<script lang="ts" setup>
import {
  onMounted,
  ref,
  watch,
} from "vue";

import {
  useNewExamStore,
} from "../../store/NewExamStore";

const newExamStore = useNewExamStore();

type configTypes = {
  label: string;
  description: string;
  value: boolean;
  tag: string;
  children?: {
    label: string;
    value: any;
    tag: string;
  }[];
};

const generalConfigs = ref<configTypes[]>([
  {
    label: "Anonymize exam",
    description:
      "Students identities are replaced by unique code, and you may reveal the identities after marking the exams.",
    value: newExamStore.configOptions.anonymizeExam,
    tag: "anonymizeExam",
  },
  {
    label: "Set time limit (default: 1 hour)",
    description:
      "Pre-define how much time the students will have before being required to hand in the exam. Each timer is individual and the countdown starts when the student enters the exam, if the students re-enters the exam, the timer is reset.",
    value: newExamStore.configOptions.setTimeLimit,
    tag: "setTimeLimit",
    children: [
      {
        label: "minutes after the student's entrence",
        value: newExamStore.configOptions.setTime,
        tag: "setTime",
      },
    ],
  },
  {
    label: "Student self-resume",
    description:
      "Enable students to resume their exams independently using an individual resume key sent to their email. They can continue the exam as long as access remains open.",
    value: newExamStore.configOptions.studentSelfResume,
    tag: "studentSelfResume",
  },
]);

const examTypeSettingConfigs = ref<configTypes[]>([
  {
    label: "Hide points for students during the exam",
    description:
      "The Student will not be able to see how many points each task can give until the exam have been marked.",
    tag: "hidePoints",
    value: newExamStore.configOptions.hidePoints,
  },
  {
    label: "Show exam results directly to students upon submission",
    description:
      "Students will immediatelyy see the result of the auto-marking, if the exam has tasks that need to be manually marked, this will be mentioned to the student and these are excluded from the result.",
    tag: "showExamResult",
    value: newExamStore.configOptions.showExamResult,
  },
]);

onMounted(() => {
  newExamStore.counter = 3;
});

watch(() => generalConfigs, (n) => {
  n.value.forEach((items) => {
    newExamStore.configOptions[items.tag] = items.value;
    sessionStorage.setItem(items.tag, `${items.value}`);
    if (items.children) {
      items.children.forEach((item) => {
        newExamStore.configOptions[item.tag] = item.value;
        sessionStorage.setItem(item.tag, `${item.value}`);
      });
    }
  });
}, {
  deep: true,
});

watch(() => examTypeSettingConfigs, (n) => {
  n.value.forEach((items) => {
    newExamStore.configOptions[items.tag] = items.value;
    sessionStorage.setItem(items.tag, `${items.value}`);
  });
}, {
  deep: true,
});
</script>

<template>
  <section class="bg-white w-full">
    <!-- SideBar For Config -->
    <h1 class="font-bold  text-black text-3xl tracking-wider px-4 pt-8">
      Configurations
    </h1>

    <!-- Main page -->
    <main class="px-8 pt-4 pb-6 text-black">
      <section>
        <h1 id="general" class="font-semibold tracking-wide text-2xl">
          General
        </h1>
        <div
          class="flex flex-col gap-4 border-l-2 border-r-0 border-t-0 border-b-0 border-solid border-l-gray-300 mt-2 h-auto px-4"
        >
          <div v-for="(config, index) in generalConfigs" :key="index">
            <AppToggleButton
              :id="`generalType${index}`"
              v-model="config.value"
              :label="config.label"
              class="text-black tracking-wider"
            />
            <p class="mt-1 text-gray-400 text-sm leading-5 tracking-wider">
              {{ config.description }}
            </p>
            <template v-if="config.children && config.value">
              <div v-for="child in config.children" :key="child.value">
                <AppInput
                  v-model="child.value"
                  :label="child.label"
                  theme="secondary"
                  type="number"
                  max="60"
                  min="15"
                  class="max-w-[400px]!"
                />
              </div>
            </template>
          </div>
        </div>
      </section>
      <section class="mt-8">
        <h1 id="general" class="font-semibold tracking-wide text-2xl">
          Exam type settings
        </h1>
        <div
          class="flex flex-col gap-4 border-l-2 border-r-0 border-t-0 border-b-0 border-solid border-l-gray-300 mt-2 h-auto px-4"
        >
          <div v-for="(con, index) in examTypeSettingConfigs" :key="index">
            <AppToggleButton
              :id="`examType${index}`"
              v-model="con.value"
              :label="con.label"
              class="text-black tracking-wider"
            />
            <p class="mt-1 text-gray-400 text-sm leading-5 tracking-wider">
              {{ con.description }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
