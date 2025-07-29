import MembersTable from '../../../../src/components/admin/MembersTable.vue'
const members=[{id:'1',name:'Jane',email:'j@test.com',role:'member',invitedAt:new Date().toISOString(),status:'active'}]
export default { title: 'Admin/MembersTable', component: MembersTable }
export const Light = () => ({ components:{MembersTable}, template:'<MembersTable :members="members" />', data(){return{members}} })
Light.parameters = { backgrounds: { default: 'light' } }
export const Dark = () => ({ components:{MembersTable}, template:'<div class="dark bg-gray-800 p-4"><MembersTable :members="members" /></div>', data(){return{members}} })
Dark.parameters = { backgrounds: { default: 'dark' } }
