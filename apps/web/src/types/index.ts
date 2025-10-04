// 类型定义导出文件

export * from './auth';
export * from './api';

// 通用类型定义
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// 路由相关类型
export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
  requireAuth?: boolean;
  layout?: 'default' | 'auth' | 'none';
}

// 组件通用Props类型
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 主题相关类型
export type ThemeMode = 'light' | 'dark' | 'system';

// 表单相关类型
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'checkbox' | 'radio' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
}