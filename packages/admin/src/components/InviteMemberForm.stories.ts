import InviteMemberForm from '../../../../src/components/admin/InviteMemberForm.vue'
export default { title: 'Admin/InviteMemberForm', component: InviteMemberForm }
export const Light = () => ({ components:{InviteMemberForm}, template:'<InviteMemberForm />' })
Light.parameters = { backgrounds: { default: 'light' } }
export const Dark = () => ({ components:{InviteMemberForm}, template:'<div class="dark bg-gray-800 p-4"><InviteMemberForm /></div>' })
Dark.parameters = { backgrounds: { default: 'dark' } }
