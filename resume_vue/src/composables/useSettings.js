// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\Settings.ts
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
/**
 * 设置组合式函数
 * @returns 响应式数据和方法
 */
export function useSettings() {
    const settings = ref([
        {
            id: 'darkMode',
            label: '深色模式',
            description: '开启后界面将使用深色主题',
            icon: 'Moon',
            type: 'switch',
            value: false,
        },
        {
            id: 'notifications',
            label: '消息通知',
            description: '接收系统通知和提醒',
            icon: 'Bell',
            type: 'switch',
            value: true,
        },
        {
            id: 'autoSave',
            label: '自动保存',
            description: '自动保存对话记录和分析结果',
            icon: 'Document',
            type: 'switch',
            value: true,
        },
        {
            id: 'language',
            label: '语言设置',
            description: '选择界面显示语言',
            icon: 'Globe',
            type: 'select',
            value: 'zh-CN',
            options: [
                { label: '简体中文', value: 'zh-CN' },
                { label: 'English', value: 'en-US' },
            ],
        },
        {
            id: 'fontSize',
            label: '字体大小',
            description: '调整界面字体大小',
            icon: 'FontSize',
            type: 'select',
            value: 'medium',
            options: [
                { label: '小', value: 'small' },
                { label: '中', value: 'medium' },
                { label: '大', value: 'large' },
            ],
        },
    ]);
    /**
     * 处理设置项变更
     */
    const handleSettingChange = (id, value) => {
        const setting = settings.value.find((s) => s.id === id);
        if (setting) {
            setting.value = value;
            ElMessage.success('设置已保存');
            // 特殊处理深色模式
            if (id === 'darkMode') {
                document.documentElement.classList.toggle('dark-mode', value);
            }
        }
    };
    /**
     * 清除缓存
     */
    const handleClearCache = async () => {
        try {
            await ElMessageBox.confirm('确定要清除所有缓存数据吗？这将删除本地存储的对话记录和分析结果。', '确认清除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            });
            localStorage.clear();
            sessionStorage.clear();
            ElMessage.success('缓存已清除');
        }
        catch {
            // 用户取消操作
        }
    };
    /**
     * 导出数据
     */
    const handleExportData = () => {
        const data = {
            settings: settings.value,
            exportTime: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resume-assistant-settings-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        ElMessage.success('数据已导出');
    };
    /**
     * 重置设置
     */
    const handleResetSettings = async () => {
        try {
            await ElMessageBox.confirm('确定要重置所有设置吗？这将恢复默认设置。', '确认重置', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            });
            settings.value.forEach((setting) => {
                if (setting.type === 'switch') {
                    setting.value = setting.id === 'notifications' || setting.id === 'autoSave';
                }
                else if (setting.type === 'select') {
                    setting.value = setting.id === 'language' ? 'zh-CN' : 'medium';
                }
            });
            ElMessage.success('设置已重置');
        }
        catch {
            // 用户取消操作
        }
    };
    return {
        settings,
        handleSettingChange,
        handleClearCache,
        handleExportData,
        handleResetSettings,
    };
}
