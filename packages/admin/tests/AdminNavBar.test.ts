import { mount } from '@vue/test-utils'
import AdminNavBar from '../src/components/AdminNavBar.vue'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@root/utils/toast', () => ({ successToast: vi.fn() }))
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({ history: createWebHistory(), routes: [] })

describe('AdminNavBar', () => {
  it('renders all navigation links', async () => {
    const wrapper = mount(AdminNavBar, {
      global: {
        plugins: [router, createTestingPinia({ createSpy: () => () => {} })],
        stubs: ['AppButton','Header','UIcon']
      }
    })
    await router.isReady()
    const links = wrapper.findAll('a')
    expect(links.map(l => l.text())).toContain('Dashboard')
    expect(links.map(l => l.text())).toContain('Members')
    expect(links.map(l => l.text())).toContain('Complaints')
    expect(links.map(l => l.text())).toContain('Exams')
    expect(links.map(l => l.text())).toContain('Settings')
  })
})
