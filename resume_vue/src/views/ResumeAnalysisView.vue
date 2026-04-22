<template>
  <div class="resume-analysis-view">
    <input
      ref="fileInputRef"
      type="file"
      accept=".pdf,.docx"
      style="display: none"
      @change="handleFileChange"
    />

    <div class="page-header">
      <h2>简历分析</h2>
      <p>上传简历文件，AI将为您提供专业的分析和优化建议</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="upload-card" shadow="hover">
          <div class="upload-area" @click="handleUploadClick" @dragover.prevent @drop.prevent="handleDrop">
            <el-icon :size="60" color="#409EFF"><Upload /></el-icon>
            <h3>点击或拖拽上传简历</h3>
            <p>支持 PDF、DOCX 格式，文件大小不超过 10MB</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-if="uploadedFile">
      <el-col :span="24">
        <el-card class="file-info-card" shadow="hover">
          <div class="file-info">
            <el-icon :size="40" color="#67C23A"><Document /></el-icon>
            <div class="file-details">
              <h4>{{ uploadedFile.name }}</h4>
              <p>{{ formatFileSize(uploadedFile.size) }}</p>
            </div>
            <el-button type="primary" @click="handleAnalyze" :loading="analyzing">
              {{ analyzing ? '分析中...' : '开始分析' }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="analysisResult" class="analysis-result">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="result-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon :size="24" color="#409EFF"><DataAnalysis /></el-icon>
                <h3>简历分析结果</h3>
              </div>
            </template>
            <div class="result-content">
              <div class="score-section">
                <div class="score-circle">
                  <el-progress type="circle" :percentage="analysisResult.score" :width="120" />
                </div>
                <div class="score-text">
                  <h4>综合评分</h4>
                  <p>{{ getScoreLevel(analysisResult.score) }}</p>
                </div>
              </div>

              <el-divider />

              <div class="detail-section">
                <h4>简历亮点</h4>
                <el-tag
                  v-for="(highlight, index) in analysisResult.highlights"
                  :key="index"
                  type="success"
                  class="tag-item"
                >
                  {{ highlight }}
                </el-tag>
              </div>

              <el-divider />

              <div class="detail-section">
                <h4>待改进项</h4>
                <el-tag
                  v-for="(issue, index) in analysisResult.issues"
                  :key="index"
                  type="warning"
                  class="tag-item"
                >
                  {{ issue }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="suggestions-row">
        <el-col :span="24">
          <el-card class="suggestions-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <el-icon :size="24" color="#67C23A"><MagicStick /></el-icon>
                <h3>优化建议</h3>
              </div>
            </template>
            <el-timeline>
              <el-timeline-item
                v-for="(suggestion, index) in analysisResult.suggestions"
                :key="index"
                :timestamp="suggestion.category"
                placement="top"
              >
                <el-card class="suggestion-item">
                  <h4>{{ suggestion.title }}</h4>
                  <p>{{ suggestion.content }}</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useResumeAnalysis } from '../assets/ts/ResumeAnalysisView'

const fileInputRef = ref<HTMLInputElement | null>(null)

const {
  uploadedFile,
  analyzing,
  analysisResult,
  handleUploadClick,
  handleFileChange,
  handleDrop,
  handleAnalyze,
  formatFileSize,
  getScoreLevel,
} = useResumeAnalysis(fileInputRef)
</script>

<style src="../assets/css/ResumeAnalysisView.css"></style>
