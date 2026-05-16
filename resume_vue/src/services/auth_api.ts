import { post, get, put, del } from './index'
import type { UserInfo } from '@/stores/user'

export interface LoginRequest {
  name: string
  password: string
}

export interface RegisterRequest {
  name: string
  password: string
  email: string
}

export interface AdminUpdateRequest {
  name?: string
  password?: string
  email?: string
  is_admin?: boolean
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: UserInfo
}

export interface RegisterResponse {
  message: string
  user: UserInfo
}

export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  return await post<TokenResponse>('/user/login', data)
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return await post<RegisterResponse>('/user/register', data)
}

export const getCurrentUser = async (): Promise<UserInfo> => {
  return await get<UserInfo>('/user/me')
}

export const updateUser = async (data: Partial<RegisterRequest>): Promise<UserInfo> => {
  return await put<UserInfo>('/user/me', data)
}

export const getAllUsers = async (skip: number = 0, limit: number = 100): Promise<UserInfo[]> => {
  return await get<UserInfo[]>(`/user?skip=${skip}&limit=${limit}`)
}

export const updateUserByAdmin = async (
  userId: number,
  data: Partial<AdminUpdateRequest>,
): Promise<UserInfo> => {
  return await put<UserInfo>(`/user/${userId}`, data)
}

export const deleteUser = async (userId: number): Promise<void> => {
  return await del<void>(`/user/${userId}`)
}
