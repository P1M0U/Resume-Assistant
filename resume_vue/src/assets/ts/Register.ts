// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\Register.ts

import { ref, type Ref } from 'vue'
import { ElMessage } from 'element-plus'

/**
 * 注册表单接口定义
 */
export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreeTerms: boolean
}

/**
 * useRegister 返回类型接口定义
 */
interface UseRegisterReturn {
  registerForm: Ref<RegisterForm>
  loading: Ref<boolean>
  handleRegister: () => Promise<void>
  handleLogin: () => void
}

/**
 * 注册组合式函数
 * @returns 响应式数据和方法
 */
export function useRegister(): UseRegisterReturn {
  const registerForm = ref<RegisterForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const loading = ref(false)

  /**
   * 验证邮箱格式
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * 处理注册
   */
  const handleRegister = async (): Promise<void> => {
    if (!registerForm.value.username.trim()) {
      ElMessage.warning('请输入用户名')
      return
    }

    if (!registerForm.value.email.trim()) {
      ElMessage.warning('请输入邮箱')
      return
    }

    if (!validateEmail(registerForm.value.email)) {
      ElMessage.warning('请输入有效的邮箱地址')
      return
    }

    if (!registerForm.value.password.trim()) {
      ElMessage.warning('请输入密码')
      return
    }

    if (registerForm.value.password.length < 6) {
      ElMessage.warning('密码长度至少为6位')
      return
    }

    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      ElMessage.warning('两次输入的密码不一致')
      return
    }

    if (!registerForm.value.agreeTerms) {
      ElMessage.warning('请阅读并同意用户协议')
      return
    }

    loading.value = true

    try {
      // 模拟注册请求
      await new Promise((resolve) => setTimeout(resolve, 1000))

      ElMessage.success('注册成功')
      // TODO: 实际注册逻辑
    } catch (error) {
      ElMessage.error('注册失败，请重试')
    } finally {
      loading.value = false
    }
  }

  /**
   * 处理登录
   */
  const handleLogin = (): void => {
    ElMessage.info('请切换到登录页面')
  }

  return {
    registerForm,
    loading,
    handleRegister,
    handleLogin,
  }
}
