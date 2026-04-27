import { ref, type Ref, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useResumeStore } from '../../stores/resume'
import {
  resumeApi,
  type ResumeAnalysisResult,
  type JobMatchResult,
} from '../../services/resume_api'

/**
 * useJobRecommend返回类型接口定义
 */
interface UseJobRecommendReturn {
  targetJob: Ref<string>
  analyzing: Ref<boolean>
  resumeResult: Ref<ResumeAnalysisResult | null>
  jobMatchResult: Ref<JobMatchResult | null>
  dialogVisible: Ref<boolean>
  hasResumeData: Ref<boolean>
  detailDialogVisible: Ref<boolean>
  handleJobRecommend: () => Promise<void>
  getMatchScoreColor: (score: number) => string
  getMatchScoreLevel: (score: number) => string
  exportRecommendation: () => void
  showResumeDetail: () => void
}

/**
 * 岗位推荐组合式函数
 * @returns 响应式数据和方法
 */
export function useJobRecommend(): UseJobRecommendReturn {
  const resumeStore = useResumeStore()
  const targetJob = ref('')
  const analyzing = ref(false)
  const resumeResult = ref<ResumeAnalysisResult | null>(null)
  const jobMatchResult = ref<JobMatchResult | null>(null)
  const dialogVisible = ref(false)
  const detailDialogVisible = ref(false)

  /**
   * 检查是否有简历数据
   */
  const hasResumeData = computed(() => {
    return resumeResult.value !== null && resumeResult.value.score > 0
  })

  /**
   * 组件挂载时从store加载简历分析结果
   */
  onMounted(() => {
    const result = resumeStore.getAnalysisResult()
    if (result) {
      resumeResult.value = result
    }
  })

  /**
   * 监听store中的分析结果变化，实现实时更新
   */
  watch(
    () => resumeStore.analysisResult,
    (newResult) => {
      if (newResult && newResult !== resumeResult.value) {
        resumeResult.value = newResult
        ElMessage.success('检测到新的简历分析结果，已自动更新')
      }
    },
    { deep: true },
  )

  /**
   * 从简历分析结果中提取简历文本
   */
  const extractResumeText = (): string => {
    if (!resumeResult.value) return ''

    const parts: string[] = []

    if (resumeResult.value.personal_info) {
      const info = resumeResult.value.personal_info
      parts.push(`姓名: ${info.name || '未知'}`)
      parts.push(`电话: ${info.phone || '未知'}`)
      parts.push(`邮箱: ${info.email || '未知'}`)
      parts.push(`地址: ${info.location || '未知'}`)
    }

    if (resumeResult.value.highlights.length > 0) {
      parts.push('\n简历亮点:')
      resumeResult.value.highlights.forEach((h) => parts.push(`- ${h}`))
    }

    if (resumeResult.value.issues.length > 0) {
      parts.push('\n待改进项:')
      resumeResult.value.issues.forEach((i) => parts.push(`- ${i}`))
    }

    return parts.join('\n')
  }

  /**
   * 处理岗位推荐
   */
  const handleJobRecommend = async (): Promise<void> => {
    if (!hasResumeData.value) {
      ElMessage.warning('请先上传并分析简历')
      return
    }

    analyzing.value = true

    try {
      const resumeText = extractResumeText()
      const targetJobValue = targetJob.value.trim() || '根据简历自动推荐'

      const result = await resumeApi.getJobRecommendation({
        target_job: targetJobValue,
        resume_text: resumeText,
      })

      jobMatchResult.value = result
      dialogVisible.value = true

      if (!targetJob.value.trim()) {
        ElMessage.success('AI 已根据您的简历自动推荐岗位')
      } else {
        ElMessage.success('岗位推荐分析完成')
      }
    } catch (error) {
      console.error('岗位推荐失败:', error)
      ElMessage.error('岗位推荐失败，请重试')
    } finally {
      analyzing.value = false
    }
  }

  /**
   * 根据匹配分数获取颜色
   */
  const getMatchScoreColor = (score: number): string => {
    if (score >= 90) return '#67C23A'
    if (score >= 80) return '#409EFF'
    if (score >= 70) return '#E6A23C'
    return '#F56C6C'
  }

  /**
   * 根据匹配分数获取等级描述
   */
  const getMatchScoreLevel = (score: number): string => {
    if (score >= 90) return '高度匹配'
    if (score >= 80) return '较好匹配'
    if (score >= 70) return '一般匹配'
    return '匹配度较低'
  }

  /**
   * 导出推荐报告
   */
  const exportRecommendation = () => {
    if (!jobMatchResult.value) return

    const report = {
      target_job: jobMatchResult.value.target_job,
      match_score: jobMatchResult.value.match_score,
      matched_skills: jobMatchResult.value.matched_skills,
      missing_skills: jobMatchResult.value.missing_skills,
      recommendations: jobMatchResult.value.recommendations,
      optimization_suggestions: jobMatchResult.value.optimization_suggestions,
      export_time: new Date().toLocaleString(),
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `岗位推荐报告_${targetJob.value}_${new Date().getTime()}.json`
    a.click()
    URL.revokeObjectURL(url)
    ElMessage.success('报告导出成功')
  }

  /**
   * 显示简历分析详情
   */
  const showResumeDetail = (): void => {
    detailDialogVisible.value = true
  }

  return {
    targetJob,
    analyzing,
    resumeResult,
    jobMatchResult,
    dialogVisible,
    hasResumeData,
    detailDialogVisible,
    handleJobRecommend,
    getMatchScoreColor,
    getMatchScoreLevel,
    exportRecommendation,
    showResumeDetail,
  }
}
