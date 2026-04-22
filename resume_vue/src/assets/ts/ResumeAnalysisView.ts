import { ref, type Ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useResumeStore } from '../../stores/resume'

/**
 * 简历分析结果接口定义
 */
interface AnalysisResult {
  score: number
  highlights: string[]
  issues: string[]
  suggestions: Suggestion[]
}

/**
 * 优化建议接口定义
 */
interface Suggestion {
  category: string
  title: string
  content: string
}

/**
 * useResumeAnalysis返回类型接口定义
 */
interface UseResumeAnalysisReturn {
  uploadedFile: Ref<File | null>
  analyzing: Ref<boolean>
  analysisResult: Ref<AnalysisResult | null>
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
export function useResumeAnalysis(fileInputRef: Ref<HTMLInputElement | null>): UseResumeAnalysisReturn {
  const resumeStore = useResumeStore()
  const analyzing = ref(false)
  const analysisResult = ref<AnalysisResult | null>(null)

  /**
   * 使用计算属性从store获取上传的文件
   */
  const uploadedFile = computed(() => resumeStore.uploadedFile)

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
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    analysisResult.value = generateMockResult()
    
    analyzing.value = false
    ElMessage.success('简历分析完成')
  }

  /**
   * 生成模拟分析结果
   * @returns 模拟的分析结果数据
   */
  const generateMockResult = (): AnalysisResult => {
    return {
      score: 78,
      highlights: [
        '项目经验丰富',
        '技术栈全面',
        '教育背景良好',
        '工作经历连贯',
      ],
      issues: [
        '项目描述不够详细',
        '缺少量化成果',
        '技能描述需优化',
        '自我评价偏简单',
      ],
      suggestions: [
        {
          category: '项目经验',
          title: '增加项目细节描述',
          content: '建议为每个项目添加具体的技术实现细节、遇到的挑战以及解决方案，让招聘方更好地了解您的能力。',
        },
        {
          category: '工作成果',
          title: '量化工作成果',
          content: '使用具体的数据来展示您的工作成果，例如：提升了系统性能30%、减少了50%的bug数量等。',
        },
        {
          category: '技能展示',
          title: '优化技能描述',
          content: '将技能按照熟练程度分类，并添加具体的应用场景说明，让技能描述更加真实可信。',
        },
        {
          category: '自我评价',
          title: '丰富自我评价内容',
          content: '自我评价应突出个人优势和职业规划，避免使用空洞的形容词，用具体事例支撑您的评价。',
        },
      ],
    }
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
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
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

  return {
    uploadedFile,
    analyzing,
    analysisResult,
    handleUploadClick,
    handleFileChange,
    handleDrop,
    handleAnalyze,
    formatFileSize,
    getScoreLevel,
  }
}