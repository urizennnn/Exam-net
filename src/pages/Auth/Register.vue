<template>
  <section class="w-full h-auto bg-white flex">
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
      <AppForm :state="registerForm" title="Register" @submit="onSubmit">
        <UFormField label="Name" name="name" :ui="FormFieldUI">
          <UInput
            v-model="registerForm.name"
            placeholder="Enter your name"
            type="text"
            :ui="inputUI"
          />
        </UFormField>
        <UFormField label="Email" name="email" :ui="FormFieldUI">
          <UInput
            v-model="registerForm.email"
            placeholder="Enter your email"
            type="email"
            :ui="inputUI"
          />
        </UFormField>
        <UFormField label="Password" name="password" :ui="FormFieldUI">
          <UInput
            v-model="registerForm.password"
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
        <UProgress
          :color="color"
          :indicator="text"
          :model-value="score"
          :max="4"
          size="sm"
          class="-mt-1"
        />

        <p id="password-strength" class="text-sm font-medium -mt-1 text-black">
          {{ text }}. Must contain:
        </p>
        <ul
          class="space-y-1 text-black -mt-3"
          aria-label="Password requirements"
        >
          <li
            v-for="(req, index) in strength"
            :key="index"
            class="flex items-center gap-0.5"
            :class="req.met ? 'text-success' : 'text-black'"
          >
            <UIcon
              :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
              class="size-4 shrink-0"
            />

            <span class="text-xs font-light">
              {{ req.text }}
              <span class="sr-only">
                {{ req.met ? " - Requirement met" : " - Requirement not met" }}
              </span>
            </span>
          </li>
        </ul>

        <UButton
          type="submit"
          class="w-full items-center justify-center outline p-3 mt-3 cursor-pointer bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
          :disabled="!isFormComplete || authLoading"
          :loading-auto="authLoading"
          :loading="authLoading"
          @click="onSubmit"
        >
          Register
        </UButton>
      </AppForm>
      <p class="text-black">
        Do you have an account already?
        <RouterLink to="/" class="text-gray-900 font-bold">Login</RouterLink>
      </p>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from "vue";
import { useAuthStore } from "../../store/server/auth";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";

const registerForm = reactive({
  name: "",
  email: "",
  password: "",
});
const showPassword = ref(false);
const strength = computed(() => checkStrength(registerForm.password));
const score = computed(() => strength.value.filter((req) => req.met).length);
const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});
const text = computed(() => {
  if (score.value === 0) return "Enter a password";
  if (score.value <= 2) return "Weak password";
  if (score.value === 3) return "Medium password";
  return "Strong password";
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
  return (
    registerForm.email !== "" &&
    registerForm.password !== "" &&
    score.value >= 3
  );
});
const router = useRouter();
const { register } = useAuthStore();
const { success: authSuccess, loading: authLoading } =
  storeToRefs(useAuthStore());

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /\d/, text: "At least 1 number" },
    { regex: /[a-z]/, text: "At least 1 lowercase letter" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  ];

  return requirements.map((req) => ({
    met: req.regex.test(str),
    text: req.text,
  }));
}

async function onSubmit() {
  await register(registerForm);

  if (authSuccess.value) {
    router.push({ name: "login" });
  }
}
</script>
