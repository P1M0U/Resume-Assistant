import { post, get } from './index'
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

export interface TokenResponse {
  access_token: string
  token_type: string
  user: UserInfo
}

export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  return await post<TokenResponse>('/user/login', data)
}

export const register = async (data: RegisterRequest): Promise<TokenResponse> => {
  return await post<TokenResponse>('/user/register', data)
}

export const getCurrentUser = async (): Promise<UserInfo> => {
  return await get<UserInfo>('/user/me')
}

export const updateUser = async (data: Partial<RegisterRequest>): Promise<UserInfo> => {
  return await post<UserInfo>('/user/me', data)
}
