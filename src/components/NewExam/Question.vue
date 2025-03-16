<template>
  <div
    class="bg-white w-full md:w-[80%] flex pt-10 md:pt-20 justify-center lg:px-4"
  >
    <div
      class="w-full max-w-3xl rounded-lg shadow-md flex flex-col gap-6 bg-gray-50"
    >
      <!-- Top Bar -->
      <div
        class="bg-gray-300 rounded-t-lg px-6 py-4 text-gray-800 text-sm font-medium"
      >
        New question
      </div>

      <!-- Body -->
      <div class="flex flex-col gap-4 px-6 mt-4">
        <!-- Auto-marked -->
        <div class="flex items-center gap-2">
          <div
            class="bg-gray-900 w-4 h-4 flex items-center justify-center text-white text-xs font-semibold rounded-sm"
          >
            A
          </div>
          <p class="text-xs text-gray-800 py-2 md:py-4">Auto-marked</p>
        </div>

        <!-- Answer Type Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-regular fa-comment"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Information block</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-list"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Multiple choice</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-equals"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Simple answer</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-link-slash"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Fill the gaps</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-diagram-predecessor"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Match answers</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-grip-vertical"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Grid</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-align-left"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Free text</p>
          </div>
          <div class="flex flex-col gap-2 text-center">
            <div
              class="bg-gray-300 border border-gray-400 rounded-lg h-16 w-full max-w-[120px] flex items-center justify-center text-2xl mx-auto"
            >
              <i class="fa-solid fa-paperclip"></i>
            </div>
            <p class="text-sm text-gray-800 font-medium">Student answers</p>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-wrap gap-4 items-center lg:py-4 px-6">
        <button
          class="w-full sm:w-[150px] flex items-center py-2 gap-2 border border-gray-400 px-2 rounded-lg"
        >
          <i class="fa-solid fa-sun"></i>
          <span class="text-sm text-gray-800 font-medium"
            >Generate questions</span
          >
        </button>
        <button
          class="w-full sm:w-[150px] flex items-center py-2 gap-2 border border-gray-400 px-2 rounded-lg"
        >
          <i class="fa-solid fa-circle-arrow-down"></i>
          <span class="text-sm text-gray-800 font-medium"
            >Import questions</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
