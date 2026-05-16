// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\Login.ts

import { ref, type Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login as loginApi } from '@/services/auth_api'
import { useUserStore } from '@/stores/user'

/**
 * 登录表单接口定义
 */
export interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
}

/**
 * useLogin 返回类型接口定义
 */
interface UseLoginReturn {
  loginForm: Ref<LoginForm>
  loading: Ref<boolean>
  handleLogin: () => Promise<void>
  handleForgotPassword: () => void
  handleRegister: () => void
}

/**
 * 登录组合式函数
 * @param emit - emit函数
 * @returns 响应式数据和方法
 */
export function useLogin(emit: (event: 'close') => void): UseLoginReturn {
  const loginForm = ref<LoginForm>({
    username: '',
    password: '',
    rememberMe: false,
  })

  const loading = ref(false)
  const userStore = useUserStore()

  /**
   * 处理登录
   */
  const handleLogin = async (): Promise<void> => {
    if (!loginForm.value.username.trim()) {
      ElMessage.warning('请输入用户名')
      return
    }

    if (!loginForm.value.password.trim()) {
      ElMessage.warning('请输入密码')
      return
    }

    loading.value = true

    try {
      const response = await loginApi({
        name: loginForm.value.username,
        password: loginForm.value.password,
      })

      userStore.setToken(response.access_token)
      userStore.setUserInfo(response.user)

      ElMessage.success('登录成功')

      emit('close')
    } catch (error) {
      console.error('登录失败:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * 处理忘记密码
   */
  const handleForgotPassword = (): void => {
    ElMessage.info('请联系管理员重置密码')
  }

  /**
   * 处理注册
   */
  const handleRegister = (): void => {
    ElMessage.info('请切换到注册页面')
  }

  return {
    loginForm,
    loading,
    handleLogin,
    handleForgotPassword,
    handleRegister,
  }
}
