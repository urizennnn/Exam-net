<template>
  <section
    class="relative w-full bg-zinc-300 flex items-center justify-center text-black"
    id="section"
  >
    <div class="section-container-width">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
        <div
          class="bg-blue-950 text-white p-3 rounded-t-lg flex justify-between items-center"
        >
          <div></div>
          <h1 class="text-[18px] md:text-[20px] tracking-wide">Exams</h1>
          <div class="flex gap-1 items-center">
            <UButton
              icon="i-lucide-cog"
              color="neutral"
              variant="link"
              class="text-white cursor-pointer"
            />
            <UButton
              icon="i-lucide-chevron-down"
              class="text-white cursor-pointer"
              color="neutral"
              variant="link"
            />
            <UButton
              icon="i-lucide-arrow-big-down-dash"
              class="text-white cursor-pointer"
              color="neutral"
              variant="link"
            />
          </div>
        </div>
        <template v-if="exams.length > 0">
          <div :class="`bg-blue-950 px-2 py-1 flex gaitems-center`">
            <UButton
              color="neutral"
              class="cursor-pointer size-9 text-white"
              size="xl"
              variant="link"
              :icon="action.icon"
              v-for="action in iconActions"
              :key="action.title"
              :disabled="selectedRowsInTable.length === 0"
              :title="action.title"
            />
          </div>
        </template>
        <template v-if="exams.length > 0 || examServerLoading">
          <AppTable
            v-model:row-selection="selectedRowsInTable"
            :columns="columns"
            :rows="rows"
            :loading="examServerLoading"
          >
            <template #row="{ row }">
              <p>
                {{ row.original.name }}
              </p>
              <p>
                {{ row.original.createdAt }}
              </p>
              <p>
                {{ row.original.access }}
              </p>
            </template>
            <template #action-cell="{ row }">
              <UDropdownMenu
                :items="getExamDropdownActions(row.original)"
                :content="{
                  align: 'start',
                }"
                :ui="{
                  content: 'bg-white shadow',
                  item: 'cursor-pointer text-black hover:bg-black rounded',
                }"
                :disabled="examServerLoading"
              >
                <UIcon
                  name="i-lucide-ellipsis-vertical"
                  class="size-6 cursor-pointer"
                />
              </UDropdownMenu>
            </template>
          </AppTable>
        </template>
        <div
          class="w-full h-full flex gap-3 items-center justify-center bg-white flex-col px-4 py-4"
        >
          <template v-if="exams.length === 0 && !examServerLoading">
            <i class="fa-solid fa-file text-5xl text-gray-700"></i>
            <p class="font-semibold text-gray-700 text-[16px]">
              No exams in this group yet
            </p>
          </template>
          <AppButton
            :leftIcon="`${exams.length === 0 ? 'fa-solid fa-plus text-white' : ''}`"
            label="New Exam"
            theme="secondary"
            class="bg-gray-700 py-2 px-4"
            to="/new-exam"
            @click="clearNewExamData"
          />
        </div>
      </div>
    </div>
    <i
      class="absolute left-4 bottom-4 fa-solid fa-magnifying-glass bg-white p-4 rounded-md shadow-lg"
    ></i>
    <i
      class="absolute right-4 bottom-4 fa-solid fa-question text-white bg-sky-400 rounded-full px-5 py-4"
    ></i>
  </section>
</template>

<script setup lang="ts">
import { clearNewExamData } from "../../utils/functions";
import { ref, resolveComponent, h } from "vue";
import { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import { useExamServerStore } from "../../store/server/exam";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { getExams, deleteExam } = useExamServerStore();
const { exams, loading: examServerLoading } = storeToRefs(useExamServerStore());
const UCheckbox = resolveComponent("UCheckbox");
const pTag = resolveComponent("p");
const columns: TableColumn<any>[] = [
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
        ui: {
          indicator: "bg-blue-800 text-white", // ← use “indicator”!
        },
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
        ui: {
          indicator: "bg-blue-800 text-white", // ← use “indicator”!
        },
      }),
  },
  {
    accessorKey: "name",
    header: "Exam name",
  },
  {
    accessorKey: "key",
    header: "Exam Key",
    cell: ({ row }) =>
      h(pTag, {
        class: "bg-gray-300 p-3 w-fit rounded",
        html: String(row.original.key),
      }),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "status",
    header: "Status",
  },
  {
    accessorKey: "access",
    header: "Access",
  },
  {
    id: "action",
  },
];
const rows = computed(() =>
  exams.value.map((exam) => ({
    id: exam._id,
    name: exam.examName,
    createdAt: exam.createdAt,
    access: exam.access,
    key: exam.examKey,
  })),
);
const examActionMenu: DropdownMenuItem[] = [
  {
    label: "Give Another teacher Access",
    icon: "i-lucide-users",
  },
  {
    label: "Reveal student identities",
    icon: "i-lucide-id-card",
  },
  {
    label: "Duplicate the exam",
    icon: "i-lucide-copy",
  },
  {
    label: "Share exam template via link",
    icon: "i-lucide-link",
  },
  {
    label: "Tag exam with a color",
    icon: "i-lucide-paintbrush",
  },
  {
    label: "Move to group",
    icon: "i-lucide-circle-arrow-right",
  },
  {
    label: "Archive the exam",
    icon: "i-lucide-archive",
  },
  {
    label: "Delete the exam",
    icon: "i-lucide-trash",
    color: "error",
    onSelect() {
      handleExamDelete();
    },
  },
];
const iconActions = ref([
  {
    title: "Close Marked Exams",
    icon: "i-lucide-lock",
  },
  {
    title: "Open Marked Exams",
    icon: "i-lucide-lock-open",
  },
  {
    title: "Delete Selected Exams",
    icon: "i-lucide-trash",
  },
  {
    title: "Archive Selected Exams",
    icon: "i-lucide-archive",
  },
  {
    title: "Tag Selected Exams with a color",
    icon: "i-lucide-paintbrush",
  },
  {
    title: "Give Teacher access to selected exam",
    icon: "i-lucide-users",
  },
  {
    title: "Move Selected Exam to group",
    icon: "i-lucide-circle-arrow-right",
  },
]);
const selectedRowsInTable = ref([]);

/**
 * Returns a grouped dropdown menu for a given exam.
 */
function getExamDropdownActions(exam: any): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Give Another Teacher Access",
        icon: "i-lucide-users",
      },
      {
        label: "Reveal Student Identities",
        icon: "i-lucide-id-card",
      },
      {
        label: "Duplicate the Exam",
        icon: "i-lucide-copy",
      },
      {
        label: "Share Exam Template via Link",
        icon: "i-lucide-link",
      },
    ],
    [
      {
        label: "Tag Exam with a Color",
        icon: "i-lucide-paintbrush",
      },
      {
        label: "Move to Group",
        icon: "i-lucide-circle-arrow-right",
      },
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
      toast.success("Copied");
    })
    .catch((err) => {
      toast.error("Copy Failed");
    });
}

function zoom(row) {
  console.log("Zoom in on", row);
}
async function handleExamDelete(id: string) {
  await deleteExam({
    id,
  });
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
