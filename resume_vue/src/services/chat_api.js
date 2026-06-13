// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\services\chat_api.ts
import { post, get } from './index';
/**
 * 发送消息给AI助手
 * @param message - 用户消息
 * @param resumeAnalysisResult - 简历分析结果（可选）
 * @param jobMatchResult - 岗位推荐结果（可选）
 */
export async function sendMessage(message, resumeAnalysisResult, jobMatchResult) {
    return await post('/chat/send', {
        message,
        resume_analysis_result: resumeAnalysisResult,
        job_match_result: jobMatchResult,
    });
}
/**
 * 获取对话历史
 */
export async function getChatHistory() {
    return await get('/chat/history');
}
/**
 * 清空对话历史
 */
export async function clearChatHistory() {
    await post('/chat/clear');
}
