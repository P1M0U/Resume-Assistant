import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { getCurrentUser } from '@/services/auth_api'

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number
  name: string
  email: string
  is_admin: boolean
  create_time: string | null
}

/**
 * 用户状态管理Store
 */
export const useUserStore = defineStore('user', () => {
  const token: Ref<string | null> = ref(localStorage.getItem('token'))
  const userInfo: Ref<UserInfo | null> = ref(null)
  const showLoginDialog: Ref<boolean> = ref(false)

  const isLoggedIn: ComputedRef<boolean> = computed(() => !!token.value && !!userInfo.value)

  /**
   * 设置Token
   */
  const setToken = (newToken: string): void => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  /**
   * 设置用户信息
   */
  const setUserInfo = (info: UserInfo): void => {
    userInfo.value = info
  }

  /**
   * 清除用户信息
   */
  const clearUser = (): void => {
    token.value = null
    userInfo.value = null
    localStorage.removeItem('token')
  }

  /**
   * 退出登录
   */
  const logout = (): void => {
    clearUser()
  }

  /**
   * 显示登录对话框
   */
  const openLoginDialog = (): void => {
    showLoginDialog.value = true
  }

  /**
   * 关闭登录对话框
   */
  const closeLoginDialog = (): void => {
    showLoginDialog.value = false
  }

  /**
   * 初始化用户信息
   * 在应用启动时调用，验证token并加载用户信息
   */
  const initializeUser = async (): Promise<void> => {
    if (!token.value) {
      return
    }

    try {
      const user = await getCurrentUser()
      setUserInfo(user)
    } catch (error) {
      console.error('Token验证失败:', error)
      clearUser()
    }
  }

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
  }
})
