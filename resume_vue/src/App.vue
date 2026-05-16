<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { useUserStore } from './stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const activeMenu = ref('home')
const sidebarVisible = ref(false)
const isMobile = ref(false)
const showLogin = ref(false)
const showRegister = ref(false)

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
  showLogin.value = true
}

/**
 * 处理注册按钮点击
 */
const handleRegister = (): void => {
  showRegister.value = true
}

/**
 * 关闭登录弹窗
 */
const closeLogin = (): void => {
  showLogin.value = false
}

/**
 * 关闭注册弹窗
 */
const closeRegister = (): void => {
  showRegister.value = false
}

/**
 * 切换到注册页面
 */
const switchToRegister = (): void => {
  showLogin.value = false
  showRegister.value = true
}

/**
 * 切换到登录页面
 */
const switchToLogin = (): void => {
  showRegister.value = false
  showLogin.value = true
}

/**
 * 处理退出登录
 */
const handleLogout = async (): Promise<void> => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    userStore.logout()
    ElMessage.success('退出登录成功')
    router.push('/')
  } catch {
    // 用户取消操作
  }
}

/**
 * 跳转到个人信息页面
 */
const goToPersonal = (): void => {
  router.push('/personal')
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
            <template v-if="userStore.isLoggedIn && userStore.userInfo">
              <div class="user-info" @click="goToPersonal">
                <el-icon><UserFilled /></el-icon>
                <span class="username">{{ userStore.userInfo.name }}</span>
              </div>
              <el-button class="logout-btn" @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </el-button>
            </template>
            <template v-else>
              <el-button class="login-btn" @click="handleLogin">
                <el-icon><User /></el-icon>
                <span>登录</span>
              </el-button>
              <el-button class="register-btn" type="primary" @click="handleRegister">
                <el-icon><UserFilled /></el-icon>
                <span>注册</span>
              </el-button>
            </template>
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
            <el-menu-item v-if="userStore.userInfo?.is_admin" index="manage">
              <el-icon><Operation /></el-icon>
              <span>后台管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>

    <!-- 登录弹窗 -->
    <Login v-if="showLogin" @close="closeLogin" @switch-to-register="switchToRegister" />

    <!-- 注册弹窗 -->
    <Register v-if="showRegister" @close="closeRegister" @switch-to-login="switchToLogin" />
  </div>
</template>

<style scoped>
@import './assets/css/App.css';
</style>
