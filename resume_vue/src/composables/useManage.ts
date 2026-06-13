import { ref, type Ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllUsers, updateUserByAdmin, deleteUser } from '@/services/auth_api'
import type { UserInfo } from '@/stores/user'

/**
 * 用户编辑表单接口
 */
export interface UserEditForm {
  name: string
  email: string
  password: string
  is_admin: boolean
}

/**
 * useManage 返回类型接口
 */
interface UseManageReturn {
  users: Ref<UserInfo[]>
  loading: Ref<boolean>
  editingUser: Ref<UserInfo | null>
  editForm: Ref<UserEditForm>
  showEditDialog: Ref<boolean>
  loadUsers: () => Promise<void>
  handleEditUser: (user: UserInfo) => void
  handleUpdateUser: () => Promise<void>
  handleDeleteUser: (userId: number) => Promise<void>
  closeEditDialog: () => void
}

/**
 * 后台管理组合式函数
 * @returns 响应式数据和方法
 */
export function useManage(): UseManageReturn {
  const users = ref<UserInfo[]>([])
  const loading = ref(false)
  const editingUser = ref<UserInfo | null>(null)
  const showEditDialog = ref(false)

  const editForm = ref<UserEditForm>({
    name: '',
    email: '',
    password: '',
    is_admin: false,
  })

  /**
   * 加载用户列表
   */
  const loadUsers = async (): Promise<void> => {
    try {
      loading.value = true
      const data = await getAllUsers()
      users.value = data
    } catch (error) {
      console.error('获取用户列表失败:', error)
      ElMessage.error('获取用户列表失败')
    } finally {
      loading.value = false
    }
  }

  /**
   * 打开编辑用户对话框
   */
  const handleEditUser = (user: UserInfo): void => {
    editingUser.value = user
    editForm.value = {
      name: user.name,
      email: user.email,
      password: '',
      is_admin: user.is_admin,
    }
    showEditDialog.value = true
  }

  /**
   * 更新用户信息
   */
  const handleUpdateUser = async (): Promise<void> => {
    if (!editingUser.value) return

    if (!editForm.value.name.trim()) {
      ElMessage.warning('用户名不能为空')
      return
    }

    if (!editForm.value.email.trim()) {
      ElMessage.warning('邮箱不能为空')
      return
    }

    try {
      await ElMessageBox.confirm('确定要更新该用户信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })

      loading.value = true

      const updateData: Partial<UserEditForm> = {
        name: editForm.value.name,
        email: editForm.value.email,
        is_admin: editForm.value.is_admin,
      }

      if (editForm.value.password) {
        updateData.password = editForm.value.password
      }

      await updateUserByAdmin(editingUser.value.id, updateData)

      ElMessage.success('用户信息更新成功')

      showEditDialog.value = false

      await loadUsers()
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== 'cancel') {
        console.error('更新用户信息失败:', error)
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * 删除用户
   */
  const handleDeleteUser = async (userId: number): Promise<void> => {
    try {
      await ElMessageBox.confirm('确定要删除该用户吗？此操作不可恢复！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      })

      loading.value = true

      await deleteUser(userId)

      ElMessage.success('用户删除成功')

      await loadUsers()
    } catch (error: unknown) {
      if (error instanceof Error && error.message !== 'cancel') {
        console.error('删除用户失败:', error)
      }
    } finally {
      loading.value = false
    }
  }

  /**
   * 关闭编辑对话框
   */
  const closeEditDialog = (): void => {
    showEditDialog.value = false
    editingUser.value = null
    editForm.value = {
      name: '',
      email: '',
      password: '',
      is_admin: false,
    }
  }

  onMounted(() => {
    loadUsers()
  })

  return {
    users,
    loading,
    editingUser,
    editForm,
    showEditDialog,
    loadUsers,
    handleEditUser,
    handleUpdateUser,
    handleDeleteUser,
    closeEditDialog,
  }
}
