<template>
  <div class="h-screen w-full">
    <NavBar />
    <div class="flex flex-col gap-2 h-[100%] bg-[#e8e8e8] px-5">
      <div class="flex justify-center items-center w-full p-4 md:p-0">
        <div
          class="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] h-auto md:h-[500px] flex flex-col mt-10 rounded-2xl bg-[#ffffff] shadow-[0px_6px_32px_0px_rgba(0,0,0,0.2)]"
        >
          <div
            class="bg-[#15325d] text-[#ffffff] p-3 rounded-t-lg flex justify-between items-center"
          >
            <div></div>
            <h1 class="text-[18px] md:text-[20px] font-semibold">MBA</h1>
            <div class="flex gap-3 text-[18px] md:text-[20px] font-semibold">
              <div class="text-[#ffffff]">
                <i class="fa-solid fa-gears"></i>
              </div>
              <div class="text-[#ffffff]">
                <i class="fa-solid fa-angle-down"></i>
              </div>
              <div class="text-[#ffffff]">
                <i class="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-2 justify-center items-center">
            <div class="flex justify-center items-center w-20 h-20">
              <i class="fa-solid fa-file text-4xl text-gray-700"></i>
            </div>
            <p class="font-semibold text-[#626262] text-[16px]">
              No exams in this group yet
            </p>
            <button
              class="flex items-center gap-2 bg-[#444b57] rounded-2xl py-2 px-4 font-semibold"
            >
              <div class="text-[#ffffff] text-[12px]">
                <i class="fa-solid fa-plus"></i>
              </div>
              <p class="text-[#ffffff] text-[12px]">New exam</p>
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <div
          class="bg-[#ffffff] w-[20px] h-[20px] flex items-center justify-center font-semibold text-xl p-5 rounded-md shadow-[0px_6px_32px_0px_rgba(0,0,0,0.2)]"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="flex gap-4 items-center">
          <div class="text-[#348ef4] bg-[#ffffff] p-5 w-[20px] h-[20px] rounded-full flex justify-center items-center">
            <i class="fa-solid fa-arrow-up"></i>
          </div>
          <div class="text-[#ffffff] bg-[#1fc2f0] p-5 w-[50px] h-[50px] rounded-full flex justify-center items-center">
            <i class="fa-solid fa-question"></i>
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
