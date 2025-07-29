import MembersTable from './MembersTable.vue'
const members=[{id:'1',name:'Jane',email:'j@test.com',role:'member',invitedAt:new Date().toISOString(),isOnline:true}]
export default { title: 'Admin/MembersTable', component: MembersTable }
export const Default = () => ({ components:{MembersTable}, template:'<MembersTable :members="members" />', data(){return{members}}})
