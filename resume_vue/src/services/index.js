import axios from 'axios';
import { ElMessage } from 'element-plus';
/* 创建Axios实例 */
const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: '/api/v1',
        timeout: 120000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    /**
     * 请求拦截器
     */
    instance.interceptors.request.use((config) => {
        // 添加Token到请求头
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    });
    /**
     * 响应拦截器
     */
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        console.error('[API Response Error]', error);
        if (error.response) {
            const status = error.response.status;
            const errorData = error.response.data;
            let message = '服务器错误';
            if (errorData.detail) {
                message = errorData.detail;
            }
            else if (errorData.message) {
                message = errorData.message;
            }
            else if (errorData.error?.message) {
                message = errorData.error.message;
            }
            switch (status) {
                case 400:
                    ElMessage.error(`请求参数错误: ${message}`);
                    break;
                case 401:
                    ElMessage.error('未授权，请先登录');
                    break;
                case 403:
                    ElMessage.error('拒绝访问');
                    break;
                case 404:
                    ElMessage.error('请求的资源不存在');
                    break;
                case 422:
                    ElMessage.error(`参数验证失败: ${message}`);
                    break;
                case 500:
                    ElMessage.error(`服务器错误: ${message}`);
                    break;
                default:
                    ElMessage.error(`请求失败: ${message}`);
            }
        }
        else if (error.request) {
            ElMessage.error('网络错误，请检查网络连接');
        }
        else {
            ElMessage.error('请求配置错误');
        }
        return Promise.reject(error);
    });
    return instance;
};
/*Axios实例*/
const apiClient = createAxiosInstance();
/**
 * GET请求
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = async (url, config) => {
    const response = await apiClient.get(url, config);
    return response.data;
};
/**
 * POST请求
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async (url, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data, config) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
};
/**
 * PUT请求
 * @param url - 请求URL
 * @param data - 请求数据
 * @param config - 请求配置
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = async (url, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data, config) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
};
/**
 * DELETE请求
 * @param url - 请求URL
 * @param config - 请求配置
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const del = async (url, config) => {
    const response = await apiClient.delete(url, config);
    return response.data;
};
/**
 * 上传文件
 * @param url - 请求URL
 * @param file - 文件对象
 * @param onProgress - 上传进度回调
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = async (url, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onProgress(progress);
            }
        },
    };
    const response = await apiClient.post(url, formData, config);
    return response.data;
};
export default apiClient;
