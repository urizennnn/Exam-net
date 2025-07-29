import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMembers, Member } from '../composables/useMembers'
import { axiosInstance } from '../utils/axiosConfig'

export const useMembersStore = defineStore('members', () => {
  const members = ref<Member[]>([])
  const search = ref('')
  const status = ref('')
  const page = ref(1)
  const pageSize = ref(10)
  const loading = ref(false)

  const { fetchMembers } = useMembers()

  async function load() {
    loading.value = true
    try {
      members.value = await fetchMembers()
    } finally {
      loading.value = false
    }
  }

  async function invite(payload: { name: string; email: string; role: string }) {
    loading.value = true
    try {
      await axiosInstance.post('/admin/invite', payload)
    } finally {
      loading.value = false
    }
  }

  async function remove(id: string) {
    const previous = [...members.value]
    members.value = members.value.filter(m => m.id !== id)
    try {
      await axiosInstance.delete(`/admin/members/${id}`)
    } catch (err) {
      members.value = previous
      throw err
    }
  }

  return {
    members,
    search,
    status,
    page,
    pageSize,
    loading,
    load,
    invite,
    remove
  }
})
