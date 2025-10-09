/**
 * @fileoverview API响应相关类型定义
 * 
 * 定义了API请求和响应中使用的所有TypeScript接口和类型
 * 包括通用响应格式、分页响应、错误处理、请求参数等相关类型
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

/**
 * 通用API响应数据结构
 * 
 * 标准化的API响应格式，支持泛型以适应不同的数据类型
 * 
 * @template T - 响应数据的类型
 * 
 * @example
 * ```typescript
 * // 成功响应
 * const successResponse: ApiResponse<User> = {
 *   success: true,
 *   data: {
 *     id: 1,
 *     username: 'john_doe',
 *     email: 'john@example.com'
 *   },
 *   message: '获取用户信息成功',
 *   timestamp: '2023-12-01T12:00:00Z',
 *   status: 200
 * };
 * 
 * // 错误响应
 * const errorResponse: ApiResponse = {
 *   success: false,
 *   message: '验证失败',
 *   errors: {
 *     username: ['用户名不能为空'],
 *     email: ['邮箱格式不正确']
 *   },
 *   timestamp: '2023-12-01T12:00:00Z',
 *   status: 400
 * };
 * ```
 */
export interface ApiResponse<T = any> {
  /** 请求是否成功 */
  success: boolean;
  /** 响应数据，可选 */
  data?: T;
  /** 响应消息，可选 */
  message?: string;
  /** 验证错误信息，字段名对应错误数组，可选 */
  errors?: Record<string, string[]>;
  /** 响应时间戳，可选 */
  timestamp?: string;
  /** HTTP状态码，可选 */
  status?: number;
}

/**
 * 分页响应数据结构
 * 
 * 用于处理分页数据的标准响应格式
 * 
 * @template T - 分页项目的数据类型
 * 
 * @example
 * ```typescript
 * const paginatedUsers: PaginatedResponse<User> = {
 *   items: [
 *     { id: 1, username: 'user1', email: 'user1@example.com' },
 *     { id: 2, username: 'user2', email: 'user2@example.com' }
 *   ],
 *   total: 100,
 *   page: 1,
 *   pageSize: 10,
 *   totalPages: 10,
 *   hasMore: true
 * };
 * ```
 */
export interface PaginatedResponse<T = any> {
  /** 当前页的数据项目列表 */
  items: T[];
  /** 总记录数 */
  total: number;
  /** 当前页码（从1开始） */
  page: number;
  /** 每页显示的记录数 */
  pageSize: number;
  /** 总页数 */
  totalPages: number;
  /** 是否还有更多数据 */
  hasMore: boolean;
}

/**
 * API错误信息数据结构
 * 
 * 用于统一处理API请求中的错误信息
 * 
 * @example
 * ```typescript
 * const apiError: ApiError = {
 *   status: 400,
 *   message: '请求参数错误',
 *   errors: {
 *     username: ['用户名不能为空', '用户名长度必须在3-20个字符之间'],
 *     email: ['邮箱格式不正确']
 *   },
 *   timestamp: '2023-12-01T12:00:00Z'
 * };
 * ```
 */
export interface ApiError {
  /** HTTP状态码 */
  status: number;
  /** 错误消息 */
  message: string;
  /** 详细的验证错误信息，字段名对应错误数组，可选 */
  errors?: Record<string, string[]>;
  /** 错误发生时间戳，可选 */
  timestamp?: string;
}

/**
 * 请求参数数据结构
 * 
 * 用于定义API请求中的查询参数或表单参数
 * 
 * @example
 * ```typescript
 * const searchParams: RequestParams = {
 *   keyword: 'search term',
 *   page: 1,
 *   pageSize: 10,
 *   active: true,
 *   category: undefined // 可选参数
 * };
 * ```
 */
export interface RequestParams {
  /** 参数键值对，支持字符串、数字、布尔值或undefined */
  [key: string]: string | number | boolean | undefined;
}

/**
 * 请求配置数据结构
 * 
 * 用于配置HTTP请求的各种选项
 * 
 * @example
 * ```typescript
 * const requestConfig: RequestConfig = {
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': 'Bearer token_here'
 *   },
 *   params: {
 *     page: 1,
 *     limit: 10
 *   },
 *   timeout: 5000,
 *   withCredentials: true
 * };
 * ```
 */
export interface RequestConfig {
  /** 请求头信息，可选 */
  headers?: Record<string, string>;
  /** 请求参数，可选 */
  params?: RequestParams;
  /** 请求超时时间（毫秒），可选 */
  timeout?: number;
  /** 是否携带凭证（cookies），可选 */
  withCredentials?: boolean;
}