import StatusBadge from './StatusBadge.vue'
export default { title: 'Admin/StatusBadge', component: StatusBadge }
export const Online = () => ({ components:{StatusBadge}, template:'<StatusBadge status="Online" />' })
export const Offline = () => ({ components:{StatusBadge}, template:'<StatusBadge status="Offline" />' })
