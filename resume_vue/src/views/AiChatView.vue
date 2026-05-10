<template>
  <div class="ai-chat-view">
    <div class="chat-container">
      <div class="chat-header">
        <h2>AI对话助手</h2>
        <p class="subtitle">咨询简历优化、职业发展、面试技巧等问题</p>
      </div>

      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
          <div class="message-avatar">
            <el-avatar v-if="message.role === 'user'" :size="36">
              {{ userInitial }}
            </el-avatar>
            <el-avatar v-else :size="36" class="ai-avatar">
              <el-icon><ChatDotRound /></el-icon>
            </el-avatar>
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ message.timestamp }}</div>
          </div>
        </div>

        <div v-if="isLoading" class="message assistant loading">
          <div class="message-avatar">
            <el-avatar :size="36" class="ai-avatar">
              <el-icon><ChatDotRound /></el-icon>
            </el-avatar>
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <el-input
          v-model="inputMessage"
          type="textarea"
          :rows="3"
          placeholder="输入您的问题，例如：如何优化我的简历？"
          @keydown.enter.ctrl="sendMessage"
          :disabled="isLoading"
        />
        <div class="input-actions">
          <div class="quick-questions">
            <el-tag
              v-for="question in quickQuestions"
              :key="question"
              @click="handleQuickQuestion(question)"
              class="quick-question"
              effect="plain"
            >
              {{ question }}
            </el-tag>
          </div>
          <div class="action-buttons">
            <el-button @click="clearChat" :disabled="messages.length === 0">
              <el-icon><Delete /></el-icon>
              清空对话
            </el-button>
            <el-button type="primary" @click="sendMessage" :loading="isLoading">
              <el-icon><Promotion /></el-icon>
              发送
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { ChatDotRound, Delete, Promotion } from '@element-plus/icons-vue'
import {
  sendMessage as sendChatMessage,
  clearChatHistory,
  getChatHistory,
} from '@/services/chat_api'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const messages = ref<Message[]>([])
const inputMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const userInitial = computed(() => 'U')

const quickQuestions = ['如何优化简历？', '面试技巧有哪些？', '如何谈薪资？', '职业规划建议']

const getCurrentTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = (): void => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
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
    // 调用后端API
    const response = await sendChatMessage(userMessage)

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

// 组件挂载时加载对话历史
onMounted(() => {
  loadChatHistory()
})
</script>

<style scoped>
@import '@/assets/css/AiChatView.css';
</style>
