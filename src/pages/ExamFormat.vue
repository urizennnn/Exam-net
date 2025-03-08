<template>
  <div class="h-screen w-full">
    <NavBar />
    <div class="flex flex-col gap-2 h-[100%] bg-[#e8e8e8] px-20">
      <div class="flex flex-col h-[100%] bg-[#ffffff]">
        <div
          class="flex flex-row justify-between px-2 py-4 bg-[#f9f7f7] shadow-lg shadow-b-black"
        >
          <input
            type="text"
            placeholder="Enter the exam name"
            class="border-2 pl-5 border-[#e8e8e8] bg-[#ffffff] rounded-sm placeholder:font-semibold placeholder:text-[#949494] w-[65%] py-2"
          />
          <!-- progress -->
          <div class="flex flex-row items-center gap-1">
            <!-- 1 -->
            <div
              class="border-2 border-[#348ef4] flex justify-between items-center p-2 rounded-full"
            >
              <p
                class="text-[#348ef4] text-[18px] w-3 h-3 font-semibold flex justify-center items-center"
              >
                1
              </p>
            </div>
            <div class="text-[#348ef4]">
              <i class="fa-solid fa-minus"></i>
            </div>
            <!-- two -->
            <div
              class="border-2 text-[#949494] flex justify-between items-center p-2 rounded-full"
            >
              <p
                class="text-[#949494] text-[18px] w-3 h-3 font-semibold flex justify-center items-center"
              >
                2
              </p>
            </div>
            <div class="text-[#949494]">
              <i class="fa-solid fa-minus"></i>
            </div>
            <!-- three -->
            <div
              class="border-2 text-[#949494] flex justify-between items-center p-2 rounded-full"
            >
              <p
                class="text-[#949494] text-[18px] w-3 h-3 font-semibold flex justify-center items-center"
              >
                3
              </p>
            </div>
          </div>
          <!-- next -->
          <div class="flex gap-4">
            <div class="bg-[#c2c2c2] flex items-center gap-1 rounded-full px-5">
              <p class="text-[12px] font-semibold text-[#ffffff]">Next</p>
              <div class="text-[12px] font-bold text-[#ffffff]">
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
            <div class="text-[12px] font-semibold">
              <i class="fa-solid fa-circle-question"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
