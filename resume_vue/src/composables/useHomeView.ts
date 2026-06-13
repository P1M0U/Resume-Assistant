import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
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
}

/**
 * HomeView组合式函数
 * @param fileInputRef - 文件输入框引用
 * @returns 响应式数据和方法
 */
export function useHomeView(): UseHomeViewReturn {
  const router = useRouter()

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
    router.push('/resume-analyze')
  }

  /**
   * 处理输入期望岗位按钮点击
   */
  const handleInputJob = (): void => {
    router.push('/job-recommend')
  }

  /**
   * 处理功能卡片点击事件
   * @param featureId - 功能ID
   */
  const handleFeatureClick = (featureId: string): void => {
    switch (featureId) {
      case 'analyze':
        router.push('/resume-analyze')
        break
      case 'optimize':
        ElMessage.info('简历优化功能开发中，敬请期待')
        break
      case 'recommend':
        router.push('/job-recommend')
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
  }
}
