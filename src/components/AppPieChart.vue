<script setup lang="ts">
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import {
  computed,
  defineProps,
} from "vue";
import {
  Pie,
} from "vue-chartjs";

const props = defineProps<{
  rows: Array<{ name: string; score: number; submissionTime: string }>;
}>();

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const distribution = computed(() => {
  const counts: Record<number, number> = {
  };
  props.rows.forEach((r) => {
    counts[r.score] = (counts[r.score] || 0) + 1;
  });
  return counts;
});

const blueShades = [
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#172554",
];

// prepare labels & data arrays
const chartData = computed(() => {
  const labels = Object.keys(distribution.value).map(k => `${k} pts`);
  const data = Object.values(distribution.value);
  return {
    labels,
    datasets: [
      {
        label: "Student count",
        data,
        backgroundColor: blueShades.slice(0, Object.keys(distribution.value).length),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Score Distribution",
    },
  },
};
</script>

<template>
  <div class="chart-container" style="max-width: 400px; margin: auto;">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
