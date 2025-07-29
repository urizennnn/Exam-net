import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MembersTable from './MembersTable.vue'
vi.mock('@root/utils/toast', () => ({ successToast: vi.fn() }))

const members = [
  { id:'1', name:'Jane', email:'jane@test.com', role:'member', invitedAt:new Date().toISOString(), isOnline:true },
  { id:'2', name:'Bob', email:'bob@test.com', role:'admin', invitedAt:new Date().toISOString(), isOnline:false }
]

describe('MembersTable', () => {
  it('sorts by name', async () => {
    const wrapper = mount(MembersTable, { props: { members }, global: { stubs: ['UInput','USelect','AppButton','UIcon','AppModal','ConfirmDialog'] } })
    await wrapper.find('th').trigger('click')
    const firstRow = wrapper.find('tbody tr:first-child td').text()
    expect(firstRow).toBe('Bob')
  })
})
