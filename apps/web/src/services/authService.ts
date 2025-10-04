import { api } from './api';
import type { LoginRequest, RegisterRequest, RegisterResponse, User, AuthResponse } from '../types/auth';

// 认证相关API服务
export const authService = {
  // 登录
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      console.debug('[AuthService] 开始登录请求，凭据:', { username: credentials.username });
      
      const response = await api.post<{ code: number; message: string; data: AuthResponse }>('/auth/login', credentials);
      console.debug('[AuthService] 登录响应原始数据:', response);
      
      // 由于 api.post 返回的是 response.data，所以 response 就是后端的原始响应
      // 后端返回格式：{code: 200, message: "登录成功", data: {access_token, refresh_token, expires_in, user}}
      console.debug('[AuthService] 响应结构分析:', {
        hasResponse: !!response,
        responseType: typeof response,
        responseKeys: response ? Object.keys(response) : [],
        code: response?.code,
        message: response?.message,
        hasDataField: !!response?.data,
        dataType: typeof response?.data
      });
      
      if (response && response.code === 200 && response.data) {
        console.debug('[AuthService] 登录成功，返回数据:', response.data);
        return response.data;
      } else {
        const errorMsg = response?.message || '未知错误';
        console.error('[AuthService] 登录失败 - 响应格式错误:', {
          hasResponse: !!response,
          code: response?.code,
          message: response?.message,
          hasDataField: !!response?.data
        });
        throw new Error(`登录失败: ${errorMsg}`);
      }
    } catch (error) {
      console.error('[AuthService] 登录请求异常:', error);
      
      // 检查是否是网络错误
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        throw new Error('网络连接失败，请检查网络连接');
      }
      
      // 检查是否是HTTP错误
      if (error.response) {
        console.error('[AuthService] HTTP错误响应:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
        
        if (error.response.status === 401) {
          throw new Error('用户名或密码错误');
        } else if (error.response.status >= 500) {
          throw new Error('服务器内部错误，请稍后重试');
        } else {
          const errorMsg = error.response.data?.message || `HTTP ${error.response.status} 错误`;
          throw new Error(`登录失败: ${errorMsg}`);
        }
      }
      
      // 其他错误
      if (error.message) {
        throw error;
      } else {
        throw new Error('登录失败: 未知错误');
      }
    }
  },

  // 注册
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response.data;
  },

  // 获取用户信息
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<{ code: number; message: string; data: User }>('/auth/profile');
      console.debug('[AuthService] 获取用户资料响应:', response);
      
      // 后端返回格式：{code: 200, message: "获取用户资料成功", data: {id, username, email, ...}}
      if (response && response.code === 200 && response.data) {
        console.debug('[AuthService] 用户资料获取成功:', response.data);
        return response.data;
      } else {
        const errorMsg = response?.message || '获取用户资料失败';
        console.error('[AuthService] 用户资料响应格式错误:', {
          hasResponse: !!response,
          code: response?.code,
          message: response?.message,
          hasDataField: !!response?.data
        });
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('[AuthService] 获取用户资料异常:', error);
      
      if (error.response) {
        const errorMsg = error.response.data?.message || '获取用户资料失败';
        throw new Error(errorMsg);
      }
      
      if (error.message) {
        throw error;
      } else {
        throw new Error('获取用户资料失败: 未知错误');
      }
    }
  },

  // 刷新token
  refreshToken: async (refreshData: { refresh_token: string }): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse }>('/auth/refresh', refreshData);
    return response.data.data;
  },

  // 用户登出
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // 修改密码
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await api.post('/auth/change-password', { oldPassword, newPassword });
  },

  // 忘记密码
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  // 重置密码
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  // 验证邮箱
  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token });
  },

  // 重发验证邮件
  resendVerification: async (email: string): Promise<void> => {
    await api.post('/auth/resend-verification', { email });
  },
};