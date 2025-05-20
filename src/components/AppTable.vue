<template>
  <div class="px-3" v-if="filterBy">
    <AppInput
      :model-value="table?.tableApi?.getColumn(filterBy)?.getFilterValue()"
      class="max-w-sm"
      baseClass="p-2!"
      :placeholder="`Filter ${filterBy}...`"
      @update:model-value="
        table?.tableApi?.getColumn(filterBy)?.setFilterValue($event)
      "
    />
  </div>

  <UTable
    :data="rowsComputed"
    :columns="columnsComputed"
    :rowSelection="{ mode: 'multiple' }"
    :ui="{
      base: 'bg-white',
      th: 'text-black!',
      td: 'text-black!',
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
    {{ selectedItems.length }} of {{ rowsComputed.length }} row(s) selected.
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, useTemplateRef } from "vue";

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
  },
  loadingColor: {
    type: String,
    default: "info",
  },
  filterBy: String,
});

const emit = defineEmits<{
  (e: "update:rowSelection", payload: any[]): void;
}>();

const rowsComputed = computed(() => props.rows);
const columnsComputed = computed(() => props.columns);
const table = useTemplateRef("table");

const selectedItems = computed(() => {
  const selRows =
    table.value?.tableApi.getFilteredSelectedRowModel().rows ?? [];
  return selRows.map((r) => r.original);
});

watch(
  selectedItems,
  (items) => {
    emit("update:rowSelection", items);
  },
  { immediate: true },
);
</script>
