<template>
  <div class="manage-container">
    <div class="manage-header">
      <h1>后台管理</h1>
      <p>管理系统用户和配置</p>
    </div>

    <div class="manage-section">
      <h2 class="section-title">
        <el-icon><User /></el-icon>
        用户管理
      </h2>
      <el-card class="manage-card" shadow="hover">
        <div class="card-header">
          <div class="header-info">
            <h3>用户列表</h3>
            <p>共 {{ users.length }} 个用户</p>
          </div>
          <el-button class="refresh-btn" @click="loadUsers" :loading="loading">
            <el-icon><Refresh /></el-icon>
            刷新
          </el-button>
        </div>

        <el-table :data="users" style="width: 100%" v-loading="loading" class="user-table">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="用户名" min-width="120">
            <template #default="{ row }">
              <div class="user-name">
                <el-icon><UserFilled /></el-icon>
                <span>{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="180">
            <template #default="{ row }">
              <div class="user-email">
                <el-icon><Message /></el-icon>
                <span>{{ row.email }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="is_admin" label="角色" width="100">
            <template #default="{ row }">
              <el-tag :type="row.is_admin ? 'danger' : 'primary'" size="small">
                {{ row.is_admin ? '管理员' : '普通用户' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="注册时间" width="180">
            <template #default="{ row }">
              {{ formatDate(row.create_time) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="handleEditUser(row)">
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDeleteUser(row.id)"
                :disabled="row.is_admin && users.filter((u) => u.is_admin).length === 1"
              >
                <el-icon><Delete /></el-icon>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 编辑用户对话框 -->
    <el-dialog
      v-model="showEditDialog"
      title="编辑用户信息"
      width="500px"
      :close-on-click-modal="false"
      @close="closeEditDialog"
    >
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="editForm.password"
            type="password"
            placeholder="不修改请留空"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-switch
            v-model="editForm.is_admin"
            active-text="管理员"
            inactive-text="普通用户"
            active-color="#f56c6c"
            inactive-color="#409eff"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeEditDialog">取消</el-button>
          <el-button type="primary" @click="handleUpdateUser" :loading="loading"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { User, UserFilled, Message, Edit, Delete, Refresh } from '@element-plus/icons-vue'
import { useManage } from '@/composables/useManage'

const {
  users,
  loading,
  editForm,
  showEditDialog,
  loadUsers,
  handleEditUser,
  handleUpdateUser,
  handleDeleteUser,
  closeEditDialog,
} = useManage()

/**
 * 格式化日期
 */
const formatDate = (date: string | null | undefined): string => {
  if (!date) return '未知'
  const d = new Date(date)
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
@import '@/assets/css/Manage.css';
</style>
