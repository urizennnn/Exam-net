<template>
  <div class="h-screen w-full">
    <NavBar />
    <Header />
    <div
      class="flex justify-center items-center l w-full h-[100%] bg-[#e8e8e8] p-4 md:p-0"
    >
      <div
        class="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] h-auto md:h-[600px] flex flex-col mt-10 rounded-2xl bg-[#ffffff] shadow-[0px_6px_32px_0px_rgba(0,0,0,0.2)]"
      >
        <div
          class="bg-[#15325d] text-center text-[#ffffff] py-3 rounded-t-lg text-[18px] md:text-[20px] font-semibold"
        >
          License
        </div>
        <div
          class="mt-5 px-6 md:px-[50px] lg:px-[100px] py-[5px] flex flex-col gap-6 md:gap-10"
        >
          <div class="flex gap-2 items-center">
            <div class="text-red-500">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <p class="text-[14px] md:text-[16px] text-[#545454] font-sans">
              License
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-[14px] text-[#545454] font-sans">
              Your school needs a license in order to use Exam.net. Click
              Purchase a license below to see pricing and to order.
            </p>
            <p class="text-[14px] text-[#545454] font-sans">
              You will get access as soon as the license is ordered.
            </p>
            <button
              class="border-2 border-[#b7b7b7] w-full md:w-[300px] text-[14px] md:text-[16px] text-[#323232] font-semibold font-sans py-2 rounded-full"
            >
              See pricing and purchase a license
            </button>
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-[14px] text-[#545454] font-sans">
              You can activate 5 days of temporary access for your user to give
              you time to complete your purchase or save material
              <br class="hidden md:block" />
              before access is denied. If your school needs more time to
              evaluate Exam.net, email sales@exam.net.
            </p>

            <button
              class="border-2 border-[#b7b7b7] w-full md:w-[300px] text-[14px] md:text-[16px] text-[#323232] font-semibold font-sans py-2 rounded-full"
            >
              Activate 5 days of temporary access
            </button>
          </div>

          <div class="border border-[#d6d6d6] lg:w-1/2"></div>

          <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center">
              <i class="fa-solid fa-building"></i>
              <p class="text-[14px] md:text-[16px] text-[#545454] font-sans">
                School information
              </p>
            </div>
            <p class="text-[14px] md:text-[16px] text-[#545454] font-sans">
              Address
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import Header from "../components/Header.vue";
export default {
  components: {
    NavBar,
    Header,
  },
};
</script>
