/**
 * @fileoverview 认证服务模块 - 提供用户认证相关的API接口
 * 
 * 该模块提供了完整的用户认证功能：
 * - 用户登录/注册
 * - 用户资料管理
 * - 密码管理（修改、重置）
 * - 邮箱验证
 * - Token刷新和登出
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

import { api } from './api';
import type { LoginRequest, RegisterRequest, RegisterResponse, User, AuthResponse } from '../types/auth';

/**
 * 认证服务对象
 * 
 * 提供所有用户认证相关的API方法，包括登录、注册、密码管理等功能
 * 所有方法都会自动处理错误并提供详细的错误信息
 * 
 * @example
 * ```typescript
 * // 用户登录
 * try {
 *   const authData = await authService.login({ username: 'user', password: 'pass' });
 *   console.log('登录成功:', authData.user);
 * } catch (error) {
 *   console.error('登录失败:', error.message);
 * }
 * 
 * // 获取用户资料
 * const user = await authService.getProfile();
 * ```
 */
export const authService = {
  /**
   * 用户登录
   * 
   * 使用用户名和密码进行登录认证
   * 
   * @param credentials - 登录凭据
   * @param credentials.username - 用户名
   * @param credentials.password - 密码
   * @returns Promise包装的认证响应，包含token和用户信息
   * 
   * @throws {Error} 当用户名或密码错误时
   * @throws {Error} 当网络连接失败时
   * @throws {Error} 当服务器内部错误时
   * 
   * @example
   * ```typescript
   * try {
   *   const authData = await authService.login({
   *     username: 'john_doe',
   *     password: 'securePassword123'
   *   });
   *   
   *   // 登录成功，可以访问token和用户信息
   *   console.log('Access Token:', authData.access_token);
   *   console.log('User Info:', authData.user);
   * } catch (error) {
   *   console.error('登录失败:', error.message);
   * }
   * ```
   */
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
    } catch (error: any) {
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

  /**
   * 用户注册
   * 
   * 创建新的用户账户
   * 
   * @param userData - 注册用户数据
   * @param userData.username - 用户名
   * @param userData.email - 邮箱地址
   * @param userData.password - 密码
   * @returns Promise包装的注册响应
   * 
   * @example
   * ```typescript
   * const registerData = {
   *   username: 'new_user',
   *   email: 'user@example.com',
   *   password: 'securePassword123'
   * };
   * 
   * const result = await authService.register(registerData);
   * ```
   */
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response;
  },

  /**
   * 获取当前用户资料
   * 
   * 获取已登录用户的详细信息
   * 需要有效的认证token
   * 
   * @returns Promise包装的用户信息
   * 
   * @throws {Error} 当token无效或过期时
   * @throws {Error} 当用户不存在时
   * 
   * @example
   * ```typescript
   * try {
   *   const user = await authService.getProfile();
   *   console.log('用户ID:', user.id);
   *   console.log('用户名:', user.username);
   *   console.log('邮箱:', user.email);
   * } catch (error) {
   *   console.error('获取用户资料失败:', error.message);
   * }
   * ```
   */
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
    } catch (error: any) {
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

  /**
   * 刷新访问令牌
   * 
   * 使用刷新令牌获取新的访问令牌
   * 
   * @param refreshData - 刷新令牌数据
   * @param refreshData.refresh_token - 刷新令牌
   * @returns Promise包装的新认证响应
   * 
   * @example
   * ```typescript
   * const newAuthData = await authService.refreshToken({
   *   refresh_token: 'your_refresh_token_here'
   * });
   * ```
   */
  refreshToken: async (refreshData: { refresh_token: string }): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse }>('/auth/refresh', refreshData);
    return response.data;
  },

  /**
   * 用户登出
   * 
   * 注销当前用户会话，使token失效
   * 
   * @returns Promise<void>
   * 
   * @example
   * ```typescript
   * await authService.logout();
   * console.log('用户已登出');
   * ```
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  /**
   * 修改密码
   * 
   * 更改当前用户的密码，需要提供旧密码进行验证
   * 
   * @param oldPassword - 当前密码
   * @param newPassword - 新密码
   * @returns Promise<void>
   * 
   * @throws {Error} 当旧密码不正确时
   * 
   * @example
   * ```typescript
   * try {
   *   await authService.changePassword('oldPass123', 'newSecurePass456');
   *   console.log('密码修改成功');
   * } catch (error) {
   *   console.error('密码修改失败:', error.message);
   * }
   * ```
   */
  changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
    await api.post('/auth/change-password', { oldPassword, newPassword });
  },

  /**
   * 忘记密码
   * 
   * 发送密码重置邮件到指定邮箱
   * 
   * @param email - 用户邮箱地址
   * @returns Promise<void>
   * 
   * @example
   * ```typescript
   * await authService.forgotPassword('user@example.com');
   * console.log('密码重置邮件已发送');
   * ```
   */
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  /**
   * 重置密码
   * 
   * 使用重置令牌设置新密码
   * 
   * @param token - 密码重置令牌（从邮件中获取）
   * @param newPassword - 新密码
   * @returns Promise<void>
   * 
   * @throws {Error} 当重置令牌无效或过期时
   * 
   * @example
   * ```typescript
   * try {
   *   await authService.resetPassword('reset_token_from_email', 'newPassword123');
   *   console.log('密码重置成功');
   * } catch (error) {
   *   console.error('密码重置失败:', error.message);
   * }
   * ```
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * 验证邮箱
   * 
   * 使用验证令牌确认邮箱地址
   * 
   * @param token - 邮箱验证令牌（从验证邮件中获取）
   * @returns Promise<void>
   * 
   * @throws {Error} 当验证令牌无效或过期时
   * 
   * @example
   * ```typescript
   * try {
   *   await authService.verifyEmail('verification_token_from_email');
   *   console.log('邮箱验证成功');
   * } catch (error) {
   *   console.error('邮箱验证失败:', error.message);
   * }
   * ```
   */
  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token });
  },

  /**
   * 重发验证邮件
   * 
   * 重新发送邮箱验证邮件到指定邮箱
   * 
   * @param email - 用户邮箱地址
   * @returns Promise<void>
   * 
   * @example
   * ```typescript
   * await authService.resendVerification('user@example.com');
   * console.log('验证邮件已重新发送');
   * ```
   */
  resendVerification: async (email: string): Promise<void> => {
    await api.post('/auth/resend-verification', { email });
  },
};