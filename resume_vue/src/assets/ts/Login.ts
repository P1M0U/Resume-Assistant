// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\Login.ts

import { ref, type Ref } from 'vue'
import { ElMessage } from 'element-plus'

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
 * @returns 响应式数据和方法
 */
export function useLogin(): UseLoginReturn {
  const loginForm = ref<LoginForm>({
    username: '',
    password: '',
    rememberMe: false,
  })

  const loading = ref(false)

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
      // 模拟登录请求
      await new Promise((resolve) => setTimeout(resolve, 1000))

      ElMessage.success('登录成功')
      // TODO: 实际登录逻辑
    } catch (error) {
      ElMessage.error('登录失败，请重试')
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
