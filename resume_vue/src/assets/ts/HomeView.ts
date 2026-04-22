import { ref, type Ref } from 'vue'
import { ElMessage } from 'element-plus'

/**
 * 功能特性接口定义
 */
interface Feature {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

/**
 * useHomeView返回类型接口定义
 */
interface UseHomeViewReturn {
  features: Ref<Feature[]>
  handleUpload: () => void
  handleInputJob: () => void
  handleFeatureClick: (featureId: string) => void
  handleFileChange: (event: Event) => void
}

/**
 * HomeView组合式函数
 * @param fileInputRef - 文件输入框引用
 * @returns 响应式数据和方法
 */
export function useHomeView(fileInputRef: Ref<HTMLInputElement | null>): UseHomeViewReturn {
  const features: Ref<Feature[]> = ref([
    {
      id: 'analyze',
      title: '智能简历分析',
      description: 'AI深度分析简历内容，识别优势与不足',
      icon: 'ChatDotRound',
      color: '#409EFF',
    },
    {
      id: 'optimize',
      title: '简历优化建议',
      description: '提供专业的简历修改建议和优化方向',
      icon: 'MagicStick',
      color: '#67C23A',
    },
    {
      id: 'recommend',
      title: '岗位智能推荐',
      description: '根据简历内容推荐匹配度高的岗位',
      icon: 'TrendCharts',
      color: '#E6A23C',
    },
  ])

  /**
   * 处理上传简历按钮点击
   */
  const handleUpload = (): void => {
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

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (!allowedTypes.includes(file.type) && !['pdf', 'docx'].includes(fileExtension || '')) {
      ElMessage.error('仅支持PDF和DOCX格式的文件')
      return
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      ElMessage.error('文件大小不能超过10MB')
      return
    }

    ElMessage.success(`已选择文件：${file.name}`)
    console.log('上传的文件：', file)

    if (target) {
      target.value = ''
    }
  }

  /**
   * 处理输入期望岗位按钮点击
   */
  const handleInputJob = (): void => {
    ElMessage.info('请输入您的期望岗位名称')
  }

  /**
   * 处理功能卡片点击事件
   * @param featureId - 功能ID
   */
  const handleFeatureClick = (featureId: string): void => {
    switch (featureId) {
      case 'analyze':
        ElMessage.info('即将进入简历分析页面')
        break
      case 'optimize':
        ElMessage.info('即将进入简历优化页面')
        break
      case 'recommend':
        ElMessage.info('即将进入岗位推荐页面')
        break
      default:
        ElMessage.warning('功能开发中，敬请期待')
    }
  }

  return {
    features,
    handleUpload,
    handleInputJob,
    handleFeatureClick,
    handleFileChange,
  }
}
