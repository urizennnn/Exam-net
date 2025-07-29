import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InviteMemberForm from './InviteMemberForm.vue'
vi.mock('@root/utils/toast', () => ({ successToast: vi.fn() }))

describe('InviteMemberForm', () => {
  it('emits invited with valid form', async () => {
    const wrapper = mount(InviteMemberForm, { global: { stubs: ['UInput','USelect','AppButton'] } })
    await wrapper.find('input[placeholder="Name"]').setValue('Jane')
    await wrapper.find('input[placeholder="Email"]').setValue('jane@example.com')
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.emitted('invited')).toBeTruthy()
  })

  it('shows validation error', async () => {
    const wrapper = mount(InviteMemberForm, { global: { stubs: ['UInput','USelect','AppButton'] } })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.html()).toContain('Name is required')
  })
})
