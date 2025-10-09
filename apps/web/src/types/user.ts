/**
 * @fileoverview 用户相关类型定义
 * 
 * 定义了用户管理系统中使用的所有TypeScript接口和类型
 * 包括基础用户信息、用户资料、用户创建和更新等相关类型
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

/**
 * 基础用户信息数据结构
 * 
 * 包含用户的基本信息，用于一般的用户数据展示
 * 
 * @example
 * ```typescript
 * const user: User = {
 *   id: 1,
 *   username: 'john_doe',
 *   email: 'john@example.com',
 *   phone: '+1234567890',
 *   created_at: '2023-01-01T00:00:00Z',
 *   updated_at: '2023-12-01T00:00:00Z',
 *   last_login: '2023-12-01T12:00:00Z',
 *   last_logout: '2023-11-30T18:00:00Z'
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
  /** 账户创建时间 */
  created_at: string;
  /** 账户最后更新时间 */
  updated_at: string;
  /** 最后登录时间，可选 */
  last_login?: string;
  /** 最后登出时间，可选 */
  last_logout?: string;
}

/**
 * 用户资料完整数据结构
 * 
 * 继承自基础User接口，包含额外的用户资料信息
 * 用于用户资料页面和管理后台的详细信息展示
 * 
 * @extends User
 * 
 * @example
 * ```typescript
 * const userProfile: UserProfile = {
 *   id: 1,
 *   username: 'john_doe',
 *   email: 'john@example.com',
 *   phone: '+1234567890',
 *   created_at: '2023-01-01T00:00:00Z',
 *   updated_at: '2023-12-01T00:00:00Z',
 *   last_login: '2023-12-01T12:00:00Z',
 *   avatar: 'https://example.com/avatar.jpg',
 *   role: 'admin',
 *   status: 'active'
 * };
 * ```
 */
export interface UserProfile extends User {
  /** 用户头像URL，可选 */
  avatar?: string;
  /** 用户角色：管理员或普通用户 */
  role: 'admin' | 'user';
  /** 用户状态：活跃、非活跃或被封禁 */
  status: 'active' | 'inactive' | 'banned';
}

/**
 * 创建用户请求数据结构
 * 
 * 用于管理员创建新用户账户时的请求数据
 * 
 * @example
 * ```typescript
 * const createUserData: CreateUserRequest = {
 *   username: 'new_user',
 *   email: 'newuser@example.com',
 *   password: 'securePassword123',
 *   phone: '+1234567890'
 * };
 * ```
 */
export interface CreateUserRequest {
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
 * 更新用户信息请求数据结构
 * 
 * 用于用户更新个人资料或管理员修改用户信息时的请求数据
 * 所有字段都是可选的，只更新提供的字段
 * 
 * @example
 * ```typescript
 * const updateUserData: UpdateUserRequest = {
 *   username: 'updated_username',
 *   email: 'newemail@example.com',
 *   phone: '+0987654321',
 *   avatar: 'https://example.com/new-avatar.jpg'
 * };
 * 
 * // 只更新用户名
 * const partialUpdate: UpdateUserRequest = {
 *   username: 'new_username'
 * };
 * ```
 */
export interface UpdateUserRequest {
  /** 新用户名，可选 */
  username?: string;
  /** 新邮箱地址，可选 */
  email?: string;
  /** 新手机号码，可选 */
  phone?: string;
  /** 新头像URL，可选 */
  avatar?: string;
}