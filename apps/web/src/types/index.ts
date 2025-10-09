/**
 * @fileoverview 类型定义统一导出文件
 * 
 * 统一导出所有类型定义，提供便捷的类型导入方式
 * 同时定义了项目中使用的通用类型、工具类型和组件相关类型
 * 
 * @author Banyan Team
 * @version 1.0.0
 */

// 导出认证相关类型
export * from './auth';
// 导出API相关类型
export * from './api';
// 导出用户相关类型（重新导出以避免与auth.ts中的User冲突）
export type {
  User as UserEntity,
  UserProfile,
  CreateUserRequest,
  UpdateUserRequest
} from './user';

/**
 * 通用工具类型定义
 */

/**
 * 可空类型
 * 
 * 将类型T扩展为可以为null的类型
 * 
 * @template T - 原始类型
 * 
 * @example
 * ```typescript
 * type NullableString = Nullable<string>; // string | null
 * const value: NullableString = null; // 有效
 * const value2: NullableString = 'hello'; // 有效
 * ```
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 * 
 * 将类型T扩展为可以为undefined的类型
 * 
 * @template T - 原始类型
 * 
 * @example
 * ```typescript
 * type OptionalNumber = Optional<number>; // number | undefined
 * const value: OptionalNumber = undefined; // 有效
 * const value2: OptionalNumber = 42; // 有效
 * ```
 */
export type Optional<T> = T | undefined;

/**
 * 路由配置数据结构
 * 
 * 定义应用程序路由的配置信息，包括路径、组件、权限等
 * 
 * @example
 * ```typescript
 * const routeConfig: RouteConfig = {
 *   path: '/dashboard',
 *   element: <Dashboard />,
 *   requireAuth: true,
 *   layout: 'default',
 *   children: [
 *     {
 *       path: '/dashboard/profile',
 *       element: <Profile />,
 *       requireAuth: true,
 *       layout: 'default'
 *     }
 *   ]
 * };
 * ```
 */
export interface RouteConfig {
  /** 路由路径 */
  path: string;
  /** 路由对应的React组件 */
  element: React.ReactNode;
  /** 子路由配置，可选 */
  children?: RouteConfig[];
  /** 是否需要认证，可选 */
  requireAuth?: boolean;
  /** 布局类型，可选 */
  layout?: 'default' | 'auth' | 'none';
}

/**
 * 组件基础Props数据结构
 * 
 * 定义所有组件都可能需要的基础属性
 * 可以作为其他组件Props接口的基础接口
 * 
 * @example
 * ```typescript
 * interface ButtonProps extends BaseComponentProps {
 *   onClick?: () => void;
 *   disabled?: boolean;
 * }
 * 
 * const MyComponent: React.FC<BaseComponentProps> = ({ 
 *   className, 
 *   style, 
 *   children 
 * }) => {
 *   return (
 *     <div className={className} style={style}>
 *       {children}
 *     </div>
 *   );
 * };
 * ```
 */
export interface BaseComponentProps {
  /** CSS类名，可选 */
  className?: string;
  /** 内联样式，可选 */
  style?: React.CSSProperties;
  /** 子组件或内容，可选 */
  children?: React.ReactNode;
}

/**
 * 主题模式类型
 * 
 * 定义应用程序支持的主题模式
 * 
 * @example
 * ```typescript
 * const currentTheme: ThemeMode = 'dark';
 * 
 * function setTheme(mode: ThemeMode) {
 *   // 设置主题逻辑
 *   console.log(`切换到${mode}主题`);
 * }
 * ```
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * 表单字段配置数据结构
 * 
 * 定义动态表单中单个字段的配置信息，包括类型、验证规则等
 * 
 * @example
 * ```typescript
 * const usernameField: FormField = {
 *   name: 'username',
 *   label: '用户名',
 *   type: 'text',
 *   placeholder: '请输入用户名',
 *   required: true,
 *   validation: {
 *     required: '用户名不能为空',
 *     minLength: { value: 3, message: '用户名至少3个字符' },
 *     maxLength: { value: 20, message: '用户名不能超过20个字符' },
 *     pattern: { value: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' }
 *   }
 * };
 * 
 * const roleField: FormField = {
 *   name: 'role',
 *   label: '角色',
 *   type: 'select',
 *   required: true,
 *   options: [
 *     { label: '管理员', value: 'admin' },
 *     { label: '普通用户', value: 'user' }
 *   ]
 * };
 * ```
 */
export interface FormField {
  /** 字段名称 */
  name: string;
  /** 字段标签 */
  label: string;
  /** 字段类型 */
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'checkbox' | 'radio' | 'select';
  /** 占位符文本，可选 */
  placeholder?: string;
  /** 是否必填，可选 */
  required?: boolean;
  /** 选项列表（用于select、radio、checkbox类型），可选 */
  options?: { label: string; value: string | number }[];
  /** 验证规则配置，可选 */
  validation?: {
    /** 必填验证错误消息，可选 */
    required?: string;
    /** 最小长度验证，可选 */
    minLength?: { value: number; message: string };
    /** 最大长度验证，可选 */
    maxLength?: { value: number; message: string };
    /** 正则表达式验证，可选 */
    pattern?: { value: RegExp; message: string };
  };
}