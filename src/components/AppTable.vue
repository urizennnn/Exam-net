<script lang="ts" setup>
import {
  computed,
  useTemplateRef,
  watch,
} from "vue";

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
  const selRows
    = table.value?.tableApi.getFilteredSelectedRowModel().rows ?? [];
  return selRows.map(r => r.original);
});

watch(selectedItems, (items) => {
  emit("update:rowSelection", items);
}, {
  immediate: true,
});
</script>

<template>
  <div v-if="filterBy && !loading" class="px-3">
    <AppInput
      :model-value="table?.tableApi?.getColumn(filterBy)?.getFilterValue()"
      class="max-w-sm"
      base-class="p-2!"
      :loading="loading"
      :placeholder="`Filter ${filterBy}...`"
      @update:model-value="
        table?.tableApi?.getColumn(filterBy)?.setFilterValue($event)
      "
    />
  </div>

  <UTable
    ref="table"
    :data="rowsComputed"
    :columns="columnsComputed"
    :row-selection="{ mode: 'multiple' }"
    :ui="{
      base: 'bg-white',
      th: 'text-black!',
      td: 'text-black!',
    }"
    :loading="loading"
    loading-color="info"
    loading-animation="carousel"
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
