// 用户相关类型定义

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  last_logout?: string;
}

export interface UserProfile extends User {
  // 扩展用户信息
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'banned';
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}