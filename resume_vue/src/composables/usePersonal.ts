import { ref, type Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { updateUser, getCurrentUser } from '@/services/auth_api'
import { validateEmail } from '@/utils/validation'

/**
 * 用户信息表单接口
 */
export interface UserForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

/**
 * usePersonal 返回类型接口
 */
interface UsePersonalReturn {
  userForm: Ref<UserForm>
  loading: Ref<boolean>
  editing: Ref<boolean>
  handleUpdateUser: () => Promise<void>
  handleCancelEdit: () => void
  startEdit: () => void
  refreshUserInfo: () => Promise<void>
}

/**
 * 个人信息组合式函数
 * @returns 响应式数据和方法
 */
export function usePersonal(): UsePersonalReturn {
  const userStore = useUserStore()
  const loading = ref(false)
  const editing = ref(false)

  const userForm = ref<UserForm>({
    name: userStore.userInfo?.name || '',
    email: userStore.userInfo?.email || '',
    password: '',
    confirmPassword: '',
  })

  /**
   * 开始编辑
   */
  const startEdit = (): void => {
    editing.value = true
    userForm.value = {
      name: userStore.userInfo?.name || '',
      email: userStore.userInfo?.email || '',
      password: '',
      confirmPassword: '',
    }
  }

  /**
   * 取消编辑
   */
  const handleCancelEdit = (): void => {
    editing.value = false
    userForm.value = {
      name: userStore.userInfo?.name || '',
      email: userStore.userInfo?.email || '',
      password: '',
      confirmPassword: '',
    }
  }

  /**
   * 更新用户信息
   */
  const handleUpdateUser = async (): Promise<void> => {
    if (!userForm.value.name.trim()) {
      ElMessage.warning('用户名不能为空')
      return
    }

    if (!userForm.value.email.trim()) {
      ElMessage.warning('邮箱不能为空')
      return
    }

    if (!validateEmail(userForm.value.email)) {
      ElMessage.warning('请输入有效的邮箱地址')
      return
    }

    if (userForm.value.password && userForm.value.password.length < 4) {
      ElMessage.warning('密码长度至少为4位')
      return
    }

    if (userForm.value.password && userForm.value.password !== userForm.value.confirmPassword) {
      ElMessage.warning('两次输入的密码不一致')
      return
    }

    try {
      await ElMessageBox.confirm('确定要更新个人信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      loading.value = true

      const updateData: Partial<UserForm> = {
        name: userForm.value.name,
        email: userForm.value.email,
      }

      if (userForm.value.password) {
        updateData.password = userForm.value.password
      }

      const updatedUser = await updateUser(updateData)

      userStore.setUserInfo(updatedUser)

      ElMessage.success('个人信息更新成功')

      editing.value = false

      userForm.value.password = ''
      userForm.value.confirmPassword = ''
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== 'cancel') {
        console.error('更新用户信息失败:', error)
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * 刷新用户信息
   */
  const refreshUserInfo = async (): Promise<void> => {
    try {
      loading.value = true
      const userInfo = await getCurrentUser()
      userStore.setUserInfo(userInfo)
      userForm.value.name = userInfo.name
      userForm.value.email = userInfo.email
    } catch (error) {
      console.error('获取用户信息失败:', error)
      ElMessage.error('获取用户信息失败')
    } finally {
      loading.value = false
    }
  }

  return {
    userForm,
    loading,
    editing,
    handleUpdateUser,
    handleCancelEdit,
    startEdit,
    refreshUserInfo,
  }
}
