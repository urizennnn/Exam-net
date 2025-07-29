<script setup lang="ts">
import { reactive, ref } from 'vue'
import AppInput from '../AppInput.vue'
import AppSelect from '../AppSelect.vue'
import AppButton from '../AppButton.vue'

const emit = defineEmits(['members:list:refresh'])

const form = reactive({ name: '', email: '', role: 'member' })
const errors = reactive<{ name?: string; email?: string }>({})
const submitting = ref(false)

function validate() {
  errors.name = form.name ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'Valid email required'
  return !errors.name && !errors.email
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  try {
    // here we would call API via composable or store
    emit('members:list:refresh')
    form.name = ''
    form.email = ''
    form.role = 'member'
  } finally {
    submitting.value = false
  }
}
</script>
<template>
  <form
    class="grid gap-2 lg:grid-cols-4"
    @submit.prevent="submit"
  >
    <div>
      <AppInput v-model="form.name" placeholder="Name" class="h-10 text-sm" />
      <p v-if="errors.name" class="text-red-600 text-xs">{{ errors.name }}</p>
    </div>
    <div>
      <AppInput v-model="form.email" placeholder="Email" class="h-10 text-sm" />
      <p v-if="errors.email" class="text-red-600 text-xs">{{ errors.email }}</p>
    </div>
    <AppSelect v-model="form.role" :items="['member','admin']" class="h-10 text-sm" />
    <AppButton type="submit" theme="primary" :loading="submitting" class="h-10">
      Invite
    </AppButton>
  </form>
</template>
