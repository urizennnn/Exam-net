<template>
  <div class="bg-white! text-black">
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
              <i v-if="sortAsc">▲</i>
              <i v-else>▼</i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="">
        <!-- if parent gave us a #row slot, use it -->
        <template v-if="$slots.row">
          <tr
            v-for="row in filteredAndSortedRows"
            :key="row[idKey]"
            class="border-b-1 p-2 border-b-gray-200"
          >
            <!-- expose row, columns, selected array, etc. -->
            <td v-if="selectable" class="p-2 text-center">
              <input type="checkbox" :value="row" v-model="selected" />
            </td>
            <slot name="row" :row="row" />
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  idKey: {
    type: String,
    default: "id",
  },
  filterPlaceholder: {
    type: String,
    default: "Filter...",
  },
  filterFields: {
    type: Array,
    default: () => [],
  },
});

const filterText = ref("");
const sortKey = ref("");
const sortAsc = ref(true);
const selected = ref([]);
const selectAll = ref(false);

// wire up the "select all" checkbox
watch(selectAll, (val) => {
  if (val) selected.value = [...filteredAndSortedRows.value];
  else selected.value = [];
});
watch(selected, (val) => {
  selectAll.value =
    val.length > 0 && val.length === filteredAndSortedRows.value.length;
});

const filteredAndSortedRows = computed(() => {
  // 1) Filter
  let data = props.rows;
  if (filterText.value) {
    const fields =
      props.filterFields.length > 0
        ? props.filterFields
        : props.columns.map((c) => c.field);
    data = data.filter((r) =>
      fields.some((f) =>
        String(r[f] ?? "")
          .toLowerCase()
          .includes(filterText.value.toLowerCase()),
      ),
    );
  }

  // 2) Sort
  if (sortKey.value) {
    data = [...data].sort((a, b) => {
      const A = a[sortKey.value];
      const B = b[sortKey.value];
      // nulls last
      if (A == null) return 1;
      if (B == null) return -1;
      const cmp = String(A).localeCompare(String(B));
      return sortAsc.value ? cmp : -cmp;
    });
  }

  return data;
});

/** toggle sort on a column */
function sortBy(field) {
  if (sortKey.value === field) {
    sortAsc.value = !sortAsc.value;
  } else {
    sortKey.value = field;
    sortAsc.value = true;
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
