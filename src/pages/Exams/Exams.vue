<template>
  <section
    class="relative w-full bg-zinc-300 flex items-center justify-center text-black"
    id="section"
  >
    <div class="container m-auto pb-8 px-8">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
        <section
          class="bg-blue-950 text-white p-3 rounded-t-lg flex justify-center items-center"
        >
          <h1 class="text-[18px] md:text-[20px] tracking-wide">Exams</h1>
        </section>
        <template v-if="exams.length > 0">
          <section :class="`bg-blue-950 py-1 flex gaitems-center`">
            <AppButton
              color="neutral"
              class="cursor-pointer size-9 text-white"
              size="xl"
              variant="link"
              :icon="action.icon"
              v-for="action in iconActions"
              :key="action.title"
              :disabled="selectedRows.length === 0"
              :title="action.title"
              @click="action.onClick"
              :loading="examServerLoading"
            />
          </section>
        </template>
        <div class="bg-white pt-2" v-if="exams.length > 0 || examServerLoading">
          <AppTable
            @update:rowSelection="onRowSelection"
            :columns="columns"
            :rows="rows"
            :loading="examServerLoading"
            filter-by="name"
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
            <p class="font-semibold text-gray-700 text-[16px]">No exams yet</p>
          </template>
          <AppButton
            :leftIcon="`${exams.length === 0 ? 'i-lucide-plus' : ''}`"
            label="New Exam"
            theme="secondary"
            class="bg-gray-700 py-2 px-4"
            to="/new-exam"
            @click="clearNewExamData"
          />
        </div>
      </div>
    </div>
  </section>

  <AppModal v-model="renameExamModal" title="Rename Exam">
    <template #body>
      <AppInput v-model="examNewName" />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { clearNewExamData } from "../../utils/functions";
import { ref, resolveComponent, h, computed } from "vue";
import { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { useExamServerStore } from "../../store/server/exam";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { errorToast, successToast } from "../../utils/toast";
import { useNewExamStore } from "../../store/NewExamStore";
import { useRouter } from "vue-router";

const { getExams, deleteExam, deleteExams, getExam } = useExamServerStore();
const {
  exams,
  loading: examServerLoading,
  success: examServerSuccess,
} = storeToRefs(useExamServerStore());
const { formStepTwoCounter } = storeToRefs(useNewExamStore());
const UCheckbox = resolveComponent("UCheckbox");
const USelect = resolveComponent("USelect");
const AppButton = resolveComponent("AppButton");
const columns = computed<TableColumn<any>[]>(() => [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
        color: "info",
        ui: {
          indicator: "text-white",
        },
        disabled: exams.value.length === 0,
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
        color: "info",
        ui: {
          indicator: "text-white",
        },
      }),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
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
    header: ({ column }) => {
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
    cell: ({ row }) =>
      h(
        "p",
        {
          class: "bg-gray-200 p-2 w-fit rounded cursor-pointer select-none",
          onClick: () => copyKey(row.original.key),
        },
        String(row.original.key),
      ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
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
    header: ({ column }) => {
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
    cell: ({ row }) => {
      const predefinedOptions = [
        [
          { value: "open", label: "Open", chip: { color: "success" } },
          { value: "closed", label: "Closed", chip: { color: "error" } },
          {
            value: "discoverable",
            label: "Discoverable",
            chip: { color: "info" },
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

      const currentValue = row.original.access;
      return h(USelect, {
        modelValue: currentValue,
        items: predefinedOptions,
        class: "w-40 outline-none bg-inherit text-black",
        color: "info",
        ui: {
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
  exams.value.map((exam) => ({
    id: exam._id,
    name: exam.examName,
    createdAt: new Date(exam.createdAt).toLocaleDateString(),
    endDate: exam?.endDate
      ? new Date(exam?.endDate).toLocaleDateString()
      : "Not Ended",
    access: exam.access,
    key: exam.examKey,
  })),
);

const selectedRows = ref<any[]>([]);
function onRowSelection(items: any[]) {
  selectedRows.value = items;
}

const iconActions = ref([
  {
    title: "Archive Selected Exams",
    icon: "i-lucide-archive",
  },
  {
    title: "Delete Selected Exams",
    icon: "i-lucide-trash",
    onClick: handleExamsDelete,
  },
]);

const renameExamModal = ref(false);
const examNewName = ref("");
function toggleRanameExamModal(currentName: string = "") {
  renameExamModal.value = !renameExamModal.value;
  if (renameExamModal.value) {
    examNewName.value = currentName;
  } else {
    examNewName.value = "";
  }
}

function getExamDropdownActions(exam: any): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Duplicate the Exam",
        icon: "i-lucide-copy",
      },
      {
        label: "Rename Exam",
        icon: "i-lucide-folder-pen",
        onSelect: () => toggleRanameExamModal(exam.name),
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
  const payload = selectedRows.value.map((item) => item.id);
  await deleteExams(payload);
  await getExams();
}

onMounted(async () => {
  await getExams();
});
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
