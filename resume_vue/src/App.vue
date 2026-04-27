<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('home')

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
 * 处理菜单选择事件
 */
const handleMenuSelect = (index: string): void => {
  activeMenu.value = index
  router.push({ name: index })
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
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-content">
          <div class="logo">
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
        <el-aside width="240px" class="aside">
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
            <el-menu-item index="history">
              <el-icon><Clock /></el-icon>
              <span>历史记录</span>
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

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.common-layout {
  height: 100vh;
  background: linear-gradient(135deg, #e8f4f8 0%, #f0f4f8 50%, #e3f2fd 100%);
}

.el-container {
  height: 100%;
}

.header {
  background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
  color: white;
  padding: 0 20px;
  box-shadow: 0 4px 20px rgba(0, 102, 255, 0.25);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.aside {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 2px 0 20px rgba(0, 102, 255, 0.08);
  border-right: 1px solid rgba(0, 212, 255, 0.1);
}

.aside-menu {
  border: none;
  height: 100%;
}

.aside-menu .el-menu-item {
  height: 56px;
  line-height: 56px;
  font-size: 15px;
}

.aside-menu .el-menu-item:hover {
  background: linear-gradient(90deg, #e3f2fd 0%, #f0f8ff 100%);
  color: #0066ff;
}

.aside-menu .el-menu-item.is-active {
  background: linear-gradient(90deg, #e3f2fd 0%, #cce5ff 100%);
  color: #0066ff;
  border-right: 3px solid #00d4ff;
  box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.1);
}

.main {
  padding: 24px;
  background: linear-gradient(135deg, #e8f4f8 0%, #f0f4f8 50%, #e3f2fd 100%);
  overflow-y: auto;
}

.el-button {
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
}

.el-button--primary {
  background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%);
  border: none;
}

.el-button--primary:hover {
  background: linear-gradient(135deg, #0052cc 0%, #00b8e6 100%);
}
</style>
