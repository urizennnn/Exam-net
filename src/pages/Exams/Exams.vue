<script setup lang="ts">
import type {
  DropdownMenuItem,
  TableColumn,
} from "@nuxt/ui";

import {
  storeToRefs,
} from "pinia";
import {
  computed,
  h,
  onMounted,
  reactive,
  ref,
  resolveComponent,

} from "vue";

import {
  useExamServerStore,
} from "../../store/server/exam";
import {
  clearNewExamData,
} from "../../utils/functions";
import {
  errorToast,
  successToast,
} from "../../utils/toast";

const {
  getExams,
  deleteExam,
  deleteExams,
  examUpdate,
  duplicateExam,
  scheduleExam,
} = useExamServerStore();
const {
  exams,
  loading: examServerLoading,
  success: examServerSuccess,
} = storeToRefs(useExamServerStore());
const UCheckbox = resolveComponent("UCheckbox");
const USelect = resolveComponent("USelect");
const AppButton = resolveComponent("AppButton");
const columns = computed<TableColumn<any>[]>(() => [
  {
    id: "select",
    header: ({
      table,
    }) =>
      h(UCheckbox, {
        "modelValue": table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
        "color": "info",
        "ui": {
          indicator: "text-white",
        },
        "disabled": exams.value.length === 0,
      }),
    cell: ({
      row,
    }) =>
      h(UCheckbox, {
        "modelValue": row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
        "color": "info",
        "ui": {
          indicator: "text-white",
        },
      }),
  },
  {
    accessorKey: "name",
    header: ({
      column,
    }) => {
      const isSorted = column.getIsSorted();

      return h(AppButton, {
        label: "Name",
        rightIcon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "flex gap-1",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "key",
    header: ({
      column,
    }) => {
      const isSorted = column.getIsSorted();

      return h(AppButton, {
        label: "Exam Key",
        rightIcon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "flex gap-1",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
    cell: ({
      row,
    }) =>
      h("p", {
        class: "bg-gray-200 p-2 w-fit rounded cursor-pointer select-none",
        onClick: () => copyKey(row.original.key),
      }, String(row.original.key)),
  },
  {
    accessorKey: "createdAt",
    header: ({
      column,
    }) => {
      const isSorted = column.getIsSorted();

      return h(AppButton, {
        label: "Start Date",
        rightIcon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "flex gap-1",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "endDate",
    header: ({
      column,
    }) => {
      const isSorted = column.getIsSorted();

      return h(AppButton, {
        label: "End Date",
        rightIcon: isSorted
          ? isSorted === "asc"
            ? "i-lucide-arrow-up-narrow-wide"
            : "i-lucide-arrow-down-wide-narrow"
          : "i-lucide-arrow-up-down",
        class: "flex gap-1",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      });
    },
  },
  {
    accessorKey: "access",
    header: "Access",
    cell: ({
      row,
      table,
    }) => {
      const predefinedOptions = [
        [
          {
            value: "open",
            label: "Open",
            chip: {
              color: "success",
            },
          },
          {
            value: "closed",
            label: "Closed",
            chip: {
              color: "error",
            },
          },
        ],
        [
          {
            value: "scheduled",
            label: "Scheduled",
            icon: "i-lucide-calendar-days",
          },
        ],
      ];
      return h(USelect, {
        "modelValue": row.original.access,
        "onUpdate:modelValue": async (val: string) => {
          row.original.access = val;
          table.options.data[row.index].access = val;

          if (val === "scheduled") {
            toggleScheduleModal(row.original.name, row.original.id);
          }
          else {
            await examUpdate(row.original.id, {
              access: val,
            });
          }
        },
        "items": predefinedOptions,
        "loading": examServerLoading.value,
        "disabled": examServerLoading.value,
        "class": "w-40 outline-none bg-inherit text-black",
        "color": "info",
        "ui": {
          content: "bg-white",
          item: "text-black hover:text-black",
        },
      });
    },
  },
  {
    id: "action",
  },
]);
const rows = computed(() =>
  exams.value.map(exam => ({
    id: exam._id,
    name: exam.examName,
    createdAt: exam.startDate
      ? new Date(exam.startDate).toLocaleDateString()
      : "Not Scheduled",
    endDate: exam?.endDate
      ? new Date(exam?.endDate).toLocaleDateString()
      : "Not Ended",
    access: exam.access,
    key: exam.examKey,
  })));

const selectedRows = ref<any[]>([]);
function onRowSelection(items: any[]) {
  selectedRows.value = items;
}

const iconActions = ref([
  // {
  //   title: "Archive Selected Exams",
  //   icon: "i-lucide-archive",
  // },
  {
    title: "Delete Selected Exams",
    icon: "i-lucide-trash",
    onClick: handleExamsDelete,
  },
]);

const renameExamModal = ref(false);
const examNewName = ref("");
const renameExamId = ref("");
function toggleRanameExamModal(currentName: string = "", examId: string = "") {
  renameExamModal.value = !renameExamModal.value;
  if (renameExamModal.value) {
    examNewName.value = currentName;
    renameExamId.value = examId;
  }
  else {
    examNewName.value = "";
  }
}
async function handleExamRename() {
  await examUpdate(renameExamId.value, {
    examName: examNewName.value,
  });

  if (examServerSuccess.value) {
    toggleRanameExamModal();
    await getExams();
  }
}

async function handleExamDuplicate(examId: string) {
  await duplicateExam(examId);
  if (examServerSuccess.value) {
    await getExams();
  }
}

function getExamDropdownActions(exam: any): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Duplicate the Exam",
        icon: "i-lucide-copy",
        onSelect: () => handleExamDuplicate(exam.id),
      },
      {
        label: "Rename Exam",
        icon: "i-lucide-folder-pen",
        onSelect: () => toggleRanameExamModal(exam.name, exam.id),
      },
    ],
    [
      {
        label: "Archive the Exam",
        icon: "i-lucide-archive",
      },
    ],
    [
      {
        label: "Delete the Exam",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => handleExamDelete(exam.id),
      },
    ],
  ];
}

const scheduleModal = ref(false);
const scheduleModalTitle = ref("");
const scheduleExamId = ref("");

const scheduleForm = reactive({
  startDate: "",
  startTime: "",
});

function toggleScheduleModal(examName: string = "", examId: string = "") {
  scheduleModalTitle.value = examName;
  scheduleExamId.value = examId;

  // Find the exam data and populate the form if it has a scheduled start date
  if (examId) {
    const exam = exams.value.find(e => e._id === examId);
    if (exam && exam.startDate) {
      const startDate = new Date(exam.startDate);
      scheduleForm.startDate = startDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      scheduleForm.startTime = startDate.toTimeString().slice(0, 5); // HH:MM format
    }
    else {
      // Clear form if no existing schedule
      scheduleForm.startDate = "";
      scheduleForm.startTime = "";
    }
  }

  scheduleModal.value = !scheduleModal.value;
}

function copyKey(key: string) {
  navigator.clipboard
    .writeText(key)
    .then(() => {
      successToast("Copied");
    })
    .catch(() => {
      errorToast("Copy Failed");
    });
}

async function handleExamDelete(id: string) {
  await deleteExam({
    id,
  });
  await getExams();
}

async function handleExamsDelete() {
  const payload = selectedRows.value.map(item => item.id);
  await deleteExams(payload);
  await getExams();
}

async function handleScheduleExam() {
  if (!scheduleForm.startDate || !scheduleForm.startTime) {
    return;
  }

  await scheduleExam(scheduleExamId.value, scheduleForm.startDate, scheduleForm.startTime);

  if (examServerSuccess.value) {
    scheduleModal.value = false;
    scheduleForm.startDate = "";
    scheduleForm.startTime = "";
    await getExams();
  }
}

onMounted(async () => {
  await getExams();
});
</script>

<template>
  <Header />
  <div class="container m-auto pb-8 px-8 mt-4">
    <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
      <section
        class="bg-blue-950 text-white p-3 rounded-t-lg flex justify-center items-center"
      >
        <h1 class="text-[18px] md:text-[20px] tracking-wide">
          Exams
        </h1>
      </section>
      <template v-if="exams.length > 0">
        <section class="bg-blue-950 py-1 flex gaitems-center">
          <AppButton
            v-for="action in iconActions"
            :key="action.title"
            color="neutral"
            class="cursor-pointer size-9 text-white"
            size="xl"
            variant="link"
            :icon="action.icon"
            :disabled="selectedRows.length === 0"
            :title="action.title"
            :loading="examServerLoading"
            @click="action.onClick"
          />
        </section>
      </template>
      <div v-if="exams.length > 0 || examServerLoading" class="bg-white pt-2">
        <AppTable
          :columns="columns"
          :rows="rows"
          :loading="examServerLoading"
          filter-by="name"
          @update:row-selection="onRowSelection"
        >
          <template #action-cell="{ row }">
            <div class="flex gap-2 items-center">
              <AppButton
                left-icon="i-lucide-pencil"
                theme="primary"
                class="border-black border-2! rounded-4xl!"
                title="Edit Exam"
                :to="`/new-exam/new-question/${row.original.id}`"
                :loading="examServerLoading"
              />
              <AppButton
                left-icon="i-lucide-monitor-check"
                theme="primary"
                class="border-black border-2! rounded-4xl!"
                :to="`/monitoring-results/${row.original.id}`"
                title="Monitor Exam"
                :loading="examServerLoading"
              />
              <AppButton
                left-icon="i-lucide-binoculars"
                theme="primary"
                class="border-black border-2! rounded-4xl!"
                :to="`/preview/${row.original.id}`"
                title="Preview Exam"
                :loading="examServerLoading"
              />
              <UDropdownMenu
                :items="getExamDropdownActions(row.original)"
                :content="{
                  align: 'start',
                }"
                :ui="{
                  content: 'bg-white shadow cursor-pointer',
                  item: 'cursor-pointer text-black hover:bg-black rounded',
                }"
                :disabled="examServerLoading"
              >
                <UIcon
                  name="i-lucide-ellipsis-vertical"
                  class="size-6 cursor-pointer"
                />
              </UDropdownMenu>
            </div>
          </template>
        </AppTable>
      </div>
      <div
        class="w-full h-full flex gap-3 items-center justify-center bg-white flex-col px-4 py-4"
      >
        <template v-if="exams.length === 0 && !examServerLoading">
          <UIcon name="i-lucide-file" class="text-gray-700 size-12" />
          <p class="font-semibold text-gray-700 text-[16px]">
            No exams yet
          </p>
        </template>
        <AppButton
          :left-icon="`${exams.length === 0 ? 'i-lucide-plus' : ''}`"
          label="New Exam"
          theme="secondary"
          class="bg-gray-700 py-2 px-4"
          to="/new-exam"
          :loading="examServerLoading"
          @click="clearNewExamData"
        />
      </div>
    </div>
  </div>

  <AppModal v-model="renameExamModal" title="Rename Exam">
    <template #body>
      <AppInput v-model="examNewName" />
    </template>
    <template #footer>
      <AppButton
        label="Change Name"
        theme="secondary"
        :disabled="!examNewName"
        :loading="examServerLoading"
        @click="handleExamRename"
      />
    </template>
  </AppModal>

  <AppModal
    v-model="scheduleModal"
    :title="`Schedule '${scheduleModalTitle}'`"
    :dismissible="false"
  >
    <template #body>
      <div class="flex gap-2 justify-between w-full items-center">
        <div class="flex flex-col gap-1 w-full">
          <p class="text-gray-600 text-md">
            Start Date
          </p>
          <AppInput v-model="scheduleForm.startDate" type="date" />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <p class="text-gray-600 text-md">
            Start time (local time)
          </p>
          <AppInput v-model="scheduleForm.startTime" type="time" />
        </div>
      </div>
    </template>
    <template #footer>
      <AppButton
        label="Set time"
        theme="secondary"
        :disabled="!scheduleForm.startDate || !scheduleForm.startTime"
        :loading="examServerLoading"
        @click="handleScheduleExam"
      />
    </template>
  </AppModal>
</template>
