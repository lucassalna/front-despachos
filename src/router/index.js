import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Laboratorio from '../views/LaboratorioDespachosList.vue'
import Proveedores from '../views/ProveedoresDespachosList.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/laboratorio',
    component: Laboratorio,
    meta: { requiresAuth: true }
  },
  {
    path: '/proveedores',
    component: Proveedores,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
