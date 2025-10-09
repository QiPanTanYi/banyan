/**
 * @fileoverview 认证相关类型定义
 * 
 * 定义了用户认证系统中使用的所有TypeScript接口和类型
 * 包括登录、注册、用户信息、认证状态等相关类型
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

/**
 * 用户登录请求数据结构
 * 
 * @example
 * ```typescript
 * const loginData: LoginRequest = {
 *   username: 'john_doe',
 *   password: 'securePassword123',
 *   remember: true
 * };
 * ```
 */
export interface LoginRequest {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 是否记住登录状态，可选 */
  remember?: boolean;
}

/**
 * 用户登录响应数据结构
 * 
 * @deprecated 请使用 AuthResponse 替代
 * 
 * @example
 * ```typescript
 * const response: LoginResponse = {
 *   access_token: 'jwt_token_here',
 *   refresh_token: 'refresh_token_here',
 *   expires_in: 3600,
 *   token_type: 'Bearer',
 *   user: {
 *     id: 1,
 *     username: 'john_doe',
 *     email: 'john@example.com',
 *     role: 'user'
 *   }
 * };
 * ```
 */
export interface LoginResponse {
  /** 访问令牌 */
  access_token: string;
  /** 刷新令牌，可选 */
  refresh_token?: string;
  /** 令牌过期时间（秒） */
  expires_in: number;
  /** 令牌类型，通常为 'Bearer' */
  token_type: string;
  /** 用户基本信息 */
  user: {
    /** 用户ID */
    id: number;
    /** 用户名 */
    username: string;
    /** 邮箱地址 */
    email: string;
    /** 用户角色，可选 */
    role?: string;
  };
}

/**
 * 用户注册请求数据结构
 * 
 * @example
 * ```typescript
 * const registerData: RegisterRequest = {
 *   username: 'new_user',
 *   email: 'user@example.com',
 *   password: 'securePassword123',
 *   phone: '+1234567890'
 * };
 * ```
 */
export interface RegisterRequest {
  /** 用户名 */
  username: string;
  /** 邮箱地址 */
  email: string;
  /** 密码 */
  password: string;
  /** 手机号码，可选 */
  phone?: string;
}

/**
 * 用户注册响应数据结构
 * 
 * @example
 * ```typescript
 * const response: RegisterResponse = {
 *   success: true,
 *   message: '注册成功',
 *   user: {
 *     id: 1,
 *     username: 'new_user',
 *     email: 'user@example.com'
 *   }
 * };
 * ```
 */
export interface RegisterResponse {
  /** 注册是否成功 */
  success: boolean;
  /** 响应消息 */
  message: string;
  /** 新创建的用户信息，可选 */
  user?: {
    /** 用户ID */
    id: number;
    /** 用户名 */
    username: string;
    /** 邮箱地址 */
    email: string;
  };
}

/**
 * 认证状态数据结构
 * 
 * 用于状态管理中存储用户认证相关的状态信息
 * 
 * @example
 * ```typescript
 * const authState: AuthState = {
 *   isAuthenticated: true,
 *   user: {
 *     id: 1,
 *     username: 'john_doe',
 *     email: 'john@example.com',
 *     role: 'admin',
 *     status: 1
 *   },
 *   token: 'jwt_token_here',
 *   loading: false,
 *   error: null
 * };
 * ```
 */
export interface AuthState {
  /** 用户是否已认证 */
  isAuthenticated: boolean;
  /** 当前用户信息，未登录时为null */
  user: {
    /** 用户ID */
    id: number;
    /** 用户名 */
    username: string;
    /** 邮箱地址 */
    email: string;
    /** 手机号码，可选 */
    phone?: string;
    /** 用户角色，可选 */
    role?: string;
    /** 用户状态，可选 */
    status?: number;
  } | null;
  /** 访问令牌，未登录时为null */
  token: string | null;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息，无错误时为null */
  error: string | null;
}

/**
 * 刷新令牌请求数据结构
 * 
 * @example
 * ```typescript
 * const refreshData: RefreshTokenRequest = {
 *   refresh_token: 'refresh_token_here'
 * };
 * ```
 */
export interface RefreshTokenRequest {
  /** 刷新令牌 */
  refresh_token: string;
}

/**
 * 刷新令牌响应数据结构
 * 
 * @example
 * ```typescript
 * const response: RefreshTokenResponse = {
 *   access_token: 'new_jwt_token_here',
 *   expires_in: 3600
 * };
 * ```
 */
export interface RefreshTokenResponse {
  /** 新的访问令牌 */
  access_token: string;
  /** 令牌过期时间（秒） */
  expires_in: number;
}

/**
 * 用户信息完整数据结构
 * 
 * 包含用户的所有详细信息，用于用户资料展示和管理
 * 
 * @example
 * ```typescript
 * const user: User = {
 *   id: 1,
 *   username: 'john_doe',
 *   email: 'john@example.com',
 *   phone: '+1234567890',
 *   role: 'admin',
 *   status: 1,
 *   avatar: 'https://example.com/avatar.jpg',
 *   created_at: '2023-01-01T00:00:00Z',
 *   updated_at: '2023-12-01T00:00:00Z',
 *   last_login: '2023-12-01T12:00:00Z'
 * };
 * ```
 */
export interface User {
  /** 用户唯一标识符 */
  id: number;
  /** 用户名 */
  username: string;
  /** 邮箱地址 */
  email: string;
  /** 手机号码，可选 */
  phone?: string;
  /** 用户角色（如：admin, user, moderator），可选 */
  role?: string;
  /** 用户状态（如：1-活跃, 0-禁用），可选 */
  status?: number;
  /** 用户头像URL，可选 */
  avatar?: string;
  /** 账户创建时间，可选 */
  created_at?: string;
  /** 账户最后更新时间，可选 */
  updated_at?: string;
  /** 最后登录时间，可选 */
  last_login?: string;
}

/**
 * 认证响应数据结构
 * 
 * 统一的认证响应格式，用于登录、注册等认证操作的返回数据
 * 推荐使用此接口替代 LoginResponse
 * 
 * @example
 * ```typescript
 * const authResponse: AuthResponse = {
 *   access_token: 'jwt_token_here',
 *   refresh_token: 'refresh_token_here',
 *   expires_in: 3600,
 *   token_type: 'Bearer',
 *   user: {
 *     id: 1,
 *     username: 'john_doe',
 *     email: 'john@example.com',
 *     role: 'user'
 *   }
 * };
 * ```
 */
export interface AuthResponse {
  /** 访问令牌 */
  access_token: string;
  /** 刷新令牌，可选 */
  refresh_token?: string;
  /** 令牌过期时间（秒） */
  expires_in: number;
  /** 令牌类型，通常为 'Bearer'，可选 */
  token_type?: string;
  /** 完整的用户信息 */
  user: User;
}