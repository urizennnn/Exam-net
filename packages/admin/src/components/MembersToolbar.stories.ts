import MembersToolbar from '../../../../src/components/admin/MembersToolbar.vue'
export default { title: 'Admin/MembersToolbar', component: MembersToolbar }
export const Light = () => ({ components:{MembersToolbar}, template:'<MembersToolbar />' })
Light.parameters = { backgrounds: { default: 'light' } }
export const Dark = () => ({ components:{MembersToolbar}, template:'<div class="dark bg-gray-800 p-4"><MembersToolbar /></div>' })
Dark.parameters = { backgrounds: { default: 'dark' } }
