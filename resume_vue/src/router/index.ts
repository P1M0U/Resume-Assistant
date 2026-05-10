import { createRouter, createWebHistory } from 'vue-router'

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
    },
    {
      path: '/job-recommend',
      name: 'job-recommend',
      component: () => import('@/views/JobRecommendView.vue'),
    },
    {
      path: '/ai-chat',
      name: 'ai-chat',
      component: () => import('@/views/AiChatView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
  ],
})

export default router
