<script lang="ts" setup>
import {
  storeToRefs,
} from "pinia";
import {
  computed,
  onMounted,
  reactive,
  ref,
} from "vue";
import {
  useRouter,
} from "vue-router";

import {
  useAuthStore,
} from "../../store/server/auth";
import {
  getCookie,
} from "../../utils/functions";

const loginForm = reactive({
  email: "",
  password: "",
});
const showPassword = ref(false);
const FormFieldUI = {
  label: "text-black text-lg",
};
const inputUI = {
  trailing: "pe-1",
  root: "w-full",
  base: "p-4 bg-inherit text-black",
};
const isFormComplete = computed(() => {
  return loginForm.email !== "" && loginForm.password !== "";
});
const router = useRouter();
const authStore = useAuthStore();
const {
  login,
} = authStore;
const {
  success: authSuccess,
  loading: authLoading,
} = storeToRefs(authStore);

onMounted(() => {
  const token = getCookie("token");
  if (token) {
    authStore.setAccessToken(token);
    router.push({
      name: "exams",
    });
  }
});

async function onSubmit() {
  await login(loginForm);

  if (authSuccess.value) {
    router.push({
      name: "license",
    });
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
      <AppForm :state="loginForm" title="Login" @submit="onSubmit">
        <UFormField label="Email" name="email" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.email"
            placeholder="Enter your email"
            color="info"
            type="email"
            :ui="inputUI"
          />
        </UFormField>
        <UFormField label="Password" name="password" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.password"
            placeholder="Enter your password"
            color="info"
            :type="showPassword ? 'text' : 'password'"
            :ui="inputUI"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="lg"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                class="cursor-pointer text-black hover:text-black"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>
        <UButton
          class="w-full items-center justify-center outline p-3 mt-3 cursor-pointer bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
          :disabled="!isFormComplete || authLoading"
          :loading-auto="authLoading"
          :loading="authLoading"
          @click="onSubmit"
        >
          Login
        </UButton>
      </AppForm>
      <p class="text-black text-center">
        Don't have an account? Contact your administrator.
      </p>
    </section>
  </section>
</template>
