// API响应相关类型定义

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  status?: number;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: RequestParams;
  timeout?: number;
  withCredentials?: boolean;
}