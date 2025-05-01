<template>
  <UTable
    :data="rowsComputed"
    :columns="columnsComputed"
    :ui="{
      base: 'bg-white',
      th: 'text-black!',
      td: 'text-black!',
      loading: 'after:border-blue-950 after:py-3',
    }"
    ref="table"
    :loading="loading"
    loadingColor="info"
    loadingAnimation="carousel"
  >
    <template #name-cell="{ row }">
      <slot name="rows" :row="row" />
    </template>
    <template #action-cell="{ row }">
      <slot name="action-cell" :row="row" />
    </template>
  </UTable>

  <div
    v-if="!loading"
    class="bg-white text-black px-4 py-2 border-t border-accented text-sm"
  >
    {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
    {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s)
    selected.
  </div>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef, watch } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
  loadingColor: {
    type: String,
    dafault: "info",
  },
});
const emits = defineEmits(["update:rowSelection"]);

const rowsComputed = computed(() => props.rows);
const columnsComputed = computed(() => props.columns);
const table = useTemplateRef("table");
const rowSelection = computed(
  () => table.value?.tableApi?.getFilteredSelectedRowModel().rows,
);

watch(rowSelection, (v) => emits("update:rowSelection", v), {
  deep: true,
});
</script>
