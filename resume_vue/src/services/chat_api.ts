// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\services\chat_api.ts

import axios from 'axios'
import type { ResumeAnalysisResult, JobMatchResult } from './resume_api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ChatRequest {
  message: string
  resume_analysis_result?: ResumeAnalysisResult
  job_match_result?: JobMatchResult
}

export interface ChatResponse {
  response: string
  timestamp: string
}

export interface ChatHistoryResponse {
  history: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}

/**
 * 发送消息给AI助手
 * @param message - 用户消息
 * @param resumeAnalysisResult - 简历分析结果（可选）
 * @param jobMatchResult - 岗位推荐结果（可选）
 */
export async function sendMessage(
  message: string,
  resumeAnalysisResult?: ResumeAnalysisResult,
  jobMatchResult?: JobMatchResult,
): Promise<ChatResponse> {
  const response = await apiClient.post<ChatResponse>('/chat/send', {
    message,
    resume_analysis_result: resumeAnalysisResult,
    job_match_result: jobMatchResult,
  })
  return response.data
}

/**
 * 获取对话历史
 */
export async function getChatHistory(): Promise<ChatHistoryResponse> {
  const response = await apiClient.get<ChatHistoryResponse>('/chat/history')
  return response.data
}

/**
 * 清空对话历史
 */
export async function clearChatHistory(): Promise<void> {
  await apiClient.post('/chat/clear')
}
