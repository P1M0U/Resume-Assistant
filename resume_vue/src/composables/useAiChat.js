// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\AiChatView.ts
import { ref, nextTick, computed, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { sendMessage as sendChatMessage, clearChatHistory, getChatHistory, } from '../services/chat_api';
import { useResumeStore } from '../stores/resume';
/**
 * 快捷问题列表
 */
const QUICK_QUESTIONS = [
    '如何优化简历？',
    '面试技巧有哪些？',
    '如何谈薪资？',
    '职业规划建议',
];
/**
 * 获取当前时间
 */
const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};
/**
 * 移动端键盘适配组合式函数
 * 处理键盘唤起时的布局调整
 */
function useKeyboardAdapter() {
    const originalHeight = ref(0);
    let resizeTimeout = null;
    /**
     * 处理视口高度变化
     */
    const handleResize = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = window.setTimeout(() => {
            const currentHeight = window.innerHeight;
            const heightDiff = originalHeight.value - currentHeight;
            // 如果高度差大于150px，认为是键盘打开
            if (heightDiff > 150) {
                const chatInput = document.querySelector('.chat-input');
                if (chatInput) {
                    chatInput.classList.add('keyboard-open');
                }
            }
            else {
                const chatInput = document.querySelector('.chat-input');
                if (chatInput) {
                    chatInput.classList.remove('keyboard-open');
                }
            }
        }, 100);
    };
    /**
     * 使用 visualViewport API（推荐）
     */
    const setupVisualViewport = () => {
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleResize);
            window.visualViewport.addEventListener('scroll', handleResize);
        }
    };
    /**
     * 清理 visualViewport 监听器
     */
    const cleanupVisualViewport = () => {
        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', handleResize);
            window.visualViewport.removeEventListener('scroll', handleResize);
        }
    };
    /**
     * 初始化键盘适配
     */
    const initKeyboardAdapter = () => {
        originalHeight.value = window.innerHeight;
        // 使用 visualViewport API（现代浏览器）
        if (window.visualViewport) {
            setupVisualViewport();
        }
        else {
            // 降级方案：使用 resize 事件
            window.addEventListener('resize', handleResize);
        }
        // 监听输入框焦点事件
        const inputElement = document.querySelector('.chat-input textarea');
        if (inputElement) {
            inputElement.addEventListener('focus', () => {
                setTimeout(() => {
                    const chatInput = document.querySelector('.chat-input');
                    if (chatInput) {
                        chatInput.classList.add('keyboard-open');
                    }
                }, 300);
            });
            inputElement.addEventListener('blur', () => {
                setTimeout(() => {
                    const chatInput = document.querySelector('.chat-input');
                    if (chatInput) {
                        chatInput.classList.remove('keyboard-open');
                    }
                }, 100);
            });
        }
    };
    /**
     * 清理键盘适配
     */
    const cleanupKeyboardAdapter = () => {
        if (window.visualViewport) {
            cleanupVisualViewport();
        }
        else {
            window.removeEventListener('resize', handleResize);
        }
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
    };
    return {
        initKeyboardAdapter,
        cleanupKeyboardAdapter,
    };
}
/**
 * AI对话组合式函数
 * @returns 响应式数据和方法
 */
export function useAiChat() {
    const resumeStore = useResumeStore();
    const messages = ref([]);
    const inputMessage = ref('');
    const isLoading = ref(false);
    // 使用键盘适配
    const { initKeyboardAdapter, cleanupKeyboardAdapter } = useKeyboardAdapter();
    /**
     * 用户首字母
     */
    const userInitial = computed(() => 'U');
    /**
     * 滚动到底部
     */
    const scrollToBottom = () => {
        nextTick(() => {
            const container = document.querySelector('.chat-messages');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        });
    };
    /**
     * 加载对话历史
     */
    const loadChatHistory = async () => {
        try {
            const response = await getChatHistory();
            if (response.history && response.history.length > 0) {
                messages.value = response.history.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                    timestamp: getCurrentTime(),
                }));
                scrollToBottom();
            }
        }
        catch (error) {
            console.error('加载对话历史失败:', error);
        }
    };
    /**
     * 发送消息
     */
    const sendMessage = async () => {
        if (!inputMessage.value.trim()) {
            ElMessage.warning('请输入问题');
            return;
        }
        const userMessage = inputMessage.value.trim();
        messages.value.push({
            role: 'user',
            content: userMessage,
            timestamp: getCurrentTime(),
        });
        inputMessage.value = '';
        isLoading.value = true;
        scrollToBottom();
        try {
            // 从 store 获取简历分析结果和岗位推荐结果
            const resumeAnalysisResult = resumeStore.getAnalysisResult();
            const jobMatchResult = resumeStore.getJobMatchResult();
            // 调用后端API，传递上下文信息
            const response = await sendChatMessage(userMessage, resumeAnalysisResult || undefined, jobMatchResult || undefined);
            messages.value.push({
                role: 'assistant',
                content: response.response,
                timestamp: response.timestamp,
            });
            scrollToBottom();
        }
        catch (error) {
            console.error('发送失败:', error);
            const errMsg = error instanceof Error ? error.message : '发送失败，请重试';
            ElMessage.error(errMsg);
            // 移除用户消息
            messages.value.pop();
        }
        finally {
            isLoading.value = false;
        }
    };
    /**
     * 处理快捷问题点击
     */
    const handleQuickQuestion = (question) => {
        inputMessage.value = question;
    };
    /**
     * 清空对话
     */
    const clearChat = async () => {
        try {
            await clearChatHistory();
            messages.value = [];
            ElMessage.success('对话已清空');
        }
        catch (error) {
            console.error('清空对话失败:', error);
            const errMsg = error instanceof Error ? error.message : '清空对话失败';
            ElMessage.error(errMsg);
        }
    };
    /**
     * 组件挂载时加载对话历史并初始化键盘适配
     */
    onMounted(() => {
        loadChatHistory();
        // 初始化键盘适配
        setTimeout(() => {
            initKeyboardAdapter();
        }, 100);
    });
    /**
     * 组件卸载时清理键盘适配
     */
    onUnmounted(() => {
        cleanupKeyboardAdapter();
    });
    return {
        messages,
        inputMessage,
        isLoading,
        userInitial,
        quickQuestions: QUICK_QUESTIONS,
        sendMessage,
        handleQuickQuestion,
        clearChat,
    };
}
