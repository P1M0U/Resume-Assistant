import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'

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

  const isLoggedIn: ComputedRef<boolean> = computed(() => !!token.value)

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

  return {
    token,
    userInfo,
    isLoggedIn,
    setToken,
    setUserInfo,
    clearUser,
    logout,
  }
})
