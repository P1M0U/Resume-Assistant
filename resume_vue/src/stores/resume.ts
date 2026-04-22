import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 简历文件状态管理Store
 */
export const useResumeStore = defineStore('resume', () => {
  const uploadedFile = ref<File | null>(null)
  const shouldAutoAnalyze = ref(false)

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

  return {
    uploadedFile,
    shouldAutoAnalyze,
    setUploadedFile,
    clearUploadedFile,
    resetAutoAnalyze,
  }
})