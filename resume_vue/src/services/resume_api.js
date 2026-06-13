import { get, post, uploadFile } from './index';
/**
 * 简历API服务类
 */
export class ResumeApiService {
    /**
     * 上传并分析简历
     * @param params - 上传参数
     * @returns 简历分析结果
     */
    static async uploadAndAnalyze(params) {
        const response = await uploadFile('/resume/upload', params.file, params.onProgress);
        return response.data;
    }
    /**
     * 根据期望岗位获取推荐
     * @param params - 岗位推荐参数
     * @returns 岗位匹配结果
     */
    static async getJobRecommendation(params) {
        const response = await post('/resume/job-recommend', params);
        return response.data;
    }
    /**
     * 获取简历分析历史
     * @param page - 页码
     * @param pageSize - 每页数量
     * @returns 历史记录列表
     */
    static async getAnalysisHistory(page = 1, pageSize = 10) {
        return get('/resume/history', { params: { page, page_size: pageSize } });
    }
    /**
     * 获取分析详情
     * @param analysisId - 分析ID
     * @returns 分析结果详情
     */
    static async getAnalysisDetail(analysisId) {
        return get(`/resume/analysis/${analysisId}`);
    }
    /**
     * 删除分析记录
     * @param analysisId - 分析ID
     * @returns 删除结果
     */
    static async deleteAnalysis(analysisId) {
        return post(`/resume/analysis/${analysisId}/delete`);
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
};
