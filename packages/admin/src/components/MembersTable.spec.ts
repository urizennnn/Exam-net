import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import MembersTable from '../../../../src/components/admin/MembersTable.vue'
vi.mock('@root/utils/toast', () => ({ successToast: vi.fn() }))

const members = [
  { id: '1', name: 'Jane', email: 'jane@test.com', role: 'member', invitedAt: new Date().toISOString(), status: 'active' }
]

describe('MembersTable', () => {
  it('renders rows', () => {
    const wrapper = mount(MembersTable, { props: { members }, global: { plugins: [createTestingPinia({ createSpy: () => () => {} })], stubs: ['UIcon','AppButton','StatusBadge'] } })
    expect(wrapper.findAll('tbody tr').length).toBe(1)
  })

  it('emits delete event', () => {
    const wrapper = mount(MembersTable, { props: { members }, global: { plugins: [createTestingPinia({ createSpy: () => () => {} })], stubs: ['UIcon','AppButton','StatusBadge'] } })
    wrapper.vm.$emit('delete', '1')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})
