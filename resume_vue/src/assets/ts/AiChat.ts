// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\AiChatView.ts

import { ref, nextTick, computed, onMounted, type Ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  sendMessage as sendChatMessage,
  clearChatHistory,
  getChatHistory,
} from '../../services/chat_api'
import { useResumeStore } from '../../stores/resume'

/**
 * 消息接口定义
 */
export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

/**
 * useAiChat 返回类型接口定义
 */
interface UseAiChatReturn {
  messages: Ref<Message[]>
  inputMessage: Ref<string>
  isLoading: Ref<boolean>
  userInitial: Ref<string>
  quickQuestions: string[]
  sendMessage: () => Promise<void>
  handleQuickQuestion: (question: string) => void
  clearChat: () => Promise<void>
}

/**
 * 快捷问题列表
 */
const QUICK_QUESTIONS: string[] = [
  '如何优化简历？',
  '面试技巧有哪些？',
  '如何谈薪资？',
  '职业规划建议',
]

/**
 * 获取当前时间
 */
const getCurrentTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

/**
 * AI对话组合式函数
 * @returns 响应式数据和方法
 */
export function useAiChat(): UseAiChatReturn {
  const resumeStore = useResumeStore()
  const messages = ref<Message[]>([])
  const inputMessage = ref('')
  const isLoading = ref(false)

  /**
   * 用户首字母
   */
  const userInitial = computed(() => 'U')

  /**
   * 滚动到底部
   */
  const scrollToBottom = (): void => {
    nextTick(() => {
      const container = document.querySelector('.chat-messages') as HTMLElement
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    })
  }

  /**
   * 加载对话历史
   */
  const loadChatHistory = async (): Promise<void> => {
    try {
      const response = await getChatHistory()
      if (response.history && response.history.length > 0) {
        messages.value = response.history.map((msg) => ({
          role: msg.role,
          content: msg.content,
          timestamp: getCurrentTime(),
        }))
        scrollToBottom()
      }
    } catch (error) {
      console.error('加载对话历史失败:', error)
    }
  }

  /**
   * 发送消息
   */
  const sendMessage = async (): Promise<void> => {
    if (!inputMessage.value.trim()) {
      ElMessage.warning('请输入问题')
      return
    }

    const userMessage = inputMessage.value.trim()
    messages.value.push({
      role: 'user',
      content: userMessage,
      timestamp: getCurrentTime(),
    })

    inputMessage.value = ''
    isLoading.value = true
    scrollToBottom()

    try {
      // 从 store 获取简历分析结果和岗位推荐结果
      const resumeAnalysisResult = resumeStore.getAnalysisResult()
      const jobMatchResult = resumeStore.getJobMatchResult()

      // 调用后端API，传递上下文信息
      const response = await sendChatMessage(
        userMessage,
        resumeAnalysisResult || undefined,
        jobMatchResult || undefined,
      )

      messages.value.push({
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp,
      })

      scrollToBottom()
    } catch (error: any) {
      console.error('发送失败:', error)
      ElMessage.error(error.response?.data?.detail || '发送失败，请重试')

      // 移除用户消息
      messages.value.pop()
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 处理快捷问题点击
   */
  const handleQuickQuestion = (question: string): void => {
    inputMessage.value = question
  }

  /**
   * 清空对话
   */
  const clearChat = async (): Promise<void> => {
    try {
      await clearChatHistory()
      messages.value = []
      ElMessage.success('对话已清空')
    } catch (error: any) {
      console.error('清空对话失败:', error)
      ElMessage.error(error.response?.data?.detail || '清空对话失败')
    }
  }

  /**
   * 组件挂载时加载对话历史
   */
  onMounted(() => {
    loadChatHistory()
  })

  return {
    messages,
    inputMessage,
    isLoading,
    userInitial,
    quickQuestions: QUICK_QUESTIONS,
    sendMessage,
    handleQuickQuestion,
    clearChat,
  }
}
