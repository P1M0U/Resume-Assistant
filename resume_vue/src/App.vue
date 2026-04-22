<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const activeMenu = ref('home')

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
            <el-button @click="handleLogin">
              登录
            </el-button>
            <el-button type="primary" @click="handleRegister">
              注册
            </el-button>
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
            <el-menu-item index="resume-analyze" >
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
  background-color: #f5f7fa;
}

.el-container {
  height: 100%;
}

.header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  background-color: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
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
  background-color: #f5f7fa;
}

.aside-menu .el-menu-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
  border-right: 3px solid #409eff;
}

.main {
  padding: 24px;
  background-color: #f5f7fa;
  overflow-y: auto;
}

.el-button {
  border-radius: 8px;
}
</style>
