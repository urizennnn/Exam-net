import { ref } from 'vue'
import { axiosInstance } from '../utils/axiosConfig'

export type Member = {
  id: string
  name: string
  email: string
  role: string
  invitedAt: string
  status: string
}

const cache = ref<Member[] | null>(null)

export function useMembers() {
  const loading = ref(false)

  async function fetchMembers() {
    if (cache.value) return cache.value
    loading.value = true
    try {
      const { data } = await axiosInstance.get('/admin/members')
      cache.value = data
      return data as Member[]
    } finally {
      loading.value = false
    }
  }

  return { fetchMembers, loading, cache }
}
