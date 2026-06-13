import { get, post, uploadFile } from './index'

/**
 * 个人信息接口
 */
export interface PersonalInfo {
  name?: string
  phone?: string
  email?: string
  location?: string
}

/**
 * 优化建议接口
 */
export interface Suggestion {
  category: string
  title: string
  content: string
  priority?: string
}

/**
 * 简历分析结果接口
 */
export interface ResumeAnalysisResult {
  score: number
  personal_info: PersonalInfo
  highlights: string[]
  issues: string[]
  suggestions: Suggestion[]
}

/**
 * 岗位推荐结果接口
 */
export interface JobRecommendation {
  job_title: string
  match_score: number
  reason: string
  key_requirements: string[]
}

/**
 * 岗位匹配结果接口
 */
export interface JobMatchResult {
  target_job: string
  match_score: number
  matched_skills: string[]
  missing_skills: string[]
  recommendations: JobRecommendation[]
  optimization_suggestions: Suggestion[]
}

/**
 * 上传简历参数
 */
export interface UploadResumeParams {
  file: File
  onProgress?: (progress: number) => void
}

/**
 * 岗位推荐参数
 */
export interface JobRecommendParams {
  resume_text?: string
  target_job: string
}

/**
 * 简历API服务类
 */
export class ResumeApiService {
  /**
   * 上传并分析简历
   * @param params - 上传参数
   * @returns 简历分析结果
   */
  static async uploadAndAnalyze(params: UploadResumeParams): Promise<ResumeAnalysisResult> {
    const response = await uploadFile<{
      success: boolean
      data: ResumeAnalysisResult
      message: string
    }>('/resume/upload', params.file, params.onProgress)
    return response.data
  }

  /**
   * 根据期望岗位获取推荐
   * @param params - 岗位推荐参数
   * @returns 岗位匹配结果
   */
  static async getJobRecommendation(params: JobRecommendParams): Promise<JobMatchResult> {
    const response = await post<{ success: boolean; data: JobMatchResult; message: string }>(
      '/resume/job-recommend',
      params,
    )
    return response.data
  }

  /**
   * 获取简历分析历史
   * @param page - 页码
   * @param pageSize - 每页数量
   * @returns 历史记录列表
   */
  static async getAnalysisHistory(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    total: number
    items: Array<{
      id: string
      file_name: string
      score: number
      created_at: string
    }>
  }> {
    return get('/resume/history', { params: { page, page_size: pageSize } })
  }

  /**
   * 获取分析详情
   * @param analysisId - 分析ID
   * @returns 分析结果详情
   */
  static async getAnalysisDetail(analysisId: string): Promise<ResumeAnalysisResult> {
    return get(`/resume/analysis/${analysisId}`)
  }

  /**
   * 删除分析记录
   * @param analysisId - 分析ID
   * @returns 删除结果
   */
  static async deleteAnalysis(analysisId: string): Promise<{ success: boolean; message: string }> {
    return post(`/resume/analysis/${analysisId}/delete`)
  }
}

/**
 * 导出便捷方法
 */
export const resumeApi = {
  uploadAndAnalyze: ResumeApiService.uploadAndAnalyze,
  getJobRecommendation: ResumeApiService.getJobRecommendation,
  getAnalysisHistory: ResumeApiService.getAnalysisHistory,
  getAnalysisDetail: ResumeApiService.getAnalysisDetail,
  deleteAnalysis: ResumeApiService.deleteAnalysis,
}
