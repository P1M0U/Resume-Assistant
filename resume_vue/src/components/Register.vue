<template>
  <div class="register-overlay" @click.self="$emit('close')">
    <div class="register-container">
      <el-card class="register-card" shadow="hover">
        <div class="register-header">
          <div class="logo-icon">
            <el-icon><UserFilled /></el-icon>
          </div>
          <h2>创建账号</h2>
          <p>注册AI简历助手，开启智能求职之旅</p>
        </div>

        <el-form class="register-form" :model="registerForm" @submit.prevent="handleRegister">
          <el-form-item>
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱"
              size="large"
              :prefix-icon="Message"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码（至少6位）"
              size="large"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请确认密码"
              size="large"
              :prefix-icon="Lock"
              show-password
              @keyup.enter="handleRegister"
            />
          </el-form-item>

          <el-form-item class="terms-checkbox">
            <el-checkbox v-model="registerForm.agreeTerms">
              我已阅读并同意
              <span class="terms-link" @click.stop>用户协议</span>
              和
              <span class="terms-link" @click.stop>隐私政策</span>
            </el-checkbox>
          </el-form-item>

          <el-button
            class="register-button"
            type="primary"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form>

        <div class="register-footer">
          <p>
            已有账号？
            <span class="login-link" @click="$emit('switch-to-login')">立即登录</span>
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, User, Lock, Message } from '@element-plus/icons-vue'
import { useRegister } from '../assets/ts/Register'

const emit = defineEmits(['close', 'switch-to-login'])

const { registerForm, loading, handleRegister } = useRegister(emit)
</script>

<style scoped>
@import '@/assets/css/Register.css';
</style>
