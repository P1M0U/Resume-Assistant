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
