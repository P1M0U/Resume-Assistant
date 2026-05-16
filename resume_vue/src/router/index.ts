import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/resume-analyze',
      name: 'resume-analyze',
      component: () => import('@/views/ResumeAnalysisView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/job-recommend',
      name: 'job-recommend',
      component: () => import('@/views/JobRecommendView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/ai-chat',
      name: 'ai-chat',
      component: () => import('@/views/AiChatView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/PersonalView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/views/ManageView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

/**
 * 路由守卫
 * 检查用户是否已登录，未登录用户无法访问需要认证的页面
 */
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'home' })
  } else if (to.meta.requiresAdmin && !userStore.userInfo?.is_admin) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
