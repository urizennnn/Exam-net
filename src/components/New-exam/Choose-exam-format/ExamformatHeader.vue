<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-[#cacaca] px-4 bg-[#e6e6e6] shadow-md gap-4 md:gap-0"
  >
    <input
      type="text"
      placeholder="Enter the exam name"
      class="border-2 border-[#cacaca] bg-white w-full md:w-[50%] p-2 rounded-md placeholder:text-[#8a8787] font-semibold"
    />

    <div class="flex items-center gap-1">
      <div class="border-2 border-[#36a8d8] text-center text-[#36a8d8] font-semibold rounded-full w-8 h-8 text-xl">
        1
      </div>
      <div class="text-[#36a8d8]">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="border-2 border-[#37373758] text-center text-[#37373758] font-semibold rounded-full w-8 h-8 text-xl">
        2
      </div>
      <div class="text-[#37373758]">
        <i class="fa-solid fa-minus"></i>
      </div>
      <div class="border-2 border-[#37373758] text-center text-[#37373758] font-semibold rounded-full w-8 h-8 text-xl">
        3
      </div>
    </div>

    <div class="flex gap-4">
      <div class="flex gap-1 bg-[#38383858] text-white font-semibold rounded-2xl py-1 px-3">
        <p>Next</p>
        <div>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
      <div class="relative">
        <i class="fa-solid fa-circle-question"></i>
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
