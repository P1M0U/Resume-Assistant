import { ref, type Ref, onMounted, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useResumeStore } from '../../stores/resume'
import { resumeApi, type ResumeAnalysisResult } from '../../services/resume_api'

/**
 * useResumeAnalysis返回类型接口定义
 */
interface UseResumeAnalysisReturn {
  uploadedFile: Ref<File | null>
  analyzing: Ref<boolean>
  analysisResult: Ref<ResumeAnalysisResult | null>
  dialogVisible: Ref<boolean>
  handleUploadClick: () => void
  handleFileChange: (event: Event) => void
  handleDrop: (event: DragEvent) => void
  handleAnalyze: () => void
  formatFileSize: (bytes: number) => string
  getScoreLevel: (score: number) => string
}

/**
 * 简历分析组合式函数
 * @param fileInputRef - 文件输入框引用
 * @returns 响应式数据和方法
 */
export function useResumeAnalysis(
  fileInputRef: Ref<HTMLInputElement | null>,
): UseResumeAnalysisReturn {
  const resumeStore = useResumeStore()
  const analyzing = ref(false)
  const analysisResult = ref<ResumeAnalysisResult | null>(null)
  const dialogVisible = ref(false)

  /**
   * 使用计算属性从store获取上传的文件
   */
  const uploadedFile = computed(() => resumeStore.uploadedFile)

  /**
   * 监听分析结果变化，自动显示对话框
   */
  watch(analysisResult, (newResult) => {
    if (newResult) {
      dialogVisible.value = true
    }
  })

  /**
   * 组件挂载时检查是否需要自动分析
   */
  onMounted(async () => {
    if (resumeStore.shouldAutoAnalyze && resumeStore.uploadedFile) {
      resumeStore.resetAutoAnalyze()
      await handleAnalyze()
    }
  })

  /**
   * 处理上传按钮点击
   */
  const handleUploadClick = (): void => {
    if (fileInputRef.value) {
      fileInputRef.value.click()
    }
  }

  /**
   * 处理文件选择变化
   * @param event - 文件选择事件
   */
  const handleFileChange = (event: Event): void => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (!file) {
      return
    }

    if (!validateFile(file)) {
      return
    }

    resumeStore.setUploadedFile(file)
    analysisResult.value = null
    ElMessage.success(`已选择文件：${file.name}`)

    if (target) {
      target.value = ''
    }
  }

  /**
   * 处理文件拖放
   * @param event - 拖放事件
   */
  const handleDrop = (event: DragEvent): void => {
    const file = event.dataTransfer?.files[0]

    if (!file) {
      return
    }

    if (!validateFile(file)) {
      return
    }

    resumeStore.setUploadedFile(file)
    analysisResult.value = null
    ElMessage.success(`已选择文件：${file.name}`)
  }

  /**
   * 验证文件格式和大小
   * @param file - 待验证的文件
   * @returns 验证是否通过
   */
  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (!allowedTypes.includes(file.type) && !['pdf', 'docx'].includes(fileExtension || '')) {
      ElMessage.error('仅支持PDF和DOCX格式的文件')
      return false
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      ElMessage.error('文件大小不能超过10MB')
      return false
    }

    return true
  }

  /**
   * 处理分析按钮点击
   */
  const handleAnalyze = async (): Promise<void> => {
    if (!uploadedFile.value) {
      ElMessage.warning('请先上传简历文件')
      return
    }

    analyzing.value = true

    try {
      // 调用真实API
      const result = await resumeApi.uploadAndAnalyze({
        file: uploadedFile.value,
        onProgress: (progress) => {
          console.log(`上传进度: ${progress}%`)
        },
      })

      analysisResult.value = result
      ElMessage.success('简历分析完成')
    } catch (error) {
      console.error('分析失败:', error)
      ElMessage.error('简历分析失败，请重试')
    } finally {
      analyzing.value = false
    }
  }

  /**
   * 根据分数获取等级描述
   * @param score - 简历评分
   * @returns 等级描述字符串
   */
  const getScoreLevel = (score: number): string => {
    if (score >= 90) return '优秀'
    if (score >= 80) return '良好'
    if (score >= 70) return '中等'
    if (score >= 60) return '及格'
    return '需改进'
  }

  /**
   * 格式化文件大小
   * @param bytes - 文件字节数
   * @returns 格式化后的文件大小字符串
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  return {
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
  }
}
