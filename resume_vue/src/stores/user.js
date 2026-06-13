import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getCurrentUser } from '@/services/auth_api';
/**
 * 用户状态管理Store
 */
export const useUserStore = defineStore('user', () => {
    const token = ref(localStorage.getItem('token'));
    const userInfo = ref(null);
    const showLoginDialog = ref(false);
    const isLoggedIn = computed(() => !!token.value && !!userInfo.value);
    /**
     * 设置Token
     */
    const setToken = (newToken) => {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    };
    /**
     * 设置用户信息
     */
    const setUserInfo = (info) => {
        userInfo.value = info;
    };
    /**
     * 清除用户信息
     */
    const clearUser = () => {
        token.value = null;
        userInfo.value = null;
        localStorage.removeItem('token');
    };
    /**
     * 退出登录
     */
    const logout = () => {
        clearUser();
    };
    /**
     * 显示登录对话框
     */
    const openLoginDialog = () => {
        showLoginDialog.value = true;
    };
    /**
     * 关闭登录对话框
     */
    const closeLoginDialog = () => {
        showLoginDialog.value = false;
    };
    /**
     * 初始化用户信息
     * 在应用启动时调用，验证token并加载用户信息
     */
    const initializeUser = async () => {
        if (!token.value) {
            return;
        }
        try {
            const user = await getCurrentUser();
            setUserInfo(user);
        }
        catch (error) {
            console.error('Token验证失败:', error);
            clearUser();
        }
    };
    return {
        token,
        userInfo,
        showLoginDialog,
        isLoggedIn,
        setToken,
        setUserInfo,
        clearUser,
        logout,
        openLoginDialog,
        closeLoginDialog,
        initializeUser,
    };
});
