<template>
  <section class="w-full bg-[#cdcccc]" id="section">
    <div class="section-container-width">
      <div
        class="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-[#cacaca] px-4 bg-[#e6e6e6] shadow-md gap-4 md:gap-0"
      >
        <input
          type="text"
          placeholder="Enter the Exam Name"
          class="border-2 border-[#cacaca] bg-white w-full md:w-[50%] p-2 rounded-md placeholder:text-[#8a8787] font-semibold"
        />
        <div class="flex items-center md:gap-2 gap-4">
          <AppButton
            @click="decreaseCounter"
            v-if="newExamStore.counter > 1"
            class="border-none! text-lg! font-semibold! text-[#464646]!"
            label="Back"
            leftIcon="fa-solid fa-arrow-left"
          />
          <div class="flex items-center gap-1">
            <template v-for="(step, index) in steps" :key="index">
              <i
                v-if="index + 1 < newExamStore.counter"
                class="text-center text-[#36a8d8] font-semibold rounded-full text-4xl fa-solid fa-circle-check"
              ></i>
              <p
                v-else
                :class="`border-2 ${index + 1 === newExamStore.counter ? 'border-[#36a8d8] text-[#36a8d8]' : 'border-[#37373758] text-[#37373758]'} text-center  font-semibold rounded-full w-8 h-8 text-xl`"
              >
                {{ index + 1 }}
              </p>
              <i
                :class="`fa-solid fa-minus ${index + 1 === newExamStore.counter ? 'text-[#36a8d8]' : 'text-[#37373758]'}`"
                v-if="index < steps.length - 1"
              ></i>
            </template>
          </div>
          <AppButton
            v-if="newExamStore.counter > 1"
            extraClass="py-1 px-4 rounded-4xl! border-[#37373758]! border-2! text-lg!"
          >
            <i class="fa-solid fa-binoculars text-black"></i>
          </AppButton>
        </div>
        <div class="flex gap-1">
          <template v-for="(verifier, index) in formVerifier" :key="index">
            <AppButton
              v-if="index + 1 === newExamStore.counter"
              :disabled="verifier.validator"
              @click="increaseCounter"
              label="Next"
              theme="secondary"
              rightIcon="fa-solid fa-arrow-right"
            />
          </template>
          <i class="fa-solid fa-circle-question" role="button"></i>
        </div>
      </div>
      <main>
        <RouterView />
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useNewExamStore } from "../store/NewExamStore";
import AppButton from "../components/AppButton.vue";

const router = useRouter();
const newExamStore = useNewExamStore();
const { increaseCounter, decreaseCounter } = useNewExamStore();
const steps = new Array(3).fill("");
const firstStep = computed(() => newExamStore.form.examFormat);
const formVerifier = computed(() => [
  {
    validator: firstStep.value == "",
  },
  {
    validator: true,
  },
]);

watch(
  () => newExamStore.counter,
  (n) => {
    if (n === 1) {
      router.push("/new-exam");
    } else if (n === 2 && newExamStore.form.examFormat === "question") {
      router.push("/new-question");
    }
  },
);
</script>

<style scoped>
#section {
  min-height: calc(100dvh - 60px);
  padding: 0;
  margin: 0;
}
</style>
