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
          <AppTable :columns="columns" :rows="rows" :selectable="true">
            <template #row="{ row }">
              <td class="tracking-wide p-2">
                <p>
                  {{ row.name }}
                </p>
              </td>
              <td class="text-center p-2">
                <p class="bg-gray-200 p-1.5 w-fit rounded-lg">
                  {{ row.key }}
                </p>
              </td>
              <td class="p-2">
                {{ row.createdAt }}
              </td>
              <td class="p-2 flex gap-1 items-center">
                <i class="fa-regular fa-compass"></i>
                <i class="fa-solid fa-user-secret"></i>
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
                <i
                  class="fa-solid fa-ellipsis-vertical text-black text-xl cursor-pointer"
                  role="button"
                ></i>
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
    align: "center",
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
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
