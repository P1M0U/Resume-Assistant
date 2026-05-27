import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { ElMessage } from 'element-plus'

/* 创建Axios实例 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 120000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  /**
   * 请求拦截器
   */
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 添加Token到请求头
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('[API Request Error]', error)
      return Promise.reject(error)
    },
  )

  /**
   * 响应拦截器
   */
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        response.data,
      )

      return response
    },
    (error) => {
      console.error('[API Response Error]', error)

      if (error.response) {
        const status = error.response.status
        const errorData = error.response.data

        let message = '服务器错误'

        if (errorData.detail) {
          message = errorData.detail
        } else if (errorData.message) {
          message = errorData.message
        } else if (errorData.error?.message) {
          message = errorData.error.message
        }

        switch (status) {
          case 400:
            ElMessage.error(`请求参数错误: ${message}`)
            break
          case 401:
            ElMessage.error('未授权，请先登录')
            break
          case 403:
            ElMessage.error('拒绝访问')
            break
          case 404:
            ElMessage.error('请求的资源不存在')
            break
          case 422:
            ElMessage.error(`参数验证失败: ${message}`)
            break
          case 500:
            ElMessage.error(`服务器错误: ${message}`)
            break
          default:
            ElMessage.error(`请求失败: ${message}`)
        }
      } else if (error.request) {
        ElMessage.error('网络错误，请检查网络连接')
      } else {
        ElMessage.error('请求配置错误')
      }

      return Promise.reject(error)
    },
  )

  return instance
}

/*Axios实例*/
const apiClient = createAxiosInstance()

/**
 * GET请求
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise
 */
export const get = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<T>(url, config)
  return response.data
}

/**
 * POST请求
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise
 */
export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config)
  return response.data
}

/**
 * PUT请求
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise
 */
export const put = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config)
  return response.data
}

/**
 * DELETE请求
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise
 */
export const del = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<T>(url, config)
  return response.data
}

/**
 * 上传文件
 * @param url - 请求URL
 * @param file - 文件对象
 * @param onProgress - 上传进度回调
 * @returns Promise
 */
export const uploadFile = async <T = any>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void,
): Promise<T> => {
  const formData = new FormData()
  formData.append('file', file)

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(progress)
      }
    },
  }

  const response = await apiClient.post<T>(url, formData, config)
  return response.data
}

export default apiClient
