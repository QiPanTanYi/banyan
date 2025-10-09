/**
 * @fileoverview API服务模块 - 提供统一的HTTP请求接口和错误处理
 * 
 * 该模块封装了axios实例，提供了：
 * - 统一的请求/响应拦截器
 * - 自动token认证
 * - 请求耗时统计
 * - 错误状态码处理
 * - 文件上传功能
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/authStore';

/**
 * 扩展 AxiosRequestConfig 以包含请求元数据
 * 用于记录请求开始时间，计算请求耗时
 */
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    /** 请求元数据 */
    metadata?: {
      /** 请求开始时间 */
      startTime: Date;
    };
  }
}

/** API基础URL，从环境变量获取或使用默认值 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

/**
 * 创建配置好的axios实例
 * 
 * 配置包括：
 * - 基础URL和超时时间
 * - 默认请求头
 * - 请求/响应拦截器
 * 
 * @example
 * ```typescript
 * // 直接使用apiClient
 * const response = await apiClient.get('/users');
 * 
 * // 或使用封装的api对象
 * const users = await api.get('/users');
 * ```
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 添加认证token
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 添加请求时间戳
    config.metadata = { startTime: new Date() };
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 计算请求耗时
    const endTime = new Date();
    const startTime = response.config.metadata?.startTime;
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
    
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    
    return response;
  },
  (error) => {
    const { response, config } = error;
    
    // 计算请求耗时
    const endTime = new Date();
    const startTime = config?.metadata?.startTime;
    const duration = startTime ? endTime.getTime() - startTime.getTime() : 0;
    
    console.error(`❌ API Error: ${config?.method?.toUpperCase()} ${config?.url} (${duration}ms)`, error);
    
    // 处理不同的错误状态码
    if (response) {
      switch (response.status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          useAuthStore.getState().logout();
          window.location.href = '/login';
          break;
        case 403:
          console.error('权限不足');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求失败: ${response.status}`);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('请求超时');
    } else {
      console.error('网络错误');
    }
    
    return Promise.reject(error);
  }
);

/**
 * API响应数据结构
 * 
 * 统一的API响应格式，所有后端接口都应该返回这种格式
 * 
 * @template T - 响应数据的类型
 * 
 * @example
 * ```typescript
 * interface User {
 *   id: string;
 *   name: string;
 * }
 * 
 * const response: ApiResponse<User[]> = {
 *   success: true,
 *   data: [{ id: '1', name: 'John' }],
 *   message: '获取用户列表成功',
 *   code: 200
 * };
 * ```
 */
export interface ApiResponse<T = any> {
  /** 请求是否成功 */
  success: boolean;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message: string;
  /** 响应状态码 */
  code: number;
}

/**
 * 通用API请求方法集合
 * 
 * 提供了常用的HTTP方法封装，自动处理响应数据提取
 * 所有方法都会自动添加认证token和错误处理
 * 
 * @example
 * ```typescript
 * // GET请求
 * const users = await api.get<User[]>('/users');
 * 
 * // POST请求
 * const newUser = await api.post<User>('/users', { name: 'John' });
 * 
 * // PUT请求
 * const updatedUser = await api.put<User>('/users/1', { name: 'Jane' });
 * 
 * // DELETE请求
 * await api.delete('/users/1');
 * ```
 */
export const api = {
  /**
   * 发送GET请求
   * 
   * @template T - 响应数据类型
   * @param url - 请求URL
   * @param config - axios请求配置
   * @returns Promise包装的响应数据
   */
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get(url, config).then(response => response.data);
  },
  
  /**
   * 发送POST请求
   * 
   * @template T - 响应数据类型
   * @param url - 请求URL
   * @param data - 请求体数据
   * @param config - axios请求配置
   * @returns Promise包装的响应数据
   */
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post(url, data, config).then(response => response.data);
  },
  
  /**
   * 发送PUT请求
   * 
   * @template T - 响应数据类型
   * @param url - 请求URL
   * @param data - 请求体数据
   * @param config - axios请求配置
   * @returns Promise包装的响应数据
   */
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put(url, data, config).then(response => response.data);
  },
  
  /**
   * 发送DELETE请求
   * 
   * @template T - 响应数据类型
   * @param url - 请求URL
   * @param config - axios请求配置
   * @returns Promise包装的响应数据
   */
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete(url, config).then(response => response.data);
  },
  
  /**
   * 发送PATCH请求
   * 
   * @template T - 响应数据类型
   * @param url - 请求URL
   * @param data - 请求体数据
   * @param config - axios请求配置
   * @returns Promise包装的响应数据
   */
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.patch(url, data, config).then(response => response.data);
  },
};

/**
 * 文件上传功能
 * 
 * 支持单文件上传，并提供上传进度回调
 * 
 * @param file - 要上传的文件对象
 * @param onProgress - 上传进度回调函数，参数为进度百分比(0-100)
 * @returns Promise包装的上传结果，包含文件URL
 * 
 * @example
 * ```typescript
 * const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
 * const file = fileInput.files?.[0];
 * 
 * if (file) {
 *   try {
 *     const result = await uploadFile(file, (progress) => {
 *       console.log(`上传进度: ${progress}%`);
 *     });
 *     console.log('文件上传成功:', result.data.url);
 *   } catch (error) {
 *     console.error('文件上传失败:', error);
 *   }
 * }
 * ```
 */
export const uploadFile = (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  }).then(response => response.data);
};

export default apiClient;