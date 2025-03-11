<template>
  <div
    class="flex justify-between items-center py-4 border-b-2 border-[#cacaca] px-4 bg-[#e6e6e6] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)]"
  >
    <input
      type="text"
      placeholder="Enter the exam name"
      class="border-2 border-[#cacaca] bg-[#ffffff] w-[60%] p-2 rounded-md placeholder:text-[#8a8787] font-semibold"
    />
    <!-- back -->
    <div class="flex gap-1 items-center text-lg font-semibold text-[#464646]">
      <div>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <p>Back</p>
    </div>
    <div class="flex items-center gap-4">
    <!-- progress -->
    <div class="flex items-center gap-1">
      <!-- one -->
      <div
        class="text-center text-[#36a8d8] font-semibold rounded-full text-4xl"
      >
        <i class="fa-solid fa-circle-check"></i>
      </div>
      <div class="text-[#36a8d8]">
        <i class="fa-solid fa-minus"></i>
      </div>
      <!-- two -->
      <div
        class="border-2 border-[#36a8d8] text-center text-[#36a8d8] font-semibold rounded-full w-9 h-9 text-xl"
      >
        2
      </div>
      <div class="text-[#37373758]">
        <i class="fa-solid fa-minus"></i>
      </div>
      <!-- three -->
      <div
        class="border-2 border-[#37373758] text-center text-[#37373758] font-semibold rounded-full w-9 h-9 text-xl"
      >
        3
      </div>
    </div>
    <!-- binocular -->
    <div class="border-2 border-[#37373758] py-1 px-5 text-lg rounded-4xl">
      <i class="fa-solid fa-binoculars"></i>
    </div>

    <div class="flex gap-4">
      <!-- Next Button -->
      <div
        class="flex gap-1 bg-[#38383858] text-[#ffffff] font-semibold rounded-2xl py-1 px-3"
      >
        <p>Next</p>
        <div>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="relative bottom-2">
        <i class="fa-solid fa-circle-question"></i>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
