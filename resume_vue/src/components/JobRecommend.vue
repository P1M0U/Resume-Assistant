<template>
  <div class="job-recommend-view">
    <div class="page-header">
      <h2>岗位推荐</h2>
      <p>基于您的简历分析结果，AI将为您推荐最适合的岗位</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="input-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon :size="24" color="#409EFF"><Aim /></el-icon>
              <h3>期望岗位</h3>
            </div>
          </template>

          <div class="input-section">
            <el-input
              v-model="targetJob"
              placeholder="请输入期望岗位（可选，留空则由 AI 自动推荐）"
              class="job-input"
              size="large"
              clearable
              @keyup.enter="handleJobRecommend"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>

            <el-button
              type="primary"
              class="recommend-button"
              :loading="analyzing"
              :disabled="!hasResumeData"
              @click="handleJobRecommend"
            >
              <el-icon v-if="!analyzing"><MagicStick /></el-icon>
              {{ analyzing ? '分析中...' : '开始推荐' }}
            </el-button>

            <el-alert
              v-if="!hasResumeData"
              title="请先在简历分析页面上传并分析简历"
              type="warning"
              :closable="false"
              show-icon
              style="margin-top: 15px"
            />

            <el-alert
              v-if="hasResumeData"
              title="可输入期望岗位进行精准推荐，或留空让 AI 根据简历自动推荐"
              type="info"
              :closable="false"
              show-icon
              style="margin-top: 15px"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" v-if="hasResumeData">
      <el-col :span="24">
        <el-card class="result-card" shadow="hover" @click="showResumeDetail">
          <template #header>
            <div class="card-header">
              <el-icon :size="24" color="#67C23A"><Document /></el-icon>
              <h3>简历分析摘要</h3>
              <el-tag type="info" size="small" style="margin-left: auto">点击查看详情</el-tag>
            </div>
          </template>

          <div class="resume-summary">
            <div class="summary-header">
              <h4>基本信息</h4>
              <el-tag :type="getScoreTagType(resumeResult!.score)" effect="dark">
                {{ resumeResult!.score }} 分
              </el-tag>
            </div>

            <div class="summary-content">
              <div class="summary-item">
                <label>姓名</label>
                <span>{{ resumeResult!.personal_info?.name || '未识别' }}</span>
              </div>
              <div class="summary-item">
                <label>电话</label>
                <span>{{ resumeResult!.personal_info?.phone || '未识别' }}</span>
              </div>
              <div class="summary-item">
                <label>邮箱</label>
                <span>{{ resumeResult!.personal_info?.email || '未识别' }}</span>
              </div>
              <div class="summary-item">
                <label>亮点数</label>
                <span>{{ resumeResult!.highlights.length }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      v-model="detailDialogVisible"
      title="简历分析详情"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <div v-if="resumeResult" class="detail-dialog-content">
        <el-card class="detail-card" shadow="never">
          <template #header>
            <div class="dialog-header">
              <el-icon :size="24" color="#409EFF"><ChatDotRound /></el-icon>
              <span>简历分析报告</span>
            </div>
          </template>

          <el-descriptions :column="descriptionColumn" border>
            <el-descriptions-item label="综合评分">
              <el-tag :type="getScoreTagType(resumeResult.score)" size="large">
                {{ resumeResult.score }} 分
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="姓名">
              {{ resumeResult.personal_info?.name || '未识别' }}
            </el-descriptions-item>
            <el-descriptions-item label="电话">
              {{ resumeResult.personal_info?.phone || '未识别' }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ resumeResult.personal_info?.email || '未识别' }}
            </el-descriptions-item>
            <el-descriptions-item label="地址">
              {{ resumeResult.personal_info?.location || '未识别' }}
            </el-descriptions-item>
          </el-descriptions>

          <el-divider content-position="left">简历亮点</el-divider>
          <div class="detail-tags">
            <el-tag
              v-for="(highlight, index) in resumeResult.highlights"
              :key="index"
              type="success"
              effect="dark"
              class="detail-tag"
            >
              {{ highlight }}
            </el-tag>
          </div>

          <el-divider content-position="left">待改进项</el-divider>
          <div class="detail-tags">
            <el-tag
              v-for="(issue, index) in resumeResult.issues"
              :key="index"
              type="warning"
              effect="dark"
              class="detail-tag"
            >
              {{ issue }}
            </el-tag>
          </div>

          <el-divider content-position="left">优化建议</el-divider>
          <el-timeline>
            <el-timeline-item
              v-for="(suggestion, index) in resumeResult.suggestions"
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
          <el-button @click="detailDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogVisible"
      title="岗位推荐报告"
      :width="dialogWidth"
      :close-on-click-modal="false"
    >
      <div v-if="jobMatchResult" class="dialog-content">
        <el-card class="dialog-card" shadow="never">
          <template #header>
            <div class="dialog-header">
              <el-icon :size="24" color="#409EFF"><TrendCharts /></el-icon>
              <span>岗位匹配分析</span>
            </div>
          </template>

          <div class="match-result">
            <div class="match-score-section">
              <div class="score-display">
                <div class="score-number">
                  <span class="number">{{ jobMatchResult.match_score }}</span>
                  <span class="unit">%</span>
                </div>
                <div class="score-info">
                  <h4>{{ jobMatchResult.target_job }}</h4>
                  <el-tag :type="getMatchTagType(jobMatchResult.match_score)" size="large">
                    {{ getMatchScoreLevel(jobMatchResult.match_score) }}
                  </el-tag>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="skills-section">
              <h4>匹配技能</h4>
              <div class="skill-tags">
                <el-tag
                  v-for="(skill, index) in (jobMatchResult.matched_skills || [])"
                  :key="index"
                  type="success"
                  class="skill-tag"
                >
                  {{ skill }}
                </el-tag>
              </div>
            </div>

            <div class="skills-section">
              <h4>缺失技能</h4>
              <div class="skill-tags">
                <el-tag
                  v-for="(skill, index) in (jobMatchResult.missing_skills || [])"
                  :key="index"
                  type="danger"
                  class="skill-tag"
                >
                  {{ skill }}
                </el-tag>
              </div>
            </div>

            <el-divider />

            <div class="recommendations-section">
              <h4>推荐岗位</h4>
              <div class="recommendation-list">
                <div
                  v-for="(rec, index) in (jobMatchResult.recommendations || [])"
                  :key="index"
                  class="recommendation-item"
                >
                  <div class="recommendation-header">
                    <h5>{{ rec.job_title }}</h5>
                    <el-tag :type="getMatchTagType(rec.match_score)">
                      匹配度: {{ rec.match_score }}%
                    </el-tag>
                  </div>
                  <p class="recommendation-reason">{{ rec.reason }}</p>
                  <div class="requirements-tags">
                    <el-tag
                      v-for="(req, idx) in (rec.key_requirements || [])"
                      :key="idx"
                      size="small"
                      type="info"
                    >
                      {{ req }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="optimization-section">
              <h4>优化建议</h4>
              <el-timeline>
                <el-timeline-item
                  v-for="(suggestion, index) in (jobMatchResult.optimization_suggestions || [])"
                  :key="index"
                  :timestamp="suggestion.category"
                  placement="top"
                  color="#67C23A"
                >
                  <div class="suggestion-item">
                    <h5>{{ suggestion.title }}</h5>
                    <p>{{ suggestion.content }}</p>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-card>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="exportRecommendation">
            <el-icon><Download /></el-icon>
            导出报告
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-row :gutter="20" v-if="jobMatchResult">
      <el-col :span="24">
        <el-card class="job-result-card" shadow="hover" @click="dialogVisible = true">
          <template #header>
            <div class="card-header">
              <el-icon :size="24" color="#E6A23C"><TrendCharts /></el-icon>
              <h3>岗位推荐结果</h3>
              <el-tag type="info" size="small" style="margin-left: auto">点击查看详情</el-tag>
            </div>
          </template>

          <div class="job-result-summary">
            <div class="result-header">
              <div class="score-display">
                <div class="score-number">
                  <span class="number">{{ jobMatchResult.match_score }}</span>
                  <span class="unit">%</span>
                </div>
                <div class="score-info">
                  <h4>{{ jobMatchResult.target_job }}</h4>
                  <el-tag :type="getMatchTagType(jobMatchResult.match_score)">
                    {{ getMatchScoreLevel(jobMatchResult.match_score) }}
                  </el-tag>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="result-skills">
              <div class="skill-section">
                <h5>匹配技能 ({{ (jobMatchResult.matched_skills || []).length }})</h5>
                <div class="skill-tags-mini">
                  <el-tag
                    v-for="(skill, index) in (jobMatchResult.matched_skills || []).slice(0, 5)"
                    :key="index"
                    type="success"
                    size="small"
                  >
                    {{ skill }}
                  </el-tag>
                  <el-tag v-if="(jobMatchResult.matched_skills || []).length > 5" size="small" type="info">
                    +{{ (jobMatchResult.matched_skills || []).length - 5 }}
                  </el-tag>
                </div>
              </div>

              <div class="skill-section">
                <h5>缺失技能 ({{ (jobMatchResult.missing_skills || []).length }})</h5>
                <div class="skill-tags-mini">
                  <el-tag
                    v-for="(skill, index) in (jobMatchResult.missing_skills || []).slice(0, 5)"
                    :key="index"
                    type="danger"
                    size="small"
                  >
                    {{ skill }}
                  </el-tag>
                  <el-tag v-if="(jobMatchResult.missing_skills || []).length > 5" size="small" type="info">
                    +{{ (jobMatchResult.missing_skills || []).length - 5 }}
                  </el-tag>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="result-recommendations">
              <h5>推荐岗位 ({{ (jobMatchResult.recommendations || []).length }})</h5>
              <div class="recommendation-tags">
                <el-tag
                  v-for="(rec, index) in (jobMatchResult.recommendations || [])"
                  :key="index"
                  :type="getMatchTagType(rec.match_score)"
                  size="small"
                >
                  {{ rec.job_title }} ({{ rec.match_score }}%)
                </el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty
      v-if="!hasResumeData && !jobMatchResult"
      description="暂无简历数据，请先上传并分析简历"
      :image-size="200"
    >
      <el-button type="primary" @click="$router.push('/resume-analyze')"> 前往简历分析 </el-button>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useJobRecommend } from '../assets/ts/JobRecommend'

const windowWidth = ref(window.innerWidth)

const {
  targetJob,
  analyzing,
  resumeResult,
  jobMatchResult,
  dialogVisible,
  hasResumeData,
  detailDialogVisible,
  handleJobRecommend,
  getMatchScoreLevel,
  exportRecommendation,
  showResumeDetail,
} = useJobRecommend()

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
 * 根据匹配度获取标签类型
 */
const getMatchTagType = (score: number): string => {
  if (score >= 90) return 'success'
  if (score >= 80) return 'primary'
  if (score >= 70) return 'warning'
  return 'danger'
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

<style src="../assets/css/JobRecommend.css"></style>
