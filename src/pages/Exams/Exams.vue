<template>
  <section
    class="relative w-full bg-zinc-300 flex items-center justify-center"
    id="section"
  >
    <div class="section-container-width">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
        <div
          class="bg-blue-950 text-white p-3 rounded-t-lg flex justify-between items-center"
        >
          <div></div>
          <h1 class="text-[18px] md:text-[20px] tracking-wide">MBA</h1>
          <div class="flex gap-3 text-[18px] md:text-[20px] font-semibold">
            <i class="fa-solid fa-gears text-white"></i>
            <i class="fa-solid fa-angle-down text-white"></i>
            <i class="fa-solid fa-caret-down text-white"></i>
          </div>
        </div>
        <template v-if="examStore.exams.length > 0">
          <div class="bg-blue-950 py-2 px-4 text-gray-400 flex gap-4 text-2xl">
            <i
              class="fa-solid fa-lock"
              title="Close Marked Exams"
              role="button"
            ></i>
            <i
              class="fa-solid fa-lock-open"
              title="Open Marked Exams"
              role="button"
            ></i>
            <i
              class="fa-solid fa-trash"
              title="Delete Selected Exams"
              role="button"
            ></i>
            <i
              class="fa-solid fa-box-archive"
              title="Acrhive Selected Exams"
              role="button"
            ></i>
            <i
              class="fa-solid fa-paintbrush"
              title="Tag Selected Exams with a color"
              role="button"
            ></i>
            <i
              class="fa-solid fa-people-group"
              title="Give Teacher access to selected exam"
              role="button"
            ></i>
            <i
              class="fa-solid fa-circle-right"
              title="Move Selected Exam to group"
              role="button"
            ></i>
          </div>
          <AppTable :columns="columns" :rows="rows" :selectable="true">
            <template #row="{ row }">
              <td class="tracking-wide p-2">
                <p>
                  {{ row.name }}
                </p>
              </td>
              <td
                class="relative group text-center p-2 flex items-center justify-center gap-2"
              >
                <p class="bg-gray-200 p-1.5 rounded-lg">
                  {{ row.key }}
                </p>
                <div
                  class="flex flex-col gap-1 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                >
                  <i
                    role="button"
                    class="fa-solid fa-magnifying-glass-plus cursor-pointer"
                    @click="zoom(row)"
                  ></i>

                  <i
                    role="button"
                    class="fa-solid fa-copy cursor-pointer"
                    @click="copyKey(row.key)"
                  ></i>
                </div>
              </td>

              <td class="p-2">
                {{ row.createdAt }}
              </td>
              <td class="p-2 flex gap-1 items-center">
                <i class="fa-regular fa-compass"></i>
                <i class="fa-solid fa-user-secret"></i>
                <i class="fa-solid fa-check"></i>
              </td>
              <td class="p-2">
                <select v-model="row.access">
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="discoverable">Discoverable</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </td>
              <td class="p-2 flex items-center gap-0.5 justify-between">
                <div class="flex gap-1">
                  <AppButton
                    class="py-1 px-2 rounded-4xl! border-black! border-2! text-md!"
                    ><i class="fa-solid fa-pencil text-black"></i>
                  </AppButton>
                  <AppButton
                    class="py-1 px-2 rounded-4xl! border-black! border-2! text-md!"
                    ><i class="fa-solid fa-tv text-black"></i>
                  </AppButton>
                  <AppButton
                    class="py-1 px-2 rounded-4xl! border-black! border-2! text-md!"
                  >
                    <i class="fa-solid fa-binoculars text-black"></i>
                  </AppButton>
                </div>
                <Context #default="{ triggerProps, triggerRef, menuRef }">
                  <i
                    class="fa-solid fa-ellipsis-vertical text-black text-xl cursor-pointer"
                    role="button"
                    v-bind="triggerProps"
                    :ref="triggerRef"
                  ></i>
                  <Menu
                    :ref="menuRef"
                    class="bg-white overflow-hidden rounded-xl flex flex-col shadow-xl"
                  >
                    <Menuitem
                      v-for="(action, index) in examActionMenu"
                      :key="index"
                    >
                      <button
                        type="button"
                        :class="`${action.label === 'Delete the exam' ? 'text-red-500' : ''} w-full flex items-center gap-2 px-2 py-3 text-left! cursor-pointer text-nowrap hover:bg-gray-200`"
                      >
                        <i :class="action.icon"></i>
                        {{ action.label }}
                      </button>
                    </Menuitem>
                  </Menu>
                </Context>
              </td>
            </template>
          </AppTable>
        </template>
        <div
          class="w-full h-full flex gap-3 items-center justify-center bg-white flex-col px-4 py-4"
        >
          <template v-if="examStore.exams.length === 0">
            <i class="fa-solid fa-file text-5xl text-gray-700"></i>
            <p class="font-semibold text-gray-700 text-[16px]">
              No exams in this group yet
            </p>
          </template>
          <AppButton
            :leftIcon="`${examStore.exams.length === 0 ? 'fa-solid fa-plus text-white' : ''}`"
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
import AppButton from "../../components/AppButton.vue";
import { clearNewExamData } from "../../utils/functions";
import { useExamStore } from "../../store/ExamStore";
import AppTable from "../../components/AppTable.vue";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { Context, Menu, Menuitem } from "@tomoeed/vue-menu";

const examStore = useExamStore();
const columns = [
  {
    label: "Exam name",
    field: "name",
    sortable: true,
    align: "left",
  },
  {
    label: "Exam key",
    field: "key",
    sortable: true,
    align: "left",
  },
  {
    label: "Created",
    field: "createdAt",
    sortable: true,
    align: "center",
  },
  {
    label: "Status",
    field: "status",
    sortable: false,
    align: "center",
  },
  {
    label: "Access",
    field: "access",
    sortable: false,
    align: "center",
  },
  {
    label: "",
    field: "actions",
    sortable: false,
    align: "center",
  },
];

const rows = ref(
  examStore.exams.map((exam) => ({
    name: exam.examName,
    createdAt: exam.createdAt,
    access: exam.access,
    key: exam.examKey,
  })),
);

const examActionMenu = [
  {
    label: "Give Another teacher Access",
    icon: "fa-solid fa-people-group",
  },
  {
    label: "Reveal student identities",
    icon: "fa-solid fa-id-card",
  },
  {
    label: "Duplicate the exam",
    icon: "fa-solid fa-copy",
  },
  {
    label: "Share exam template via link",
    icon: "fa-solid fa-link",
  },
  {
    label: "Tag exam with a color",
    icon: "fa-solid fa-paintbrush",
  },
  {
    label: "Move to group",
    icon: "fa-solid fa-circle-right",
  },
  {
    label: "Archive the exam",
    icon: "fa-solid fa-box-archive",
  },
  {
    label: "Delete the exam",
    icon: "fa-solid fa-trash",
  },
];

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
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
