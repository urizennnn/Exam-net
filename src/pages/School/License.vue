<template>
  <Header />
  <section
    id="section"
    class="relative w-full bg-zinc-300 flex items-center justify-center text-black"
  >
    <div class="section-container-width">
      <div class="w-full flex flex-col rounded-2xl shadow-xl overflow-hidden">
        <h1
          class="bg-blue-950 text-white p-3 rounded-t-lg text-center text-[18px] md:text-[20px] tracking-wide"
        >
          License
        </h1>
        <div class="w-full h-full flex gap-4 bg-white! flex-col px-16 py-8">
          <p class="text-[14px] md:text-[16px] font-sans">
            <i class="text-red-500 fa-solid fa-triangle-exclamation"></i>
            License
          </p>
          <div class="flex flex-col gap-3">
            <p class="text-[14px] font-sans">
              Your school needs a license in order to use Exam.net. Click
              Purchase a license below to see pricing and to order.
              <br />
              You will get access as soon as the license is ordered.
            </p>
            <AppButton
              class="py-1 px-4 rounded-4xl! text-black! border-2! text-lg!"
              label="See pricing and purchase a license"
            />
          </div>
          <div class="flex flex-col gap-3">
            <p class="text-[14px] font-sans">
              You can activate 5 days of temporary access for your user to give
              you time to complete your purchase or save material
              <br class="hidden md:block" />
              before access is denied. If your school needs more time to
              evaluate Exam.net, email sales@exam.net.
            </p>

            <AppButton
              class="py-1 px-4 rounded-4xl! text-black! border-2! text-lg!"
              label="Activate 5 days of temporary access"
            />
          </div>

          <div class="border border-[#d6d6d6] lg:w-1/2"></div>

          <div class="flex flex-col gap-4">
            <p class="text-[14px] md:text-[16px]">
              <i class="fa-solid fa-building"></i>
              School information
            </p>
            <p class="text-[14px] md:text-[16px]">Address</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped>
#section {
  min-height: calc(100dvh - 92px);
}
</style>
