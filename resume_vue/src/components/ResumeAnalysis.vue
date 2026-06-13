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
          <div
            class="upload-area"
            @click="handleUploadClick"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
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
                <div class="score-display">
                  <div class="score-number">
                    <span class="number">{{ analysisResult.score }}</span>
                    <span class="unit">分</span>
                  </div>
                  <div class="score-level">
                    <el-tag :type="getScoreTagType(analysisResult.score)" size="large">
                      {{ getScoreLevel(analysisResult.score) }}
                    </el-tag>
                  </div>
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

    <!-- AI分析结果对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="AI简历分析报告"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <div v-if="analysisResult" class="ai-dialog-content">
        <el-card class="dialog-card" shadow="never">
          <template #header>
            <div class="dialog-header">
              <el-icon :size="24" color="#409EFF"><ChatDotRound /></el-icon>
              <span>AI智能分析</span>
            </div>
          </template>

          <el-descriptions :column="descriptionColumn" border>
            <el-descriptions-item label="综合评分">
              <el-tag :type="getScoreTagType(analysisResult.score)" size="large">
                {{ analysisResult.score }} 分 - {{ getScoreLevel(analysisResult.score) }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="姓名">
              {{ analysisResult.personal_info?.name || '未识别' }}
            </el-descriptions-item>
            <el-descriptions-item label="电话">
              {{ analysisResult.personal_info?.phone || '未识别' }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ analysisResult.personal_info?.email || '未识别' }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">简历亮点</el-divider>
          <div class="highlight-tags">
            <el-tag
              v-for="(highlight, index) in analysisResult.highlights"
              :key="index"
              type="success"
              effect="dark"
              class="result-tag"
            >
              {{ highlight }}
            </el-tag>
          </div>

          <el-divider content-position="left">待改进项</el-divider>
          <div class="issue-tags">
            <el-tag
              v-for="(issue, index) in analysisResult.issues"
              :key="index"
              type="warning"
              effect="dark"
              class="result-tag"
            >
              {{ issue }}
            </el-tag>
          </div>

          <el-divider content-position="left">优化建议</el-divider>
          <el-timeline>
            <el-timeline-item
              v-for="(suggestion, index) in analysisResult.suggestions"
              :key="index"
              :timestamp="suggestion.category"
              placement="top"
              color="#67C23A"
            >
              <el-card class="suggestion-card">
                <h4>{{ suggestion.title }}</h4>
                <p>{{ suggestion.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="exportReport">导出报告</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useResumeAnalysis } from '@/composables/useResumeAnalysis'

const fileInputRef = ref<HTMLInputElement | null>(null)
const windowWidth = ref(window.innerWidth)

const {
  uploadedFile,
  analyzing,
  analysisResult,
  dialogVisible,
  handleUploadClick,
  handleFileChange,
  handleDrop,
  handleAnalyze,
  formatFileSize,
  getScoreLevel,
} = useResumeAnalysis(fileInputRef)

/**
 * 计算对话框宽度
 */
const dialogWidth = computed(() => {
  return windowWidth.value <= 768 ? '95%' : '80%'
})

/**
 * 计算描述列数
 */
const descriptionColumn = computed(() => {
  return windowWidth.value <= 768 ? 1 : 2
})

/**
 * 根据分数获取标签类型
 */
const getScoreTagType = (score: number): string => {
  if (score >= 90) return 'success'
  if (score >= 80) return 'primary'
  if (score >= 70) return 'warning'
  return 'danger'
}

/**
 * 导出报告
 */
const exportReport = () => {
  if (!analysisResult.value) return

  const report = {
    score: analysisResult.value.score,
    personal_info: analysisResult.value.personal_info,
    highlights: analysisResult.value.highlights,
    issues: analysisResult.value.issues,
    suggestions: analysisResult.value.suggestions,
    export_time: new Date().toLocaleString(),
  }

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `简历分析报告_${new Date().getTime()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * 监听窗口大小变化
 */
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style src="../assets/css/ResumeAnalysis.css"></style>
