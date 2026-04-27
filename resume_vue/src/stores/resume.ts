import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ResumeAnalysisResult } from '../services/resume_api'

/**
 * 简历文件状态管理Store
 */
export const useResumeStore = defineStore('resume', () => {
  const uploadedFile = ref<File | null>(null)
  const shouldAutoAnalyze = ref(false)
  const analysisResult = ref<ResumeAnalysisResult | null>(null)

  /**
   * 设置上传的文件
   * @param file - 上传的文件对象
   */
  const setUploadedFile = (file: File): void => {
    uploadedFile.value = file
    shouldAutoAnalyze.value = true
  }

  /**
   * 清除上传的文件
   */
  const clearUploadedFile = (): void => {
    uploadedFile.value = null
    shouldAutoAnalyze.value = false
  }

  /**
   * 重置自动分析标志
   */
  const resetAutoAnalyze = (): void => {
    shouldAutoAnalyze.value = false
  }

  /**
   * 设置简历分析结果
   * @param result - 简历分析结果
   */
  const setAnalysisResult = (result: ResumeAnalysisResult): void => {
    analysisResult.value = result
  }

  /**
   * 获取简历分析结果
   * @returns 简历分析结果或null
   */
  const getAnalysisResult = (): ResumeAnalysisResult | null => {
    return analysisResult.value
  }

  /**
   * 清除简历分析结果
   */
  const clearAnalysisResult = (): void => {
    analysisResult.value = null
  }

  return {
    uploadedFile,
    shouldAutoAnalyze,
    analysisResult,
    setUploadedFile,
    clearUploadedFile,
    resetAutoAnalyze,
    setAnalysisResult,
    getAnalysisResult,
    clearAnalysisResult,
  }
})
