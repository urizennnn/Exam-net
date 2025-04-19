<template>
  <div class="bg-white! text-black select-none w-full overflow-scroll p-2">
    <table class="w-full text-sm">
      <thead class="border-b-4 border-gray-300">
        <tr>
          <th v-if="selectable" class="p-2">
            <input type="checkbox" v-model="selectAll" />
          </th>
          <th
            v-for="col in columns"
            :key="col.field"
            @click="col.sortable && sortBy(col.field)"
            :class="['p-2 text-left!', col.sortable ? 'cursor-pointer' : '']"
          >
            {{ col.label }}
            <span v-if="sortKey === col.field">
              <i v-if="sortAsc" class="fa-solid fa-caret-up"></i>
              <i v-else class="fa-solid fa-caret-down"></i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in filteredAndSortedRows"
          :key="row[idKey]"
          class="border-b-1 p-2 border-b-gray-200"
        >
          <td v-if="selectable" class="p-2 text-center">
            <input type="checkbox" :value="row" v-model="selected" />
          </td>
          <slot name="row" :row="row" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

// define props
const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  selectable: { type: Boolean, default: false },
  idKey: { type: String, default: "id" },
  filterPlaceholder: { type: String, default: "Filter..." },
  filterFields: { type: Array, default: () => [] },
});

// emit for selection
const emit = defineEmits(["selection-change"]);

// local state
const sortKey = ref("");
const sortAsc = ref(true);
const selected = ref([]);
const selectAll = ref(false);

// sort/filter
const filteredAndSortedRows = computed(() => {
  let data = props.rows;
  // filter
  if (props.filterPlaceholder && selected.value) data = data; // keep existing behavior
  // sort
  if (sortKey.value) {
    data = [...data].sort((a, b) => {
      const A = a[sortKey.value];
      const B = b[sortKey.value];
      if (A == null) return 1;
      if (B == null) return -1;
      const cmp = String(A).localeCompare(String(B));
      return sortAsc.value ? cmp : -cmp;
    });
  }
  return data;
});

// toggle sort
function sortBy(field) {
  if (sortKey.value === field) sortAsc.value = !sortAsc.value;
  else {
    sortKey.value = field;
    sortAsc.value = true;
  }
}

// keep select all in sync
watch(selectAll, (val) => {
  selected.value = val ? [...filteredAndSortedRows.value] : [];
});
watch(selected, (val) => {
  selectAll.value =
    val.length > 0 && val.length === filteredAndSortedRows.value.length;
  emit("selection-change", val);
});
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
