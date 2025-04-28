<template>
  <section class="w-full h-screen bg-white flex">
    <section class="bg-gray-800 w-full h-screen relative p-4 hidden lg:block">
      <img src="../../assets/svg/Asset 11.svg" alt="logo" class="h-[30px]" />
      <img
        src="../../assets/images/Humaaans.png"
        alt="background"
        class="w-full h-[80dvh] mt-4 object-center object-fill"
      />
    </section>
    <section
      class="w-full flex flex-col items-center h-screen justify-center p-4"
    >
      <AppForm :state="loginForm" title="Login" @submit="onSubmit">
        <UFormField label="Email" name="email" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.email"
            placeholder="Enter your email"
            type="email"
            :ui="inputUI"
          />
        </UFormField>
        <UFormField label="Password" name="password" :ui="FormFieldUI">
          <UInput
            v-model="loginForm.password"
            placeholder="Enter your password"
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
                @click="showPassword = !showPassword"
                class="cursor-pointer text-black hover:text-black"
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
      <p class="text-black">
        You don't have an account?
        <RouterLink to="/signup" class="text-gray-900 font-bold"
          >Register</RouterLink
        >
      </p>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { useAuthStore } from "../../store/server/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

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
const { login } = useAuthStore();
const { success: authSuccess, loading: authLoading } =
  storeToRefs(useAuthStore());

async function onSubmit() {
  await login(loginForm);

  if (authSuccess.value) {
    router.push({ name: "license" });
  }
}
</script>
