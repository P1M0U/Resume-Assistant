<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1>设置</h1>
      <p>管理您的应用偏好设置</p>
    </div>

    <div class="settings-section">
      <h2 class="section-title">
        <el-icon><Setting /></el-icon>
        基础设置
      </h2>
      <el-card class="settings-card" shadow="hover">
        <div v-for="setting in settings" :key="setting.id" class="setting-item">
          <div class="setting-info">
            <h3>
              <el-icon><component :is="getIconComponent(setting.icon)" /></el-icon>
              {{ setting.label }}
            </h3>
            <p>{{ setting.description }}</p>
          </div>
          <div class="setting-control">
            <el-switch
              v-if="setting.type === 'switch'"
              v-model="setting.value"
              active-color="#00bcd4"
              @change="handleSettingChange(setting.id, $event)"
            />
            <el-select
              v-else-if="setting.type === 'select'"
              v-model="setting.value"
              placeholder="请选择"
              @change="handleSettingChange(setting.id, $event)"
            >
              <el-option
                v-for="option in setting.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
        </div>
      </el-card>
    </div>

    <div class="settings-section">
      <h2 class="section-title">
        <el-icon><Tools /></el-icon>
        数据管理
      </h2>
      <el-card class="settings-card" shadow="hover">
        <div class="action-section">
          <el-button class="action-button" type="warning" @click="handleClearCache">
            <el-icon><Delete /></el-icon>
            清除缓存
          </el-button>
          <el-button class="action-button" type="primary" @click="handleExportData">
            <el-icon><Download /></el-icon>
            导出数据
          </el-button>
          <el-button class="action-button" type="danger" @click="handleResetSettings">
            <el-icon><RefreshRight /></el-icon>
            重置设置
          </el-button>
        </div>
      </el-card>
    </div>

    <div class="settings-section">
      <h2 class="section-title">
        <el-icon><InfoFilled /></el-icon>
        关于
      </h2>
      <el-card class="settings-card" shadow="hover">
        <div class="about-section">
          <h3>AI简历助手</h3>
          <p>智能简历分析与优化平台</p>
          <p class="version">版本 1.0.0</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Setting,
  Tools,
  Delete,
  Download,
  RefreshRight,
  InfoFilled,
  Moon,
  Bell,
  Document,
  Position,
  Edit,
} from '@element-plus/icons-vue'
import { useSettings } from '@/composables/useSettings'

const { settings, handleSettingChange, handleClearCache, handleExportData, handleResetSettings } =
  useSettings()

import type { Component } from 'vue'

const iconMap: Record<string, Component> = {
  Moon,
  Bell,
  Document,
  Globe: Position,
  FontSize: Edit,
}

const getIconComponent = (iconName: string): Component => {
  return iconMap[iconName] ?? Setting
}
</script>

<style scoped>
@import '@/assets/css/Settings.css';
</style>
