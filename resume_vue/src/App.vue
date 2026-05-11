<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('home')
const sidebarVisible = ref(false)
const isMobile = ref(false)

watch(
  () => route.name,
  (newName) => {
    if (newName && typeof newName === 'string') {
      activeMenu.value = newName
    }
  },
  { immediate: true },
)

/**
 * 计算侧边栏宽度
 */
const sidebarWidth = computed(() => {
  if (isMobile.value) {
    return sidebarVisible.value ? '200px' : '0px'
  }
  return '240px'
})

/**
 * 检测是否为移动端
 */
const checkMobile = (): void => {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    sidebarVisible.value = false
  }
}

/**
 * 切换侧边栏显示状态
 */
const toggleSidebar = (): void => {
  sidebarVisible.value = !sidebarVisible.value
}

/**
 * 处理菜单选择事件
 */
const handleMenuSelect = (index: string): void => {
  activeMenu.value = index
  router.push({ name: index })
  // 移动端选择菜单后自动关闭侧边栏
  if (isMobile.value) {
    sidebarVisible.value = false
  }
}

/**
 * 处理登录按钮点击
 */
const handleLogin = (): void => {
  ElMessage.info('即将进入登录页面')
}

/**
 * 处理注册按钮点击
 */
const handleRegister = (): void => {
  ElMessage.info('即将进入注册页面')
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <div class="logo">
            <!-- 移动端菜单按钮 -->
            <el-button v-if="isMobile" class="mobile-menu-btn" @click="toggleSidebar" circle>
              <el-icon :size="20">
                <component :is="sidebarVisible ? 'Close' : 'Menu'" />
              </el-icon>
            </el-button>
            <el-icon :size="32"><Document /></el-icon>
            <h1>AI简历助手</h1>
          </div>
          <div class="header-actions">
            <el-button @click="handleLogin"> 登录 </el-button>
            <el-button type="primary" @click="handleRegister"> 注册 </el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <!-- 移动端遮罩层 -->
        <div v-if="isMobile && sidebarVisible" class="sidebar-overlay" @click="toggleSidebar"></div>
        <el-aside
          :width="sidebarWidth"
          class="aside"
          :class="{ 'mobile-hidden': isMobile && !sidebarVisible }"
        >
          <el-menu :default-active="activeMenu" class="aside-menu" @select="handleMenuSelect">
            <el-menu-item index="home">
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="resume-analyze">
              <el-icon><Document /></el-icon>
              <span>简历分析</span>
            </el-menu-item>
            <el-menu-item index="job-recommend">
              <el-icon><Briefcase /></el-icon>
              <span>岗位推荐</span>
            </el-menu-item>
            <el-menu-item index="ai-chat">
              <el-icon><ChatDotRound /></el-icon>
              <span>AI对话</span>
            </el-menu-item>
            <el-menu-item index="settings">
              <el-icon><Setting /></el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
@import './assets/css/App.css';
</style>
