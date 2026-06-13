import { ref } from 'vue';
import { defineStore } from 'pinia';
/**
 * 简历文件状态管理Store
 */
export const useResumeStore = defineStore('resume', () => {
    const uploadedFile = ref(null);
    const shouldAutoAnalyze = ref(false);
    const analysisResult = ref(null);
    const jobMatchResult = ref(null);
    /**
     * 设置上传的文件
     * @param file - 上传的文件对象
     */
    const setUploadedFile = (file) => {
        uploadedFile.value = file;
        shouldAutoAnalyze.value = true;
    };
    /**
     * 清除上传的文件
     */
    const clearUploadedFile = () => {
        uploadedFile.value = null;
        shouldAutoAnalyze.value = false;
    };
    /**
     * 重置自动分析标志
     */
    const resetAutoAnalyze = () => {
        shouldAutoAnalyze.value = false;
    };
    /**
     * 设置简历分析结果
     * @param result - 简历分析结果
     */
    const setAnalysisResult = (result) => {
        analysisResult.value = result;
    };
    /**
     * 获取简历分析结果
     * @returns 简历分析结果或null
     */
    const getAnalysisResult = () => {
        return analysisResult.value;
    };
    /**
     * 清除简历分析结果
     */
    const clearAnalysisResult = () => {
        analysisResult.value = null;
    };
    /**
     * 设置岗位推荐结果
     * @param result - 岗位推荐结果
     */
    const setJobMatchResult = (result) => {
        jobMatchResult.value = result;
    };
    /**
     * 获取岗位推荐结果
     * @returns 岗位推荐结果或null
     */
    const getJobMatchResult = () => {
        return jobMatchResult.value;
    };
    /**
     * 清除岗位推荐结果
     */
    const clearJobMatchResult = () => {
        jobMatchResult.value = null;
    };
    /**
     * 清除所有数据
     */
    const clearAll = () => {
        clearUploadedFile();
        clearAnalysisResult();
        clearJobMatchResult();
    };
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
    };
});
