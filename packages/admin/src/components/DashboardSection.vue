<script setup lang="ts">
type Props = {
  title: string;
};
defineProps<Props>();
</script>

<template>
  <section class="bg-white rounded-xl shadow-md overflow-hidden">
    <header class="h-14 flex items-center gap-2 px-4 lg:px-6 bg-[#0d1b36]">
      <slot name="icon" />
      <h2 class="font-semibold text-lg text-white">
        {{ title }}
      </h2>
    </header>
    <div class="p-4 lg:p-6 text-sm leading-5">
      <slot />
    </div>
  </section>
</template>
