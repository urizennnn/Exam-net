<template>
  <section class="bg-white w-full flex">
    <!-- SideBar For Config -->
    <section class="text-white bg-gray-800">
      <h1 class="font-bold text-center tracking-wider px-4 pt-8">
        Configurations
      </h1>
      <ul class="mt-4">
        <li
          v-for="(option, index) in configOptionsTabs"
          :key="index"
          :class="`${option.isActive ? 'border-solid md:border-l-3 border-t-3 md:border-t-0 border-amber-400 active relative bg-gray-700' : ''} cursor-pointer px-4 py-4 hover:bg-gray-700 capitalize`"
        >
          {{ option.label }}
        </li>
      </ul>
    </section>

    <!-- Main page -->
    <main class="px-8 pt-12 pb-6">
      <section>
        <h1 id="general" class="font-bold tracking-wide text-2xl">General</h1>
        <div
          class="flex flex-col gap-4 border-l-2 border-r-0 border-t-0 border-b-0 border-solid border-l-gray-300 mt-2 h-auto px-4"
        >
          <div v-for="(config, index) in generalConfigs" :key="index">
            <AppToggleButton
              :id="index"
              :label="config.label"
              class="text-black tracking-wider"
              v-model="config.value"
            />
            <p class="mt-1 text-gray-400 text-sm leading-5 tracking-wider">
              {{ config.description }}
            </p>
            <template v-if="config.children && config.value">
              <div v-for="(child, index) in config.children" :key="index">
                <AppInput
                  :label="child.label"
                  theme="secondary"
                  type="number"
                  max="60"
                  min="15"
                  v-model="child.value"
                />
              </div>
            </template>
          </div>
        </div>
      </section>
      <section class="mt-8">
        <h1 id="general" class="font-bold tracking-wide text-2xl">
          Exam type settings
        </h1>
        <div
          class="flex flex-col gap-4 border-l-2 border-r-0 border-t-0 border-b-0 border-solid border-l-gray-300 mt-2 h-auto px-4"
        >
          <div v-for="(config, index) in examTypeSettingConfigs" :key="index">
            <AppToggleButton
              :id="index"
              :label="config.label"
              class="text-black tracking-wider"
              v-model="config.value"
            />
            <p class="mt-1 text-gray-400 text-sm leading-5 tracking-wider">
              {{ config.description }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { watch, onMounted, ref } from "vue";
import { useNewExamStore } from "../../store/NewExamStore";
import AppToggleButton from "../../components/AppToggleButton.vue";
import AppInput from "../../components/AppInput.vue";

const newExamStore = useNewExamStore();
const configOptionsTabs = ref([
  {
    label: "general",
    isActive: true,
  },
  {
    label: "exam type settings",
    isActive: false,
  },
]);

const generalConfigs = ref([
  {
    label: "Anonymize exam",
    description:
      "Students identities are replaced by unique code, and you may reveal the identities after marking the exams.",
    value: newExamStore.configOptions.anonymizeExam,
    tag: "anonymizeExam",
  },
  {
    label: "Set time limit",
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

const examTypeSettingConfigs = ref([
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

watch(
  () => generalConfigs,
  (n) => {
    n.value.map((items) => {
      newExamStore.configOptions[items.tag] = items.value;
      if (items.children) {
        items.children.map(
          (item) => (newExamStore.configOptions[item.tag] = item.value),
        );
      }
    });
  },
  {
    deep: true,
  },
);

watch(
  () => examTypeSettingConfigs,
  (n) => {
    n.value.map(
      (items) => (newExamStore.configOptions[items.tag] = items.value),
    );
  },
  {
    deep: true,
  },
);
</script>

<style scoped>
li.active {
  position: relative;
}

li.active:after {
  content: "";
  position: absolute;
  top: 120%;
  left: 38%;
  transform: translateY(-50%) rotate(90deg);
  border-width: 10px 0 10px 10px;
  border-style: solid;
  border-color: transparent transparent transparent #2d3541;
}

@media (min-width: 48rem) {
  li.active:after {
    content: "";
    position: absolute;
    top: 50%;
    right: -10px;
    left: 100%;
    transform: translateY(-50%);
    border-width: 10px 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent transparent #2d3541;
  }
}
</style>
