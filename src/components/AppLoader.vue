<template>
  <svg
    viewBox="25 25 50 50"
    :style="{
      width: `${width}rem`,
      height: `${width}rem`,
    }"
  >
    <circle
      r="20"
      cy="50"
      cx="50"
      :style="{
        stroke,
      }"
    ></circle>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: Number,
    default: 3.25,
  },
  stroke: {
    type: String,
    default: "black",
  },
});
</script>

<style scoped>
svg {
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: black;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
