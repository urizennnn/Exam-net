<template>
  <div class="flex flex-col sm:flex-row gap-6 w-full">
    <!-- Card 1 -->
    <div class="h-[250px] sm:h-[300px] w-full sm:w-[48%] rounded-lg shadow-lg flex flex-col border-2 border-[#e4e1e1]">
      <div class="h-[70%] sm:h-[80%] bg-[#eeeeee] rounded-t-lg flex justify-center pt-6 relative">
        <div class="border-t border-l border-r border-[#e4e1e1] w-[60%] bg-white rounded-t-lg"></div>
        <div class="absolute top-6 right-4 sm:right-16 bg-[#0968a7] text-white px-2 py-1 rounded-sm font-sans font-normal text-xs sm:text-sm">
          Auto-marking available
        </div>
      </div>
      <div class="h-[30%] sm:h-[40%] bg-white flex items-center justify-center rounded-b-lg">
        <p class="text-lg sm:text-2xl font-sans text-[#464646]">Use question types</p>
      </div>
    </div>

    <!-- Card 2 -->
    <div class="h-[250px] sm:h-[300px] w-full sm:w-[48%] rounded-lg shadow-lg flex flex-col border-2 border-[#e4e1e1]">
      <div class="h-[70%] sm:h-[80%] bg-[#eeeeee] rounded-t-lg flex justify-center pt-6 relative">
        <div class="border-t border-l border-r border-[#e4e1e1] w-[60%] bg-white rounded-t-lg"></div>
        <div class="absolute right-4 sm:right-7 top-4 flex flex-row gap-1 text-white text-xs sm:text-md">
          <div class="w-8 sm:w-10 h-8 sm:h-10 bg-[#e92b2b] rounded-md flex justify-center items-center">
            PDF
          </div>
          <div class="w-8 sm:w-10 h-8 sm:h-10 bg-[#0968a7] rounded-md flex justify-center items-center">
            T
          </div>
        </div>
      </div>
      <div class="h-[30%] sm:h-[40%] bg-white flex items-center justify-center rounded-b-lg">
        <p class="text-lg sm:text-2xl font-sans text-[#464646]">Upload or create a document</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
