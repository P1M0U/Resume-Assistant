<template>
  <div class="personal-container">
    <div class="personal-header">
      <h1>个人信息</h1>
      <p>查看和管理您的个人信息</p>
    </div>

    <div class="personal-section">
      <el-card class="personal-card" shadow="hover">
        <div class="card-header">
          <h2>
            <el-icon><User /></el-icon>
            基本信息
          </h2>
          <el-button v-if="!editing" class="edit-btn" type="primary" @click="startEdit">
            <el-icon><Edit /></el-icon>
            编辑信息
          </el-button>
        </div>

        <el-form :model="userForm" label-width="100px" class="user-form">
          <el-form-item label="用户名">
            <el-input v-if="editing" v-model="userForm.name" placeholder="请输入用户名" clearable />
            <div v-else class="form-value">
              <el-icon><User /></el-icon>
              <span>{{ userStore.userInfo?.name }}</span>
            </div>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-if="editing" v-model="userForm.email" placeholder="请输入邮箱" clearable />
            <div v-else class="form-value">
              <el-icon><Message /></el-icon>
              <span>{{ userStore.userInfo?.email }}</span>
            </div>
          </el-form-item>

          <el-form-item v-if="editing" label="新密码">
            <el-input
              v-model="userForm.password"
              type="password"
              placeholder="不修改请留空"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item v-if="editing && userForm.password" label="确认密码">
            <el-input
              v-model="userForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              show-password
              clearable
            />
          </el-form-item>

          <el-form-item label="注册时间">
            <div class="form-value">
              <el-icon><Clock /></el-icon>
              <span>{{ formatDate(userStore.userInfo?.create_time) }}</span>
            </div>
          </el-form-item>

          <el-form-item v-if="editing" class="action-buttons">
            <el-button type="primary" :loading="loading" @click="handleUpdateUser">
              <el-icon><Check /></el-icon>
              保存修改
            </el-button>
            <el-button @click="handleCancelEdit">
              <el-icon><Close /></el-icon>
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="personal-section">
      <h2 class="section-title">
        <el-icon><Lock /></el-icon>
        安全设置
      </h2>
      <el-card class="personal-card" shadow="hover">
        <div class="security-item">
          <div class="security-info">
            <h3>
              <el-icon><Key /></el-icon>
              修改密码
            </h3>
            <p>定期修改密码可以提高账号安全性</p>
          </div>
          <el-button class="security-btn" @click="startEdit"> 立即修改 </el-button>
        </div>
      </el-card>
    </div>

    <div class="personal-section">
      <h2 class="section-title">
        <el-icon><InfoFilled /></el-icon>
        账号状态
      </h2>
      <el-card class="personal-card" shadow="hover">
        <div class="status-item">
          <div class="status-info">
            <h3>
              <el-icon><Avatar /></el-icon>
              账号类型
            </h3>
            <el-tag :type="userStore.userInfo?.is_admin ? 'danger' : 'primary'">
              {{ userStore.userInfo?.is_admin ? '管理员' : '普通用户' }}
            </el-tag>
          </div>
        </div>
        <div class="status-item">
          <div class="status-info">
            <h3>
              <el-icon><CircleCheck /></el-icon>
              账号状态
            </h3>
            <el-tag type="success">正常</el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  User,
  Edit,
  Message,
  Clock,
  Check,
  Close,
  Lock,
  Key,
  InfoFilled,
  Avatar,
  CircleCheck,
} from '@element-plus/icons-vue'
import { usePersonal } from '@/composables/usePersonal'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { userForm, loading, editing, handleUpdateUser, handleCancelEdit, startEdit } = usePersonal()

/**
 * 格式化日期
 */
const formatDate = (date: string | null | undefined): string => {
  if (!date) return '未知'
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
@import '@/assets/css/Personal.css';
</style>
