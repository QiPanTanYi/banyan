// 认证相关类型定义

export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string;
    role?: string;
  };
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: number;
    username: string;
    email: string;
    phone?: string;
    role?: string;
    status?: number;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

// 用户信息类型
export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  role?: string;
  status?: number;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

// 认证响应类型
export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type?: string;
  user: User;
}