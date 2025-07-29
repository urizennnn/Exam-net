import ConfirmDialog from './ConfirmDialog.vue'
export default { title: 'Admin/ConfirmDialog', component: ConfirmDialog }
export const Default = () => ({ components:{ConfirmDialog}, template:'<ConfirmDialog v-model="open" />', data(){return{open:true}}})
