import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ResumeAnalysisResult, JobMatchResult } from '../services/resume_api'

/**
 * 简历文件状态管理Store
 */
export const useResumeStore = defineStore('resume', () => {
  const uploadedFile = ref<File | null>(null)
  const shouldAutoAnalyze = ref(false)
  const analysisResult = ref<ResumeAnalysisResult | null>(null)
  const jobMatchResult = ref<JobMatchResult | null>(null)

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

  /**
   * 设置岗位推荐结果
   * @param result - 岗位推荐结果
   */
  const setJobMatchResult = (result: JobMatchResult): void => {
    jobMatchResult.value = result
  }

  /**
   * 获取岗位推荐结果
   * @returns 岗位推荐结果或null
   */
  const getJobMatchResult = (): JobMatchResult | null => {
    return jobMatchResult.value
  }

  /**
   * 清除岗位推荐结果
   */
  const clearJobMatchResult = (): void => {
    jobMatchResult.value = null
  }

  /**
   * 清除所有数据
   */
  const clearAll = (): void => {
    clearUploadedFile()
    clearAnalysisResult()
    clearJobMatchResult()
  }

  return {
    uploadedFile,
    shouldAutoAnalyze,
    analysisResult,
    jobMatchResult,
    setUploadedFile,
    clearUploadedFile,
    resetAutoAnalyze,
    setAnalysisResult,
    getAnalysisResult,
    clearAnalysisResult,
    setJobMatchResult,
    getJobMatchResult,
    clearJobMatchResult,
    clearAll,
  }
})
