<template>
  <div class="login-overlay" @click.self="$emit('close')">
    <div class="login-container">
      <el-card class="login-card" shadow="hover">
        <div class="login-header">
          <div class="logo-icon">
            <el-icon><UserFilled /></el-icon>
          </div>
          <h2>欢迎回来</h2>
          <p>登录您的AI简历助手账号</p>
        </div>

        <el-form class="login-form" :model="loginForm" @submit.prevent="handleLogin">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <div class="form-options">
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            <span class="forgot-password" @click="handleForgotPassword">忘记密码？</span>
          </div>

          <el-button class="login-button" type="primary" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form>

        <div class="login-footer">
          <p>
            还没有账号？
            <span class="register-link" @click="$emit('switch-to-register')">立即注册</span>
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, User, Lock } from '@element-plus/icons-vue'
import { useLogin } from '../assets/ts/Login'

defineEmits(['close', 'switch-to-register'])

const { loginForm, loading, handleLogin, handleForgotPassword } = useLogin()
</script>

<style scoped>
@import '@/assets/css/Login.css';
</style>
