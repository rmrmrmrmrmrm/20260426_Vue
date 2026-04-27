import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DiagnosticBody from '../views/DiagnosticBody.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/body', component: DiagnosticBody },
    { path: '/shoes', component: () => import('../views/DiagnosticShoes.vue') }, // 非同期読み込み
    { path: '/fortune', component: () => import('../views/DiagnosticFortune.vue') }
  ]
})

export default router