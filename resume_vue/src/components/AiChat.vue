<template>
  <div class="ai-chat-view">
    <div class="chat-container">
      <div class="chat-header">
        <h2>AI对话助手</h2>
        <p class="subtitle">咨询简历优化、职业发展、面试技巧等问题</p>
      </div>

      <div class="chat-messages">
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
          :disabled="isLoading"
          @keydown.enter.ctrl="sendMessage"
        />
        <div class="input-actions">
          <div class="quick-questions">
            <el-tag
              v-for="question in quickQuestions"
              :key="question"
              class="quick-question"
              effect="plain"
              @click="handleQuickQuestion(question)"
            >
              {{ question }}
            </el-tag>
          </div>
          <div class="action-buttons">
            <el-button :disabled="messages.length === 0" @click="clearChat">
              <el-icon><Delete /></el-icon>
              清空对话
            </el-button>
            <el-button type="primary" :loading="isLoading" @click="sendMessage">
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
import { ChatDotRound, Delete, Promotion } from '@element-plus/icons-vue'
import { useAiChat } from '@/composables/useAiChat'

const {
  messages,
  inputMessage,
  isLoading,
  userInitial,
  quickQuestions,
  sendMessage,
  handleQuickQuestion,
  clearChat,
} = useAiChat()
</script>

<style scoped>
@import '@/assets/css/AiChat.css';
</style>
