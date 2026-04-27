<template>
  <div class="home-view">
    <div class="welcome-section">
      <el-card class="welcome-card" shadow="hover">
        <div class="welcome-content">
          <h2>欢迎使用AI简历助手</h2>
          <p>智能分析您的简历，提供专业的优化建议和岗位推荐</p>
        </div>
      </el-card>
    </div>

    <div class="feature-section">
      <el-row :gutter="20">
        <el-col :span="8" v-for="feature in features" :key="feature.id">
          <el-card class="feature-card" shadow="hover" @click="handleFeatureClick(feature.id)">
            <div class="feature-icon">
              <el-icon :size="48" :color="feature.color">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="quick-actions">
      <h3>快速开始</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="action-card" shadow="hover" @click="handleUpload">
            <div class="action-content">
              <el-icon :size="40" color="#409EFF"><Upload /></el-icon>
              <div class="action-text">
                <h4>上传简历</h4>
                <p>支持PDF、DOCX格式</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="action-card" shadow="hover" @click="handleInputJob">
            <div class="action-content">
              <el-icon :size="40" color="#67C23A"><Edit /></el-icon>
              <div class="action-text">
                <h4>输入期望岗位</h4>
                <p>获取定制化建议</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHomeView } from '../assets/ts/HomeView'

const { features, handleUpload, handleInputJob, handleFeatureClick } = useHomeView()
</script>

<style src="../assets/css/HomeView.css"></style>
