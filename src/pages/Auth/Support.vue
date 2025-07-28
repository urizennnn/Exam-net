<script setup lang="ts">
import {
  reactive,
  ref,
} from "vue";

import AppForm from "../../components/AppForm.vue";
import AppButton from "../../components/AppButton.vue";
import AppTextarea from "../../components/AppTextarea.vue";
import {
  axiosInstance,
} from "../../utils/axiosConfig";
import {
  errorToast,
  successToast,
} from "../../utils/toast";

const loading = ref(false);
const supportForm = reactive({
  name: "",
  email: "",
  complaint: "",
});

async function onSubmit() {
  try {
    loading.value = true;
    const {
      data,
    } = await axiosInstance.post("/support", supportForm);
    successToast(data.message);
  }
  catch (error: any) {
    const msg
      = error.response?.data?.message || error.message || "Submission failed";
    errorToast(msg);
  }
  finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="p-4 flex flex-col items-center w-full">
    <AppForm :state="supportForm" title="Contact Support" @submit="onSubmit">
      <label for="name">Name:</label>
      <AppInput v-model="supportForm.name" placeholder="Enter your name" />
      <label for="email">Email:</label>
      <AppInput v-model="supportForm.email" placeholder="Enter your email" type="email" />
      <label for="complaint">Complaint:</label>
      <AppTextarea v-model="supportForm.complaint" placeholder="Describe your issue" rows="5" />
      <AppButton
        class="w-full items-center justify-center outline p-3 mt-3 cursor-pointer bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
        :disabled="!supportForm.name || !supportForm.email || !supportForm.complaint || loading"
        :loading="loading"
        @click="onSubmit"
      >
        Submit Complaint
      </AppButton>
    </AppForm>
  </section>
</template>

