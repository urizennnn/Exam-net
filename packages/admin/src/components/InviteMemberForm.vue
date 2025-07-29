<script setup lang="ts">
import { reactive } from 'vue'
import { successToast } from '@root/utils/toast'

const emit = defineEmits<{(e:'invited', payload:{name:string;email:string;role:string}):void}>()
const form = reactive({ name:'', email:'', role:'member' })
const errors = reactive<{name?:string; email?:string}>({})
function validate() {
  errors.name = form.name ? '' : 'Name is required'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email required'
  return !errors.name && !errors.email
}
function submit() {
  if (!validate()) return
  emit('invited', { ...form })
  successToast('Invitation sent')
  form.name = ''
  form.email = ''
  form.role = 'member'
}
</script>
<template>
  <form class="grid gap-2 lg:grid-cols-[2fr_3fr_2fr_auto]" @submit.prevent="submit">
    <div>
      <UInput v-model="form.name" placeholder="Name" />
      <p v-if="errors.name" class="text-red-600 text-xs">{{ errors.name }}</p>
    </div>
    <div>
      <UInput v-model="form.email" placeholder="Email" />
      <p v-if="errors.email" class="text-red-600 text-xs">{{ errors.email }}</p>
    </div>
    <USelect v-model="form.role" :options="['member','admin']" />
    <AppButton type="submit" theme="primary">Invite</AppButton>
  </form>
</template>
