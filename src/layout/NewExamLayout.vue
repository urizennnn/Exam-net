<template>
  <section class="w-full bg-zinc-300" id="section">
    <div class="section-container-width">
      <div
        class="flex flex-col md:flex-row justify-between items-center py-4 border-b-2 border-[#cacaca] px-4 bg-[#e6e6e6] shadow-md gap-4"
      >
        <AppInput placeholder="Enter the Exam Name" />
        <div class="flex items-center md:gap-2 gap-4">
          <AppButton
            @click="decreaseCounter"
            v-if="newExamStore.counter > 1"
            class="border-none! text-lg! font-semibold! text-[#464646]!"
            label="Back"
            leftIcon="fa-solid fa-arrow-left"
          />
          <div class="flex items-center gap-1">
            <template v-for="(_, index) in steps" :key="index">
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
            class="py-1 px-4 rounded-4xl! border-black! border-2! text-lg!"
          >
            <i class="fa-solid fa-binoculars text-black"></i>
          </AppButton>
        </div>
        <div class="flex gap-1">
          <template v-if="newExamStore.counter != steps.length">
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
          </template>
          <template v-else>
            <AppButton
              label="Save"
              theme="secondary"
              leftIcon="fa-regular fa-floppy-disk"
              @click="toggleShowNameExamModal"
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
  <AppModal
    title="Give your exam a name"
    :isVisible="showNameExamModal"
    @onClose="toggleShowNameExamModal"
  >
    <template #body>
      <AppInput placeholder="Enter the name" v-model="newExamStore.examName" />
      <AppButton
        label="Save Exam"
        theme="secondary"
        leftIcon="fa-regular fa-floppy-disk"
        class="w-full! items-center justify-center p-3! mt-3"
        :to="`/preview/${newExamStore.examId}`"
        :disabled="!newExamStore.examName"
      />
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useNewExamStore } from "../store/NewExamStore";
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import AppModal from "../components/AppModal.vue";

const router = useRouter();
const newExamStore = useNewExamStore();
const { generateExamKey } = useNewExamStore();
const { increaseCounter, decreaseCounter } = useNewExamStore();
const steps = new Array(3).fill("");
const firstStep = computed(() => newExamStore.form.examFormat);
const formVerifier = computed(() => [
  {
    validator: firstStep.value == "",
  },
  {
    validator: newExamStore.editorContent == "",
  },
]);
const showNameExamModal = ref(false);

function toggleShowNameExamModal() {
  showNameExamModal.value = !showNameExamModal.value;

  if (!showNameExamModal.value) {
    newExamStore.examName = "";
    newExamStore.examId = "";
  } else {
    generateExamKey();
  }
}

watch(
  () => newExamStore.counter,
  (n) => {
    sessionStorage.setItem("counter", `${n}`);
    if (n === 1) {
      router.push("/new-exam");
    } else if (n === 2) {
      router.push("/new-question");
    } else if (n === 3) {
      router.push("/exam-config");
    }
  },
);

watch(
  () => newExamStore.examName,
  (n) => {
    sessionStorage.setItem("examName", n);
  },
);

watch(
  () => newExamStore.examId,
  (n) => {
    sessionStorage.setItem("examId", n);
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
