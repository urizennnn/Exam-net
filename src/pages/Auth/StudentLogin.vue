<script lang="ts" setup>
import {
  computed,
  reactive,
  ref,
} from "vue";
import {
  useRouter,
} from "vue-router";

import AppForm from "../../components/AppForm.vue";
import {
  useDocumentStore,
} from "../../store/server/document";
import {
  axiosInstance,
} from "../../utils/axiosConfig";
import {
  errorToast,
} from "../../utils/toast";

const router = useRouter();
const loading = ref(false);
const loginForm = reactive({
  email: "",
  examKey: "",
});

const FormFieldUI = {
  label: "text-black text-lg",
};
const inputUI = {
  trailing: "pe-1",
  root: "w-full",
  base: "p-4 bg-inherit text-black",
};
const isFormComplete = computed(() => {
  return loginForm.email !== "" && loginForm.examKey !== "";
});

async function onSubmit() {
  try {
    loading.value = true;
    const {
      data,
    } = await axiosInstance.post(`/exams/${loginForm.examKey}`, {
      email: loginForm.email.toLowerCase(),
    });

    const documentStore = useDocumentStore();
    const questions = data.questions;
    if (questions) {
      const parsed = questions.map((q: any) => {
        if (typeof q === "string") {
          try {
            return JSON.parse(q);
          }
          catch {
            return q;
          }
        }
        return q;
      });
      documentStore.setQuestions(parsed);
    }

    localStorage.setItem("email", loginForm.email.toLowerCase());

    localStorage.setItem("examKey", loginForm.examKey);

    router.push(`/student/${data.id}?mode=student`);
  }
  catch (error: any) {
    const msg
      = error.response?.data?.message || error.message || "Invalid exam access";
    errorToast(msg);
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="w-full h-screen bg-white flex">
    <section class="bg-gray-800 w-full h-screen relative p-4 hidden lg:block">
      <img src="../../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]">
      <img
        src="../../assets/images/Humaaans.png"
        alt="background"
        class="w-full h-[80dvh] mt-4 object-center object-fill"
      >
    </section>
    <section
      class="w-full flex flex-col items-center h-screen justify-center p-4"
    >
      <img
        src="../../assets/svg/Asset 7.svg"
        alt="logo"
        class="w-[100px] h-[100px]"
      >
      <AppForm :state="loginForm" title="Exam Login" @submit="onSubmit">
        <UFormField label="Email" name="email" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.email"
            placeholder="Enter your email"
            color="info"
            type="email"
            :ui="inputUI"
          />
        </UFormField>
        <UFormField label="Exam Key" name="examKey" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.examKey"
            placeholder="Enter exam key"
            color="info"
            type="text"
            :ui="inputUI"
          />
        </UFormField>
        <UButton
          class="w-full items-center justify-center outline p-3 mt-3 cursor-pointer bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
          :disabled="!isFormComplete || loading"
          :loading="loading"
          @click="onSubmit"
        >
          Access Exam
        </UButton>
      </AppForm>
      <p class="text-black">
        Need help?
        <RouterLink to="/support" class="text-gray-900 font-bold">
          Contact Support
        </RouterLink>
      </p>
    </section>
  </section>
</template>
